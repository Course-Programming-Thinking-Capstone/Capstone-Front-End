import React, { useState, useEffect } from 'react';
import Paginate from 'react-paginate';
import instance from '../../../../helper/apis/baseApi/baseApi';

export default function StaffNotification() {
    const [notifications, setNotifications] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await instance.get(`api/v1/notifications/account?page=${currentPage}&size=5`);
                const data = response.data;
                console.log('data: ', data);

                if (data.results) {
                    setNotifications(data.results);
                    setPageCount(data.totalPages); // Make sure totalPages is correctly accessed
                } else {
                    console.error("No data found");
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [currentPage]);


    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1); // react-paginate is zero-indexed
    };

    const markAsRead = async (id, index) => {
        const selectedNotification = notifications[index];
        if (selectedNotification.isRead) return; // Prevent marking again if already read

        // Send the update to the server
        try {
            await instance.patch(`api/v1/notifications/account/${id}`); // Ensure this endpoint is correct
            // Update locally for immediate feedback
            const updatedNotifications = notifications.map((notification, notificationIndex) => {
                if (notificationIndex === index) {
                    return { ...notification, isRead: true }; // Update the isRead property
                }
                return notification;
            });
            setNotifications(updatedNotifications);
            setUnreadCount(prevCount => prevCount - 1); // Decrement unread count
        } catch (error) {
            console.error('Error updating notification read status:', error);
        }
    };

    const markAllAsRead = async () => {
        const unreadNotifications = notifications.filter(notif => !notif.isRead);
        const markReadPromises = unreadNotifications.map(notif =>
            instance.patch(`api/v1/notifications/account/${notif.id}`)
        );

        try {
            await Promise.all(markReadPromises);
            const updatedNotifications = notifications.map(notif => ({ ...notif, isRead: true }));
            setNotifications(updatedNotifications);
            setUnreadCount(prevCount => prevCount - unreadNotifications.length); // Decrement by number of unread messages
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    return (
        <div className="staff-notification m-5" style={{ backgroundColor: 'white' }}>
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
            <div>
                {notifications.map((notification, index) => (
                    <div
                        className={`item ${notification.isRead ? 'read' : ''}`}
                        key={notification.id} // It's better to use id instead of index for key
                        style={{ backgroundColor: notification.isRead ? '#ccc' : '#FCEFC9', borderRadius: '0 8px 8px 0' }}
                        onClick={() => markAsRead(notification.id, index)}
                    >
                        <div className="d-flex justify-content-between">
                            <div className="left d-flex justify-content-start">
                                <img alt="" />
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
                                    <i class="fa-regular fa-clock"></i> {notification.date}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className='d-flex justify-content-center mt-4'>
                {notifications.length > 0 && (
                    <div className="pagination-container">
                        <Paginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
