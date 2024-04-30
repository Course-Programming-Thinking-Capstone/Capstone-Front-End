import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./User.css";

export default function User() {
    const navigate = useNavigate(); // Invoke useNavigate() to get the navigate function

    // Define navigation functions for different buttons
    const toParent = () => {
        navigate('/admin/parent'); // Make sure the path matches your routing configuration
    };
    const toStudent = () => {
        navigate('/admin/student');
    };
    const toStaff = () => {
        navigate('/admin/staff');
    };
    const toTeacher = () => {
        navigate('/admin/teacher');
    };

    return (
        <div className='admin-user-container admin-user'>
            <div className="header">
                <div className="d-flex justify-content-start">
                    <div>
                        <h5>User</h5>
                        <hr />
                    </div>
                    <i className="fa-solid fa-user"></i>
                </div>
            </div>
            <div>
                <div>
                    <p className='orange mb-0 mx-5 '>EXTERNAL MEMBER</p>
                    <div className="d-flex justify-content-center mt-3">
                        <div className='d-flex justify-content-between mx-5 py-3 px-4' style={{ border: '1px solid #1A9CB7', borderRadius: '8px', width: '70%' }}>
                            <div className="d-flex justify-content-start">
                                <div className='d-flex align-items-center' style={{ width: '30px' }}>
                                    <i style={{ fontSize: '17px' }} class="fa-solid fa-user-group"></i>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <p className='mb-0 ms-4'>PARENTS</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={toParent} style={{ backgroundColor: '#1A9CB7', color: 'white', borderRadius: '8px', border: 'none', width: '100px', height: '30px' }}>View</button>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <div className='d-flex justify-content-between mx-5 py-3 px-4' style={{ border: '1px solid #1A9CB7', borderRadius: '8px', width: '70%' }}>
                            <div className="d-flex justify-content-start">
                                <div className='d-flex align-items-center' style={{ width: '30px' }}>
                                    <i style={{ fontSize: '17px' }} class="fa-solid fa-child"></i>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <p className='mb-0 ms-4'>STUDENTS</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={toStudent} style={{ backgroundColor: '#1A9CB7', color: 'white', borderRadius: '8px', border: 'none', width: '100px', height: '30px' }}>View</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='mt-5'>
                    <p className='orange mb-0 mx-5 '>INTERNAL MEMBER</p>
                    <div className="d-flex justify-content-center mt-3">
                        <div className='d-flex justify-content-between mx-5 py-3 px-4' style={{ border: '1px solid #1A9CB7', borderRadius: '8px', width: '70%' }}>
                            <div className="d-flex justify-content-start">
                                <div className='d-flex align-items-center' style={{ width: '30px' }}>
                                    <i style={{ fontSize: '17px' }} class="fa-solid fa-user-tie"></i>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <p className='mb-0 ms-4'>STAFF</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={toStaff} style={{ backgroundColor: '#1A9CB7', color: 'white', borderRadius: '8px', border: 'none', width: '100px', height: '30px' }}>View</button>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <div className='d-flex justify-content-between mx-5 py-3 px-4' style={{ border: '1px solid #1A9CB7', borderRadius: '8px', width: '70%' }}>
                            <div className="d-flex justify-content-start">
                                <div className='d-flex align-items-center' style={{ width: '30px' }}>
                                    <i style={{ fontSize: '17px' }} class="fa-solid fa-person-chalkboard"></i>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <p className='mb-0 ms-4'>TEACHER</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={toTeacher} style={{ backgroundColor: '#1A9CB7', color: 'white', borderRadius: '8px', border: 'none', width: '100px', height: '30px' }}>View</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
