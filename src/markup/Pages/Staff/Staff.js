import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import demo from '../../../images/gallery/demo.jpg';
import simp from '../../../images/gallery/simp.jpg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import StaffOrder from './StaffOrder/StaffOrder';
import background from './../../../images/background/adminStaffBackground.jpg';

const StaffNotification = () => {
    return (
        <div className='staff-notification'>
            <div className="header">
                <div className="d-flex justify-content-start">
                    <div>
                        <h5 className='mb'>NOTIFICATIONS</h5>
                        <hr />
                    </div>
                    <i class="fa-solid fa-bell"></i>
                </div>
            </div>
            <div className="item">
                <div className="d-flex justify-content-between">
                    <div className="left d-flex justify-content-start">
                        <img src={demo} alt="" />
                        <div style={{ marginLeft: '20px' }}>
                            <div className='d-flex justify-content-start'>
                                <p style={{ fontSize: '18px', fontWeight: 500 }}>Course review results </p>
                                <span>|</span>
                                <span style={{ color: '#1A9CB7' }}>From Staff</span>
                            </div>
                            <p style={{ marginTop: '10px' }} className='mb'>Lesson 1 is missing images and videos</p>
                        </div>
                    </div>
                    <div className='right'>
                        <p><i class="fa-regular fa-clock"></i>  09-02-2024 at 9:30 AM</p>
                        <i style={{ marginTop: '10px', color: 'red', float: 'right' }} class="fa-solid fa-circle-xmark"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Staff() {
    const [activeContent, setActiveContent] = useState('');
    const [activeItem, setActiveItem] = useState('');
    const location = useLocation();

    const navigate = useNavigate();

    const handleMenuItemClick = (path) => {
        navigate(`/staff/${path.toLowerCase()}`); // Adjust path as needed
    };

    const handleLogout = () => {
        localStorage.clear(); // Clear the local storage
        navigate('/login'); // Navigate to login page
    };

    const getItemClass = (itemName) => {
        return `item d-flex justify-content-start ${activeItem === itemName ? 'active' : ''}`;
    };

    useEffect(() => {
        const pathSegments = location.pathname.split('/');
        let activePath = pathSegments[2];
        let activeMenu;

        if (activePath && activePath.includes('staff-order')) {
            activeMenu = 'Order';
        } else {
            activeMenu = activePath ? activePath.charAt(0).toUpperCase() + activePath.slice(1) : '';
        }

        setActiveItem(activeMenu);
    }, [location]);



    return (
        <div>
            <div className="staff row">
                <div className="menu col-lg-2">
                    <div className="logo text-center">
                        <h5>KidsPro</h5>
                    </div>
                    <div>
                        <div className={getItemClass('Notification')} onClick={() => handleMenuItemClick('Notification')}>
                            <i class="fa-solid fa-bell"></i>
                            <span>Notification</span>
                        </div>
                        <div className={getItemClass('Moderating')} onClick={() => handleMenuItemClick('Moderating')}>
                            <i class="fa-solid fa-circle-stop"></i>
                            <span>Moderating</span>
                        </div>
                        <div className={getItemClass('Order')} onClick={() => handleMenuItemClick('staff-order')}>
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span>Order</span>
                        </div>
                        <div className={getItemClass('Class')} onClick={() => handleMenuItemClick('Class')}>
                            <i class="fa-solid fa-user"></i>
                            <span>Class</span>
                        </div>
                        <div className={getItemClass('Course')} onClick={() => handleMenuItemClick('Course')}>
                            <i class="fa-solid fa-book"></i>
                            <span>Course</span>
                        </div>
                        <div className="item d-flex justify-content-start" onClick={handleLogout}>
                            <i class="fa-solid fa-right-from-bracket"></i>
                            <span>Log out</span>
                        </div>
                    </div>
                </div>

                <div className='col-lg-10' style={{
                    backgroundImage: `url(${background})`, backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat', height: '100vh', overflow: 'hidden'
                }}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
