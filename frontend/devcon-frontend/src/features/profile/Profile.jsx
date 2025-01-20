import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import PostList from "../../components/post/PostList";
import { updateUserProfileAsync } from "../users/usersSlice";
import { updateUserDetails } from "../auth/authSlice";

const Profile = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const [bio, setBio] = useState(user.profileBio ? user.profileBio : " ");
  const [avater, setAvater] = useState(user.userImageUrl);
  const [editMode, setEditMode] = useState(false);
  const [media, setMedia] = useState(null);

  const dispatch = useDispatch();

  const url = import.meta.env.VITE_CLOUDINARY_URL;
  const preset = import.meta.env.VITE_UPLOAD_PRESET;

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
      if (media) {
        const res = await axios.post(url, formData);
        const mediaUrl = res.data.secure_url;
        if (bio && mediaUrl) {
          const userId = user._id;
          const updatedData = {
            profileBio: bio,
            userImageUrl: mediaUrl,
          };
          const resultAction = await dispatch(
            updateUserProfileAsync({ userId, updatedData })
          );
          if (updateUserProfileAsync.fulfilled.match(resultAction)) {
            dispatch(updateUserDetails(updatedData));
            setEditMode(false);
          }
        } else {
          console.log("Nope!");
          setEditMode(false);
        }
      } else {
        if (bio) {
          const userId = user._id;
          const updatedData = {
            userImageUrl: avater,
            profileBio: bio,
          };
          const resultAction = await dispatch(
            updateUserProfileAsync({ userId, updatedData })
          );
          if (updateUserProfileAsync.fulfilled.match(resultAction)) {
            dispatch(updateUserDetails(updatedData));
            setEditMode(false);
          }
        } else {
          console.log("Nope!");
          setEditMode(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setEditMode(false);
  };

  const totalPosts = posts.reduce((acc, curr) => {
    if (curr.author._id === user._id) acc++;
    return acc;
  }, 0);

  const userPosts = posts.filter((post) => post.author._id === user._id);

  return (
    <div>
      {editMode ? (
        <div>
          <div className="text-center">
            <img
              src={avater}
              className="img-fluid"
              style={{
                height: "150px",
                width: "150px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="display-5 fw-semibold mt-3 text-center">
            {user.name}
          </div>
          <div className="fs-4 text-primary fw-semibold text-center">{`@${user.username}`}</div>
          <div className="mt-3" style={{ margin: "auto" }}>
            <div>
              <div>
                <label htmlFor="fileInput">
                  <i
                    className="fa-sharp fa-solid fa-camera-retro fs-5"
                    style={{ cursor: "pointer" }}
                  ></i>
                  <span className="px-2 fs-5 fw-semibold">
                    : Upload Profile Picture
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
            </div>
          </div>
          <div className="mt-3">
            <label className="fs-5">Bio: </label> <br />
            <textarea
              onChange={(e) => setBio(e.target.value)}
              className="p-2"
              rows={4}
              value={bio}
              style={{ width: "100%", borderRadius: "10px" }}
            ></textarea>
          </div>
          <div className="text-center mt-3" style={{ margin: "auto" }}>
            <button
              onClick={handleEditProfile}
              className="btn btn-primary btn-sm fw-semibold"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center">
            <img
              src={user.userImageUrl}
              className="img-fluid"
              style={{
                height: "150px",
                width: "150px",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="display-5 fw-semibold mt-3 text-center">
            {user.name}
          </div>
          <div className="fs-4 text-primary fw-semibold text-center">{`@${user.username}`}</div>
          <div className="pt-3 text-center">
            <p
              className="fs-4"
              style={{ wordWrap: "break-word", wordBreak: "break-word" }}
            >
              {user.profileBio}
            </p>
          </div>
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
            <div className="card-body">
              <div className="d-flex justify-content-evenly">
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
        </div>
      )}
      <div className="fs-3 fw-bold my-3">Your Posts</div>
      <div>
        <PostList posts={userPosts} user={user} />
      </div>
    </div>
  );
};

export default Profile;
