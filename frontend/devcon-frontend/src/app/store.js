import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistStore, persistReducer } from "redux-persist";
import  postsReducer  from "../features/posts/postsSlice";
import  usersReducer from "../features/users/usersSlice";
import  staticUserReducer from "../components/user/staticUserSlice";
import  bookmarksReducer from "../features/bookmarks/bookmarksSlice";
import  authReducer  from "../features/auth/authSlice"

// Defining persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "posts", "users", "staticUser", "bookmarks"],
};

// Combining reducers
const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer,
  staticUser: staticUserReducer,
  bookmarks: bookmarksReducer,
});

// Creating persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configuring the store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Creating persistor
export const persistor = persistStore(store);

// For making the store fluid
// persistor.purge()

export default store;
