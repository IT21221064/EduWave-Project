import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./StuMyCourse.css";

const StuMyCourse = () => {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const userId = localStorage.getItem("userid");
        const response = await axios.get(
          `http://localhost:5005/enroll/${userId}`
        );
        const enrollments = response.data;

        const coursePromises = enrollments.map(async (enrollment) => {
          const courseId = enrollment.course;
          const courseResponse = await axios.get(
            `http://localhost:5002/api/course/${courseId}`
          );
          return courseResponse.data;
        });

        const courseDetails = await Promise.all(coursePromises);
        setCourses(courseDetails);

        // Calculate progress
        const completedCourses = enrollments.filter(
          (enrollment) => enrollment.state === "completed"
        );
        const progressPercentage =
          (completedCourses.length / enrollments.length) * 100;
        setProgress(progressPercentage);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      }
    };

    fetchCourses();
  }, []);

  const handleCheckboxChange = async (course) => {
    try {
      const userId = localStorage.getItem("userid");
      const enrollResponse = await axios.get(
        `http://localhost:5005/enroll/${userId}`
      );
      const enrollments = enrollResponse.data;
      const matchingEnrollment = enrollments.find(
        (enrollment) => enrollment.course === course._id
      );

      if (!matchingEnrollment) {
        console.error("Enrollment not found for user and course combination.");
        return;
      }

      const enrollmentId = matchingEnrollment._id;
      await axios.put(`http://localhost:5005/enroll/${enrollmentId}`, {
        state: "completed",
      });

      const response = await axios.get(
        `http://localhost:5005/enroll/${userId}`
      );
      const updatedEnrollments = response.data;

      const updatedCoursePromises = updatedEnrollments.map(
        async (enrollment) => {
          const courseId = enrollment.course;
          const courseResponse = await axios.get(
            `http://localhost:5002/api/course/${courseId}`
          );
          return courseResponse.data;
        }
      );

      const updatedCourseDetails = await Promise.all(updatedCoursePromises);
      setCourses(updatedCourseDetails);

      // Recalculate progress
      const completedCourses = updatedEnrollments.filter(
        (enrollment) => enrollment.state === "completed"
      );
      const progressPercentage =
        (completedCourses.length / updatedEnrollments.length) * 100;
      setProgress(progressPercentage);
    } catch (error) {
      console.error("Error updating enrollment state:", error.message);
    }
  };

  return (
    <div className="wholepage-mycourse">
      <Navbar />
      <div className="student-stu-my-course">
        <div className="container">
          <h5>Progress: {progress.toFixed(2)}%</h5>
          <div className="row">
            {courses.map((course) => (
              <div key={course.id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="stucourse-card">
                  <div className="card">
                    <img
                      src={course.file.secure_url}
                      alt={course.name}
                      className="stucourse-image  "
                    />
                  </div>
                  <div className="stucourse-details">
                    <h3 className="student-course-name">{course.name}</h3>
                    <p className="student-course-description">
                      Description: {course.description}
                    </p>
                    <p className="student-course-price">
                      Price: ${course.price}
                    </p>
                    <p className="student-course-owner">
                      Owner: {course.owner}
                    </p>
                    <p className="student-course-video-link">
                      Video Link:{" "}
                      <a href={course.videolink}>{course.videolink}</a>
                    </p>
                    <button className="btn btn-primary">Un-Enroll</button>
                    <br />
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(course)}
                      disabled={course.status === "completed"}
                      className="course-checkbox"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default StuMyCourse;
