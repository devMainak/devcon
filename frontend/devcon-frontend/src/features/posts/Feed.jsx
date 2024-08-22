import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Header from "../../components/Header"
import { useEffect } from "react"
import { fetchPostsAsync } from "./postsSlice"

const Feed = () => {
    // Configuring useDispatch() for usage
    const dispatch = useDispatch()
   
    // Fetching all posts on feed page load
    useEffect(() => {
        dispatch(fetchPostsAsync())
    }, [])
    
    // Accessing posts
    const { posts } = useSelector(state => state.posts)
    console.log(posts)
    return (
        <>
            <Header/>
            <main className="bg-primary-subtle" style={{minHeight:"100vh"}}>
                <div className="d-flex px-5 pt-4 justify-content-around">
                    <div style={{minWidth: "15vw"}}>
                        <ul className="list-group">
                            <li className="list-group-item py-3"><Link className="fs-5" style={{textDecoration: "none"}}><i className="fa-solid fa-house-user px-3"></i> Home Feed</Link></li>
                            <li className="list-group-item py-3"><Link className="fs-5" style={{textDecoration: "none"}}><i className="fa-solid fa-bolt px-3"></i> Explore</Link></li>
                            <li className="list-group-item py-3"><Link className="fs-5" style={{textDecoration: "none"}}><i className="fa-sharp fa-solid fa-bookmark px-3"></i> Bookmarks</Link></li>
                            <li className="list-group-item py-3"><Link className="fs-5" style={{textDecoration: "none"}}><i className="fa-solid fa-user px-3"></i> Profile</Link></li>
                        </ul>
                        <Link className="btn btn-primary mt-3 w-100 fs-5">+ Create Post</Link>
                    </div>
                    <div style={{minWidth: "40vw"}}>
                        { posts.map(post => (
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <div>
                                            <img src={post.author.userImageUrl} style={{ height: '36px', borderRadius: "45%" }}/>
                                        </div>
                                        <div className="fs-5" style={{paddingLeft: "1rem"}}>{post.author.name}</div>
                                        <div className="fs-5 text-primary px-2">@mrrobot</div>    
                                    </div>
                                    <div className="fs-5" style={{paddingLeft: "3.9rem", paddingRight: "4rem"}}>{post.content}</div>
                                    
                                    <div className="d-flex justify-content-between pt-3" style={{paddingLeft: "3.9rem", paddingRight: "4rem"}}>
                                        <div>
                                            <button className="btn"><i className={post.likes > 0 ? "fa-sharp fa-solid fa-heart fs-4" : "fa-sharp fa-regular fa-heart fs-4"}></i>{post.likes > 0 ? `${post.likes}` : ``}</button>
                                        </div>
                                        <div>
                                            <button className="btn"><i className="fa-sharp fa-regular fa-comment fs-4"></i></button>
                                        </div>
                                        <div>
                                            <button className="btn"><i className="fa-sharp fa-solid fa-arrow-up-right-from-square fs-5"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) }
                    </div>
                    <div style={{minWidth: "15vw"}}>
                        <div className="card">
                            <div className="card-body">
                                <p>Find Devs</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Feed