const express = require("express");

const app = express();

// Home Route
app.get("/", (req, res) => {
    res.send("Home Page");
});

// About Route
app.get("/about", (req, res) => {
    res.send("About Page");
});

// Contact Route
app.get("/contact", (req, res) => {
    res.send("Contact Page");
});

// Student Route
app.get("/student", (req, res) => {
    res.send("Student Page");
});

// Server Start
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});