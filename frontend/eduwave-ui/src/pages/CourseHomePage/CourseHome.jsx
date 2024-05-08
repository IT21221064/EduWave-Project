import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CourseHome.css'; // Import CSS file for styling

const CourseHome = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter courses based on search query
  const filteredCourses = courses.filter(course => {
    return course.isavailable && course.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="course-container">
      <div>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      </div>
      <br />
      {filteredCourses.map(course => (
        <div key={course._id} className="course-card">
          <img src={course.file.secure_url} alt={course.name} />
          <div className="course-details">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <p>Price: ${course.price}</p>
            <p>by: {course.owner}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseHome;
