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

//Middleware
app.use(express.json());

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
    );

    //Demo student account
    const users = [
        {
            id: 1,
            name: "Demo Student",
            email: "student@campusconnect.test",
            passwordHash: bcrypt.hashSync("Campus26",10)
        }
    ];

    // Health endpoint
    app.get("/api/v1/health", (req, res) => {
        return res.status(200).json({
            status: "ok"
        });
    });

    // Login endpoint
    app.post("/api/v1/sessions", (req,res) => {
        const { email, password } = req.body || {};

        // Check required fields
        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                error: "Email and password are required."
            });

        }

        //Find the user
        const normalizedEmail = email.trim().toLowerCase();

        const user = users.find(
            (item) => item.email.toLowerCase() === normalizedEmail
            );

            // Check email and password
            if(!user || !bcrypt.compareSync(password, user.passwordHash)) {
                return res.status(401).json({
                    error: "Invalid email or password."
                });
            }

            //Generate JWT token
            const token= jwt.sign(
                {
                    id: user.id
                },
                JWT_SECRET,
                {
                    expiresIn: "1h"
                }
                );

                // Return successful login response
                return res.status(200).json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email}
                    });
                });

                // Protected student profile endpoint
                app.get("/api/v1/users/me", authenticateToken, (req, res) => {
                // Find the authenticated user
                    const user = users.find(
                        (item) => item.id === req.user.id
                );

                // Check if the user exists
                    if (!user) {
                        return res.status(404).json({
                            error: "User not found."
                        });
                    }

                // Return the user's profile
                    return res.status(200).json({
                        user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                        }
                    });
                }); 

                // Start the server
                app.listen(PORT, () => {
                    console.log(`API running on http://localhost:${PORT}`);
                });