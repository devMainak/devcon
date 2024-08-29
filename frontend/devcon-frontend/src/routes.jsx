import App from './App'
import Profile from './features/profile/Profile'
import BookmarkView from './features/bookmarks/BookmarkView'

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
    }
]

// Exporting routes
export default routes