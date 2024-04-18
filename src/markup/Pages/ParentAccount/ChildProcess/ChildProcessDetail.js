import React, { useState, useEffect, forwardRef, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import instance from '../../../../helper/apis/baseApi/baseApi';
import Header from './../../../Layout/Header';
import PageTitle from '../../../Layout/PageTitle';
import background from '../../../../images/background/accountBackground.jpg';
import Footer from '../../../Layout/Footer';

export default function ChildProcessDetail() {
    const { childId } = useParams();
    const [childDetails, setChildDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchChildDetails = async () => {
            setIsLoading(true);
            try {
                const response = await instance.get(`api/v1/students/detail/${childId}`);
                const data = response.data;
                console.log('data: ', data);

                setChildDetails(data);
            } catch (error) {
                console.error('Failed to fetch child details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChildDetails();
    }, [childId]);

    const handleCourseClick = (courseId) => {
        navigate(`/course-process/${childId}/${courseId}`);
    };

    return (
        <div>
            <Header />
            <PageTitle />
            <div style={{
                backgroundImage: `url(${background})`, minHeight: '800px', backgroundPosition: 'center center', // Center the background image
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="container">
                    {isLoading ? (
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        childDetails ? (
                            <div>
                                <div>
                                    <h5>Child's information</h5>
                                    <div>
                                        <p>Name: {childDetails.fullName}</p>
                                        <p>Age: {childDetails.dateOfBirth}</p>
                                        <p>Gender: {childDetails.gender}</p>
                                        <p>Status: {childDetails.status}</p>
                                    </div>
                                </div>
                                <div className='mx-3 px-5 py-3' style={{ backgroundColor: 'white' }}>
                                    <h5>Course registered</h5>
                                    <div className='d-flex justify-content-between'>
                                        <div style={{ width: '30%' }}>
                                            <p className='text-center'>Total number of courses</p>

                                            <div className='d-flex justify-content-center' >
                                                <div className='text-center pt-1' style={{ height: '40px', width: '40px', border: '2px solid #FF8A00', borderRadius: '50%', color: '#FF8A00', fontSize: '17px', fontWeight: 'bold' }}>

                                                    {childDetails.studentsCourse ? childDetails.studentsCourse.length : 0}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{ width: '60%' }}>
                                            {childDetails.studentsCourse && childDetails.studentsCourse.map((course, index) => (
                                                <div onClick={() => handleCourseClick(course.courseId)} className='mt-3 px-3 py-3 d-flex justify-content-between align-items-center' key={index} style={{ border: '1px solid #1A9CB7', borderRadius: '8px', color: '#1A9CB7' }}>
                                                    <div className="d-flex justify-content-start">
                                                        <p className='mb-0'>
                                                            <i class="fa-solid fa-book ms-3"></i>
                                                        </p>
                                                        <p className='mb-0 ms-3'>{course.courseName}</p>
                                                    </div>
                                                    <div>
                                                        <p className='mb-0'>
                                                            <i class="fa-solid fa-arrow-right"></i>
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Child details not available.</p> 
                        )
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}
