const express = require("express");

const app = express();

app.get("/student", (req, res) => {
    res.send("Student Page");
});

app.post("/student1", (req, res) => {
    res.send("Student Added");
});

app.listen(3002, () => {
    console.log("Server Running on http://localhost:3002");
});