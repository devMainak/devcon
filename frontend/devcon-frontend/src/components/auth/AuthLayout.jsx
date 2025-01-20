import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="d-flex justify-content-center vh-100 bg-light">
        <Outlet />
    </div>
  );
}

export default AuthLayout;
