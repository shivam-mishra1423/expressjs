const express = require("express");

const app = express();

const db = require("./config/db");

app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);

app.listen(3000, () => {
    console.log("Server Started on Port 3000");
});