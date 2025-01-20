import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import bookmarksReducer from "../features/bookmarks/bookmarksSlice";
import authReducer from "../features/auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "posts", "users", "staticUser", "bookmarks"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  users: usersReducer,
  bookmarks: bookmarksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// For making the store fluid
// persistor.purge()

export default store;
