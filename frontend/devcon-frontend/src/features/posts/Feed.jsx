import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  fetchPostsAsync,
  addPostAsync,
  handleSortByLikes,
  handleSortByDate,
} from "./postsSlice";
import PostList from "../../components/post/PostList";
import SideNav from "../../components/nav/SideNav";
import FollowList from "../../components/user/FollowList";

const Feed = () => {
  // Configuring useDispatch() for usage
  const dispatch = useDispatch();

  // State bindings for form data
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [fileType, setFileType] = useState("");
  const [mediaPerview, setMediaPreview] = useState("");
  const [alert, setAlert] = useState("");
  const [postButton, setPostButton] = useState("Post");

  // Fetching all posts on feed page load
  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, []);

  // Accessing posts
  const { posts, status, error, sortByLike, sortByDate } = useSelector(
    (state) => state.posts
  );

  // Accessing staticUser
  const { user } = useSelector((state) => state.staticUser);

  // Bindings for cloud file storage
  const url = "https://api.cloudinary.com/v1_1/dase6jnks/upload";
  const preset = "myCloud";

  // Handle sort by likes
  const setSortByLikes = () => {
    dispatch(handleSortByLikes());
    console.log(sortByLike);
  };

  // Handle sort by date
  const setSortByDate = (e) => {
    dispatch(handleSortByDate(e.target.value));
  };

  // Handle files
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setMediaPreview(URL.createObjectURL(file));
      if (file.type.startsWith("image/")) {
        setFileType("image");
      } else if (file.type.startsWith("video/")) {
        setFileType("video");
      }
    }
  };

  // Creating a post
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setPostButton("Posting");
    const formData = new FormData();
    formData.append("file", media);
    formData.append("upload_preset", preset);
    try {
      if (media) {
        const res = await axios.post(url, formData);
        const mediaUrl = res.data.secure_url;
        if (content && mediaUrl && fileType && user) {
          const post = {
            author: {
              name: user.name,
              username: user.username,
              userImageUrl: user.userImageUrl,
            },
            content,
            media: [{ url: mediaUrl, type: fileType }],
          };
          const resultAction = await dispatch(addPostAsync(post));
          if (addPostAsync.fulfilled.match(resultAction)) {
            setPostButton("Post");
            // Clearing the form
            setContent("");
            setMedia(null);
            setFileType("");
            // Making the alert
            setAlert("Posted!");
            setTimeout(() => {
              setAlert("");
            }, 2000);
          }
        } else {
          setPostButton("Post");
          setAlert("Failed to post.");
          setTimeout(() => {
            setAlert("");
          }, 2000);
        }
      } else {
        if (content && user) {
          const post = {
            author: {
              name: user.name,
              username: user.username,
              userImageUrl: user.userImageUrl,
            },
            content,
          };
          const resultAction = await dispatch(addPostAsync(post));
          if (addPostAsync.fulfilled.match(resultAction)) {
            setPostButton("Post");
            // Clearing the form
            setContent("");
            setMedia(null);
            setFileType("");
            // Making the alert
            setAlert("Posted!");
            setTimeout(() => {
              setAlert("");
            }, 2000);
          }
        } else {
          setPostButton("Post");
          setAlert("Failed to post.");
          setTimeout(() => {
            setAlert("");
          }, 2000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Creating a copy of posts
  const postsToShow = [...posts];

  // Sorted posts by user or user's following
  const userAndFollowingPosts = postsToShow.filter(post => {
    if (post.author.username === user.username || user.following.includes(post.author.username)) {
        return post
    }
  })

  // Sorted posts by likes
  const sortedPostsByLikes =
  sortByLike === "Most Liked"
    ? userAndFollowingPosts.sort((a, b) => b.likes - a.likes)
    : userAndFollowingPosts.sort((a, b) => a.likes - b.likes);

  // Sorted posts by date
  const sortedPostsByDate =
    sortByDate && sortByDate === "recent"
      ? sortedPostsByLikes.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      : sortedPostsByLikes.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

  return (
    <>
      <header>
        <div
          className="d-flex justify-content-start"
          style={{
            minWidth: "4in",
            minHeight: "100vh",
            position: "fixed",
            borderRight: "5px solid #0197f6",
          }}
        >
          <SideNav />
        </div>
      </header>
      <main className="bg-dark-subtle" style={{ minHeight: "100vh" }}>
        <div
          className="d-flex"
          style={{
            paddingRight: "0.5in",
            gap: "1in",
            overflowWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          <div
            id="createPostBox"
            className="justify-content-center"
            style={{ width: "35vw", marginTop: "30px", marginLeft: "7in" }}
          >
            <div className="fs-3 fw-semibold">Create a post</div>
            <div className="card my-2 py-3">
              <div className="d-flex px-3" style={{ gap: "10px" }}>
                <div className="flex-grow-1 w-100">
                  <form onSubmit={handlePostSubmit}>
                    <textarea
                      className="bg-body-secondary p-2"
                      onChange={(e) => setContent(e.target.value)}
                      value={content}
                      style={{ width: "100%", borderRadius: "5px" }}
                      maxLength={100}
                      rows={4}
                      placeholder="Share something..."
                    ></textarea>
                    {mediaPerview && (
                      <div className="py-3">
                        {fileType === "image" && (
                          <img
                            src={mediaPerview}
                            alt="Preview"
                            style={{ maxHeight: "250px", minWidth: "100%" }}
                          />
                        )}
                        {fileType === "video" && (
                          <video
                            controls
                            style={{ maxHeight: "250px", minWidth: "100%" }}
                          >
                            <source src={mediaPerview} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    )}
                    <div
                      className="d-flex justify-content-between"
                      style={{ gap: "10px" }}
                    >
                      <div>
                        <label htmlFor="fileInput">
                          <i
                            className="fa-sharp fa-solid fa-camera-retro fs-5"
                            style={{ cursor: "pointer" }}
                          ></i>
                          <span className="px-2">Upload Image/Video</span>
                        </label>
                        <input
                          onChange={handleFileChange}
                          id="fileInput"
                          accept="image/*,video/*"
                          type="file"
                          style={{ display: "none" }}
                        />
                      </div>
                      <div>
                        <button
                          className="btn btn-primary"
                          disabled={postButton !== "Post" ? true : false}
                          type="submit"
                        >
                          {postButton}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {alert && (
              <div
                className={`alert alert-${
                  alert === "Posted!" ? "success" : "danger"
                }`}
                role="alert"
              >
                {alert}
              </div>
            )}

            <h5 className="display-5 fw-semibold">Your Feed</h5>
            {status === "loading" && (
              <div className="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
            {error && <p className="fs-4 fw-semibold text-center">{error}</p>}
            {posts && posts.length > 0 ? (
              <div>
                <div className="d-flex pb-3" style={{ gap: "10px" }}>
                  <button
                    className="btn btn-light text-primary fw-semibold"
                    onClick={() => setSortByLikes()}
                  >
                    {sortByLike}
                  </button>
                  <select
                    className="form-select text-primary fw-semibold"
                    onChange={(e) => setSortByDate(e)}
                    style={{ maxWidth: "1.5in", minWidth: "1.5in" }}
                  >
                    <option value="">Sort by date</option>
                    <option value="recent">Recent Posts</option>
                    <option value="old">Old Posts</option>
                  </select>
                </div>
                <PostList posts={sortedPostsByDate} user={user} />
              </div>
            ) : (
              <p className="fs-4 fw-semibold text-center">No posts found.</p>
            )}
          </div>
          <div
            className="justify-content-end"
            style={{
              width: "20vw",
              marginTop: "30px",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            <FollowList />
          </div>
        </div>
      </main>
    </>
  );
};

export default Feed;
