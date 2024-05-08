import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseTutor = () => {
  const [courses, setCourses] = useState([]);
  const tutorUsername = localStorage.getItem('username');

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

  // Filter courses based on tutor's username
  const filteredCourses = courses.filter(course => {
    return course.owner === tutorUsername;
  });

  const handleUpdate = async (id) => {
    try {
      // Fetch the course data to pre-populate the form for update
      const response = await axios.get(`http://localhost:5002/api/course/${id}`);
      const courseData = response.data;

      // Implement your update logic here, such as displaying a form with pre-populated data
      console.log('Update course:', courseData);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete the course
      await axios.delete(`http://localhost:5002/api/course/${id}`);
      // After deleting, fetch courses again to update the list
      const response = await axios.get('http://localhost:5002/api/course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <div className="course-container">
      {filteredCourses.map(course => (
        <div key={course._id} className="course-card">
          <img src={course.file.secure_url} alt={course.name} />
          <div className="course-details">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <p>Price: ${course.price}</p>
            <button onClick={() => handleUpdate(course._id)}>Update</button>
            <button onClick={() => handleDelete(course._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseTutor;
