import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // defaults to localStorage
import { persistStore, persistReducer } from 'redux-persist'
import { postsSlice } from '../features/posts/postsSlice'

// Defining persist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['posts']
}

// Combining reducers
const rootReducer = combineReducers({
    posts: postsSlice.reducer
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