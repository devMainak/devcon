import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveProfileData } from "../../components/user/staticUserSlice";
import SideNav from "../../components/nav/SideNav";
import FollowList from "../../components/user/FollowList";
import PostList from "../../components/post/PostList";
import { Link } from "react-router-dom";

const Profile = () => {
  // Configuring use dispatch
  const dispatch = useDispatch();

  // Accressing user and posts
  const { posts } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.staticUser);

  // Local State bindings
  const [bio, setBio] = useState(user.profileBio);
  const [avater, setAvater] = useState(user.userImageUrl);
  const [editMode, setEditMode] = useState(false);

  // Function to enable edit move
  const handleEnableEditMode = () => {
    setEditMode(true);
  };

  // Handle avater selection
  const handleAvatarSelection = (avatarId) => {
    const newImageUrl = user.userImageAvatars.find(
      (avater) => avater.id === avatarId
    );
    setAvater(newImageUrl.url);
  };

  // Handle edit profile
  const handleEditProfile = () => {
    if (bio && avater) {
      dispatch(saveProfileData({ profileBio: bio, userImageUrl: avater }));
    } else {
      setBio(" ");
    }
    setEditMode(false);
  };

  // Total posts
  const totalPosts = posts.reduce((acc, curr) => {
    if (curr.author.name === user.name) acc++;
    return acc;
  }, 0);

  // User posts
  const userPosts = posts.filter(
    (post) => post.author.username === user.username
  );

  return (
    <>
      <main className="bg-dark-subtle" style={{ minHeight: "100vh" }}>
        <div
          className="d-flex"
          style={{
            paddingRight: "0.5in",
            gap: "1in",
            overflowWrap: "breka-word",
            whiteSpace: "normal",
          }}
        >
          <div
            className="justify-content-start"
            style={{
              minWidth: "4in",
              minHeight: "100vh",
              position: "fixed",
              borderRight: "5px solid #0197f6",
            }}
          >
            <SideNav />
          </div>
          <div
            className="justify-content-center"
            style={{ width: "35vw", marginTop: "1in", marginLeft: "7in" }}
          >
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
                  <div className="fs-5">Choose an avatar:</div>
                  <div className="d-flex justify-content-around">
                    {user.userImageAvatars.map((avatar) => (
                      <div
                        onClick={() => handleAvatarSelection(avatar.id)}
                        key={avatar.id}
                        style={{ cursor: "pointer" }}
                      >
                        <div>
                          <img
                            className="img-fluid"
                            src={avatar.url}
                            alt="Avater Img"
                            style={{ maxHeight: "100px", maxWidth: "100px" }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <label className="fs-5">Bio: </label> <br />
                  <textarea
                    onChange={(e) => setBio(e.target.value)}
                    className="p-2"
                    rows={4}
                    value={bio}
                    style={{ width: "100%" }}
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
                        <div>{user.followers}</div>
                        <div className="text-primary">Followers</div>
                      </div>
                      <div className="text-center fs-5 fw-semibold">
                        <div>{user.following}</div>
                        <div className="text-primary">Following</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="fs-3 fw-bold my-3">Your Posts</div>
            <div>
              <PostList posts={userPosts} />
            </div>
          </div>
          {/* <div className="justify-content-end" style={{width: "20vw", marginTop: "30px", whiteSpace: "nowrap"}}>
                        <FollowList users={users}/>
                    </div> */}
        </div>
      </main>
    </>
  );
};

export default Profile;
