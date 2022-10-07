import React from 'react'
import '../styles/footer.css';

function Footer() {
  return (
    <div className="footer-container">
      <div className="link-container">
        <a href="/contactus">Contact Us</a>
        <a href="/about">About</a>
      </div>
      
      <p>All rights reserved.</p>
    </div>
  )
}

export default Footer