import { convertLength } from "@mui/material/styles/cssUtils";
import axios from "axios";
import { useRef } from "react";
import "./register.css"
import  {Link, useNavigate} from"react-router-dom"

export default function Register() {
    const email=useRef();
    const username=useRef();
    const password=useRef();
    const confirmPassword=useRef();

    const navigate = useNavigate();
    

    const handleClick=async (e)=>{
        e.preventDefault();
        if(confirmPassword.current.value!==password.current.value){
            confirmPassword.current.setCustomValidity("Passwords don't match!")
        }else{
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value
                
            }
            try{
                await axios.post("auth/register",user);
                navigate("/login")
            }catch(err){
                console.log(err)
            }
        }
    }

    return (
        <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Socialito</h3>
                <span className="loginDesc">
                    Connect with the world around you on Socialito. 
                </span>
            </div>
            <div className="loginRight">
                <div className="loginBox">
                <form className="loginBoxForm" onSubmit={handleClick}>
                    <input placeholder="Username" required className="loginInput" ref={username}/>
                    <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
                    <input placeholder="Password" required type="password" minLength="6" className="loginInput" ref={password}/>
                    <input placeholder="Confirm Password" type="password" required className="loginInput" ref={confirmPassword}/>
                    <button className="loginButton"type="submit">Sign Up</button>
                </form>
                <div className="registerDivButton">
                    <Link to='/login'>
                    <button className="loginRegisterButton">Log Into Account</button>
                    </Link>
                </div>
                </div>
            </div>
        </div>
        
    </div>
    )
}
