// src/Signup.js
import React, { useState } from 'react';
import { signupUser } from './api';
import image from './vector-logo-of-car-and-bicycle-parking-area-W9RDMT.jpg'
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signupUser(formData);
      console.log(user, "this is user")
      if(user){
        alert("Signup succes")
    }
    } catch (error) {
        alert("Error")
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signupcontainer">
      <div className="image-container">
        <img src={image} alt="Vehicle Parking Management System" />
      </div>
      
      <form onSubmit={handleSubmit} className='signupform'>    
      <h2>Signup</h2>
        <input
          type="text"
          name="userName"
          placeholder="Username"
          onChange={handleChange}
          className='username'
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className='email'
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className='password'
        />
        <br/>
        <button type="submit">Signup</button>
        <p>Already have an account?<a href='/login'>Login</a></p>
        </form>
    </div>
  );
}

export default Signup;
