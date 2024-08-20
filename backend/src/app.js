// src/app.js

const express = require('express')
// For enabling CORS
const cors = require('cors')

// Function to initialize database connection
const initializeDatabase = require('./config/db.connection')

const app = express()

// cors config
const corsOptions = {
    origin: "*",
    credentials: true
  }

// Initialize database
initializeDatabase()

// Apply middleware
app.use(cors(corsOptions)) // Enable CORS for all routes
app.use(express.json()) // Parse incoming JSON Requests


// Define routes
app.get('/', (req, res) => {
    res.send("Hello, Express!")
})

module.exports = app