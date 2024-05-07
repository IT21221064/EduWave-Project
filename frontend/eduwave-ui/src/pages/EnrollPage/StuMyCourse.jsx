import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';

const StuMyCourse = () => {
    const [courses, setCourses] = useState([]);
  
    useEffect(() => {
        // Retrieve user ID from localStorage
        const userId = localStorage.getItem('userid');
  
        // Fetch courses for the logged-in user
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/enroll/${userId}`);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error.message);
                // Handle error (e.g., display an error message to the user)
            }
        };
  
        fetchCourses();
    }, []); // Empty dependency array to ensure useEffect runs only once
  
    return (
        <div>
            <Navbar />
            <h2>My Courses</h2>
            <ul>
                {courses.map(course => (
                    <li key={course._id}>{course.course}</li>
                ))}
            </ul>
        </div>
    );
};

export default StuMyCourse;
