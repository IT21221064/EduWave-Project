import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';

const EnrollPage = () => {
  // Dummy course list
  const [courses] = useState([
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' },
  ]);

  const enrollCourse = async (courseId) => {
    try {
      const user = 'your_user';
      const course = courseId;

      await axios.post('http://localhost:5000/enroll', { user, course });
      alert('Enrollment successful!');
    } catch (error) {
      console.error('Error enrolling course:', error);
      alert('Already Enlisted in this course!');
    }
  };

  return (
    <div className='container'>
      <Navbar />
      <h1>Enroll Page</h1>
      <h2>Course List</h2>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.name}
            <button onClick={() => enrollCourse(course.id)}>Enroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EnrollPage;
