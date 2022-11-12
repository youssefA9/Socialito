import "./topbar.css";
import {Search,Person, Chat, Notifications} from "@material-ui/icons"
import {Link} from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userRedux";



export default function Topbar() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const pf="http://localhost:5000/images/";

    const handleClick=(e)=>{
        localStorage.removeItem("user");
        dispatch(logout());  
    };
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">SOCIALITO</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">HOMEPAGE</span>
                    <span className="topbarLink">TIMELINE</span>
                    <span className="topbarLink" onClick={handleClick}>LOGOUT</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person/>
                        <span className="topbarIconCounter">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat/>
                        <span className="topbarIconCounter">3</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications/>
                        <span className="topbarIconCounter">7</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePic?pf+user.profilePic:pf+"person/no-profile.png"} alt="" className="topbarProfilePic" />
                </Link>
                </div>
        </div>
    )
}
