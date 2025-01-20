import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersAsync,
  followUserAsync,
  unfollowUserAsync,
} from "../../features/users/usersSlice";
import {
  addNewFollower,
  removeExistingFollower,
} from "../../features/auth/authSlice";

const FollowList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const filteredUsers = users.filter((currUser) => currUser._id !== user._id);

  const handleFollowUser = async (followedUser) => {
    const userId = user._id;
    const followedUserId = followedUser._id;

    try {
      if (!user.following.includes(followedUserId)) {
        const resultAction = await dispatch(
          followUserAsync({ userId, followedUserId })
        );
        if (followUserAsync.fulfilled.match(resultAction)) {
          dispatch(addNewFollower({ followedUserId }));
        }
      } else {
        const resultAction = await dispatch(
          unfollowUserAsync({ userId, unfollowedUserId: followedUserId })
        );
        if (unfollowUserAsync.fulfilled.match(resultAction)) {
          dispatch(
            removeExistingFollower({ unfollowedUserId: followedUserId })
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="card px-3">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <div className="fs-5 fw-semibold">Find Devs</div>
            <div className="fs-5 text-primary">Show more</div>
          </div>
          {filteredUsers.map((currUser) => (
            <div
              className="d-flex justify-content-between mt-2"
              style={{ flexWrap: "wrap" }}
              key={currUser._id}
            >
              <div className="d-flex" style={{ flexWrap: "wrap", gap: "1rem" }}>
                <img
                  src={currUser.userImageUrl}
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                  }}
                />
                <div className="fs-5">
                  {currUser.name} <br />{" "}
                  <span className="fs-6 fw-semibold text-primary">{`@${currUser.username}`}</span>{" "}
                </div>
              </div>
              <div style={{ alignSelf: "end" }}>
                <button
                  onClick={() => handleFollowUser(currUser)}
                  className="btn btn-primary my-2"
                >
                  {" "}
                  {user.following.includes(currUser._id)
                    ? "Unfollow"
                    : "+ Follow"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowList;
