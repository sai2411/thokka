// src/Login.js
import React, { useState } from 'react';
import { loginUser } from './api';
import './Login.css';
import image from './vector-logo-of-car-and-bicycle-parking-area-W9RDMT.jpg'
import { Link } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(formData);
      alert("Login succes")
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='logincontainer'>
      <div className="image-container">
        <img src={image} alt="Vehicle Parking Management System" />
      </div>
      
      <br/>
      <form onSubmit={handleSubmit} className='loginform'>
      <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className='email'
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className='password'
          required
        />
        <br/>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
        <p>Don't have an account?<a href='/signup'>Register</a></p>
      </form>
    </div>
  );
}

export default Login;
