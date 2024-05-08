import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './StuMyCourse.css'

const StuMyCourse = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userid');

        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/enroll/${userId}`);
                const enrollments = response.data;

                // Fetch course details for each enrollment
                const coursePromises = enrollments.map(async enrollment => {
                    const courseId = enrollment.course;
                    const courseResponse = await axios.get(`http://localhost:5002/api/course/${courseId}`);
                    return courseResponse.data;
                });

                // Wait for all course details to be fetched
                const courseDetails = await Promise.all(coursePromises);
                setCourses(courseDetails);
            } catch (error) {
                console.error('Error fetching courses:', error.message);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div>
        <Navbar />
        <div className="stu-my-course">
            <h2 className="course-heading">My Courses</h2>
            <ul className="course-list">
                {courses.map(course => (
                    <li key={course.id} className="course-item">
                        <img src={course.file.secure_url} alt={course.name} className="course-image" />
                        <h3 className="course-name">{course.name}</h3>
                        <p className="course-description">Description: {course.description}</p>
                        <p className="course-price">Price: ${course.price}</p>
                        <p className="course-owner">Owner: {course.owner}</p>
                        <p className="course-video-link">Video Link: <a href={course.videolink}>{course.videolink}</a></p>
                    </li>
                ))}
            </ul>
        </div>
        <Footer />
        </div>
    );
};

export default StuMyCourse;
