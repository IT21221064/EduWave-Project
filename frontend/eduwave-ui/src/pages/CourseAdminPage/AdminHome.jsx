// CourseAdmin.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import  './AdminHome.css'

const HomeAdmin = () => {
  
  return (
    
    <div >
        <div className='plain-nav'>
        <link href="https://fonts.googleapis.com/css2?family=Alice&display=swap" rel="stylesheet"></link>
            <h2>ADMIN HOME</h2>
        </div>
        <div className='admin-nav-container'>
        
            <Link to="/payments" ><button className='admin-nav-btn'>PAYMENTS</button></Link>
            <Link to="/course-admin" ><button className='admin-nav-btn'>COURSES</button></Link>
            <Link to="/" ><button className='admin-nav-btn'>LOG OUT</button></Link>

            
        </div>
        
    </div>
  );


};

export default HomeAdmin;
