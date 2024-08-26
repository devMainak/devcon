import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Header from "../../components/Header"
import { useEffect } from "react"
import { fetchPostsAsync, addPostAsync ,handleSortByLikes, handleSortByDate } from "./postsSlice"
import { fetchUsersAsync } from "../users/usersSlice"
import PostList from "../../components/post/PostList"
import SideNav from "../../components/nav/SideNav"
import FollowList from "../../components/user/FollowList"

const Feed = () => {
    // Configuring useDispatch() for usage
    const dispatch = useDispatch()
    
    // Fetching all posts on feed page load
    useEffect(() => {
        dispatch(fetchPostsAsync())
        dispatch(fetchUsersAsync())
    }, [])
    
    // Accessing posts
    const { posts, sortByLike, sortByDate } = useSelector(state => state.posts)
    
    // Accessing users
    const { users } = useSelector(state => state.users)

     // Handle sort by likes
     const setSortByLikes = () => {
        dispatch(handleSortByLikes())
        console.log(sortByLike)
    }

    // Handle sort by date
    const setSortByDate = (e) => {
        dispatch(handleSortByDate(e.target.value))
    }

    // Creating a post
    const handlePostSubmit = async (e) => {
        e.preventDefault()
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
            <main className="bg-primary-subtle" style={{minHeight:"100vh"}}>
                <div className="d-flex pt-4 justify-content-around" style={{paddingLeft: "1in", paddingRight: "1in", gap: "1in", whiteSpace: 'nowrap'}}>
                    <div style={{flex: "1 1 20vw"}}>
                        <SideNav/>
                    </div>
                    <div style={{flex: "2 1 40vw"}}>
                            <div className="card py-3">
                                <div className="d-flex px-3" style={{gap: "10px"}}>
                                        <div>
                                        <img src="https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y=" style={{ height: '40px', width: '40px', borderRadius: '50%' }}/>
                                        </div>
                                        <div className="flex-grow-1 w-100">
                                            <form>
                                                <textarea className="bg-body-secondary p-2" style={{width: '100%', borderRadius: "5px"}} rows={4} placeholder="Share something..."></textarea>
                                                <div className="d-flex justify-content-between" style={{gap: "10px"}}>
                                                    <div>
                                                        <label htmlFor="fileInput">
                                                            <i className="fa-sharp fa-solid fa-camera-retro fs-5" style={{cursor: "pointer"}}></i>
                                                            <span className="px-2">Upload Image/Video</span>
                                                        </label>
                                                        <input id="fileInput" accept="image/*,video/*" type="file" style={{display: "none"}}/>
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