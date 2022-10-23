import React,{useState,useEffect,useContext} from 'react'
import '../styles/user.css';
import axios from 'axios';
import {UserContext} from '../context/UserContext';


function SignUp({serverUrl}) {

    const {token}=useContext(UserContext) 
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const [success,setSuccess]=useState(false)

    const handleSignUp=(e)=>{
        e.preventDefault();
        axios.post(`${serverUrl}/users/signup`,{email,password,username})
        .then(res=>{
           setSuccess(true)
           setPassword('')
           setEmail('')
           setUsername('')
        })
        .catch(err=>console.log(err))
    }

  return (
    <div className="signup-container">
        {
            token
            ? <p>You are already loggedin.</p>
            : <form className="signup-form" onSubmit={handleSignUp}>
            <div className="title-container">
                <h1>Sign Up</h1>
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
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input value={username} type="text" placeholder="Enter Username" name="username" required onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="button-container">
                <button type="reset" className="cancelbtn">Cancel</button>
                <button type="submit" className="signupbtn">Sign Up</button>
            </div>
            {
                success 
                ? <p className="success-message">Signed up successfully! <a href="/signin">Signin</a></p>
                : <p className="signin-message">Already have an account? <a href="/signin">Signin</a></p>
            }
        </form>
        }
        
    </div>
  )
}

export default SignUp