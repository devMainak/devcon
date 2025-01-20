import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBookmarkAsync } from "./bookmarksSlice";
import BookmarkList from "./BookmarkList";

const BookmarkView = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBookmarkAsync());
  }, []);

  const { bookmarks, status, error } = useSelector((state) => state.bookmarks);
  const { user } = useSelector((state) => state.auth);

  const userBookmarks = bookmarks.filter((post) =>
    post.bookmarks.includes(user._id)
  );

  return (
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

      {userBookmarks && userBookmarks.length > 0 ? (
        <div>
          <BookmarkList bookmarks={userBookmarks} />
        </div>
      ) : (
        <p className="fs-3 fw-semibold text-center">No bookmarks.</p>
      )}
    </div>
  );
};

export default BookmarkView;
