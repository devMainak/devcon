require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const initializeDatabase = require('./db/db.connection')

// Initializing DB connection
initializeDatabase()

// Define a route
app.get('/', (req, res) => {
    res.send("Hello, Express!")
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})