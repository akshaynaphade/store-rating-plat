import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      alert('User registered successfully!');
    } catch (error) {
      //checking error response
      if (error.response) {
        
        console.error("Server Error:", error.response.data);
        alert('Error: ' + error.response.data);
      } else {
        
        console.error("Connection Error:", error.message);
        alert('Connection Error: ' + error.message);
      }
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <textarea name="address" onChange={handleChange}></textarea>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;