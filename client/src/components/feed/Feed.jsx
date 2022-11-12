import { useEffect,useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios"
import { useSelector } from "react-redux";

export default function Feed({username}) {
    const [posts,setPosts]=useState([])
    const user = useSelector((state) => state.user.currentUser);

    useEffect(()=>{
        const fetchPosts= async()=>{
            const res=username?
            await axios({url:"posts/profile/"+username,baseURL:'http://localhost:3000/'})
            :await axios.get("posts/timeline/"+user._id);
            setPosts(res.data.sort((p1,p2)=>{
                return new Date(p2.createdAt)- new Date(p1.createdAt)
            }))
    
        };
        fetchPosts();
       
    },[username,user._id])
  
    return (
        <div className="feed">
            <div className="feedWrapper">
                {username===user.username&&<Share/>}
                {posts.map(p=>(
                    <Post key={p._id } post={p}/>    
                ))}
                
            </div>
        </div>
    )
}
