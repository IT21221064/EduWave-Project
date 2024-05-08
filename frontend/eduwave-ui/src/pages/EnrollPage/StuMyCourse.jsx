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

                const coursePromises = enrollments.map(async enrollment => {
                    const courseId = enrollment.course;
                    const courseResponse = await axios.get(`http://localhost:5002/api/course/${courseId}`);
                    return courseResponse.data;
                });


                const courseDetails = await Promise.all(coursePromises);
                setCourses(courseDetails);
            } catch (error) {
                console.error('Error fetching courses:', error.message);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className='wholepage-mycourse' >
            <Navbar />
            <div className="student-stu-my-course">
                <h2 className="student-course-heading">My Courses</h2>
                <div className="row">
                    {courses.map(course => (
                        <div key={course.id} className="col-lg-4 col-md-6 col-sm-12">
                            <div className="stucourse-card">
                                <img src={course.file.secure_url} alt={course.name} className="student-course-image" />
                                <div className="stucourse-details">
                                    <h3 className="student-course-name">{course.name}</h3>
                                    <p className="student-course-description">Description: {course.description}</p>
                                    <p className="student-course-price">Price: ${course.price}</p>
                                    <p className="student-course-owner">Owner: {course.owner}</p>
                                    <p className="student-course-video-link">Video Link: <a href={course.videolink}>{course.videolink}</a></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default StuMyCourse;
