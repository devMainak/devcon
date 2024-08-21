const mongoose = require('mongoose')

// Defining user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "Elliot Alderson",
        required: true
    },
    username: {
        type: String,
        default: "@mrrobot",
        required: true
    },
    userImageUrl: {
        type: String,
        default: "https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y=",
    },
    profileBio: {
        type: String,
        maxlength: 100
    },
    isFollowed: {
        type: Boolean,
        default: false
    },
    following: {
        type: Number,
        default: 0
    },
    followers: {
        type: Number,
        default: 0
    },
    posts: []
})

// Creating the model
const User = mongoose.model('users', userSchema)

// Exporting the model
module.exports = User