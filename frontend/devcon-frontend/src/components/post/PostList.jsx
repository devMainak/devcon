import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  dislikePostAsync,
  likePostAsync,
  updatePostAsync,
  deletePostAsync,
  markAsBookmarked,
  unmarkAsBookmarked,
} from "../../features/posts/postsSlice";
import {
  addBookmarkAsync,
  fetchBookmarkAsync,
  removeBookmarkAsync,
} from "../../features/bookmarks/bookmarksSlice";

const PostList = ({ posts, user }) => {
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookmarkAsync());
  }, []);

  const handleEditPost = (post) => {
    setEditingPostId(post._id);
    setEditedContent(post.content);
  };

  const handleEditSubmit = async (post) => {
    try {
      if (editedContent) {
        const updatedPost = { ...post, content: editedContent };
        // Use unwrap to await the completion of the async thunk
        await dispatch(
          updatePostAsync({ postId: post._id, post: updatedPost })
        ).unwrap();
        setEditingPostId(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditedContent("");
  };

  const handleDeletePost = async (postId) => {
    try {
      await dispatch(deletePostAsync(postId)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLiking = (post) => {
    if (!post.likes.includes(user._id)) {
      dispatch(likePostAsync({ postId: post._id, user }));
    } else {
      dispatch(dislikePostAsync({ postId: post._id, user }));
    }
  };

  const handleBookmarkAdd = async (post) => {
    try {
      const postId = post._id;
      const userId = user._id;
      const resultAction = await dispatch(addBookmarkAsync({ postId, userId }));
      if (addBookmarkAsync.fulfilled.match(resultAction)) {
        dispatch(markAsBookmarked({ postId, userId }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookmarkRemove = async (postId) => {
    try {
      const userId = user._id;
      const resultAction = await dispatch(
        removeBookmarkAsync({ postId, userId })
      );
      if (removeBookmarkAsync.fulfilled.match(resultAction)) {
        dispatch(unmarkAsBookmarked({ postId, userId }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookmarkClick = (post) => {
    if (!post.bookmarks.includes(user._id)) {
      handleBookmarkAdd(post);
    } else {
      handleBookmarkRemove(post._id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div>
      {posts.map((post) => {
        return (
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex">
                <div>
                  <img
                    src={post.author.userImageUrl}
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div>
                  <div
                    className="fw-semibold"
                    style={{
                      fontSize: "large",
                      paddingLeft: "10px",
                      paddingRight: "5px",
                    }}
                  >
                    {post.author.name}{" "}
                    <span
                      className="text-primary fw-normal"
                      style={{ fontSize: "large" }}
                    >{`@${post.author.username}`}</span>
                  </div>
                  <div className="card-text" style={{ paddingLeft: "10px" }}>
                    {formatDate(post.createdAt)}
                  </div>
                </div>
              </div>
              {editingPostId === post._id ? (
                <div className="fs-5 pt-3">
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    maxLength={100}
                    rows={3}
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      padding: "5px",
                      fontSize: "medium",
                    }}
                  ></textarea>
                  <div
                    className="d-flex justify-content-end pt-1"
                    style={{ gap: "10px" }}
                  >
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEditSubmit(post)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="fs-5 pt-3 px-2">{post.content}</div>
              )}
              {post.media.length > 0 &&
                post.media.map((media, index) => {
                  if (media.type === "image") {
                    return (
                      <div className="pt-3">
                        <img
                          key={index}
                          className="img-fluid"
                          src={post.media[0].url}
                          alt="Post Media"
                          style={{ maxHeight: "380px", width: "100%" }}
                        />
                      </div>
                    );
                  } else if (media.type === "video") {
                    return (
                      <div className="pt-3">
                        <video
                          key={index}
                          controls
                          style={{ maxHeight: "380px", width: "100%" }}
                        >
                          <source src={media.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    );
                  }
                })}
              <div className="d-flex justify-content-between pt-3 px-4">
                <div>
                  <button
                    className="btn text-primary"
                    onClick={() => handleLiking(post)}
                  >
                    <i
                      className={
                        post.likes.includes(user._id)
                          ? "fa-sharp fa-solid fa-heart fs-4"
                          : "fa-sharp fa-regular fa-heart fs-4"
                      }
                    ></i>{" "}
                    {post.likes.length > 0 ? (
                      <span className="fs-4">{post.likes.length}</span>
                    ) : (
                      ``
                    )}
                  </button>
                </div>
                <div>
                  {post.author.username === user.username && (
                    <button
                      className="btn text-primary"
                      onClick={() => handleEditPost(post)}
                    >
                      <i className="fa-sharp fa-regular fa-pen-to-square fs-4"></i>
                    </button>
                  )}
                </div>
                <div>
                  {post.author.username === user.username && (
                    <button
                      className="btn text-danger"
                      onClick={() => handleDeletePost(post._id)}
                    >
                      <i className="fa-sharp fa-solid fa-trash fs-5"></i>
                    </button>
                  )}
                </div>
                <div>
                  <button
                    className="btn text-primary"
                    onClick={() => handleBookmarkClick(post)}
                  >
                    <i
                      className={
                        post.bookmarks.includes(user._id)
                          ? "fa-sharp fa-solid fa-bookmark fs-5"
                          : "fa-sharp fa-regular fa-bookmark fs-5"
                      }
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
