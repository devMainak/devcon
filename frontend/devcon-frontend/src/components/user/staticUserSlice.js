import { createSlice } from "@reduxjs/toolkit";

// Inital state of static user
export const staticUserSlice = createSlice({
    name: "staticUser",
    initialState: {
        user: {
            name: "Elliot Alderson",
            username: "mrrobot",
            userImageUrl: "https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y=",
            userImageAvatars: [
                {
                    id: 1,
                    url: "https://i.pinimg.com/564x/e3/fc/71/e3fc715b352f6b606cc31d5329cc1737.jpg"
                },
                {
                    id: 2,
                    url: "https://i.pinimg.com/564x/68/e7/60/68e760fd6fb9e79a8460a16f446411b2.jpg"
                },
                {
                    id: 3,
                    url: "https://i.pinimg.com/564x/21/2a/4b/212a4bf2b1b3c8e6d104c899323c7437.jpg"
                },
                {
                    id: 4,
                    url: "https://i.pinimg.com/564x/a1/4d/24/a14d2497f060e2937b8778797a294103.jpg"
                },
                {
                    id: 5,
                    url: "https://i.pinimg.com/564x/4a/97/13/4a9713120af046efc922f500f28f707e.jpg"
                },
                {
                    id: 6,
                    url: "https://i.pinimg.com/564x/58/bb/d0/58bbd0dc01ba27609a19730938ef23c5.jpg"
                }
            ],
            profileBio: "Are you an One or a Zero?",
            following: 0,
            followers: 0
        }
    },
    reducers: {
        saveProfileData: (state, action) => {
            state.user = {...state.user, profileBio: action.payload.profileBio, userImageUrl: action.payload.userImageUrl}
        }
    }
})

// Exporting action creator functions
export const { saveProfileData } = staticUserSlice.actions

// Exporting default reducers
export default staticUserSlice.reducer