import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAsync } from "../posts/postsSlice";
import SideNav from "../../components/nav/SideNav";
import PostList from "../../components/post/PostList";

const ExploreFeed = () => {
  // Configuring useDispatch
  const dispatch = useDispatch();

  // Fetching posts on page load
  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, []);

  // Accessing posts & user
  const { posts, status, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.staticUser);

  return (
    <>
      <main className="bg-dark-subtle" style={{ minHeight: "100vh" }}>
        <div
          className="d-flex"
          style={{
            paddingRight: "0.5in",
            gap: "1in",
            overflowWrap: "breka-word",
            whiteSpace: "normal",
          }}
        >
          <div
            className="justify-content-start"
            style={{
              minWidth: "4in",
              minHeight: "100vh",
              position: "fixed",
              borderRight: "5px solid #0197f6",
            }}
          >
            <SideNav />
          </div>
          <div
            className="justify-content-center"
            style={{ width: "35vw", marginTop: "0.5in", marginLeft: "7in" }}
          >
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
          {/* <div className="justify-content-end" style={{width: "20vw", marginTop: "30px", whiteSpace: "nowrap"}}>
                        <FollowList users={users}/>
                    </div> */}
        </div>
      </main>
    </>
  );
};

export default ExploreFeed;
