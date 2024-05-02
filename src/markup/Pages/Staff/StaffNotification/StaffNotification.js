import React, { useState, useEffect } from 'react';
import Paginate from 'react-paginate';
import instance from '../../../../helper/apis/baseApi/baseApi';
import {
    Chip,
    Grid,
    IconButton,
    Pagination,
    PaginationItem,
    Stack,
    Tab,
    Tabs,
    Tooltip,
} from "@mui/material";
import { ArrowBack, ArrowForward, Height } from "@mui/icons-material";

export default function StaffNotification({ setUnreadCount }) {
    const [notifications, setNotifications] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await instance.get(`api/v1/notifications/account?page=${currentPage}&size=5`);
                const data = response.data;


                if (data.results) {
                    setNotifications(data.results);
                    setPageCount(data.totalPages); // Make sure totalPages is correctly accessed
                } else {

                }
            } catch (error) {

            }
        };

        fetchNotifications();
    }, [currentPage]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-indexed
        const year = date.getFullYear();

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const markAsRead = async (id, index) => {
        const selectedNotification = notifications[index];
        if (selectedNotification.isRead) return; // Prevent marking again if already read

        try {
            await instance.patch(`api/v1/notifications/account/${id}`);
            const updatedNotifications = notifications.map((notification, notificationIndex) => {
                if (notificationIndex === index) {
                    return { ...notification, isRead: true };
                }
                return notification;
            });
            setNotifications(updatedNotifications);
            setUnreadCount(prevCount => Math.max(0, prevCount - 1)); // Decrement unread count safely
        } catch (error) {

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

        }
    };

    return (
        <div className="staff-notification mx-5 my-0" style={{ backgroundColor: 'white', borderRadius: "15px", height: "90vh", overflow: "auto" }}>
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
            <div style={{ minHeight: '470px' }}>
                {notifications.map((notification, index) => (
                    <div
                        className={`item ${notification.isRead ? 'read' : ''}`}
                        key={notification.id}
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
                                    <i class="fa-regular fa-clock"></i> {formatDate(notification.date)}
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
}
