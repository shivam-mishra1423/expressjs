const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("All Students");
});

router.get("/:id", (req, res) => {
    res.send("Student ID: " + req.params.id);
});

router.post("/", (req, res) => {
    res.send("Student Added");
});

module.exports = router;