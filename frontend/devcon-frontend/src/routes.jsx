import App from "./App";
import Feed from "./features/posts/Feed";
import Profile from "./features/profile/Profile";
import BookmarkView from "./features/bookmarks/BookmarkView";
import ExploreFeed from "./features/explore/ExploreFeed";

// Defining routes
const routes = [
  {
    path: "/",
    // The main wrapper
    element: <App />,
    children: [
      {
        path: "/",
        element: <Feed />,
        // This renders <Feed/> at the root path
        index: true,
      },
      {
        path: "explore",
        element: <ExploreFeed />,
      },
      {
        path: "bookmarks",
        element: <BookmarkView />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
];

// Exporting routes
export default routes;
