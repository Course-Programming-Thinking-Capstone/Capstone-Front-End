import instance from "../../../../../helper/apis/baseApi/baseApi";
import demo from "./../../../../../images/gallery/demo.jpg";
import React, { useState, useEffect } from "react";

const TeacherNotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await instance.get('api/v1/notifications/teacher?page=1&size=5');
        setNotifications(response.data.results);
        setUnreadCount(response.data.results.filter(n => !n.isRead).length);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id, index) => {
    let selectedNotification = notifications[index];
    if (selectedNotification.isRead) return; // Do nothing if already read

    try {
      await instance.patch(`api/v1/notifications/teacher/${id}`); // Adjust API endpoint as needed
      let updatedNotifications = [...notifications];
      updatedNotifications[index].isRead = true;
      setNotifications(updatedNotifications);
      setUnreadCount(prevCount => prevCount - 1); // Decrement unread count
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.isRead);
    const updatePromises = unreadNotifications.map(notif =>
      instance.patch(`api/v1/notifications/teacher/${notif.id}`) // Adjust API endpoint as needed
    );

    try {
      await Promise.all(updatePromises);
      let updatedNotifications = notifications.map(notif => ({ ...notif, isRead: true }));
      setNotifications(updatedNotifications);
      setUnreadCount(0); // Set unread count to zero
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return (
    <div className="teacher-notification">
      <div className="header">
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start">
            <div>
              <h5 className="mb">NOTIFICATIONS</h5>
              <hr />
            </div>
            <i class="fa-solid fa-bell"></i>
          </div>
          <div>
            <button onClick={markAllAsRead} className="btn btn-primary">
              Mark all as read
            </button>
          </div>
        </div>
      </div>
      <div className="item">
        <div className="d-flex justify-content-between">
          <div className="left d-flex justify-content-start">
            <img src={demo} alt="" />
            <div style={{ marginLeft: "20px" }}>
              <div className="d-flex justify-content-start">
                <p style={{ fontSize: "18px", fontWeight: 500 }}>
                  Course review results{" "}
                </p>
                <span>|</span>
                <span style={{ color: "#1A9CB7" }}>From Staff</span>
              </div>
              <p style={{ marginTop: "10px" }} className="mb">
                Lesson 1 is missing images and videos
              </p>
            </div>
          </div>
          <div className="right">
            <p>
              <i class="fa-regular fa-clock"></i> 09-02-2024 at 9:30 AM
            </p>
            <i
              style={{ marginTop: "10px", color: "red", float: "right" }}
              class="fa-solid fa-circle-xmark"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherNotificationComponent;
