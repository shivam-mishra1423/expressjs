require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

// Authentication Routes
const authRoutes = require("./routes/auth");

// JWT Middleware
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// =========================
// Middleware
// =========================
app.use(cors());
app.use(express.json());

// =========================
// Authentication Routes
// =========================
app.use("/api/auth", authRoutes);

// =========================
// Home Route
// =========================
app.get("/", (req, res) => {
    res.send("Student CRUD API");
});

// =========================
// Add Student (Protected)
// =========================
app.post("/student", authMiddleware, (req, res) => {

    const { name, age, course, city } = req.body;

    const sql = `
        INSERT INTO student (name, age, course, city)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, age, course, city], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error inserting data"
            });
        }

        res.status(201).json({
            message: "Student Added Successfully",
            studentId: result.insertId
        });

    });

});

// =========================
// Get All Students (Protected)
// =========================
app.get("/student", authMiddleware, (req, res) => {

    const sql = "SELECT * FROM student";

    db.query(sql, (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Error fetching data"
            });

        }

        res.status(200).json(result);

    });

});

// =========================
// Update Student (Protected)
// =========================
app.put("/student/:id", authMiddleware, (req, res) => {

    const { id } = req.params;
    const { name, age, course, city } = req.body;

    const sql = `
        UPDATE student
        SET name = ?, age = ?, course = ?, city = ?
        WHERE id = ?
    `;

    db.query(sql, [name, age, course, city, id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Error Updating Student"
            });

        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Student Not Found"
            });

        }

        res.status(200).json({
            message: "Student Updated Successfully"
        });

    });

});

// =========================
// Delete Student (Protected)
// =========================
app.delete("/student/:id", authMiddleware, (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM student WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {

            console.log(err);

            return res.status(500).json({
                message: "Error Deleting Student"
            });

        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Student Not Found"
            });

        }

        res.status(200).json({
            message: "Student Deleted Successfully"
        });

    });

});

// =========================
// Get Single Student (Protected)
// =========================
app.get("/student/:id", authMiddleware, (req, res) => {

    const { id } = req.params;

    const sql = "SELECT * FROM student WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {

            return res.status(500).json({
                message: "Error"
            });

        }

        if (result.length === 0) {

            return res.status(404).json({
                message: "Student Not Found"
            });

        }

        res.status(200).json(result[0]);

    });

});

// =========================
// Start Server
// =========================
app.listen(process.env.PORT, () => {
    console.log(`Server Running on http://localhost:${process.env.PORT}`);
});