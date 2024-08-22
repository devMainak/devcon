import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import { persistStore, persistReducer } from 'redux-persist'
import { postsSlice } from '../features/posts/postsSlice'
import { usersSlice } from '../features/users/usersSlice'

// Defining persist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['posts', 'users']
}

// Combining reducers
const rootReducer = combineReducers({
    posts: postsSlice.reducer,
    users: usersSlice.reducer
})

// Creating persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configuring the store with persisted reducer
const store = configureStore({
    reducer: persistedReducer
})

// Creating persistor
export const persistor = persistStore(store)

export default store