import { useDispatch } from "react-redux"
import { dislikePostAsync, likePostAsync } from "../../features/posts/postsSlice"

const PostList = ({posts}) => {
    // Configuring useDispatch for usage
    const dispatch = useDispatch()

    // Function handle liking or disliking a post a post
    const handleLiking = (post) => {
        if (post.likes === 0) {
            dispatch(likePostAsync({postId: post._id, post}))
        } else {
            dispatch(dislikePostAsync({postId: post._id, post}))
        }
}
    
    return (
        <div>
        {posts.map(post => (
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
                        <button className="btn text-primary" onClick={() => handleLiking(post)}><i className={post.likes > 0 ? "fa-sharp fa-solid fa-heart fs-4" : "fa-sharp fa-regular fa-heart fs-4"}></i>{post.likes > 0 ? `${post.likes}` : ``}</button>
                    </div>
                    <div>
                        <button className="btn text-primary"><i className="fa-sharp fa-regular fa-comment fs-4"></i></button>
                    </div>
                    <div>
                        <button className="btn text-primary"><i className="fa-sharp fa-solid fa-arrow-up-right-from-square fs-5"></i></button>
                    </div>
                    <div>
                        <button className="btn text-primary"><i className="fa-sharp fa-regular fa-bookmark fs-5"></i></button>
                    </div>
                </div>
            </div>
        </div>
        ))}
        </div>
    )
}

export default PostList