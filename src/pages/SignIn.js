import React,{useState,useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import '../styles/user.css';
import axios from 'axios';
import {UserContext} from '../context/UserContext';

function SignIn({serverUrl}) {
    const navigate = useNavigate();
    const {user,setUser,token,setToken}=useContext(UserContext) 
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const [success,setSuccess]=useState(false)


    const handleSignIn=(e)=>{
        e.preventDefault();
        axios.post(`${serverUrl}/users/login`,{email,password})
        .then(res=>{
            console.log(res.data)
            setUser(res.data)
            setToken(res.data.token)
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('userInfo',JSON.stringify(res.data))
            navigate('/')
        })
        .catch(err=>console.log(err))
    }
  return (
    <div className="signup-container">
        {
            token
            ? <p>You are already loggedin.</p>
            : <form className="signup-form" onSubmit={handleSignIn}>
            <div className="title-container">
                <h1>Sign In</h1>
                <p>Please fill in this form to create an account.</p>
            </div>
            <div className="input-wrapper"> 
                <label htmlFor="email">Email</label>
                <input value={email} type="email" placeholder="Enter Email" name="email" required onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="input-wrapper">
                <label htmlFor="psw">Password</label>
                <input value={password} type="password" placeholder="Enter Password" name="psw" required onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="button-container">
                <button type="reset" className="cancelbtn">Cancel</button>
                <button type="submit" className="signupbtn">Sign In</button>
            </div>
            {
                success 
                ? null
                : <p className="signin-message">Don't have an account? <a href="/signup">Signup</a></p>
            }
        </form>
        } 
    
</div>
  )
}

export default SignIn