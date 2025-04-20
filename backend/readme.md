# ⭐ Devcon Backend API

This is the backend server for the Devcon application. It provides RESTful APIs for authentication, user management, posts, and user profile.

## 🚀 Features

- 🔑 **Authentication**: Secure JWT-based user authentication.
- 📜 **RESTful APIs**: CRUD operations for posts, users, and interactions.
- 💾 **Database Integration**: MongoDB for managing users, posts, and relationships.
- 🔐 **Authorization Middleware**: Protect sensitive routes.

## 🛠️ Tech Stack

- Node.js
- Express.js
- Jason Web Token
- MongoDB / Mongoose

## 📂 API Routes

### 🔑 Auth Routes

`/auth`

- `POST /register` - User registration
- `POST /login` - Login user
- `POST /refresh` - Issue Refresh token
- `POST /logout` - Logout user


### 👤 User Routes

`/user`

- `GET /` - Get users
- `POST /create` - Create user
- `POST /follow/:followedId` - Follow an user
- `POST /unfollow/:unfollowedId` - Unfollow an user
- `POST /update/:userId` - Update user profile data

### 📸 Posts Routes

`/posts`

- `GET /` - Get all posts
- `GET /:postId` - Get post by Id
- `POST /create` - Create a post
- `POST /edit/:postId` - Update a post by Id
- `POST /like/:postId` - Like a post
- `POST /dislike/:postId` - Dislike a post
- `DELETE /delete/:postId` - Delete a post

### 🔖 Bookmark Routes

`/bookmarks`

- `GET /` - Get bookmarked posts
- `POST /create/:postId` - Bookmark a post
- `DELETE /delete/:postId` - Remove post from bookmark
