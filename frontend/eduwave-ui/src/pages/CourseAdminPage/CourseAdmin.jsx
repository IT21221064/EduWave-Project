import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseAdmin = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch all courses
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/course');
        setCourses(response.data.filter(course => !course.isavailable)); // Filter courses with isavailable false
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleAccept = async (id) => {
    try {
      // Update the course's isavailable to true
      await axios.put(`http://localhost:5002/api/course/${id}`, { isavailable: true });
      // After updating, fetch courses again to update the table
      const response = await axios.get('http://localhost:5002/api/course');
      setCourses(response.data.filter(course => !course.isavailable)); // Filter courses with isavailable false
    } catch (error) {
      console.error('Error accepting course:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      // Delete the course
      await axios.delete(`http://localhost:5002/api/course/${id}`);
      // After deleting, fetch courses again to update the table
      const response = await axios.get('http://localhost:5002/api/course');
      setCourses(response.data.filter(course => !course.isavailable)); // Filter courses with isavailable false
    } catch (error) {
      console.error('Error rejecting course:', error);
    }
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Owner</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course._id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.description}</td>
              <td>${course.price}</td>
              <td>{course.owner}</td>
              <td>
                {!course.isavailable && (
                  <>
                    <button onClick={() => handleAccept(course._id)}>Accept</button>
                    <button onClick={() => handleReject(course._id)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseAdmin;
