// CourseUpdatePopup.js
import React, { useState } from 'react';
import axios from 'axios';
import './CoursePopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import swal from "sweetalert";


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
     
      window.location.reload();
      onClose();
       swal("Success!", "Course uploaded successfully!", "success"); // Close the popup after successful update
    } catch (error) {
      console.error('Error updating course:', error);
      // Handle error state
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}><FontAwesomeIcon icon={faCircleXmark} /></button>
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={updatedCourseData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={updatedCourseData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={updatedCourseData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="videolink">Video Link:</label>
            <input
              type="text"
              id="videolink"
              name="videolink"
              value={updatedCourseData.videolink}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Current Image:</label>
            <img src={course.file.secure_url} alt={course.name} className="course-image" />
          </div>
          <button type="submit" className="btn-update">Update</button>
        </form>
      </div>
    </div>
  );
};

export default CourseUpdatePopup;
