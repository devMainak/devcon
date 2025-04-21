import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFollower } from "../../hooks/useFollower";
import { useEffect, useState } from "react";

const UserList = () => {
  const [searchedPerson, setSerachedPerson] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setSearchedUsers(users);
  }, []);

  useEffect(() => {
    if (searchedPerson) {
      const filteredUsers = users.filter(
        (currUser) =>
          currUser.name
            .toLowerCase()
            .includes(searchedPerson.toLowerCase()) ||
          currUser.username
            .toLowerCase()
            .includes(searchedPerson.toLowerCase())
      );
      setSearchedUsers(filteredUsers);
    } else {
      setSearchedUsers(users);
    }
  }, [searchedPerson, users]);

  const { handleFollowUser } = useFollower();

  return (
    <div>
      <h5 className="display-5 fw-semibold mb-3">Find People</h5>
      <input
        className="form-control w-100 mb-3"
        type="text"
        placeholder="🔍 Search user by name or username..."
        onChange={(e) => setSerachedPerson(e.target.value)}
      />
      {!searchedUsers.length ? (
        <h6 className="display-6 fw-semibold text-center">No user found.</h6>
      ) : (
        <div>
          {searchedUsers.map((currUser) => {
            return (
              <div className="card mt-2">
                <div className="card-body">
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
                        style={{
                          flexWrap: "wrap",
                          gap: "1rem",
                        }}
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
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserList;
