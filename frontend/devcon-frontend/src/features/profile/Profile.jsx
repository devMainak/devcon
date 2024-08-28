import { useState } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import SideNav from "../../components/nav/SideNav"
import FollowList from "../../components/user/FollowList"
import PostList from '../../components/post/PostList'
import { Link } from 'react-router-dom'


const Profile = () => {
    // Configuring use dispatch

    // Accressing user and posts
    const { posts } = useSelector(state => state.posts)
    const { user } = useSelector(state => state.staticUser)
   
    // Local State bindings
    const [bio, setBio] = useState("")
    const [avater, setAvater] = useState("")
    const [editMode, setEditMode] = useState(false)
    
    // Function to enable edit move
    const handleEnableEditMode = () => {
        setEditMode(true)
    }

    // Handle avater selection
    const handleAvatarSelection = (avatarId) => {
        const newImageUrl = user.userImageAvatars.find(avater => avater.id === avatarId)
        setAvater(newImageUrl.url)
    }

    // Handle edit profile
    const handleEditProfile = () => {
        dis
    }
    
    // Total posts
    const totalPosts = posts.reduce((acc, curr) => {
        if (curr.author.name === user.name) acc++
        return acc
    }, 0)

    // User posts
    const userPosts = posts.filter(post => post.author.username === user.username)

    return (
        <>
            <main className="bg-dark-subtle" style={{minHeight: "100vh"}}>
                <div className="d-flex" style={{paddingRight: "0.5in", gap: "1in", whiteSpace: "nowrap"}}>
                    <div className="justify-content-start" style={{minWidth: "4in", minHeight: "100vh", position: "fixed", borderRight: "5px solid #0197f6"}}>
                        <SideNav/>
                    </div>
                    <div className="justify-content-center" style={{ width: "35vw" , marginTop: "1in", marginLeft: "7in"}}>
                       {editMode ? 
                        <div>
                            <div className='text-center'>
                                <img src={user.userImageUrl} className='img-fluid' style={{height: "150px", width: "150px", borderRadius: "50%"}}/>
                            </div>
                            
                            <div className='mt-3' style={{margin: "auto"}}>
                                <div className='fs-5'>Choose an avatar:</div>
                                <div className='d-flex justify-content-around'>
                                    {user.userImageAvatars.map(avatar => (
                                        <div key={avatar.id} style={{cursor: "pointer"}}>
                                        <div>
                                             <img className='img-fluid' src={avatar.url} alt='Avater Img' style={{maxHeight: "100px", maxWidth: "100px"}}/>                                            
                                        </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='mt-3'>
                                <label className='fs-5'>Bio: </label> <br/>
                                <textarea className='p-2' rows={4} placeholder={user.profileBio} style={{width: "100%"}}></textarea>
                            </div>    
                            <div className='text-center mt-3' style={{margin: "auto"}}>
                                <button className='btn btn-primary btn-sm fw-semibold' >Save</button>
                            </div>
                        </div>
                       : <div>
                            <div className='text-center'>
                                <img src={user.userImageUrl} className='img-fluid' style={{height: "150px", width: "150px", borderRadius: "50%"}}/>
                            </div>
                            <div className='display-5 fw-semibold mt-3 text-center'>{user.name}</div>
                            <div className='fs-4 text-primary fw-semibold text-center'>{`@${user.username}`}</div>
                            <div className='pt-3 text-center'>
                                <p className='fs-4'>{user.profileBio}</p>
                            </div>
                            <div className='mt-2 mb-3 text-center'>
                                <button className='btn btn-light btn-sm text-primary fw-semibold'>Edit Profile</button>
                            </div>
                            <div className='card' style={{ width: "20vw", minWidth: "15vw", margin: "auto"}}>
                                <div className='card-body'>
                                    <div className='d-flex justify-content-evenly'>
                                        <div className='text-center fs-5 fw-semibold'>
                                            <div>{totalPosts}</div>
                                            <div className='text-primary'>Posts</div>
                                        </div>
                                        <div className='text-center fs-5 fw-semibold'>
                                         <div>{user.followers}</div>
                                            <div className='text-primary'>Followers</div>
                                        </div>
                                        <div className='text-center fs-5 fw-semibold'>
                                            <div>{user.following}</div>
                                            <div className='text-primary'>Following</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className='fs-3 fw-bold my-3'>Your Posts</div>
                        <div>
                            <PostList posts={userPosts}/>
                        </div>
                    </div>
                    {/* <div className="justify-content-end" style={{width: "20vw", marginTop: "30px", whiteSpace: "nowrap"}}>
                        <FollowList users={users}/>
                    </div> */}
                </div>  
            </main>
        </>
    )
}

export default Profile