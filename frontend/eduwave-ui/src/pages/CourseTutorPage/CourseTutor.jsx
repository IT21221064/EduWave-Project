// CourseTutor.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseUpdatePopup from "../../components/Course/CourseUpdatePopup"; // Import the popup/modal component
import "./CourseTutor.css"; // Import CSS file for styling
import Navbar from "./../../components/navbar/TNavbar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert"; 

const CourseTutor = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // State to store selected course data
  const [showPopup, setShowPopup] = useState(false); // State to manage the visibility of the popup/modal
  const tutorUsername = localStorage.getItem("username");

  const navigate = useNavigate();
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
  const handleDelete = async (id, name) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: `Do you want to delete ${name}?`,
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
      });

      if (willDelete) {
        // Delete the course
        await axios.delete(`http://localhost:5002/api/course/${id}`);
        // After deleting, fetch courses again to update the list
        const response = await axios.get("http://localhost:5002/api/course");
        setCourses(response.data);
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };
  const handleAdd = () => {
    navigate("/course-upload");
  };

  return (
    <div>
      <Navbar />
      <br />
      <button
        className="btn btn-primary"
        onClick={handleAdd}
        style={{ marginLeft: "30px" }}
      >
        + Course
      </button>
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
                <button className="tutordeletec" onClick={() => handleDelete(course._id, course.name)}
                >
                  Delete
                </button>
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
      <Footer />
    </div>
  );
};

export default CourseTutor;
