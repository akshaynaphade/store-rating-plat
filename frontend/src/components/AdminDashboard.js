import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [newStore, setNewStore] = useState({ name: '', address: '' });
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', address: '', role: 'Normal User' });
  const [error, setError] = useState('');

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Admin not authenticated.');
      return;
    }
    try {
      const [statsRes, usersRes, storesRes] = await Promise.all([
        axios.get('/api/dashboard/stats', { headers: { 'x-auth-token': token } }),
        axios.get('/api/users/', { headers: { 'x-auth-token': token } }),
        axios.get('/api/stores/admin-all', { headers: { 'x-auth-token': token } })
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setStores(storesRes.data);
    } catch (err) {
      setError('Failed to fetch admin data. Check the console for more details.');
      console.error("Error fetching admin data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStoreChange = (e) => setNewStore({ ...newStore, [e.target.name]: e.target.value });
  const handleUserChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const handleStoreSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/stores', newStore, { headers: { 'x-auth-token': token } });
      alert('Store added successfully!');
      setNewStore({ name: '', address: '' });
      fetchData();
    } catch (err) {
      alert('Failed to add store.');
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/users/create', newUser, { headers: { 'x-auth-token': token } });
      alert('User created successfully!');
      setNewUser({ name: '', email: '', password: '', address: '', role: 'Normal User' });
      fetchData();
    } catch (err) {
      alert(`Failed to create user: ${err.response?.data?.msg || err.response?.data || err.message}`);
    }
  };

  return (
    <div>
      <h2>System Administrator Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px', textAlign: 'center' }}>
        <div><h3>Total Users</h3><p style={{fontSize: '2em'}}>{stats.totalUsers}</p></div>
        <div><h3>Total Stores</h3><p style={{fontSize: '2em'}}>{stats.totalStores}</p></div>
        <div><h3>Total Ratings</h3><p style={{fontSize: '2em'}}>{stats.totalRatings}</p></div>
      </div>

      <div style={{ display: 'flex', gap: '40px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <h3>Add New Store</h3>
          <form onSubmit={handleStoreSubmit}>
             <input type="text" name="name" placeholder="Store Name" value={newStore.name} onChange={handleStoreChange} required style={{ padding: '8px', display: 'block', marginBottom: '10px', width: '300px' }}/>
             <input type="text" name="address" placeholder="Store Address" value={newStore.address} onChange={handleStoreChange} required style={{ padding: '8px', display: 'block', marginBottom: '10px', width: '300px' }}/>
             <button type="submit">Add Store</button>
          </form>
        </div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>Add New User</h3>
            <form onSubmit={handleUserSubmit}>
                <input type="text" name="name" placeholder="User Name" value={newUser.name} onChange={handleUserChange} required style={{ padding: '8px', display: 'block', marginBottom: '10px', width: '300px' }}/>
                <input type="email" name="email" placeholder="User Email" value={newUser.email} onChange={handleUserChange} required style={{ padding: '8px', display: 'block', marginBottom: '10px', width: '300px' }}/>
                <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleUserChange} required style={{ padding: '8px', display: 'block', marginBottom: '10px', width: '300px' }}/>
                <input type="text" name="address" placeholder="User Address" value={newUser.address} onChange={handleUserChange} style={{ padding: '8px', display: 'block', marginBottom: '10px', width: '300px' }}/>
                <select name="role" value={newUser.role} onChange={handleUserChange} style={{ padding: '8px', display: 'block', marginBottom: '10px', width: '100%' }}>
                    <option value="Normal User">Normal User</option>
                    <option value="Store Owner">Store Owner</option>
                    <option value="System Administrator">System Administrator</option>
                </select>
                <button type="submit">Add User</button>
            </form>
        </div>
      </div>
      <hr />

      <h3 style={{marginTop: '40px'}}>All Platform Stores</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black', backgroundColor: '#f2f2f2' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Address</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Average Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(store => (
            <tr key={store.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '8px' }}>{store.name}</td>
              <td style={{ padding: '8px' }}>{store.address}</td>
              <td style={{ padding: '8px' }}>{store.average_rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{marginTop: '40px'}}>All Platform Users</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid black', backgroundColor: '#f2f2f2' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Email</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Address</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={{ borderBottom: '1-px solid #ccc' }}>
              <td style={{ padding: '8px' }}>{user.name}</td>
              <td style={{ padding: '8px' }}>{user.email}</td>
              <td style={{ padding: '8px' }}>{user.address}</td>
              <td style={{ padding: '8px' }}>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;