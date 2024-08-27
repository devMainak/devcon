import { useState } from "react"
import { useDispatch } from "react-redux"
import { dislikePostAsync, likePostAsync, updatePostAsync, deletePostAsync } from "../../features/posts/postsSlice"


const PostList = ({posts}) => {
    // Configuring useDispatch for usage
    const dispatch = useDispatch()

    // Local state to handle edit mode
    const [editingPostId, setEditingPostId] = useState(null)
    const [editedContent, setEditedContent] = useState("")

    // Function to toggle edit mode
    const handleEditPost = (post) => {
        setEditingPostId(post._id);
        setEditedContent(post.content);
    }

    // Function to submit edited post
    const handleEditSubmit = async (post) => {
       try {
        if (editedContent) {
            const updatedPost = { ...post, content: editedContent }
            // Use unwrap to await the completion of the async thunk
            await dispatch(updatePostAsync({ postId: post._id, post: updatedPost })).unwrap()
             // Exit edit mode
            setEditingPostId(null)
            }
       } catch (error) {
            console.error(error)
       }
    }

    // Function to cancel edit mode
    const handleCancelEdit = () => {
        setEditingPostId(null)
        setEditedContent("")
    }

    // Function to handle delete post
    const handleDeletePost = async (postId) => {
        try {
            await dispatch(deletePostAsync(postId)).unwrap()
        } catch (error) {
            console.error(error)
        }
    }

    // Function handle liking or disliking a post a post
    const handleLiking = (post) => {
        if (post.likes === 0) {
            dispatch(likePostAsync({postId: post._id, post}))
        } else {
            dispatch(dislikePostAsync({postId: post._id, post}))
        }
}
    
    // Function to format date in the posts
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString('en-US', {
            month: 'long', // Full moth name
            day: 'numeric', // Numeric day
            hour: 'numeric', // Numeric hour
            minute: 'numeric', // Numeric minute
            hour12: true, // 12-hour format
        })
    }


    return (
        <div>
        {posts.map(post => { 
            return (
            <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex">
                    <div>
                        <img src={post.author.userImageUrl} style={{ height: '40px', width: '40px', borderRadius: '50%' }}/>
                    </div>
                    <div>
                        <div className="fw-semibold" style={{fontSize: "large", paddingLeft: "10px", paddingRight: "5px"}}>{post.author.name}{" "}<span className="text-primary fw-normal" style={{fontSize: "large"}}>{`@${post.author.username}`}</span></div>
                        <div className="card-text" style={{paddingLeft: "10px"}}>{formatDate(post.createdAt)}</div>
                    </div>   
                </div>
                {editingPostId === post._id ? (
                    <div className="fs-5 pt-3">
                        <textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            maxLength={100}
                            rows={3}
                            style={{width: "100%", borderRadius: "5px", padding: "5px", fontSize: "medium"}}
                        ></textarea>
                        <div className="d-flex justify-content-end pt-1" style={{gap: "10px"}}>
                            <button className="btn btn-sm btn-primary" onClick={() => handleEditSubmit(post)}>Save</button>
                            <button className="btn btn-sm btn-danger" onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    </div>
                ) : (
                    <div className="fs-5 pt-3" >{post.content}</div>
                )}
                {post.media.length > 0 && 
                    post.media.map((media, index) => {
                        if (media.type === "image") {
                            return (<div className="pt-3">
                                <img key={index} className="img-fluid" src={post.media[0].url} alt="Post Media" style={{maxHeight: "380px", maxWidth: "100%"}}/>
                            </div>)
                        } else if (media.type === "video") {
                            return (<div className="pt-3">
                                <video key={index} controls style={{maxHeight: "380px", maxWidth: "100%"}}>
                                    <source src={media.url} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                            </div>)
                        }
                    })
                }
                <div className="d-flex justify-content-between pt-3">
                    <div>
                        <button className="btn text-primary" onClick={() => handleLiking(post)}><i className={post.likes > 0 ? "fa-sharp fa-solid fa-heart fs-4" : "fa-sharp fa-regular fa-heart fs-4"}></i>{post.likes > 0 ? `${post.likes}` : ``}</button>
                    </div>
                    <div>
                        <button className="btn text-primary" onClick={() => handleEditPost(post)}><i className="fa-sharp fa-regular fa-pen-to-square fs-4"></i></button>
                    </div>
                    <div>
                        <button className="btn text-danger" onClick={() => handleDeletePost(post._id)}><i class="fa-sharp fa-solid fa-trash fs-5"></i></button>
                    </div>
                    <div>
                        <button className="btn text-primary"><i className="fa-sharp fa-regular fa-bookmark fs-5"></i></button>
                    </div>
                </div>
            </div>
        </div>
        )}
        )}
        </div>
    )
}

export default PostList