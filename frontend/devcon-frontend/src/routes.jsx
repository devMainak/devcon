import App from './App'
import Profile from './features/profile/Profile'
import BookmarkView from './features/bookmarks/BookmarkView'
import ExploreFeed from './features/explore/ExploreFeed'

// Defining routes
const routes = [
    {
        path: '/',
        element: <App/>,
        index: true
    },
    {
        path: '/profile',
        element: <Profile/>
    },
    {
        path: '/bookmarks',
        element: <BookmarkView/>
    },
    {
        path: '/explore',
        element: <ExploreFeed/>
    }
]


// Exporting routes
export default routes