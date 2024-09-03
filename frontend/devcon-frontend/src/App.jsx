import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Outlet } from 'react-router-dom'
import SideNav from './components/nav/SideNav'
import FollowList from './components/user/FollowList'

function App() {
  
  return (
    <>
      <header>
        <div
          className="d-flex justify-content-start"
          style={{
            minWidth: "4in",
            minHeight: "100vh",
            position: "fixed",
            borderRight: "5px solid #0197f6",
          }}
        >
          <SideNav />
        </div>
      </header>
      <main className="bg-dark-subtle" style={{ minHeight: "100vh" }}>
        <div
          className="d-flex"
          style={{
            paddingRight: "0.5in",
            gap: "1in",
            overflowWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          <div
            className="justify-content-center"
            style={{ width: "35vw", marginTop: "30px", marginLeft: "7in" }}
          >
            <Outlet/>
          </div>
          <div
            className="justify-content-end"
            style={{
              width: "20vw",
              marginTop: "30px",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            <FollowList />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
