require("dotenv").config();

const mysql = require("mysql2");

const connection = mysql.createConnection({

    host: process.env.DB_HOST,

    port: 3306,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME

});

connection.connect((err) => {

    if (err) {

        console.log("Connection Failed");
        console.log(err);

        return;

    }

    console.log("✅ MySQL Connected Successfully");

});

module.exports = connection;