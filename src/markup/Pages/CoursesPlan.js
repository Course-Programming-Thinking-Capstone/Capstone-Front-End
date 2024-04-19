import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import teacher from './../../images/team/teacher.png';
import Footer from '../Layout/Footer';
import Header from './../Layout/Header';
import PageTitle from './../Layout/PageTitle';
import { useNavigate } from 'react-router-dom';
import instance from '../../helper/apis/baseApi/baseApi';

export default function CoursesPlan() {
    const { courseId } = useParams();
    console.log("Course ID:", courseId);
    const accessToken = localStorage.getItem('accessToken');
    const [courseDetails, setCourseDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

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

                console.log('Course detail data:', data); // Check the fetched data
                setCourseDetails(data);
            } catch (error) {
                console.error('Error fetching course details:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourseDetails();
    }, [courseId, accessToken]);

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

    const CollapsibleQuestion = ({ id, title, lessons, quizzes }) => {
        const [isOpen, setIsOpen] = useState(false);

        const toggleCollapse = (e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
        };

        const linkClass = isOpen ? "link-open" : "link-closed";

        return (
            <div className='mt-2'>
                <a
                    href={`#${id}`}
                    className={`btn btn-primary ${linkClass}`}
                    onClick={toggleCollapse}
                >
                    <i className="fa-solid fa-chevron-right"></i> {title}
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
                            <div className='document d-flex'>
                                <i className="fa-solid fa-gamepad"></i>
                                <div className='document-content'>
                                    <p>Practice game</p>
                                    <span>Map 1 - Level 1</span>
                                </div>
                            </div>
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
                <button onClick={getStarted} style={{ backgroundColor: '#FF8A00', border: 'none', color: 'white', borderRadius: '8px' }}>Get started</button>
                    <div className="plan row">
                        <div className="col-lg-3">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td className='title'>Age</td>
                                        <td className='content'>Suitable for children 7 years and older</td>
                                    </tr>
                                    <tr>
                                        <td>Language</td>
                                        <td className='content'>English/Vietnamese</td>
                                    </tr>
                                    <tr>
                                        <td>Graduate</td>
                                        <td className='content'>Complete all quiz with score higher than 80</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="plan-content col-lg-9">
                            {isLoading ? (
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                <div>
                                    <h5>{courseDetails && courseDetails.name}</h5>
                                    <div>
                                        <ul className='d-flex justify-content-around'>
                                            <li><i class="fa-solid fa-book-open-reader"></i>{courseDetails && courseDetails.totalLesson}  Lessons</li>
                                            <li><i class="fa-regular fa-circle-play"></i>{courseDetails && courseDetails.totalVideo}  Videos</li>
                                            <li><i class="fa-solid fa-file-lines"></i>{courseDetails && courseDetails.totalDocument}  Documents</li>
                                            <li><i class="fa-solid fa-pen-to-square"></i>{courseDetails && courseDetails.totalQuiz}  Quiz</li>
                                            <li><i class="fa-solid fa-gamepad"></i>1  Game</li>
                                        </ul>
                                    </div>
                                    <hr />
                                    <p>{courseDetails && courseDetails.description}</p>
                                    <div>
                                        {courseDetails && courseDetails.sections.map((section) => (
                                            <CollapsibleQuestion
                                                key={section.id}
                                                id={`${section.id}`}
                                                title={`Section: ${section.name}`}
                                                lessons={section.lessons}
                                                quizzes={section.quizzes}
                                            />
                                        ))}
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
