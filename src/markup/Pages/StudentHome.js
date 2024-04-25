import React, { useState, useEffect } from 'react';
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import PageTitle from './../Layout/PageTitle';
import background from './../../images/background/studentBackground.png';
import { useNavigate } from 'react-router-dom';
import instance from '../../helper/apis/baseApi/baseApi';


export default function StudentHome() {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {

                const response = await instance.get(`api/v1/Classes/teacher-or-student`);
                const data = response.data;
                console.log('data: ', data);
                setCourses(data);

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
                                <div key={index} style={{ border: '2px solid #D9D9D9', borderRadius: '8px', backgroundColor: '#F6F2ED', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems:'center' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <img style={{ height: '120px', width: '130px', borderRadius: '8px', marginRight: 40 }} src={course.courseImage} alt="" />
                                        <div>
                                            <p style={{ fontWeight: '500', fontSize: 20, marginBottom: 10 }}>Class Code: {course.classCode}</p>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <p style={{ fontWeight: '500', fontSize: 20, marginBottom: 10 }}>Teacher: </p>
                                                <p style={{ fontWeight: '500', fontSize: 20, marginBottom: 10, marginLeft: 10 }}>{course.teacher}</p>
                                            </div>
                                            <p style={{ fontWeight: '500', fontSize: 20, marginBottom: 10 }}>{course.courseName}</p>
                                            <div class="progress" style={{backgroundColor:'lightblue'}}>
                                                <div className='progress-bar' style={{ width: `${course.courseProgress + 50}%`, height: 40 }}>{course.courseProgress}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 7 }}>
                                            <button onClick={() => handleViewDetails(course.courseId)} style={{ backgroundColor: '#EF7E54', height: '40px', width: '100px', color: 'white', border: 'none', borderRadius: '8px' }}>View detail</button>
                                        </div>
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
