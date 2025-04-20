import {
  followUserAsync,
  unfollowUserAsync,
} from "../../features/users/usersSlice";
import {
  addNewFollower,
  removeExistingFollower,
} from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const UserList = () => {
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

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
        <h5 className="display-5 fw-semibold mb-3">Find People</h5>
      {!users.length ? (
        <h4 className="display-4 fw-semibold">No user found</h4>
      ) : (
        <div>
          {users.map((currUser) => {
            return (
              <div className="card mt-2">
                <div className="card-body">
                  <div
                    className="d-flex justify-content-between mt-2"
                    style={{ flexWrap: "wrap" }}
                    key={currUser._id}
                  >
                    <div
                      className="d-flex"
                      style={{ flexWrap: "wrap", gap: "1rem" }}
                    >
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
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserList;
