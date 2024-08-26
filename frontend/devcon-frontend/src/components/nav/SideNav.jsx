import { Link } from "react-router-dom"

const SideNav = () => {
    return (
        <div>
            <ul className="list-group">
                <li className="list-group-item py-3"><Link className="fs-5" style={{textDecoration: "none"}}><i className="fa-solid fa-house-user px-3"></i> Home Feed</Link></li>
                <li className="list-group-item py-3"><Link className="fs-5" style={{textDecoration: "none"}}><i className="fa-solid fa-bolt px-3"></i> Explore</Link></li>
                <li className="list-group-item py-3"><Link className="fs-5" style={{textDecoration: "none"}}><i className="fa-sharp fa-solid fa-bookmark px-3"></i> Bookmarks</Link></li>
                <li className="list-group-item py-3"><Link className="fs-5" style={{textDecoration: "none"}}><i className="fa-solid fa-user px-3"></i> Profile</Link></li>
                </ul>
            <Link className="btn btn-primary mt-3 w-100 fs-5">+ Create Post</Link>
        </div>
    )
}

export default SideNav