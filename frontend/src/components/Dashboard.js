import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [stores, setStores] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchStores = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/api/stores?search=${searchTerm}`, {
                headers: { 'x-auth-token': token }
            });
            setStores(response.data);
        } catch (err) {
            setError('Failed to fetch stores. Please try logging in again.');
            console.error("Error fetching stores:", err);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []); // This runs once when the component first loads

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchStores(); // Re-fetch the stores with the current search term
    };
    
    const handleRateStore = async (storeId, rating) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `/api/stores/${storeId}/rate`,
                { rating },
                { headers: { 'x-auth-token': token } }
            );
            alert(`You have successfully rated the store ${rating} stars!`);
            fetchStores(); // refresh the stores data after updating
        } catch (err) {
            alert('Failed to submit rating.');
        }
    };

    return (
        <div>
            <h2>Stores Dashboard</h2>
            <form onSubmit={handleSearchSubmit} style={{ margin: '20px 0' }}>
                <input
                    type="text"
                    placeholder="Search stores by name or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '300px', padding: '8px' }}
                />
                <button type="submit" style={{ padding: '8px' }}>Search</button>
            </form>
            <hr />
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {stores.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {stores.map(store => (
                        <li key={store.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', borderRadius: '5px' }}>
                            <h3>{store.name}</h3>
                            <p>{store.address}</p>
                            <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
                                <strong>Average Rating:</strong> {store.average_rating} / 5
                            </div>
                            <div>
                                <strong>Your Rating:</strong> {store.user_rating ? `${store.user_rating} / 5` : 'Not rated yet'}
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <strong>Rate this store: </strong>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button key={star} style={{ marginLeft: '5px' }} onClick={() => handleRateStore(store.id, star)}>
                                        {star}
                                    </button>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                !error && <p>No stores found matching your search.</p>
            )}
        </div>
    );
};

export default Dashboard;