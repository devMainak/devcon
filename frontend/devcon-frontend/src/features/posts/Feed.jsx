import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPostsAsync, handleSortByDate } from "./postsSlice";
import PostList from "../../components/post/PostList";
import CreatePost from "../../components/post/CreatePost";

const Feed = () => {
  // Configuring useDispatch() for usage
  const dispatch = useDispatch();

  const [sortbyLikes, setSortByLikes] = useState("All Posts");

  // Fetching all posts on feed page load
  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, []);

  // Accessing posts
  const { posts, status, error, sortByDate } = useSelector(
    (state) => state.posts
  );

  // Accessing staticUser
  const { user } = useSelector((state) => state.staticUser);

  // Handle sort by likes
  const handleSortByLikes = () => {
    setSortByLikes(sortbyLikes === "Most Liked" ? "All Posts" : "Most Liked");
  };

  // Handle sort by date
  const setSortByDate = (e) => {
    dispatch(handleSortByDate(e.target.value));
  };

  // Creating a copy of posts
  const postsToShow = [...posts];

  // Sorted posts by user or user's following
  const userAndFollowingPosts = postsToShow.filter((post) => {
    if (
      post.author.username === user.username ||
      user.following.includes(post.author.username)
    ) {
      return post;
    }
  });

  // Sorted posts by likes
  const sortedPostsByLikes =
    sortbyLikes === "All Posts"
      ? userAndFollowingPosts.sort((a, b) => b.likes - a.likes)
      : userAndFollowingPosts;

  // Sorted posts by date
  const sortedPostsByDate =
    sortByDate && sortByDate === "recent"
      ? sortedPostsByLikes.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      : sortedPostsByLikes.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

  console.log(sortedPostsByDate);

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
              onClick={() => handleSortByLikes()}
            >
              {sortbyLikes}
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
  );
};

export default Feed;
