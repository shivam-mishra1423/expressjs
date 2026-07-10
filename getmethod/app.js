const express = require("express");

const app = express();

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Home Page");
});

// About Route
app.get("/about", (req, res) => {
    res.send("Welcome to About Page");
});

// Contact Route
app.get("/contact", (req, res) => {
    res.send("Welcome to Contact Page");
});

// Student Route
app.get("/student", (req, res) => {
    res.send("Student Details");
});

// Employee Route
app.get("/employee", (req, res) => {
    res.send("Employee Details");
});

// Product Route
app.get("/product", (req, res) => {
    res.send("Product List");
});

// Login Route
app.get("/login", (req, res) => {
    res.send("Login Page");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});