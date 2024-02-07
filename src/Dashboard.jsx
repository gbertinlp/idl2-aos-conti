import React from 'react';
import './Dashboard.css';

const Dashboard = ({ data, onLogout }) => {
    return (
        <div>
            <h2>Welcome to the Dashboard</h2>
            <p>Data from API: {data}</p>
            <button onClick={onLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
