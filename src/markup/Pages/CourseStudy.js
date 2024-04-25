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


    useEffect(() => {
        const fetchSectionDetails = async () => {
            try {
                const response = await instance.get(`api/v1/courses/study/section/${sectionId}`);
                // Assume the API returns the entire section data needed
                const data = response.data;
                console.log(' listData: ', data);

                setSelectedContent(data);
                setSectionDetails(data);
            } catch (error) {
                console.error('Failed to fetch section details:', error);
            }
        };

        fetchSectionDetails();
    }, [sectionId]);

    const pageStyle = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    };

    const handleContentClick = async (type, id) => {
        try {
            let url;
            console.log(id);
            if (type === 'lesson') {
                url = `api/v1/courses/study/section/lesson/${id}`;
            } else if (type === 'quiz') {
                url = `api/v1/courses/study/section/quiz/${id}`;
                // Assume similar endpoint for quizzes if exists
            }
            const response = await instance.get(url);
            const data = response.data;
            setDetailedContent(data);
            console.log('response.data: ', data);
            setSelectedContent({ type, id });
        } catch (error) {
            console.error('Error fetching details:', error);
        }
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
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            );
        }

        return (
            <>
                {sectionDetails.lessons.map((lesson) => (
                    <div key={lesson.id} className='document d-flex' onClick={() => handleContentClick('lesson', lesson.id)} style={{ backgroundColor: selectedContent?.id === lesson.id ? '#ffecb7' : 'transparent', borderRadius: "10px 0 0 10px" }}>
                        {lesson.isComplete ? (
                            <i style={{ color: '#FF8A00' }} className="fa-solid fa-circle-check"></i>
                        ) : lesson.type === 'Video' ? (
                            <i className="fa-regular fa-circle-play"></i>
                        ) : (
                            <i className="fa-solid fa-book"></i>
                        )}
                        <div className='document-content'>
                            <p>{lesson.name}</p>
                            <span>{lesson.type} - {lesson.duration}min</span>
                        </div>
                    </div>
                ))}
                {sectionDetails.quizzes.map((quiz) => (
                    <div key={quiz.id} className='document d-flex' onClick={() => handleContentClick('quiz', quiz.id)} style={{ backgroundColor: selectedContent?.id === quiz.id ? '#ffecb7' : 'transparent', borderRadius: "10px 0 0 10px" }}>
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

    const [contentType, setContentType] = useState('Video');
    const renderContent = () => {
        if (!detailedContent) return <div>Select a lesson or quiz to view details.</div>;

        switch (detailedContent.type) {
            case 'Video':
                return (
                    <div className='pt-5 px-5'>
                        <iframe
                            width="100%"
                            height="550px"
                            src={detailedContent.resourceUrl}
                            title={detailedContent.name}
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                        <div className='d-flex justify-content-end' style={{marginTop:10}}>
                            {!detailedContent.isComplete && (
                                <button className='button' onClick={() => markLessonAsCompleted(detailedContent.id)}>Mark as completed</button>
                            )}
                        </div>
                    </div>
                );
            case 'Document':
                return (
                    <div className='pt-5 px-5'>
                        <div dangerouslySetInnerHTML={{ __html: detailedContent.content }}></div>
                        <div className='d-flex justify-content-end'>
                            {!detailedContent.isComplete && (
                                <button className='button' onClick={() => markLessonAsCompleted(detailedContent.id)}>Mark as completed</button>
                            )}
                        </div>
                    </div>
                );

            default:
                return <div className='pt-5 px-5 mt-5'>
                    <h3 className='text-center'>{detailedContent.title}</h3>
                    <div className="d-flex justify-content-around mt-5">
                        <div>
                            <p className='ms-5'>Total Questions: {detailedContent.totalQuestion}</p>
                            <p className='ms-5'>Number of attempt: {detailedContent.numberOfAttempt}</p>
                            <p className='ms-5'>Time: {detailedContent.duration} minutes</p>
                        </div>
                        <div className="mt-5">
                            <button className='button' onClick={() => navigate(`/courses-quiz/${detailedContent.id}`)}>Start Quiz</button>
                        </div>
                    </div>

                </div>;
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
