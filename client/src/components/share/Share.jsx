import "./share.css"
import{EmojiEmotions, EmojiEmotionsOutlined, Label, PermMedia, Room} from "@material-ui/icons"
import { useSelector } from "react-redux";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";

export default function Share() {
    const user = useSelector((state) => state.user.currentUser);
    const pf="http://localhost:5000/images/";
    const desc=useRef();
    const [file,setFile]=useState(null);
    const submitHandler=async (e)=>{
        e.preventDefault()
        const newPost={
            userId:user._id,
            desc:desc.current.value
        }
        if(file){
            const data=new FormData();
            const fileName=Date.now()+file.name;
            data.append("file",file)
            data.append("name",fileName)
            newPost.img=file.name;
            try{
                await axios.post("/upload",data);
            }catch(err){
                console.log(err)
            }
        }
        try{
            await axios.post("/posts",newPost)
            window.location.reload();
        }catch(err){}
    }
    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePic?pf+user.profilePic:pf+"person/no-profile.png"} alt="" className="shareProfilePic" />
                    <input placeholder={"What's in your mind "+user.username+"?"} className="shareInput" ref={desc}/>
                </div>
                <hr className="shareHr"/>
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label  htmlFor="file"className="shareOption">
                            <PermMedia htmlColor="green" className="shareIcon"/>
                            <span className="shareOptionText">
                                Photo or Video
                            </span>
                            <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>{
                                setFile(e.target.files[0])
                            }} />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon"/>
                            <span className="shareOptionText">
                                Tag
                            </span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="red" className="shareIcon"/>
                            <span className="shareOptionText">
                                Location
                            </span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                            <span className="shareOptionText">
                                Feelings
                            </span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">
                        Share a post
                    </button>

                </form>
            </div>
            
        </div>
    )
}
