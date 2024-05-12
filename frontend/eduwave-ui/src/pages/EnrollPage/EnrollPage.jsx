import Navbar from "../../components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./EnrollPage.css";

const EnrollPage = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch course data from the API
    const fetchCourses = async () => {
      try {

          const userid = localStorage.getItem('userid');
          const email = localStorage.getItem('email')
          await axios.post('http://localhost:5000/enroll', { userid, course: course._id });
          //const response = await axios.post('http://localhost:5003/api/send-email', { email, courseName: course.name });
          //setMessage(response.data.message);

          alert('Enrollment successful!');

        const response = await axios.get("http://localhost:5002/api/course");
        setCourses(response.data); // Update courses state with the fetched data

      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (course) => {
    try {
      const userid = localStorage.getItem("userid");
      await axios.get("http://localhost:5005/enroll", {
        userid,
        course: course._id,
      });

      alert("already enlisted to this course!");
    } catch (error) {
      console.error("Error enrolling course:", error);
      alert("redirecting to payments!");
      navigate("/payments");
    }
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
              <button
                className="stuenroll-button"
                onClick={() => handleEnroll(course)}
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
