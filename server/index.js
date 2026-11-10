const authenticateToken = require("./middleware/auth");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing from the .env file.");
}

// Custom Request Logger Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} request made to: ${req.url}`);
    next();
});

// Middleware
app.use(express.json());

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

// Demo student account
const users = [
    {
        id: 1,
        name: "Demo Student",
        email: "student@campusconnect.test",
        passwordHash: bcrypt.hashSync("Campus26", 10)
    }
];

// Health endpoint
app.get("/api/v1/health", (req, res) => {
    return res.status(200).json({
        status: "ok"
    });
});

// Login endpoint
app.post("/api/v1/sessions", (req, res) => {
    const { email, password } = req.body || {};

    // 1. Check types (Must be text)
    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({
            error: "Invalid input types."
        });
    }

    // Simple Email Format Validation Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 2. Validate email format ("must look like an email")
    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
            error: "Invalid email format."
        });
    }

    // 3. Find the user by email (lowercase first)
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find(
        (item) => item.email.toLowerCase() === normalizedEmail
    );

    // 4. Compare credentials using bcrypt
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(401).json({
            error: "Invalid email or password."
        });
    }

    // 5. Create a token with jsonwebtoken (expires in 1 hour)
    const token = jwt.sign(
        {
            id: user.id
        },
        JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    // Return token and flat user info
    return res.status(200).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

// Protected student profile endpoint
app.get("/api/v1/users/me", authenticateToken, (req, res) => {
    const user = users.find(
        (item) => item.id === req.user.id
    );

    if (!user) {
        return res.status(401).json({
            error: "Not logged in."
        });
    }

    return res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
