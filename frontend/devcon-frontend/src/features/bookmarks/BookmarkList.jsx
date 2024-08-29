import { useDispatch } from "react-redux";
import { removeBookmarkAsync } from "./bookmarksSlice";
import { unmarkAsBookmarked } from "../posts/postsSlice";

const BookmarkList = ({ bookmarks }) => {
    // Configuring useDispatch request
    const dispatch = useDispatch()

    // Function to remove bookmark
  const handleBookmarkRemove = async (postId) => {
    
    try {
      const resultAction = await dispatch(
        removeBookmarkAsync(postId)
      ).unwrap();
      if (removeBookmarkAsync.fulfilled.match(resultAction)) {
        dispatch(unmarkAsBookmarked(postId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Function to format date in the posts
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "long", // Full month name
      day: "numeric", // Numeric day
      hour: "numeric", // Numeric hour
      minute: "numeric", // Numeric minute
      hour12: true, // 12-hour format
    });
  };

  return (
    <div>
      {bookmarks.map((post) => {
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
                <div
                  className="text-danger ms-auto fs-5"
                  onClick={() => handleBookmarkRemove(post._id)}
                  style={{ cursor: "pointer" }}
                >
                  <i className="fa-sharp fa-solid fa-trash"></i>
                </div>
              </div>
              <div className="fs-5 pt-3 px-2">{post.content}</div>
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
                          style={{ maxHeight: "380px", maxWidth: "100%" }}
                        >
                          <source src={media.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookmarkList;
