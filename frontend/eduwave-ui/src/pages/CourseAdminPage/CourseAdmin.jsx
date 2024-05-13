// CourseAdmin.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CourseAdmin.css"; // Import CSS file

const CourseAdmin = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch all courses
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/course");
        setCourses(response.data.filter((course) => !course.isavailable)); // Filter courses with isavailable false
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleAccept = async (id, name) => {
    try {
      // Update the course's isavailable to true
      await axios.put(`http://localhost:5002/api/course/${id}`, {
        isavailable: true,
      });
      // After updating, fetch courses again to update the table
      const response = await axios.get("http://localhost:5002/api/course");
      console.log(name);
      const description = `${name} has been accepted.`; // Include course name in description
      const title = "Accepted";
      console.log(description);
      setCourses(response.data.filter((course) => !course.isavailable));
      const userId = response.data.find((course) => course._id === id)?.owner;
      console.log(userId);
      await axios.post(`http://localhost:5003/api/Notification/`, {
        userId,
        title,
        description,
      });
    } catch (error) {
      console.error("Error accepting course:", error);
      if (error.response) {
        console.log("Error response:", error.response.data);
      }
    }
  };

  const handleReject = async (id) => {
    try {
      // Delete the course
      await axios.delete(`http://localhost:5002/api/course/${id}`);
      // After deleting, fetch courses again to update the table
      const response = await axios.get("http://localhost:5002/api/course");
      setCourses(response.data.filter((course) => !course.isavailable));
    } catch (error) {
      console.error("Error rejecting course:", error);
    }
  };

  return (
    <div className="cadmin-container">
      <h2 className="cadmin-heading">Admin Page</h2>
      <div className="cadmin-cardView">
        <table className="cadmin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Owner</th>
              <th>Image</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.description}</td>
                <td>${course.price}</td>
                <td>{course.owner}</td>
                <td>
                  <img src={course.file.secure_url} alt={course.name} />
                </td>
                <td>
                  {!course.isavailable && (
                    <>
                      <button
                        className="cadmin-accept-btn"
                        onClick={() => handleAccept(course._id, course.name)}
                      >
                        Accept
                      </button>
                      <button
                        className="cadmin-reject-btn"
                        onClick={() => handleReject(course._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseAdmin;
