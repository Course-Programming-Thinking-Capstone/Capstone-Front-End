import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import teacher from './../../images/team/teacher.png';
import Footer from '../Layout/Footer';
import Header from './../Layout/Header';
import PageTitle from './../Layout/PageTitle';
import { useNavigate } from 'react-router-dom';
import instance from '../../helper/apis/baseApi/baseApi';
import HttpsIcon from '@mui/icons-material/Https';
export default function CoursesPlan() {
    const { courseId } = useParams();
    console.log("Course ID:", courseId);
    const [courseDetails, setCourseDetails] = useState(null);
    const [linkGame, setLinkGame] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [lock, setLock] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        const fetchLinkGame = async () => {
            try {
                const response = await instance.get(`api/v1/coursegames/available`);
                const data = response.data;
                if (data.length > 0) {
                    setLinkGame(data[0].url);
                } else {
                    console.log("No games available");
                }
                console.log('Course detail data:', data);
            } catch (error) {
                console.error('Error fetching game:', error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLinkGame();
    }, []);
    useEffect(() => {
        setIsLoading(true);
        const fetchCourseDetails = async () => {
            if (!courseId) {
                console.error('Course ID is undefined!');
                return;
            }
            try {
                const response = await instance.get(`api/v1/courses/study/${courseId}`);
                const data = response.data;
                console.log('Course detail data:', data);
                setCourseDetails(data);
                const sectionIds = data.sections.map(section => section.id);
                console.log('Section IDs:', sectionIds);
                fetchCheckStudy(sectionIds);
            } catch (error) {
                console.error('Error fetching course details:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourseDetails();
    }, [courseId]);
    const fetchCheckStudy = async (sectionIds) => {
        try {
            const response = await instance.post(`api/v1/courses/check-study`, sectionIds);
            const check = response.data;
            if (check) {
                console.log("test:", check);
                setLock(check)
            } else {
                console.log("No games available");
            }
            console.log('Course detail data:', check);
        } catch (error) {
            console.error('Error fetching game:', error.message);
        }
    };
    console.log("test1:", lock);
    const LessonIcon = ({ type }) => {
        switch (type) {
            case 'Video':
                return <i className="fa-regular fa-circle-play"></i>;
            case 'Document':
                return <i className="fa-solid fa-book-open"></i>;
            default:
                return <i className="fa-solid fa-file"></i>;
        }
    };

    const navigate = useNavigate();

    const getStarted = (sectionId) => {
        navigate(`/courses-study/${sectionId}`);
    }

    const CollapsibleQuestion = ({ id, title, lessons, quizzes, isBlock }) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleCollapse = (e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
        };

        const linkClass = isOpen ? "link-open" : "link-closed";

        const handleClick = (e) => {
            if (!isBlock) {
                e.preventDefault();
                setIsOpen(!isOpen);
            }
        };
        return (
            <div className='mt-2'>
                <a
                    href={`#${id}`}
                    className={`btn btn-primary ${linkClass}`}
                    onClick={handleClick}
                    style={{ position: 'relative', display: 'inline-block' }}
                >
                    <i className="fa-solid fa-chevron-right"></i> {title}
                    {isBlock && <HttpsIcon sx={{ color: 'orange', position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }} />}
                </a><br />

                <div id={id} style={{ display: isOpen ? 'block' : 'none' }} className="collapse">
                    <div className='d-flex justify-content-between'>
                        <div className='content'>
                            {lessons.map((lesson) => (
                                <div key={lesson.id} className='document d-flex'>
                                    <LessonIcon type={lesson.type} />
                                    <div className='document-content'>
                                        <p>{lesson.name}</p>
                                        <span>{lesson.type} - {lesson.duration}min</span>
                                    </div>
                                </div>
                            ))}
                            {quizzes.map((quiz) => (
                                <div key={quiz.id} className='document d-flex'>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                    <div className='document-content'>
                                        <p>{quiz.title}</p>
                                        <span>Quiz - {quiz.totalQuestion} questions</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <button onClick={() => getStarted(id)} style={{ backgroundColor: '#FF8A00', border: 'none', color: 'white', borderRadius: '8px' }}>Get started</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div className="page-content">
                <PageTitle motherMenu="Courses" activeMenu="Courses" />
                <div className="container">
                    <div className="plan row">
                        <div className="col-lg-3" style={{ border: '3px solid #ffc887', paddingLeft: 0, paddingRight: 0, borderRadius: '10px', marginRight: 10 }}>
                            {courseDetails && courseDetails.pictureUrl && (
                                <img style={{ height: '212px', width: '300px', borderRadius: '8px', marginBottom: 10 }} src={courseDetails.pictureUrl} alt="" />
                            )}
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th className='title' style={{ borderRight: '1px dashed #ffc887', borderBottom: '1px dashed #ffc887', borderTop: '1px dashed #ffc887', color: '#777777' }}>Age</th>
                                        <td className='content' style={{ borderBottom: '1px dashed #ffc887', borderTop: '1px dashed #ffc887', color: '#777777' }}>Suitable for children 7 years and older</td>
                                    </tr>
                                    <tr>
                                        <th style={{ borderRight: '1px dashed #ffc887', borderBottom: '1px dashed #ffc887', color: '#777777' }}>Graduate</th>
                                        <td className='content' style={{ borderBottom: '1px dashed #ffc887', color: '#777777' }}>Complete all quiz with score higher than 80</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="plan-content col-lg-8">
                            {isLoading ? (
                                <div className="d-flex justify-content-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <h5>{courseDetails && courseDetails.name}</h5>
                                    </div>
                                    <div style={{ marginTop: 10 }}>
                                        <ul className='d-flex justify-content-around'>
                                            <li><i class="fa-solid fa-book-open-reader" style={{ marginRight: 10, fontSize: 20 }}></i>{courseDetails && courseDetails.totalSection} Lessons</li>
                                            <li><i class="fa-regular fa-circle-play" style={{ marginRight: 10, fontSize: 20 }}></i>{courseDetails && courseDetails.totalVideo} Videos</li>
                                            <li><i class="fa-solid fa-file-lines" style={{ marginRight: 10, fontSize: 20 }}></i>{courseDetails && courseDetails.totalDocument} Documents</li>
                                            <li><i class="fa-solid fa-pen-to-square" style={{ marginRight: 10, fontSize: 20 }}></i>{courseDetails && courseDetails.totalQuiz} Quiz</li>
                                            <li><i class="fa-solid fa-gamepad" style={{ marginRight: 10, fontSize: 20 }}></i>1 Game</li>
                                        </ul>
                                    </div>
                                    <hr />
                                    <p>{courseDetails && courseDetails.description}</p>
                                    <div>
                                        {courseDetails && courseDetails.sections.map((section, index) => (
                                            <CollapsibleQuestion
                                                key={section.id}
                                                id={`${section.id}`}
                                                title={`Section ${index + 1}: ${section.name}`}
                                                lessons={section.lessons}
                                                quizzes={section.quizzes}
                                                isBlock={lock[index]?.isBlock}
                                            />
                                        ))}

                                        <div className='d-flex justify-content-center mt-2'>
                                            <button onClick={() => linkGame && window.open(linkGame, '_blank')}
                                                style={{ backgroundColor: 'FF8A00', width: '200px', }}>
                                                <div className="d-flex justify-content-center align-items-center px-2 py-1">
                                                    <div className='d-flex justify-content-center align-items-center '>
                                                        <p className='mt-1' style={{ color: 'white', fontSize: '16px' }}>
                                                            <i class="fa-solid fa-gamepad"></i>
                                                        </p>
                                                        <p className='ms-1 mt-1' style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>Practice game</p>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                            }


                        </div>
                    </div>
                </div>
            </div >
            <Footer />
        </div >
    )
}
