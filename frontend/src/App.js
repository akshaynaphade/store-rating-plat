import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import StoreOwnerDashboard from './components/StoreOwnerDashboard';
import UpdatePassword from './components/UpdatePassword';

import './App.css';

function App() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="App">
      <header>
        <nav style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
          <Link to="/signup" style={{ margin: '10px' }}>Sign Up</Link>
          <Link to="/login" style={{ margin: '10px' }}>Login</Link>
          <Link to="/dashboard" style={{ margin: '10px' }}>Stores</Link>
          <Link to="/admin" style={{ margin: '10px' }}>Admin</Link>
          <Link to="/store-owner" style={{ margin: '10px' }}>My Store</Link>
          <Link to="/update-password" style={{ margin: '10px' }}>Update Password</Link>
          <button onClick={handleLogout} style={{ margin: '10px' }}>Logout</button>
        </nav>
        <h1>Store Rating App</h1>
      </header>
      <main>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<h2>Welcome! Please Sign Up or Login.</h2>} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/update-password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />

          <Route path="/admin" element={
            <ProtectedRoute requiredRole="System Administrator"><AdminDashboard /></ProtectedRoute>
          }/>
          <Route path="/store-owner" element={
            <ProtectedRoute requiredRole="Store Owner"><StoreOwnerDashboard /></ProtectedRoute>
          }/>
        </Routes>
      </main>
    </div>
  );
}

export default App;