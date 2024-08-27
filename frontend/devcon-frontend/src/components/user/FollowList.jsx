const FollowList = ({users}) => {
    return (
        <div>
            <div className="card px-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="fs-5 fw-semibold">Find Devs</div>
                            <div className="fs-5 text-primary">Show more</div>
                            </div>
                            {users.map(user => (
                                <div className="d-flex justify-content-between mt-2">
                                    <div className="d-flex">
                                        <img src={user.userImageUrl} style={{maxHeight: "36px", borderRadius: "45%"}} />
                                        <div className="fs-5 px-3">{user.name} <br/> <span className="fs-6">{user.username}</span> </div>
                                    </div>
                                    <div><button className="btn btn-primary"><i className="fa-sharp fa-solid fa-plus"></i>{" "}Follow</button></div>
                                </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FollowList