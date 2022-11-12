import { useRef } from "react";
import "./login.css"
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { Link } from "react-router-dom";

export default function Login() {
    const email=useRef();
    const password=useRef();
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);

    const handleClick=(e)=>{
        e.preventDefault();
        login(dispatch, { email:email.current.value, password:password.current.value });
    };

 
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
                        <input placeholder="Email" required className="loginInput" ref={email}/>
                        <input placeholder="Password" required minLength="6" type="password" className="loginInput" ref={password}/>
                        <button className="loginButton" type="submit" disabled={isFetching}>{isFetching?"loading..":"Log In"}</button>
                    </form>
                    <span className="loginForgot">Forgot password?</span>

                    <div className="loginDivButton">
                        <Link to='/register'>
                        <button className="loginRegisterButton">{isFetching?"loading..":"Create a New Acoount"}</button>
                        
                         </Link>
                    </div>

                    
                </div>

            </div>
        </div>
        
    </div>
    )
}
