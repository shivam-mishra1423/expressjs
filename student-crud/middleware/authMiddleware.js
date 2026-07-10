const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    // Authorization Header
    const authHeader = req.headers.authorization;

    // Check Header
    if (!authHeader) {

        return res.status(401).json({
            message: "Access Denied. Token Missing"
        });

    }

    // Bearer Token ye token ko recive karta hau 
    // split js method hai jo string ko array me convert karta hai 
    const token = authHeader.split(" ")[1];

    if (!token) {

        return res.status(401).json({
            message: "Invalid Token"
        });

    }

    try {


        // ye function jwt doken ko verify karta hai 
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Save Logged In User
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or Expired Token"
        });

    }

};

module.exports = authMiddleware;