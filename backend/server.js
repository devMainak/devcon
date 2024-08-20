// server.js

// Load enviroment variables from .env file
require('dotenv').config()

const http = require('http')
// Import the Express app
const app = require('./src/app')
const { error } = require('console')
// Use the port from .env or default to 3000
const PORT = process.env.PORT || 3000

// Create HTTP server
const server = http.createServer(app)

// Listen on the provided port, on all network interfaces
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})

// Handle server errors
server.on('error', (error) => {
    console.error('Server encountered an error:', error)
    process.exit(1)
})