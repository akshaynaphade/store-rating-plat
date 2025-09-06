import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreOwnerDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMyStoreData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/stores/my-store', {
                    headers: { 'x-auth-token': token }
                });
                setDashboardData(response.data);
            } catch (err) {
                setError(err.response ? err.response.data : 'Failed to fetch store data.');
            }
        };
        fetchMyStoreData();
    }, []);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!dashboardData) return <p>Loading your store data...</p>;

    const { storeDetails, usersWhoRated } = dashboardData;

    return (
        <div>
            <h2>My Store Dashboard</h2>
            <h3>{storeDetails.name}</h3>
            <p>{storeDetails.address}</p>
            <p><strong>Overall Average Rating: {storeDetails.average_rating} / 5</strong></p>
            <hr />
            <h4>Users Who Rated This Store</h4>
            <table>
                <thead>
                    <tr>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>Rating Given</th>
                    </tr>
                </thead>
                <tbody>
                    {usersWhoRated.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StoreOwnerDashboard;