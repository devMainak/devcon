import App from "./App";
import Feed from "./features/posts/Feed";
import Profile from "./features/profile/Profile";
import BookmarkView from "./features/bookmarks/BookmarkView";
import ExploreFeed from "./features/explore/ExploreFeed";
import CreatePost from "./components/post/CreatePost";
import Login from "./features/login/Login";
import Register from "./features/register/Register";
import AuthLayout from "./components/auth/AuthLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UserList from "./components/user/UserList";

const routes = [
  // Public Routes
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        element: <Login />,
        index: true,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
    ],
  },
  // Protected Routes
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        element: <Feed />,
        index: true,
      },
      {
        path: "explore",
        element: <ExploreFeed />,
      },
      {
        path: "people",
        element: <UserList />,
      },
      {
        path: "bookmarks",
        element: <BookmarkView />,
      },
      {
        path: "profile/:userId?",
        element: <Profile />,
      },
      {
        path: "create",
        element: <CreatePost />,
      },
    ],
  },
];

export default routes;
