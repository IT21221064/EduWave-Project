import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyNotificationsPage.css';

const MyNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem('userid'); // Assuming user ID is stored in localStorage

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log(userId)
        const response = await axios.get(`http://localhost:5003/api/Notification`).then((response)=>{
            setNotifications(response.data.filter((notifications)=>notifications.userId===userId));
        })
       
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  return (
    <div className='container'>
      <h2>My Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id} className='notification'>
            <h3>{notification.title}</h3>
            <p>{notification.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyNotificationsPage;
