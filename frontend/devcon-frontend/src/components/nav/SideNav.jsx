import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAsync } from "../../features/auth/authSlice";

const SideNav = () => {
  const dispatch = useDispatch();

  const handleUserLogout = async () => {
    try {
      const resultAction = await dispatch(logoutAsync());
      if (logoutAsync.rejected.match(resultAction)) {
        console.log("Failed to logout user.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-light p-4 sidenav">
      <div className="fs-2 fw-semibold text-primary">
        <Link to={`/user`} style={{ textDecoration: "none" }}>
          Devcon&copy;
        </Link>
      </div>
      <hr />
      <nav>
        <div className="fs-5 pb-4">
          <Link to={`/user`} style={{ textDecoration: "none" }}>
            <i className="fa-sharp fa-solid fa-house"></i> <span>Home</span>
          </Link>
        </div>
        <div className="fs-5 pb-4">
          <Link to={`explore`} style={{ textDecoration: "none" }}>
            <i className="fa-sharp fa-regular fa-compass"></i> Explore
          </Link>
        </div>
        <div className="fs-5 pb-4">
          <Link to={`bookmarks`} style={{ textDecoration: "none" }}>
            <i className="fa-sharp fa-solid fa-bookmark"></i> Bookmarks
          </Link>
        </div>
        <div className="fs-5 pb-4">
          <Link to={`create`} style={{ textDecoration: "none" }}>
            <i className="fa-sharp fa-solid fa-plus"></i> Create
          </Link>
        </div>
        <div className="fs-5 pb-4">
          <Link to={`profile`} style={{ textDecoration: "none" }}>
            <i className="fa-sharp fa-solid fa-user"></i> Profile
          </Link>
        </div>
        <div className="fs-5 pb-4">
          <button
            className="fs-5 text-danger"
            style={{
              border: "none",
              backgroundColor: "#F8F9FA",
              padding: "0px",
            }}
            onClick={handleUserLogout}
          >
            <i class="fa-solid fa-power-off"></i> Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
