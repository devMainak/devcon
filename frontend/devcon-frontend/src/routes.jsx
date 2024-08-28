import App from './App'
import Profile from './features/profile/Profile'

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
    }
]

// Exporting routes
export default routes