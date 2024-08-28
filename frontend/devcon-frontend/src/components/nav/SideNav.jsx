import { Link } from "react-router-dom"

const SideNav = () => {
    return (
        <div className="bg-light p-4" style={{minHeight: "100vh"}}>
           <div className="fs-2 fw-semibold text-primary"><Link style={{textDecoration: "none"}}>Devcon</Link></div>
           <hr/>
           <nav>
                <div className="fs-5 pb-4">
                    <Link to={`/`} style={{textDecoration: "none"}}><i className="fa- fa-solid fa-house"></i> <span>Home</span></Link>
                </div>
                <div className="fs-5 pb-4">
                    <Link style={{textDecoration: "none"}}><i className="fa-sharp fa-regular fa-compass"></i> Explore</Link>
                </div>
                <div className="fs-5 pb-4">
                    <Link style={{textDecoration: "none"}}><i className="fa-sharp fa-solid fa-bookmark"></i> Bookmarks</Link>
                </div>
                <div className="fs-5 pb-4">
                    <Link style={{textDecoration: "none"}}><i className="fa-solid fa-square-plus"></i> Create</Link>
                </div>
                <div className="fs-5 pb-4">
                    <Link to={`/profile`} style={{textDecoration: "none"}}><i className="fa-sharp fa-solid fa-user"></i> Profile</Link>
                </div>
           </nav>
        </div>
    )
}

export default SideNav