import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const StuMyCourse = () => {
    const [courses, setCourses] = useState([]);
  
    useEffect(() => {
        const userId = localStorage.getItem('userid');
  

    const fetchCourses = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/enroll/${userId}`);
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error.message);
           
        }
    };
  
        fetchCourses();
    }, []); 
  
    return (
        <div>
            <Navbar />
            <h2>My Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>{course.course}</li>
                ))}
            </ul>
            <Footer/>
        </div>
    );
};

export default StuMyCourse;
