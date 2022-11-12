import { BookmarkBorderOutlined, ChatOutlined, Event,  GroupOutlined,   PlayCircleOutline,  RssFeed,  WorkOutline} from "@material-ui/icons";
import "./sidebar.css";
import {Users} from "../../dummydata"
import CloseFriends from "../closeFriends/CloseFriends";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">
                            Feed
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <ChatOutlined className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">
                            Chats
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <GroupOutlined className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">
                            Groups
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleOutline className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">
                            Videos
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <BookmarkBorderOutlined className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">
                            Bookmarks
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">
                            Jobs
                        </span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarListItemIcon"/>
                        <span className="sidebarListItemText">
                            Events
                        </span>
                    </li>
                </ul>
                <button className="sidebarButton">
                    Show More
                </button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                    {Users.map(u=>(
                        <CloseFriends key={u.id} user={u}/>
                    ))}                 
                </ul>
            </div>
            
        </div>
    )
}
