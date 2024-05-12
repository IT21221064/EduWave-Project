// CourseHome.js
import Navbar from "../../components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CourseHome.css"; // Import CSS file for styling

const CourseHome = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const [selectedCourseId, setSelectedCourseId] = useState(null);

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

  const handleEnroll = (courseId) => {
    setSelectedCourseId(courseId);
    console.log("Selected Course ID:", courseId); // Check if courseId is correct
    navigate("/checkout", { state: { courseId: courseId } });
  };

  return (
    <div className="wholepage-enroll">
      <Navbar />
      <div className="row stucourse-container">
        {courses.map((course) => (
          <div
            key={course._id}
            className="col-lg-4 col-md-6 col-sm-12 stucourse-card"
          >
            <img
              src={course.file.secure_url}
              alt={course.name}
              className="stucourse-image"
            />
            <div className="stucourse-details">
              <h3 className="stucourse-title">{course.name}</h3>
              <p className="stucourse-description">{course.description}</p>
              <p className="stucourse-price">Price: ${course.price}</p>
              <p className="stucourse-owner">Owner: {course.owner}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseHome;
