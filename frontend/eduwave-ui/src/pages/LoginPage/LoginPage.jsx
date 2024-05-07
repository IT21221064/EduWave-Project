import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const login = async () => {
        try {
        const user = email;
        const pass = password;
    
        await axios.post('http://localhost:5000/login', { user, pass });
        alert('Login successful!');
        } catch (error) {
        console.error('Error logging in:', error);
        alert('Failed to login. Please try again later.');
        }
    };
    
    return (
        <div>
        <h1>Login Page</h1>
        <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
        </div>
    );
    };

export default LoginPage;