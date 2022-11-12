import "./online.css"

export default function Online({user}) {
    const pf="http://localhost:3000/assets/";
    return (
        <li className="rightbarFriend">
        <div className="rightbarFriendImgContainer">
            <img src={pf+user.profilePicture} alt="" className="rightbarFriendImg" />
            <span className="rightbarOnline"></span>
        </div>
        <span className="rightbarUsername">
            {user.username}
        </span>
    </li>
    )
}
