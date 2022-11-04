import React,{useContext} from 'react'
import '../styles/footer.css';
import {ThemeContext} from '../contexts/ThemeContext';

function Footer() {
  const {darkMode,setDarkMode}=useContext(ThemeContext)
  return (
    <div className={darkMode ?"footer-container":"footer-container footer-light" }> 
      <button onClick={()=>setDarkMode(!darkMode)}>
       {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <p>All rights reserved.</p> 
    </div>
  )
}
 
export default Footer  