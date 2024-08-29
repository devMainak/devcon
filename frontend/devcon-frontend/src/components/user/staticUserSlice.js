import { createSlice } from "@reduxjs/toolkit";

// Inital state of static user
export const staticUserSlice = createSlice({
    name: "staticUser",
    initialState: {
        user: {
            name: "Elliot Alderson",
            username: "mrrobot",
            userImageUrl: "https://i.pinimg.com/564x/5c/13/28/5c132893d1aff7bc10e2489a22d3ac8e.jpg",
            userImageAvatars: [
                {
                    id: 1,
                    url: "https://i.pinimg.com/564x/6c/00/ba/6c00bae75be1f3ce284eb647ca7d3cf3.jpg"
                },
                {
                    id: 2,
                    url: "https://i.pinimg.com/564x/eb/f4/23/ebf42327ff1ece8ea0e95e94314bd76a.jpg"
                },
                {
                    id: 3,
                    url: "https://i.pinimg.com/564x/fc/63/a6/fc63a64c7c05412e9c51cc4ee4be12a1.jpg"
                },
                {
                    id: 4,
                    url: "https://i.pinimg.com/564x/e1/a8/0b/e1a80b393c40c441c26433150f121cd8.jpg"
                },
                {
                    id: 5,
                    url: "https://i.pinimg.com/564x/f3/33/87/f333877bbfd1abfb7a345e571f0d4b9c.jpg"
                },
                {
                    id: 6,
                    url: "https://i.pinimg.com/564x/03/14/ee/0314ee84a32d506d4fd9d7af46cc6bbd.jpg"
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