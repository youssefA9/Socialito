import "./closeFriends.css"

export default function CloseFriends({user}) {
    const pf="http://localhost:3000/assets/";
    return (
        <li className="sidebarFriend">
        <img src={pf+user.profilePicture} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">
           {user.username}
        </span>
    </li>
    )
}
