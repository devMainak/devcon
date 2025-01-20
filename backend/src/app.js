// src/app.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Function to initialize database connection
const initializeDatabase = require("./config/db.connection");

const app = express();

// cors config
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "https://devconweb.vercel.app",
      "http://localhost:5173",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

// Apply middleware
app.use(cors(corsOptions)); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON Requests
app.use(cookieParser());

// Initialize database
initializeDatabase();

// Importing routes files
app.use("/posts", require("./routes/posts.routes"));
app.use("/users", require("./routes/users.routes"));
app.use("/bookmarks", require("./routes/bookmarks.routes"));
app.use("/auth", require("./routes/auth.routes"));

// Exporting the app module
module.exports = app;
