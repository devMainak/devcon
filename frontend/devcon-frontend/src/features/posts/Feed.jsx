import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Header from "../../components/Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { fetchPostsAsync, addPostAsync ,handleSortByLikes, handleSortByDate } from "./postsSlice"
import { fetchUsersAsync } from "../users/usersSlice"
import PostList from "../../components/post/PostList"
import SideNav from "../../components/nav/SideNav"
import FollowList from "../../components/user/FollowList"

const Feed = () => {
    // Configuring useDispatch() for usage
    const dispatch = useDispatch()
    
    // State bindings for form data
    const [content, setContent] = useState("")
    const [media, setMedia] = useState(null)
    const [fileType, setFileType] = useState("")
    const [mediaPerview, setMediaPreview] = useState("")
    const [alert, setAlert] = useState("")

    // Fetching all posts on feed page load
    useEffect(() => {
        dispatch(fetchPostsAsync())
        dispatch(fetchUsersAsync())
    }, [])
    
    // Accessing posts
    const { posts, sortByLike, sortByDate } = useSelector(state => state.posts)
    
    // Accessing users
    const { users } = useSelector(state => state.users)

    // Accessing staticUser
    const { user } = useSelector(state => state.staticUser)

    // Bindings for cloud file storage
    const url = "https://api.cloudinary.com/v1_1/dase6jnks/upload"
    const preset = "myCloud"

     // Handle sort by likes
     const setSortByLikes = () => {
        dispatch(handleSortByLikes())
        console.log(sortByLike)
    }

    // Handle sort by date
    const setSortByDate = (e) => {
        dispatch(handleSortByDate(e.target.value))
    }

    // Handle files
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setMedia(file)
            setMediaPreview(URL.createObjectURL(file))
            if (file.type.startsWith('image/')) {
                setFileType("image")
            } else if (file.type.startsWith('video/')) {
                setFileType("video")
            }
        }
    }

    // Creating a post
    const handlePostSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', media)
        formData.append('upload_preset', preset)
        try {
            if (media) {
                const res = await axios.post(url, formData)
                const mediaUrl = res.data.secure_url
                if (content && mediaUrl && fileType && user) {
                    
                    const post = {
                        author: {
                            name: user.name,
                            username: user.username,
                            userImageUrl: user.userImageUrl
                        },
                        content,
                        media: [{url: mediaUrl, type: fileType}]
                    }
                    const resultAction = await dispatch(addPostAsync(post))
                    if (addPostAsync.fulfilled.match(resultAction)) {
                        console.log("Posted!")
                        // setAlert("Posted!")
                        // setTimeout(() => {
                        // setAlert("")
                        // }, 2000)
                    } 
                    
                } else {
                    console.log("Failed to post.")
                    // setAlert("Failed to post.")
                    // setTimeout(() => {
                    // setAlert("")
                    // }, 2000)
                }
            } else {
                if (content && user) {
                    const post = {
                        author: {
                            name: user.name,
                            username: user.username,
                            userImageUrl: user.userImageUrl
                        },
                        content
                    }
                    const resultAction = await dispatch(addPostAsync(post))
                    if (addPostAsync.fulfilled.match(resultAction)) {
                        console.log("Posted!")
                        // setAlert("Posted!")
                        // setTimeout(() => {
                        // setAlert("")
                        // }, 2000)
                    } 
                } else {
                    console.log("Failed to post.")
                    // setAlert("Failed to post.")
                    // setTimeout(() => {
                    //     setAlert("")
                    //     }, 2000)
                }
            }
            
        } catch (error) {
            console.error(error)
        }
    }

    // Creating a copy of posts
    const postsToShow = [...posts]

    // Sorted posts by likes
    const sortedPostsByLikes = sortByLike === "Most Liked"
    ? postsToShow.sort((a, b) => a.likes - b.likes)
    : postsToShow.sort((a, b) => b.likes - a.likes);
    
    // Sorted posts by date
    const sortedPostsByDate = sortByDate && sortByDate === "recent" ? sortedPostsByLikes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : sortedPostsByLikes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

    return (
        <>
            <Header/>
            <main className="bg-dark-subtle" style={{minHeight:"100vh"}}>
                <div className="d-flex pt-4 justify-content-around" style={{paddingLeft: "1in", paddingRight: "1in", gap: "1in", whiteSpace: 'nowrap'}}>
                    <div style={{flex: "1 1 20vw"}}>
                        <SideNav/>
                    </div>
                    <div style={{flex: "2 1 35vw"}}>
                            <div className="card py-3">
                                <div className="d-flex px-3" style={{gap: "10px"}}>
                                        <div className="flex-grow-1 w-100">
                                            <form onSubmit={handlePostSubmit}>
                                                <textarea className="bg-body-secondary p-2" onChange={(e) => setContent(e.target.value)} style={{width: '100%', borderRadius: "5px"}} maxLength={100} rows={4} placeholder="Share something..."></textarea>
                                                {mediaPerview && (
                                                    <div className="py-3">
                                                        {fileType === "image" && (
                                                            <img src={mediaPerview} alt="Preview" style={{ maxHeight: "250px", minWidth: '100%' }} />
                                                        )}
                                                        {fileType === "video" && (
                                                            <video controls style={{ maxHeight: "250px", minWidth: '100%' }}>
                                                                <source src={mediaPerview} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        )}                             
                                                    </div>
                                                )}
                                                <div className="d-flex justify-content-between" style={{gap: "10px"}}>
                                                    <div>
                                                        <label htmlFor="fileInput">
                                                            <i className="fa-sharp fa-solid fa-camera-retro fs-5" style={{cursor: "pointer"}}></i>
                                                            <span className="px-2">Upload Image/Video</span>
                                                        </label>
                                                        <input onChange={handleFileChange} id="fileInput" accept="image/*,video/*" type="file" style={{display: "none"}}/>
                                                    </div>
                                                    <div>
                                                        <button className="btn btn-primary" type="submit">Post</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                </div>
                            </div>
                            <h5 className="display-5 fw-semibold">Your Feed</h5> 
                                <div className="d-flex pb-3" style={{gap: "10px"}}>
                                    <button className="btn btn-light text-primary" onClick={() => setSortByLikes()}>{sortByLike}</button>
                                    <select className="form-select text-primary" onChange={(e) => setSortByDate(e)} style={{maxWidth: "1.5in", minWidth: "1.5in"}}>
                                        <option value="">Sort by date</option>
                                        <option value="recent">Recent Posts</option>
                                        <option value="old">Old Posts</option>
                                    </select>
                                </div>
                        <PostList posts={sortedPostsByDate} />
                    </div>
                    <div style={{flex: "1 1 20vw"}}>
                        <FollowList users={users}/>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Feed