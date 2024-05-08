import React, { useState } from 'react';
import axios from 'axios';
import './CoursePopup.css'

const CourseUpdatePopup = ({ course, onClose, onUpdate }) => {
  const [updatedCourseData, setUpdatedCourseData] = useState({
    id: course.id,
    name: course.name,
    description: course.description,
    price: course.price,
    owner: course.owner,
    videolink: course.videolink
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourseData({ ...updatedCourseData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5002/api/course/${course._id}`, updatedCourseData);
      onUpdate(response.data); // Update the course list with the updated course
      onClose(); // Close the popup after successful update
    } catch (error) {
      console.error('Error updating course:', error);
      // Handle error state
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={updatedCourseData.name}
            onChange={handleInputChange}
            required
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={updatedCourseData.description}
            onChange={handleInputChange}
            required
          />
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={updatedCourseData.price}
            onChange={handleInputChange}
            required
          />
          <label>Video Link:</label>
          <input
            type="text"
            name="videolink"
            value={updatedCourseData.videolink}
            onChange={handleInputChange}
            required
          />
             <img src={course.file.secure_url} alt={course.name} />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default CourseUpdatePopup;
