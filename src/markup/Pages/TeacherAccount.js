import React, { useState } from 'react';
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import background from './../../images/background/teacherBackground.jpg';
import demo from './../../images/gallery/demo.jpg';

const TeacherNotification = () => {
    return (
        <div className='teacher-notification'>
            <div className="header">
                <div className="d-flex">
                    <div>
                        <h5>NOTIFICATIONS</h5>
                        <hr />
                    </div>
                    <i class="fa-solid fa-bell"></i>
                </div>
            </div>
        </div>
    )
}

const TeacherCourse = () => {
    return (
        <div>
            <h5>TeacherCourse</h5>
        </div>
    )
}

const TeacherSchedule = () => {
    return (
        <div>
            <h5>TeacherSchedule</h5>
        </div>
    )
}

const CreateCourse = () => {
    return (
        <div>
            <h5>Create Course</h5>
        </div>
    )
}

const CreateQuiz = () => {
    return (
        <div>
            <h5>Create Quiz</h5>
        </div>
    )
}

const TeacherSetting = () => {
    return (
        <div>
            <h5>Teacher Setting</h5>
        </div>
    )
}

export default function TeacherAccount() {
    // State to track the active menu item
    const [activeMenu, setActiveMenu] = useState('notification');

    // Function to render content based on active menu
    const renderContent = () => {
        switch (activeMenu) {
            case 'notification':
                return <TeacherNotification />;
            case 'myCourses':
                return <TeacherCourse />;
            case 'schedule':
                return <TeacherSchedule />;
            case 'teacherCourses':
                return <TeacherCourse />;
            case 'createCourse':
                return <CreateCourse />;
            case 'createQuiz':
                return <CreateQuiz />;
            case 'teacherSetting':
                return <TeacherSetting />;

            default:
                return <TeacherNotification />;
        }
    };

    const getMenuItemStyle = (menuItem) => {
        return menuItem === activeMenu ? { backgroundColor: '#F69E4A', color: 'white' } : {}; // Example: light grey background for active menu
    };

    return (
        <div>
            <div style={{
                backgroundImage: `url(${background})`, minHeight: '800px', backgroundPosition: 'center center', // Center the background image
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="teacher-account container">
                    <div className="row">
                        <div className="menu col-lg-3">
                            <div className="d-flex justify-content-center">
                                <img src={demo} alt="" />
                            </div>
                            <h5 className='text-center'>Kim Jennie</h5>
                            <div className="d-flex justify-content-center">
                                <button>Edit profile</button>
                            </div>
                            <div className="info d-flex justify-content-center">
                                <div className="d-flex">
                                    <div>
                                        <p className='mb text-center'>10</p>
                                        <span>Student</span>
                                    </div>
                                    <div>
                                        <p className='mb text-center'>8</p>
                                        <span>Course</span>
                                    </div>
                                </div>
                            </div>
                            <div className="menu-content">


                                <div className='item d-flex justify-content-start' style={getMenuItemStyle('notification')} onClick={() => setActiveMenu('notification')}>
                                    <i class="fa-solid fa-bell"></i>
                                    <p className='mb'>Notification</p>
                                </div>
                                <div className='item d-flex justify-content-start' style={getMenuItemStyle('myCourses')} onClick={() => setActiveMenu('myCourses')}>
                                    <i class="fa-solid fa-book-open"></i>
                                    <p className='mb'>My courses</p>
                                </div>
                                <div className='item d-flex justify-content-start' style={getMenuItemStyle('schedule')} onClick={() => setActiveMenu('schedule')}>
                                    <i class="fa-solid fa-calendar-days"></i>
                                    <p className='mb'>Schedule</p>
                                </div>
                                <div className='item d-flex justify-content-start' style={getMenuItemStyle('teacherCourses')} onClick={() => setActiveMenu('teacherCourses')}>
                                    <i class="fa-solid fa-user"></i>
                                    <p className='mb'>My class</p>
                                </div>
                                <div className='item d-flex justify-content-start' style={getMenuItemStyle('createCourse')} onClick={() => setActiveMenu('createCourse')}>
                                    <i class="fa-solid fa-book"></i>
                                    <p className='mb'>Create course</p>
                                </div>
                                <div className='item d-flex justify-content-start' style={getMenuItemStyle('createQuiz')} onClick={() => setActiveMenu('createQuiz')}>
                                    <i class="fa-solid fa-pen-to-square"></i>
                                    <p className='mb'>Quiz</p>
                                </div>
                                <div className='item d-flex justify-content-start' style={getMenuItemStyle('teacherSetting')} onClick={() => setActiveMenu('teacherSetting')}>
                                    <i class="fa-solid fa-gear"></i>
                                    <p className='mb'>Setting</p>
                                </div>
                                <div className='item d-flex justify-content-start'>
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    <p className='mb'>Log out</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
