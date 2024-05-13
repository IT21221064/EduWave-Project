import Navbar from "../../components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EnrollPage.css";

const EnrollPage = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByPrice, setSortByPrice] = useState("highest"); // "highest" or "lowest"
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

  useEffect(() => {
    // Set filteredCourses to contain all courses initially
    setFilteredCourses(courses);

    // Sort courses based on price
    const sortedCourses = [...courses].sort((a, b) => {
      if (sortByPrice === "highest") {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });
    setFilteredCourses(sortedCourses);
  }, [courses, sortByPrice]);

  const handleEnroll = (courseId) => {
    setSelectedCourseId(courseId);
    console.log("Selected Course ID:", courseId); // Check if courseId is correct
    navigate("/checkout", { state: { courseId: courseId } });
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Perform search action here, filtering courses based on the entered search term
    // This useEffect hook will automatically update the filtered courses
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(searchTerm)
    );
    setFilteredCourses(filtered);
  };

  return (
    <div>
      <Navbar />

      <div className="search-bar-container mt-4">
        <input
          type="text"
          className="form-control search-form-control "
          placeholder="Search by course name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <select
          value={sortByPrice}
          onChange={(e) => setSortByPrice(e.target.value)}
          className="form-select"
        >
          <option value="highest">Highest Price</option>
          <option value="lowest">Lowest Price</option>
        </select>
      </div>
      <div className="row">
        {filteredCourses.map((course) => (
          <div
            key={course._id}
            className="col-lg-4 col-md-6 col-sm-12 stucourse-card"
          >
            <div className="card">
              <img
                src={course.file.secure_url}
                alt={course.name}
                className="stucourse-image  "
              />
            </div>
            <div className="stucourse-details">
              <h3 className="stucourse-title">{course.name}</h3>
              <p className="stucourse-description">{course.description}</p>
              <p className="stucourse-price">Price: ${course.price}</p>
              <p className="stucourse-owner">Owner: {course.owner}</p>
              <button
                className="stuenroll-button btn btn-primary"
                onClick={() => handleEnroll(course._id)}
              >
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrollPage;
