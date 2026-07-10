const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SIGNUP
const signup = async(req, res) => {
    const { name, email, password } = req.body;

    const checkSql = "SELECT * FROM users WHERE email=?";

    db.query(checkSql, [email], async(err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length > 0) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const insertSql =
            "INSERT INTO users(name,email,password) VALUES(?,?,?)";

        db.query(
            insertSql, [name, email, hashPassword],
            (err, result) => {
                if (err) {
                    return res.status(500).json(err);
                }

                res.status(201).json({
                    message: "Signup Successful"
                });
            }
        );
    });
};

// LOGIN
const login = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=?";

    db.query(sql, [email], async(err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign({
                id: user.id,
                email: user.email
            },
            "mysecretkey", {
                expiresIn: "1h"
            }
        );

        res.json({
            message: "Login Successful",
            token
        });
    });
};

// LOGOUT
const logout = (req, res) => {
    res.json({
        message: "Logout Successful"
    });
};

module.exports = {
    signup,
    login,
    logout
};