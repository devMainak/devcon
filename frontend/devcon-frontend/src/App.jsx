import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Outlet } from "react-router-dom";
import SideNav from "./components/nav/SideNav";
import FollowList from "./components/user/FollowList";

function App() {
  return (
    <>
      <main>
        <div
          className="d-flex"
          style={{
            paddingRight: "2rem",
            gap: "1in",
            overflowWrap: "break-word",
            whiteSpace: "normal",
            justifyContent: "space-between",
          }}
        >
           <div
          style={{
            flexGrow: "1",
            minHeight: "100vh",
            position: "fixed",
            alignSelf: "start"
          }}
        >
          <SideNav />
        </div>
          <div
            style={{
              width: "35vw",
              marginTop: "30px",
              marginBottom: "0.5in",
              marginLeft: "6in",
              flexGrow: "1"
            }}
          >
            <Outlet />
          </div>
          <div
            style={{
              width: "20vw",
              marginTop: "30px",
              overflowWrap: "break-word",
              whiteSpace: "normal",
              flexGrow: "1"
            }}
          >
            <FollowList />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
