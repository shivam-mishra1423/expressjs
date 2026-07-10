const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// ==========================
// Test Route
// ==========================
router.get("/", (req, res) => {
    res.send("Authentication Route Working");
});

// ==========================
// Register User
// ==========================
router.post("/register", async(req, res) => {

    const { username, email, password } = req.body;

    try {

        const checkSql = "SELECT * FROM users WHERE email = ?";

        db.query(checkSql, [email], async(err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    message: "Email Already Exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertSql = `
                INSERT INTO users(username, email, password)
                VALUES (?, ?, ?)
            `;

            db.query(insertSql, [username, email, hashedPassword], (err) => {

                if (err) {
                    return res.status(500).json({
                        message: "Registration Failed"
                    });
                }

                res.status(201).json({
                    message: "User Registered Successfully"
                });

            });

        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});

// ==========================
// Login User
// ==========================
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async(err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        // ye token generate karega or browser isko store karke rakhega
        // ye sing function hai  
        //1 h means 1h baad ye token expire ho jiye 
        const token = jwt.sign({
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET, {
                expiresIn: "1h"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token: token
        });

    });

});

module.exports = router;