import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Header from "../../components/Header"
import { useEffect } from "react"
import { fetchPostsAsync } from "./postsSlice"
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
    const { posts } = useSelector(state => state.posts)
    // Accessing users
    const { users } = useSelector(state => state.users)

    

    return (
        <>
            <Header/>
            <main className="bg-primary-subtle" style={{minHeight:"100vh"}}>
                <div className="d-flex pt-4 justify-content-around" style={{paddingLeft: "1in", paddingRight: "1in", gap: "1in", whiteSpace: 'nowrap'}}>
                    <div style={{flex: "1 1 20vw"}}>
                        <SideNav/>
                    </div>
                    <div style={{flex: "2 1 40vw"}}>
                        <PostList posts={posts} />
                    </div>
                    <div style={{flex: "1 1 25vw"}}>
                        <FollowList users={users}/>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Feed