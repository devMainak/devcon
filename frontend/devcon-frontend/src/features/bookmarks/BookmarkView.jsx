import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookmarkAsync } from "./bookmarksSlice";
import SideNav from "../../components/nav/SideNav";
import BookmarkList from "./BookmarkList";
import FollowList from "../../components/user/FollowList";

const BookmarkView = () => {
  // Configuring useDispatch for usage
  const dispatch = useDispatch();

  // Loading bookmarks on on page load
  useEffect(() => {
    dispatch(fetchBookmarkAsync());
  }, []);

  // Accessing bookmarks
  const { bookmarks, status, error } = useSelector((state) => state.bookmarks);

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
            style={{ width: "35vw", marginTop: "30px", marginLeft: "7in" }}
          >
            <div>
            <h4 className="display-4 fw-semibold pb-3">Bookmarks</h4>
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

              {bookmarks && bookmarks.length > 0 ? (
                <div>
                  
                  <BookmarkList bookmarks={bookmarks} />
                </div>
              ) : (
                <p className="fs-3 fw-semibold text-center">No bookmarks.</p>
              )}
            </div>
          </div>
          <div className="justify-content-end" style={{width: "20vw", marginTop: "30px", whiteSpace: "nowrap"}}>
                        <FollowList/>
                    </div>
        </div>
      </main>
    </>
  );
};

export default BookmarkView;
