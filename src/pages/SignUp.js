import React,{useState,useEffect,useContext,CSSProperties} from 'react'
import '../styles/user.css';
import axios from 'axios';
import {UserContext} from '../contexts/UserContext';
import {ThemeContext} from '../contexts/ThemeContext';
import ClipLoader from "react-spinners/RiseLoader";
import { Link } from 'react-router-dom';


function SignUp({serverUrl}) {

    const {token}=useContext(UserContext)
    const {darkMode,setDarkMode}=useContext(ThemeContext)  
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const [success,setSuccess]=useState(false)

    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#e50916");

    const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };
    
    

    const handleSignUp=(e)=>{
        e.preventDefault();
        setLoading(true) 
        axios.post(`${serverUrl}/users/signup`,{email,password,username})
        .then(res=>{
            console.log(res.data)
            if(res.data.status===409){
                alert('There is another user with this email. Please sign up with a different email.')
            }else{
                setSuccess(true) 
                setPassword('')
                setEmail('')
                setUsername('')
            }
        })
        .catch(err=>console.log(err))
        // .finally(()=>{
            setTimeout(() => {
                setLoading(false) 
            }, 1000); 
        // })
    }
 
  return ( 
    <div className={darkMode ? "signup-container" : "signup-container signup-light"} >

        {
            token
            ? <p>You are already loggedin.</p>
            : <form className="signup-form" onSubmit={handleSignUp}>
            <div className="title-container">
                <h1>Sign Up</h1>
                <p>Please fill in this form to create an account.</p>
            </div> 
            <div className={darkMode ? "input-wrapper" :"input-wrapper input-wrapper-light"}> 
                <label htmlFor="email">Email</label>
                <input value={email} type="email" placeholder="Enter Email" name="email" required onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className={darkMode ? "input-wrapper" :"input-wrapper input-wrapper-light"}>
                <label htmlFor="psw">Password</label>
                <input value={password} type="password" placeholder="Enter Password" name="psw" required onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className={darkMode ? "input-wrapper" :"input-wrapper input-wrapper-light"}>
                <label htmlFor="username">Username</label>
                <input value={username} type="text" placeholder="Enter Username" name="username" required onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="button-container">
                <button type="reset" className="cancelbtn">Cancel</button>
                <button type="submit" className="signupbtn">Sign Up</button>
            </div>
            {
                success 
                ? <ClipLoader
                        color={color}
                        loading={loading}
                        cssOverride={override}
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                // <p className="success-message">Signed up successfully! <a href="/signin">Signin</a></p>
                : <p className="signin-message">Already have an account? <Link to="/signin">Signin</Link></p>
            }
        </form>
        }
        
    </div>
  )
}

export default SignUp