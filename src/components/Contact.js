import React, { useRef } from 'react';
 import emailjs from '@emailjs/browser';
 
 function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_47wzard', 'template_9lozwlo', form.current, '754fyAukX85KzL9_n')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };

   return (
    <div className="contact-container">
        Contact Us Form
        {/* <form ref={form} onSubmit={sendEmail}>
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input type="submit" value="Send" />
        </form> */}
    </div>


   )
 }
 
 export default Contact