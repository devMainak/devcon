import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersAsync,
  followUserAsync,
  unfollowUserAsync,
} from "../../features/users/usersSlice";
import { addNewFollower, removeExistingFollower } from "./staticUserSlice";

const FollowList = () => {
  // Configuring useDispatch for usage
  const dispatch = useDispatch();

  // Fetching users on load
  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  // Accessing users && followrs
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.staticUser);

  // User following
  const userFollowing = user.following;

  // Function follow user
  const handleFollowUser = async (user) => {
    try {
      if (!user.isFollowed) {
        const resultAction = await dispatch(followUserAsync(user._id));
        if (followUserAsync.fulfilled.match(resultAction)) {
          dispatch(addNewFollower(user.username));
        }
      } else {
        const resultAction = await dispatch(unfollowUserAsync(user._id));
        if (unfollowUserAsync.fulfilled.match(resultAction)) {
          dispatch(removeExistingFollower(user.username));
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
          {users.map((user) => (
            <div className="d-flex justify-content-between mt-2" style={{flexWrap: "wrap"}}>
              <div className="d-flex" style={{flexWrap: "wrap", gap: "1rem"}}>
                <img
                  src={user.userImageUrl}
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                  }}
                />
                <div className="fs-5">
                  {user.name} <br />{" "}
                  <span className="fs-6 fw-semibold text-primary">{`@${user.username}`}</span>{" "}
                </div>
              </div>
              <div style={{alignSelf: "end"}}>
                <button
                  onClick={() => handleFollowUser(user)}
                  className="btn btn-primary my-2"
                >
                  {" "}
                  {user.isFollowed ? "Unfollow" : "+ Follow"}
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
