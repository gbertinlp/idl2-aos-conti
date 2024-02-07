import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import './App.css';

const App = () => {
    const [apiKey, setApiKey] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [data, setData] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.get('http://tu-dominio.com/password', {
                headers: {
                    'x-api-key': apiKey,
                },
            });

            setLoggedIn(true);
            setData(response.data);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleLogout = () => {
        setApiKey('');
        setPassword('');
        setLoggedIn(false);
        setData('');
    };

    return (
        <Router>
            <div className="app-container">
                <Route path="/" exact>
                    {isLoggedIn ? (
                        <Navigate to="/dashboard" />
                    ) : (
                        <div className="login-container">
                            <h2>Login</h2>
                            <label>
                                API Key:
                                <input type="text" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
                            </label>
                            <label>
                                Password:
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                            <button onClick={handleLogin}>Login</button>
                        </div>
                    )}
                </Route>

                <Route path="/dashboard">
                    {isLoggedIn ? (
                        <Dashboard data={data} onLogout={handleLogout} />
                    ) : (
                        <Navigate to="/" />
                    )}
                </Route>
            </div>
        </Router>
    );
};

export default App;
