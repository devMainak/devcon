import { createSlice } from "@reduxjs/toolkit";

// Inital state of static user
export const staticUserSlice = createSlice({
    name: "staticUser",
    initialState: {
        user: {
            name: "Eliott Alderson",
            username: "mrrobot",
            userImageUrl: "https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y=",
            profileBio: "Are you an One or a Zero?",
            following: 0,
            followers: 0
        }
    },
    reducers: {}
})

// Exporting default reducers
export default staticUserSlice.reducer