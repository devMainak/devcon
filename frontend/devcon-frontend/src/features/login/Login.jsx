import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAsync, refreshTokenAsync, resetError } from "../auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  useEffect(() => {
    dispatch(refreshTokenAsync())
      .then((resultAction) => {
        if (refreshTokenAsync.fulfilled.match(resultAction)) {
          navigate("/user");
        }
      })
      .catch((error) => {
        console.error("Auto-login failed", error);
      });

    return () => {
      dispatch(resetError()); // Clear error on unmount
    };
  }, [dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { username, password };

    try {
      const resultAction = await dispatch(loginAsync(credentials));
      if (loginAsync.fulfilled.match(resultAction)) {
        navigate("/user");
      } else if (loginAsync.rejected.match(resultAction)) {
        const errorMessage = resultAction.payload?.error || "Login failed";
        setAlert(errorMessage);
        setTimeout(() => setAlert(""), 3000);
      }
    } catch (error) {
      console.error("Login error:", error);
      setAlert("An unexpected error occurred");
      setTimeout(() => setAlert(""), 3000);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "10rem" }}>
        <h4 className="display-4 fw-semibold text-center text-primary pb-3">
          &copy;Devcon
        </h4>
        <div>
          <div
            className="card px-5 py-4"
            style={{ width: "30rem", maxHeight: "600px" }}
          >
            <div className="card-body">
              <p className="fs-2 fw-semibold text-center">Login</p>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control p-2"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control p-2"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-2 mb-3"
                >
                  Login
                </button>
                <Link className="text-center" to="/signup">
                  <p>Don't have an account? Sign Up</p>
                </Link>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          {loading && (
            <div
              className="spinner-border text-primary text-center my-3"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {alert && (
            <div className="alert alert-danger mt-3 fw-semibold" role="alert">
              {alert}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
