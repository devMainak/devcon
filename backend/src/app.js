// src/app.js
const express = require("express");
const cors = require("cors");

// Function to initialize database connection
const initializeDatabase = require("./config/db.connection");

const app = express();

const { register, login } = require("./controller/auth.controller");

// cors config
const corsOptions = {
  origin: "*",
  credentials: true,
};

// Apply middleware
app.use(cors(corsOptions)); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON Requests

// Initialize database
initializeDatabase();

// Importing routes files
app.use("/posts", require("./routes/posts.routes"));
app.use("/users", require("./routes/users.routes"));
app.use("/bookmarks", require("./routes/bookmarks.routes"));
app.post("/register", register);
app.post("/login", login);

// Exporting the app module
module.exports = app;
