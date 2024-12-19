import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerAsync } from "../auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing auth details
  const { loading } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");

  // Function to handle new user registration
  const handleRegistration = async (e) => {
    e.preventDefault(); // Prevent form default submission

    if (password !== confirmPassword) {
      setAlert("Passwords do not match!");
      setTimeout(() => setAlert(""), 2000);
      return;
    }

    const newUser = { name: fullName, username, email, password };
    try {
      const resultAction = await dispatch(registerAsync(newUser));

      if (registerAsync.fulfilled.match(resultAction)) {
        navigate("/login"); // Navigate to login on success
      } else {
        setAlert("Failed to register the new user!");
        setTimeout(() => setAlert(""), 2000);
      }
    } catch (error) {
      setAlert("An error occurred. Please try again!");
      setTimeout(() => setAlert(""), 2000);
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
              <p className="fs-2 fw-semibold text-center">Signup</p>
              <form onSubmit={handleRegistration}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control p-2"
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    required
                  />
                </div>
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
                    type="email"
                    className="form-control p-2"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
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
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control p-2"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-2 mb-3"
                >
                  Create New Account
                </button>
                <Link className="text-center" to="/login">
                  <p>Already have an account? Log in</p>
                </Link>
              </form>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          {loading && (
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          )}
          {alert && (
            <div className="alert alert-danger my-3" role="alert">
              {alert}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
