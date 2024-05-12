// CourseHome.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CourseHome.css"; // Import CSS file for styling

const CourseHome = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  // Filter courses based on search query
  const filteredCourses = courses.filter((course) => {
    return (
      course.isavailable &&
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEnroll = (courseId) => {
    setSelectedCourseId(courseId);
    console.log("Selected Course ID:", courseId); // Check if courseId is correct
    navigate("/checkout", { state: { courseId: courseId } });
  };

  return (
    <div className="chome-container">
      <div>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="chome-search-input"
        />
      </div>
      <br />
      <div className="chome-course-container">
        {filteredCourses.map((course) => (
          <div key={course._id} className="chome-course-card">
            <img
              src={course.file.secure_url}
              alt={course.name}
              className="chome-course-image"
            />
            <div className="chome-course-details">
              <h3 className="chome-course-title">{course.name}</h3>
              <p className="chome-course-description">
                Description:{course.description}
              </p>
              <p className="chome-course-price">Price: ${course.price}</p>
              <p className="chome-course-owner">by: {course.owner}</p>
              <button
                className="enroll-button"
                onClick={() => handleEnroll(course._id)}
              >
                ENROLL NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseHome;
