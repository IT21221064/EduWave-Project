import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './welcome.css';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <div className='signupbackground'>
        <div className='login-container'>
            <h2>Welcome to Eduwave</h2>
            <p>Click on the button below to register as a student or teacher</p>
            <Link to="/sregister" className='welcomebtn'>Register as a Student</Link>
            <Link to="/tregister" className='welcomebtn'>Register as a Teacher</Link>
        </div>
        </div>
    );
}

export default WelcomePage;