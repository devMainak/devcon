import { useState } from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="bg-light p-4" style={{ minHeight: "100vh", width: "4in" }}>
      <div className="fs-2 fw-semibold text-primary">
        <Link to={`/`} style={{ textDecoration: "none" }}>
          Devcon&copy;
        </Link>
      </div>
      <hr />
      <nav>
        <div className="fs-5 pb-4">
          <Link to={`/`} style={{ textDecoration: "none" }}>
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
          <Link to={`profile`} style={{ textDecoration: "none" }}>
            <i className="fa-sharp fa-solid fa-user"></i> Profile
          </Link>
        </div>
      </nav>
      <div className="d-grid gap-2 d-md-block mt-3">
        <button
          onClick={() => handleShowModal()}
          className="btn btn-primary btn-lg"
          type="button"
        >
          + Create a post
        </button>
      </div>
    </div>
  );
};

export default SideNav;
