import React, { useState, useEffect } from 'react';
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import PageTitle from './../Layout/PageTitle';
import background from './../../images/background/studentBackground.png';
import { useNavigate } from 'react-router-dom';


export default function StudentHome() {
    const [courses, setCourses] = useState([]);
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            const url = 'https://www.kidpro-production.somee.com/api/v1/Classes/teacher-or-student';
            try {

                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('student classes: ', data);
                    setCourses(data);
                } else {
                    throw new Error('Failed to fetch courses');
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const handleViewDetails = (courseId) => {
        navigate(`/courses-plan/${courseId}`); // Navigate to the course details page
    };

    return (
        <div>
            <Header />
            <div className="page-content">
                <PageTitle motherMenu="My courses" activeMenu="My courses" />
                <div style={{
                    backgroundImage: `url(${background})`,
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}>

                    <div className="container">
                        <h3>Courses being studied</h3>
                        <div>
                            {courses && courses.map((course, index) => (
                                <div key={index} className="item d-flex justify-content-around p-4 mt-4" style={{ border: '1px solid #FF8A00', borderRadius: '8px', backgroundColor: '#FCEFC9' }}>
                                    <img style={{ height: '100px', width: '100px', borderRadius: '8px' }} className='img-responsive' src={course.courseImage} alt="" />
                                    <div>
                                        <p>{course.courseName}</p>
                                        <div className='progress-bar' style={{ width: `${course.courseProgress}%` }}>{course.courseProgress}</div>
                                    </div>
                                    <div className='d-flex'>
                                        <p>Teacher:</p>
                                        <p>Nguyen Ngoc Lam</p>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <button onClick={() => handleViewDetails(course.courseId)} style={{ backgroundColor: '#EF7E54', height: '30px', width: '120px', color: 'white', border: 'none', borderRadius: '8px' }}>View detail</button>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
