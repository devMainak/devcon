import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsersAsync } from "../../features/users/usersSlice";
import { useFollower } from "../../hooks/useFollower";

const FollowList = () => {
  const dispatch = useDispatch();
  const { handleFollowUser } = useFollower();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const filteredUsers = users
    .filter((currUser) => currUser._id !== user._id)
    .slice(0, 5);

  return (
    <div>
      <div className="card px-3">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <div className="fs-5 fw-semibold">Find Devs</div>
            <div className="fs-5 text-primary">
              <Link style={{ textDecoration: "none" }} to="people">
                Show more
              </Link>
            </div>
          </div>
          {filteredUsers.map((currUser) => (
            <div>
              <div
                className="d-flex justify-content-between mt-2"
                style={{ flexWrap: "wrap" }}
                key={currUser._id}
              >
                <Link
                  to={`/user/profile/${currUser._id}`}
                  style={{ textDecoration: "none" }}
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
                    <div className="fs-5 text-dark">
                      {currUser.name} <br />{" "}
                      <span className="fs-6 fw-semibold text-primary">{`@${currUser.username}`}</span>{" "}
                    </div>
                  </div>
                </Link>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowList;
