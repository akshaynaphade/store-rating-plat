import React, { useState } from 'react';
import axios from 'axios';

const UpdatePassword = () => {
    const [formData, setFormData] = useState({ oldPassword: '', newPassword: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('http://localhost:5000/api/users/update-password', formData, {
                headers: { 'x-auth-token': token }
            });
            setMessage(response.data);
            setFormData({ oldPassword: '', newPassword: '' });
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div>
            <h2>Update Your Password</h2>
            <form onSubmit={handleSubmit}>
                <input type="password" name="oldPassword" placeholder="Old Password" value={formData.oldPassword} onChange={handleChange} required />
                <input type="password" name="newPassword" placeholder="New Password" value={formData.newPassword} onChange={handleChange} required />
                <button type="submit">Update Password</button>
            </form>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default UpdatePassword;