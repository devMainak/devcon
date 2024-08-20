const mongoose = require('mongoose')

// Accessing mongoDB string
const mongoURI = process.env.MONGODB

// Function for connecting database
const initializeDatabase = async () => {
    try {
        const connection = await mongoose.connect(mongoURI)
        if (connection) {
            console.log("Connected Successfully.")
        } else {
            console.log("Failed to connect to Database.")
        }
    } catch (error) {
        throw error
    }
}

// Exporting the function
module.exports = initializeDatabase