import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyNotificationsPage.css";

const MyNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(""); // State to store user ID
  const [userName, setUserName] = useState(""); // State to store user name
  const tutorUsername = localStorage.getItem("username");
  const filteredNotifications = notifications.filter((notification) => {
    return notification.userId === tutorUsername;
  });

  useEffect(() => {
    // Fetch user ID from localStorage
    const storedUserId = localStorage.getItem("userid");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      console.error("User ID not found in localStorage");
    }

    // Set userName to tutorUsername
    setUserName(tutorUsername);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log("Fetching notifications for user:", userName);

        const response = await axios.get(
          `http://localhost:5003/api/Notification`
        );
        console.log("API Response:", response);

        if (response && response.data) {
          setNotifications(response.data);
        } else {
          console.error("Empty response or missing data");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    // Fetch notifications when userName changes
    if (userName) {
      fetchNotifications();
    }
  }, [userName, userId]); // Add userId as dependency

  return (
    <div className="container">
      <h2>My Notifications</h2>
      <ul>
        {filteredNotifications.map((notification) => (
          <li key={notification._id} className="notification">
            <h3>{notification.title}</h3>
            <p>{notification.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyNotificationsPage;
