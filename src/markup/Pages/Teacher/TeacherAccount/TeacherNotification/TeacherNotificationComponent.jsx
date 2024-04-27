import instance from "../../../../../helper/apis/baseApi/baseApi";
import React, { useState, useEffect } from "react";
import {
  Pagination,
  PaginationItem,
  Stack,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { filterAccountNotification } from "../../../../../helper/apis/notification/notification";
import { toast } from "react-toastify";
import { Spinner, ToastContainer } from "react-bootstrap";
import { convertUtcToLocalTime, convertUtcToLocalTimeV2, formatDateV2 } from "../../../../../helper/utils/DateUtil";

const TeacherNotificationComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  //notification
  const notifyApiFail = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const data = await filterAccountNotification({ page: currentPage, size: 4 });

        if (data.results) {
          setNotifications(data.results);
          setPageCount(data.totalPages);
        } else {
          console.error("result is empty");
        }
      } catch (error) {
        let message = "";
        if (error.response) {
          console.log(`Error response: ${error.response?.data?.message}`);
          message = error.response?.data?.message || "Undefined.";
        } else {
          console.log(`Error message abc: ${error.message}`);
          message = error.message || "Undefined.";
        }
        notifyApiFail(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [currentPage]);

  const markAsRead = async (id, index) => {
    let selectedNotification = notifications[index];
    if (selectedNotification.isRead) return; // Do nothing if already read

    try {
      await instance.patch(`api/v1/notifications/teacher/${id}`); // Adjust API endpoint as needed
      let updatedNotifications = [...notifications];
      updatedNotifications[index].isRead = true;
      setNotifications(updatedNotifications);
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
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return (
    <div className="staff-notification" style={{ backgroundColor: 'white' }}>
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
      <ToastContainer />
      <div style={{ minHeight: '470px' }}>

        {isLoading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner
              animation="border"
              variant="success"
              className="custom-spinner"
            />
          </div>
        ) : notifications?.map((notification, index) => (
          <div
            className={`item ${notification.isRead ? 'read' : ''}`}
            key={notification.id} // It's better to use id instead of index for key
            style={{ backgroundColor: notification.isRead ? '#ccc' : '#FCEFC9', borderRadius: '0 8px 8px 0', cursor: 'pointer' }}
            onClick={() => markAsRead(notification.id, index)}
          >
            <div className="d-flex justify-content-between">
              <div className="left d-flex justify-content-start">
                <div style={{ marginLeft: "20px" }}>
                  <div className="d-flex justify-content-start">
                    <p style={{ fontSize: "18px", fontWeight: 500 }}>
                      {notification.title}{" "}
                    </p>
                  </div>
                  <p style={{ marginTop: "10px" }} className="mb">
                    {notification.content}
                  </p>
                </div>
              </div>
              <div className="right" style={{ width: '15%' }}>
                <p>
                  <i class="fa-regular fa-clock"></i> {notification?.date !== null ? formatDateV2(convertUtcToLocalTimeV2(notification.date)) : ""}
                </p>
              </div>
            </div>
          </div>
        ))}

      </div>
      <div className='d-flex justify-content-center mt-4'>
        {notifications.length > 0 && (
          <div className="pagination-container">
            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
              my={2}
            >
              <Pagination
                count={pageCount <= 0 ? 1 : pageCount}
                // count={10}
                color="primary"
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{
                      previous: ArrowBack,
                      next: ArrowForward,
                    }}
                    {...item}
                  />
                )}
              />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherNotificationComponent;
