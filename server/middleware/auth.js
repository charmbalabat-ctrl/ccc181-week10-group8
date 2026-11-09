const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    // Read the secret after .env has been loaded
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
        return res.status(500).json({
            error: "Server authentication is not configured."
        });
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: "Access denied. No token provided."
        });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer" || !parts[1]) {
        return res.status(401).json({
            error: "Invalid authorization format."
        });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            error: "Invalid or expired token."
        });
    }
}

module.exports = authenticateToken;