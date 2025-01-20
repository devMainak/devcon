import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPostsAsync, handleSortByDate } from "./postsSlice";
import PostList from "../../components/post/PostList";
import CreatePost from "../../components/post/CreatePost";

const Feed = () => {
  const [showTrending, setShowTrending] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, []);

  const { posts, status, error, sortByDate } = useSelector(
    (state) => state.posts
  );

  const { user } = useSelector((state) => state.auth);

  const setSortByDate = (e) => {
    setShowTrending(false);
    dispatch(handleSortByDate(e.target.value));
  };

  const postsToShow = [...posts];

  const userAndFollowingPosts = postsToShow.filter((post) => {
    if (
      post.author._id === user._id ||
      user.following.includes(post.author._id)
    ) {
      return post;
    }
  });

  const sortedPostsByLikes = showTrending
    ? [...userAndFollowingPosts].sort(
        (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
      )
    : [];

  const sortedPostsByDate =
    sortByDate && sortByDate === "recent"
      ? [...userAndFollowingPosts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      : [...userAndFollowingPosts].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

  return (
    <div>
      <div>
        <CreatePost />
      </div>
      <h4 className="display-4 fw-semibold">Your Feed</h4>
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
              onClick={() =>
                setShowTrending(showTrending == false ? true : false)
              }
            >
              {!showTrending ? "Trending" : "All Posts"}
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
          <PostList
            posts={
              sortedPostsByLikes.length > 0
                ? sortedPostsByLikes
                : sortedPostsByDate
            }
            user={user}
          />
        </div>
      ) : (
        <p className="fs-4 fw-semibold text-center">No posts found.</p>
      )}
    </div>
  );
};

export default Feed;
