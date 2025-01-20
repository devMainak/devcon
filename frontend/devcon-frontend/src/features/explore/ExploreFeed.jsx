import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAsync } from "../posts/postsSlice";
import PostList from "../../components/post/PostList";

const ExploreFeed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, []);

  const { posts, status, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h4 className="display-4 fw-semibold pb-3">Explore</h4>
      <div>
        {status === "loading" && (
          <div
            style={{ margin: "auto" }}
            class="spinner-border text-primary"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
        {error && <p className="fs-4 fw-semibold text-center">{error}</p>}
        {posts.length > 0 ? (
          <PostList posts={posts} user={user} />
        ) : (
          <p className="fs-3 fw-semibold text-center">No post found.</p>
        )}
      </div>
    </div>
  );
};

export default ExploreFeed;
