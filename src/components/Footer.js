import React,{useContext} from 'react'
import '../styles/footer.css';
import {ThemeContext} from '../contexts/ThemeContext';

function Footer() {
  const {darkMode,setDarkMode}=useContext(ThemeContext)
  return (
    <div className="footer-container"> 
      <button onClick={()=>setDarkMode(!darkMode)}>Light Mode</button>
      <p>All rights reserved.</p> 
    </div>
  )
}
 
export default Footer 