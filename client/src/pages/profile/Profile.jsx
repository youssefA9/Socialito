import Feed from "../../components/feed/Feed"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import Rightbar from "../../components/rightbar/Rightbar"
import "./profile.css"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"

export default function Profile() {
    const pf="http://localhost:5000/images/";
    const username=useParams().username
    const [user,setUser]=useState({});
    useEffect(()=>{
        const fetchUser= async()=>{
            const res= await axios.get(`/users/?username=${username}`)
            setUser(res.data)
        }
        fetchUser();
    },[username])
   
    return (
        <>
        <Topbar/>
        <div className="profile">
            <Sidebar/>
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img src={
                                user.coverPic
                                ? pf + user.coverPic
                                : pf + "person/no-cover.jpg"
                            } className="profileCoverImg" alt="" />
                        <img src={
                                user.profilePic
                                ? pf + user.profilePic
                                : pf + "person/no-profile.png"
                            }  className="profileUserImg" alt="" />
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{user.username}</h4>
                        <span className="profileInfoBio">{user.desc}</span>
     
                    </div>
                    </div>
                <div className="profileRightBottom">
                    <Feed username={username}/>
                    <Rightbar user={user}/>
                </div>
                
            </div>

        </div>


        </>
    )
}
