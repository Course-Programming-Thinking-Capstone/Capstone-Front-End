import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './../Layout/Header';
import PageTitle from './../Layout/PageTitle';
import Footer from '../Layout/Footer';
import background from './../../images/background/courseBackground.jpg';
import quiz from './../../images/gallery/Rectangle 23.png';
import instance from '../../helper/apis/baseApi/baseApi';

export default function CourseStudy() {
    const [selectedContent, setSelectedContent] = useState(null);
    const { sectionId } = useParams();
    const [sectionDetails, setSectionDetails] = useState(null);
    const [detailedContent, setDetailedContent] = useState(null);
    const navigate = useNavigate();
    const [selectedContentType, setSelectedContentType] = useState(null);
    const [selectedContentId, setSelectedContentId] = useState(null);
    useEffect(() => {
        const fetchSectionDetails = async () => {
            try {
                const response = await instance.get(`api/v1/courses/study/section/${sectionId}`);
                const data = response.data;
                setSectionDetails(data);
                if (!selectedContentType && data && data.lessons && data.lessons.length > 0) {
                    setSelectedContentType('lesson');
                    setSelectedContentId(data.lessons[0].id);
                    fetchContentData('lesson', data.lessons[0].id);
                }
            } catch (error) {
                console.error('Failed to fetch section details:', error);
            }
        };

        fetchSectionDetails();
    }, [sectionId, selectedContentType]);

    const pageStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };
    const fetchContentData = async (type, id) => {
        try {
            let url;
            if (type === 'lesson') {
                url = `api/v1/courses/study/section/lesson/${id}`;
            } else if (type === 'quiz') {
                url = `api/v1/courses/study/section/quiz/${id}`;
            }
            const response = await instance.get(url);
            const data = response.data;
            setDetailedContent(data);
            console.log("cong tets:", data);
        } catch (error) {
            console.error('Error fetching content details:', error);
        }
    };
    const handleContentClick = async (type, id) => {
        setSelectedContentType(type);
        setSelectedContentId(id);
        fetchContentData(type, id);
    };
    const markLessonAsCompleted = async (lessonId) => {
        try {
            const response = await instance.patch(`api/v1/courses/mark-lesson-completed?lessonId=${lessonId}`);

            if (response.status === 200) {
                const updatedLessons = sectionDetails.lessons.map((lesson) => {
                    if (lesson.id === lessonId) {
                        return { ...lesson, isComplete: true };
                    }
                    return lesson;
                });
                setSectionDetails({ ...sectionDetails, lessons: updatedLessons });
                if (selectedContent && selectedContent.id === lessonId) {
                    setSelectedContent((prevContent) => ({
                        ...prevContent,
                        isComplete: true,
                    }));
                }
            }
        } catch (error) {
            console.error('Error marking lesson as completed:', error);
        }
    };
    const renderSidebar = () => {
        if (!sectionDetails) {
            return (
                <div className="d-flex justify-content-center " style={{ height: '89vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>

            );
        }
        return (
            <>
                {sectionDetails.lessons.map((lesson) => (
                    <div key={lesson.id} className='document d-flex' onClick={() => handleContentClick('lesson', lesson.id)}
                        style={{
                            backgroundColor: selectedContentId === lesson.id && selectedContentType === 'lesson' ? '#ffecb7' : 'transparent', borderRadius: "10px 0 0 10px",
                            color: selectedContentId === lesson.id && selectedContentType === 'lesson' ? 'orange' : 'black',
                            fontSize: selectedContentId === lesson.id && selectedContentType === 'lesson' ? '35px' : '25px',
                            fontWeight: selectedContentId === lesson.id && selectedContentType === 'lesson' ? 'bolder' : 'normal'
                        }}>
                        {lesson.isComplete ? (
                            <i style={{ color: '#FF8A00' }} className="fa-solid fa-circle-check"></i>
                        ) : (
                            <i className="fa-regular fa-circle-play"></i>
                        )}
                        <div className='document-content'>
                            <p>{lesson.name}</p>
                            <span>{lesson.type} - {lesson.duration} min</span>
                        </div>
                    </div>
                ))}
                {sectionDetails.quizzes.map((quiz) => (
                    <div key={quiz.id} className='document d-flex' onClick={() => handleContentClick('quiz', quiz.id)} style={{
                        backgroundColor: selectedContentId === quiz.id && selectedContentType === 'quiz' ? '#ffecb7' : 'transparent', borderRadius: "10px 0 0 10px",
                        color: selectedContentId === quiz.id && selectedContentType === 'quiz' ? 'orange' : 'black',
                        fontSize: selectedContentId === quiz.id && selectedContentType === 'quiz' ? '35px' : '25px',
                        fontWeight: selectedContentId === quiz.id && selectedContentType === 'quiz' ? 'bolder' : 'normal'
                    }}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <div className='document-content'>
                            <p>{quiz.title}</p>
                            <span>Quiz - {quiz.totalQuestion} questions</span>
                        </div>
                    </div>
                ))}
            </>
        );
    };
    const renderContent = () => {
        if (!detailedContent) return <div>Select a lesson or quiz to view details.</div>;
        switch (detailedContent.type) {
            case 'Video':
                return (
                    <div className='pt-5 px-5' style={{marginTop:45}}>
                        <iframe
                            width="100%"
                            height="550px"
                            src={detailedContent.resourceUrl}
                            title={detailedContent.name}
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                        <div className='d-flex justify-content-end' style={{ marginTop: 10 }}>
                            {!detailedContent.isComplete && (
                                <button className='button' onClick={() => markLessonAsCompleted(detailedContent.id)}>Mark as completed</button>
                            )}
                        </div>
                    </div>
                );
            case 'Document':
                return (
                    <div className='pt-5 px-5'>
                        <div style={{fontSize:20,marginTop:40}} dangerouslySetInnerHTML={{ __html: detailedContent.content }}></div>
                        <div className='d-flex justify-content-end'>
                            {!detailedContent.isComplete && (
                                <button className='button' onClick={() => markLessonAsCompleted(detailedContent.id)}>Mark as completed</button>
                            )}
                        </div>
                    </div>
                );
            default:
                return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                    <div style={{
                        border: '1px solid rgba(200, 200, 200, 0.3 ', width: '50%', borderRadius: 10, paddingTop: '10px', paddingBottom: '10px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                        backgroundColor: 'rgba(200, 200, 200, 0.3)',
                    }}>
                        <h3 className='text-center'>{detailedContent.title}</h3>
                        <div >
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: 70 }}>
                                <div>
                                    <p style={{ fontSize: 20, color: 'orange', fontWeight: 'bolder' }}>Total: {detailedContent.totalQuestion} Questions</p>
                                    <p style={{ fontSize: 20, color: 'orange', fontWeight: 'bolder', marginTop: 50 }}>Time: {detailedContent.duration} minutes</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: 20, color: 'orange', fontWeight: 'bolder' }}>Retake: {detailedContent.numberOfAttempt} times</p>
                                    <p style={{ fontSize: 20, color: 'orange', fontWeight: 'bolder', marginTop: 50 }}>Total Score: {detailedContent.totalScore} đ </p>
                                </div>
                            </div>
                            <div className="d-flex flex-column align-items-center mt-5">
                                <button className='button' onClick={() => navigate(`/courses-quiz/${detailedContent.id}`)}>Start Quiz</button>
                            </div>
                        </div>
                    </div>
                </div>

        }
    };
    return (
        <div>
            <Header />
            <div className="page" style={pageStyle}>
                <PageTitle motherMenu="Courses" activeMenu="Study" />
                <div className=''>
                    <div className="study d-flex" style={{ minHeight: '700px' }}>
                        <div style={{ backgroundColor: 'white', width: '30%' }}>
                            {renderSidebar()}
                        </div>

                        <div style={{ width: '70%' }}>
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
