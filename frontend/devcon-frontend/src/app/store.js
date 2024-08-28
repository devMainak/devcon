import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import { persistStore, persistReducer } from 'redux-persist'
import { postsSlice } from '../features/posts/postsSlice'
import { usersSlice } from '../features/users/usersSlice'
import { staticUserSlice } from '../components/user/staticUserSlice'
import { bookmarksSlice } from '../features/bookmarks/bookmarksSlice'

// Defining persist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['posts', 'users', 'staticUser', 'bookmarks']
}

// Combining reducers
const rootReducer = combineReducers({
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
    staticUser: staticUserSlice.reducer,
    bookmarks: bookmarksSlice.reducer
})

// Creating persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configuring the store with persisted reducer
const store = configureStore({
    reducer: persistedReducer
})

// Creating persistor
export const persistor = persistStore(store)

// For making the store fluid
// persistor.purge()

export default store