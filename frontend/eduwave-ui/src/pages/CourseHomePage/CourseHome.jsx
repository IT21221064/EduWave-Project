import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseHome = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch course data from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/course');
        setCourses(response.data); // Update courses state with the fetched data
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses(); 
  }, []); 

  return (
    <div className="course-container">
      {courses.map(course => (
        <div key={course._id} className="course-card">
          <img src={course.file.secure_url} alt={course.name} />
          <div className="course-details">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <p>Price: ${course.price}</p>
            <p>Owner: {course.owner}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseHome;
