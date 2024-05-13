// CourseTutor.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseUpdatePopup from "../../components/Course/CourseUpdatePopup"; // Import the popup/modal component
import "./CourseTutor.css"; // Import CSS file for styling
import Navbar from "./../../components/navbar/TNavbar";

const CourseTutor = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // State to store selected course data
  const [showPopup, setShowPopup] = useState(false); // State to manage the visibility of the popup/modal
  const tutorUsername = localStorage.getItem("username");

  useEffect(() => {
    // Fetch course data from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/course");
        setCourses(response.data); // Update courses state with the fetched data
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on tutor's username
  const filteredCourses = courses.filter((course) => {
    return course.owner === tutorUsername;
  });

  const handleUpdate = async (id) => {
    try {
      // Fetch the course data to pre-populate the form for update
      const response = await axios.get(
        `http://localhost:5002/api/course/${id}`
      );
      const courseData = response.data;

      // Set the selected course and open the popup
      setSelectedCourse(courseData);
      setShowPopup(true);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Delete the course
      await axios.delete(`http://localhost:5002/api/course/${id}`);
      // After deleting, fetch courses again to update the list
      const response = await axios.get("http://localhost:5002/api/course");
      setCourses(response.data);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>My Courses</h1>
      <div className="ctutor-course-container">
        {filteredCourses.map((course) => (
          <div key={course._id} className="ctutor-course-card">
            <img
              src={course.file.secure_url}
              alt={course.name}
              className="ctutor-course-image"
            />
            <div className="ctutor-course-details">
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p>Price: ${course.price}</p>
              <br></br>
              <div className="ctutor-course-buttons">
                <button className="tutorupdatec" onClick={() => handleUpdate(course._id)}>Update</button>
                <button className="tutordeletec" onClick={() => handleDelete(course._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}

        {/* Render the popup/modal if showPopup is true */}
        {showPopup && (
          <CourseUpdatePopup
            course={selectedCourse}
            onClose={() => setShowPopup(false)} // Close the popup when onClose is triggered
            onUpdate={(updatedCourse) => {
              // Update the courses list with the updated course
              const updatedCourses = courses.map((c) =>
                c._id === updatedCourse._id ? updatedCourse : c
              );
              setCourses(updatedCourses);
              setShowPopup(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CourseTutor;
