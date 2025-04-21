import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import PostList from "../../components/post/PostList";
import { fetchUsersAsync, updateUserProfileAsync } from "../users/usersSlice";
import { updateUserDetails } from "../auth/authSlice";
import { useParams } from "react-router-dom";
import { useFollower } from "../../hooks/useFollower";

const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { users } = useSelector((state) => state.users);
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const { handleFollowUser } = useFollower();

  const [profileUser, setProfileUser] = useState(null);
  const [bio, setBio] = useState(user.profileBio || "");
  const [avater, setAvater] = useState(user.userImageUrl);
  const [editMode, setEditMode] = useState(false);
  const [media, setMedia] = useState(null);

  const url = import.meta.env.VITE_CLOUDINARY_URL;
  const preset = import.meta.env.VITE_UPLOAD_PRESET;

  // Update profile user when Redux state changes
  useEffect(() => {
    const found = users.find((currUser) => currUser._id === userId);
    setProfileUser(found);
  }, [users, userId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setAvater(URL.createObjectURL(file));
    }
  };

  const handleEnableEditMode = () => {
    setEditMode(true);
  };

  const handleEditProfile = async () => {
    const formData = new FormData();
    formData.append("file", media);
    formData.append("upload_preset", preset);
    try {
      let mediaUrl = avater;
      if (media) {
        const res = await axios.post(url, formData);
        mediaUrl = res.data.secure_url;
      }

      const updatedData = {
        profileBio: bio,
        userImageUrl: mediaUrl,
      };
      const resultAction = await dispatch(
        updateUserProfileAsync({ userId: user._id, updatedData })
      );
      if (updateUserProfileAsync.fulfilled.match(resultAction)) {
        dispatch(updateUserDetails(updatedData));
      }
      setEditMode(false);
    } catch (error) {
      console.error(error);
      setEditMode(false);
    }
  };

  const handleFollowClick = async () => {
    await handleFollowUser(profileUser);
    dispatch(fetchUsersAsync());
  };

  const isOwnProfile = !profileUser || profileUser._id === user._id;
  const totalPosts = posts.filter(
    (post) => post.author._id === (profileUser?._id || user._id)
  ).length;
  const userPosts = posts.filter(
    (post) => post.author._id === (profileUser?._id || user._id)
  );

  return (
    <div>
      {/* PROFILE SECTION */}
      {editMode ? (
        <div>
          <div className="text-center">
            <img
              src={avater}
              className="img-fluid"
              style={{ height: "150px", width: "150px", borderRadius: "50%" }}
            />
          </div>
          <div className="display-5 fw-semibold mt-3 text-center">
            {user.name}
          </div>
          <div className="fs-4 text-primary fw-semibold text-center">
            @{user.username}
          </div>
          <div className="mt-3 text-center">
            <label htmlFor="fileInput">
              <i
                className="fa-sharp fa-solid fa-camera-retro fs-5"
                style={{ cursor: "pointer" }}
              ></i>
              <span className="px-2 fs-5 fw-semibold">
                Upload Profile Picture
              </span>
            </label>
            <input
              onChange={handleFileChange}
              id="fileInput"
              accept="image/*"
              type="file"
              style={{ display: "none" }}
            />
          </div>
          <div className="mt-3">
            <label className="fs-5">Bio: </label>
            <textarea
              onChange={(e) => setBio(e.target.value)}
              className="p-2"
              rows={4}
              value={bio}
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </div>
          <div className="text-center mt-3">
            <button
              onClick={handleEditProfile}
              className="btn btn-primary btn-sm fw-semibold"
            >
              Save
            </button>
          </div>
        </div>
      ) : isOwnProfile ? (
        <div>
          <div className="text-center">
            <img
              src={user.userImageUrl}
              className="img-fluid"
              style={{ height: "150px", width: "150px", borderRadius: "50%" }}
            />
          </div>
          <div className="display-5 fw-semibold mt-3 text-center">
            {user.name}
          </div>
          <div className="fs-4 text-primary fw-semibold text-center">
            @{user.username}
          </div>
          <div className="pt-3 text-center fs-4">{user.profileBio}</div>
          <div className="mt-2 mb-3 text-center">
            <button
              onClick={handleEnableEditMode}
              className="btn btn-light btn-sm text-primary fw-semibold"
            >
              Edit Profile
            </button>
          </div>
          <div
            className="card"
            style={{ width: "20vw", minWidth: "15vw", margin: "auto" }}
          >
            <div className="card-body d-flex justify-content-evenly flex-wrap">
              <div className="text-center fs-5 fw-semibold">
                <div>{totalPosts}</div>
                <div className="text-primary">Posts</div>
              </div>
              <div className="text-center fs-5 fw-semibold">
                <div>{user.followers.length}</div>
                <div className="text-primary">Followers</div>
              </div>
              <div className="text-center fs-5 fw-semibold">
                <div>{user.following.length}</div>
                <div className="text-primary">Following</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center">
            <img
              src={profileUser?.userImageUrl}
              className="img-fluid"
              style={{ height: "150px", width: "150px", borderRadius: "50%" }}
            />
          </div>
          <div className="display-5 fw-semibold mt-3 text-center">
            {profileUser?.name}
          </div>
          <div className="fs-4 text-primary fw-semibold text-center">
            @{profileUser?.username}
          </div>
          <div className="pt-3 text-center fs-4">{profileUser?.profileBio}</div>
          <div className="mt-2 mb-3 text-center">
            <button
              onClick={handleFollowClick}
              className="btn btn-primary my-2"
            >
              {user.following.includes(profileUser?._id)
                ? "Unfollow"
                : "+ Follow"}
            </button>
          </div>
          <div
            className="card"
            style={{ width: "20vw", minWidth: "15vw", margin: "auto" }}
          >
            <div className="card-body d-flex justify-content-evenly flex-wrap">
              <div className="text-center fs-5 fw-semibold">
                <div>{totalPosts}</div>
                <div className="text-primary">Posts</div>
              </div>
              <div className="text-center fs-5 fw-semibold">
                <div>{profileUser?.followers.length}</div>
                <div className="text-primary">Followers</div>
              </div>
              <div className="text-center fs-5 fw-semibold">
                <div>{profileUser?.following.length}</div>
                <div className="text-primary">Following</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POSTS SECTION */}
      <div className="fs-3 fw-bold my-3">
        {profileUser ? profileUser.name : "Your"} Posts
      </div>
      <div>
        {profileUser ? (
          profileUser.followers.includes(user._id) && (
            <PostList posts={userPosts} user={user} />
          )
        ) : (
          <PostList posts={userPosts} user={user} />
        )}
      </div>
    </div>
  );
};

export default Profile;
