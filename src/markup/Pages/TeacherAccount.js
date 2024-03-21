import React, { useState, useEffect } from 'react';
import background from './../../images/background/teacherBackground.jpg';
import demo from './../../images/gallery/demo.jpg';
import simp from './../../images/gallery/simp.jpg';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import DatePicker from 'react-datepicker';

const TeacherNotification = () => {
    return (
        <div className='teacher-notification'>
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
    )
}

const TeacherCourse = () => {
    const [activeMenu, setActiveMenu] = useState('all');

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const renderContent = () => {
        switch (activeMenu) {
            case 'all':
                return <div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="item finish">
                                <img src={simp} alt="" />
                                <p>
                                    What is programming?
                                </p>
                                <span>Finished</span>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div className="item censor">
                                <img src={simp} alt="" />
                                <p>
                                    What is programming?
                                </p>
                                <span>Censoring</span>
                            </div>
                        </div>



                    </div>
                </div>;
            case 'finished':
                return <div>Finished Courses Content</div>;
            case 'censoring':
                return <div>Censoring Courses Content</div>;
            default:
                return <div>Default Content</div>;
        }
    };

    return (
        <div className='teacher-course'>
            <div className="header">
                <div className="d-flex justify-content-start">
                    <div>
                        <h5 className='mb'>My courses</h5>
                        <hr />
                    </div>
                    <i class="fa-solid fa-book-open"></i>
                </div>
            </div>
            <div className="sub-menu d-flex justify-content-start">
                <div onClick={() => handleMenuClick('all')} className={activeMenu === 'all' ? 'active' : ''}>
                    <p className='mb'>All course</p>
                    <hr />
                </div>
                <div style={{ marginLeft: '15px' }} onClick={() => handleMenuClick('finished')} className={activeMenu === 'finished' ? 'active' : ''}>
                    <p className='mb'>Finished</p>
                    <hr />
                </div>
                <div style={{ marginLeft: '15px' }} onClick={() => handleMenuClick('censoring')} className={activeMenu === 'censoring' ? 'active' : ''}>
                    <p className='mb'>Censoring</p>
                    <hr />
                </div>
            </div>
            <div className='search'>
                <div className="content d-flex justify-content-start">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder='Search courses' />
                </div>
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    )
}

const TeacherSchedule = () => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'timeGridWeek,timeGridDay'
            }}
            height="auto"
            hiddenDays={[0]}
            slotMinTime="07:00:00"
            slotMaxTime="23:00:00"
        />
    )
}

const TeacherClasses = () => {
    return (
        <div className='teacher-classes'>
            <div className="header">
                <div className="d-flex justify-content-start">
                    <div>
                        <h5 className='mb'>My classes</h5>
                        <hr />
                    </div>
                    <i class="fa-solid fa-user"></i>
                </div>
            </div>
            <div className="teacher-classes-content">
                <h5>STUDENT IN EACH CLASS</h5>
                <div className="row" style={{ marginTop: '25px' }}>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="d-flex justify-content-start" style={{ marginTop: '25px' }}>
                            <p style={{ color: '#FF8A00' }} className='mb'>CLASS</p>
                            <select style={{ marginLeft: '15px' }} name="" id="">
                                <option value="">Class 1</option>
                                <option value="">Class 2</option>
                                <option value="">Class 3</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="right">
                            <div className="d-flex">
                                <p style={{ color: '#F15C58' }} className='mb'>Course</p>
                                <span style={{ backgroundColor: 'white', border: '1px solid #1A9CB7', borderRadius: '10px', padding: '0px 5px' }}>What is programming?</span>
                            </div>
                            <div className="d-flex" style={{ paddingRight: '50px', marginTop: '15px' }}>
                                <p style={{ color: '#F15C58' }} className='mb'>Number of students</p>
                                <span>10</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-borderless">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Age</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='item'>
                                <td>1</td>
                                <td><img className='img-responsive' style={{ height: '50px', width: '50px' }} src={demo} alt="" /></td>
                                <td>Pitt</td>
                                <td>35</td>
                                <td>New York</td>
                                <td>USA</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

const Syllabus = () => {
    const [currentComponent, setCurrentComponent] = useState('default');
    const [currentPageData, setCurrentPageData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [courseStructure, setCourseStructure] = useState({});
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [courseData, setCourseData] = useState({
        description: "Test create course",
        sections: [
            {
                id: 1,
                lessons: [],
                quizzes: []
            }
            // Add other sections as needed
        ]
    });

    const NewVideo = ({ removeSelf }) => {
        const [isVideoCollapseOpen, setIsVideoCollapseOpen] = useState(false);

        const toggleVideoCollapse = () => {
            setIsVideoCollapseOpen(!isVideoCollapseOpen);
        };

        const sectionActiveStyle = {
            borderBottom: "none",
        };

        return (
            <div style={{ marginTop: '15px' }}>
                <div className={`section d-flex justify-content-between ${isVideoCollapseOpen ? 'active' : ''}`}
                    style={isVideoCollapseOpen ? sectionActiveStyle : {}}
                    onClick={toggleVideoCollapse}>
                    <p className='mb-0 blue'>Video 1</p>
                    {isVideoCollapseOpen ? (
                        <div className="d-flex">
                            <i style={{ marginRight: '15px' }} class="fa-solid fa-circle-minus" onClick={removeSelf}></i>
                            <i className="fa-solid fa-chevron-up"></i>
                        </div>
                    ) : (
                        <div className="d-flex">
                            <i style={{ marginRight: '15px' }} class="fa-solid fa-circle-minus" onClick={removeSelf}></i>
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                    )}
                </div>

                {isVideoCollapseOpen && (
                    <div className='video-collapse'>
                        <p className='title red'>Video's title</p>
                        <input type="text" placeholder="Video's title" style={{ width: '100%', paddingLeft: '15px' }} />

                        <p style={{ marginTop: '15px' }} className='title red'>Upload a video file</p>
                        <p className='mb-0'>Max size <span className='orange'>500Mb</span>. The required type of video is <span className='orange'>MP4</span>.</p>
                        <button className='button'><i className="fa-solid fa-circle-plus"></i>           Upload file</button>
                    </div>
                )}
            </div>
        );
    };

    const NewQuiz = ({ removeSelf }) => {
        const [isQuizCollapseOpen, setIsQuizCollapseOpen] = useState(false);
        const [questions, setQuestions] = useState([
            { choices: ['', '', '', ''], correctAnswer: null }
        ]);


        const toggleQuizCollapse = () => {
            setIsQuizCollapseOpen(!isQuizCollapseOpen);
        };

        const sectionActiveStyle = {
            borderBottom: "none",
        };

        const addQuestion = () => {
            setQuestions([...questions, { choices: ['', '', '', ''], correctAnswer: null }]);
        };

        const saveQuiz = () => {
            const formattedQuestions = questions.map(question => ({
                title: question.title,
                options: question.choices.map((choice, index) => ({
                    content: choice,
                    isCorrect: index === question.correctAnswer
                }))
            }));

        };

        const updateChoice = (questionIndex, choiceIndex, value) => {
            const newQuestions = questions.map((question, qIndex) => {
                if (qIndex === questionIndex) {
                    const newChoices = [...question.choices];
                    newChoices[choiceIndex] = value;
                    return { ...question, choices: newChoices };
                }
                return question;
            });
            setQuestions(newQuestions);
        };

        const markAsCorrect = (questionIndex, choiceIndex) => {
            const newQuestions = questions.map((question, qIndex) => {
                if (qIndex === questionIndex) {
                    return { ...question, correctAnswer: choiceIndex };
                }
                return question;
            });
            setQuestions(newQuestions);
        };

        const removeQuestion = (questionIndex) => {
            const updatedQuestions = questions.filter((_, index) => index !== questionIndex);
            setQuestions(updatedQuestions);
        };

        const newQuestion = (index) => {
            return (
                <div key={index} className='question' style={{ marginTop: '20px' }}>
                    <div className="d-flex justify-content-end" style={{ backgroundColor: '#F6D3C8', borderRadius: '5px 5px 0px 0px', padding: '5px 25px', height: '30px' }}><i onClick={(e) => {
                        e.stopPropagation(); // Prevent click event from bubbling up
                        removeQuestion(index);
                    }} class="fa-solid fa-trash-can"></i></div>
                    <div className="question-content">
                        <p className='title red'>Question</p>
                        <input style={{ border: 'none', borderBottom: '1px solid #212121CC', outline: 'none', width: '100%' }} type="text" placeholder='Write question' />

                        <p className='title red'>Multiple choices (Select the correct choice)</p>
                        {questions[index].choices.map((choice, choiceIndex) => (
                            <div key={choiceIndex} className="d-flex justify-content-start" style={{ marginTop: '10px' }}>
                                <i
                                    className={`mt-1 fa-regular ${questions[index].correctAnswer === choiceIndex ? 'fa-solid fa-circle' : 'fa-regular fa-circle'}`}
                                    onClick={() => markAsCorrect(index, choiceIndex)}
                                    style={{ cursor: 'pointer', marginRight: '10px', color: '#FF8A00' }}
                                ></i>
                                <input
                                    type="text"
                                    placeholder={`Enter question's ${choiceIndex + 1} choice`}
                                    value={choice}
                                    style={{ width: '300px', outline: 'none' }}
                                    onChange={(e) => updateChoice(index, choiceIndex, e.target.value)}
                                />
                            </div>
                        ))}

                    </div>
                </div>
            );
        }

        return (
            <div style={{ marginTop: '15px' }}>
                <div className={`section d-flex justify-content-between ${isQuizCollapseOpen ? 'active' : ''}`}
                    style={isQuizCollapseOpen ? sectionActiveStyle : {}}
                    onClick={toggleQuizCollapse}>
                    <p className='mb-0 blue'>Quiz</p>
                    {isQuizCollapseOpen ? (
                        <div className="d-flex">
                            <i style={{ marginRight: '15px' }} class="fa-solid fa-circle-minus" onClick={removeSelf}></i>
                            <i className="fa-solid fa-chevron-up"></i>
                        </div>
                    ) : (
                        <div className="d-flex">
                            <i style={{ marginRight: '15px' }} class="fa-solid fa-circle-minus" onClick={removeSelf}></i>
                            <i class="fa-solid fa-chevron-down"></i>
                        </div>
                    )}
                </div>

                {isQuizCollapseOpen && (
                    <div className='quiz-collapse'>
                        <p className='title red mb-0'>Set test time</p>
                        <span style={{ fontSize: '12px', color: '#7F7C7C' }}>The minimum exam time is 5 minutes and the maximum is 20 minutes</span><br />
                        <input style={{ width: '50px', outline: 'none' }} type="number" placeholder='10' />

                        <p className='title red'>Quiz Content</p>

                        <div className="render-question">
                            {questions.map((_, index) => newQuestion(index))}
                        </div>

                        <div className="d-flex justify-content-center">
                            <button onClick={addQuestion}>Add question</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    const NewDocument = ({ sectionId, title, content, removeSelf, handleDocumentChange }) => {
        const [documentTitle, setDocumentTitle] = useState(title || '');
        const [documentContent, setDocumentContent] = useState(content || '');
        const [isDocCollapseOpen, setIsDocCollapseOpen] = useState(false);

        const toggleDocCollapse = () => {
            setIsDocCollapseOpen(!isDocCollapseOpen);
        };

        // Call handleDocumentChange when the title changes
        const onTitleChange = (e) => {
            const newTitle = e.target.value;
            setDocumentTitle(newTitle);
            handleDocumentChange(sectionId, 'title', newTitle);
        };

        // Call handleDocumentChange when the content changes
        const onContentChange = (e) => {
            const newContent = e.target.value;
            setDocumentContent(newContent);
            handleDocumentChange(sectionId, 'content', newContent);
        };

        return (
            <div style={{ marginTop: '15px' }}>
                <div className={`section d-flex justify-content-between ${isDocCollapseOpen ? 'active' : ''}`}
                    style={isDocCollapseOpen ? { borderBottom: "none" } : {}}
                    onClick={toggleDocCollapse}>
                    <p className='mb-0 blue'>Document 1</p>
                    {isDocCollapseOpen ? (
                        <div className="d-flex">
                            <i style={{ marginRight: '15px' }} className="fa-solid fa-circle-minus" onClick={removeSelf}></i>
                            <i className="fa-solid fa-chevron-up"></i>
                        </div>
                    ) : (
                        <div className="d-flex">
                            <i style={{ marginRight: '15px' }} className="fa-solid fa-circle-minus" onClick={removeSelf}></i>
                            <i className="fa-solid fa-chevron-down"></i>
                        </div>
                    )}
                </div>

                {isDocCollapseOpen && (
                    <div className='doc-collapse'>
                        <p className='title red'>Document's title</p>
                        <input
                            type="text"
                            placeholder="Document's title"
                            style={{ width: '100%', paddingLeft: '15px' }}
                            value={documentTitle}
                            onChange={onTitleChange} // Correct usage
                        />


                        <p className='title red'>Description</p>
                        <textarea
                            rows="4"
                            placeholder="Write document's description"
                            style={{ width: '100%' }}
                            value={documentContent}
                            onChange={onContentChange}
                        ></textarea>
                    </div>
                )}
            </div>
        );
    };

    const formatSectionData = (section) => {
        return {
            id: section.id,
            lessons: section.lessons.map(lesson => {
                // Format each lesson based on its type
                if (lesson.type === "Video") {
                    return {
                        name: lesson.name,
                        resourceUrl: lesson.resourceUrl,
                        type: "Video",
                    };
                } else if (lesson.type === "Document") {
                    return {
                        name: lesson.name,
                        content: lesson.content,
                        type: "Document"
                    };
                }
            }),
            quizzes: section.quizzes.map(quiz => {
                return {
                    title: quiz.title,
                    description: quiz.description,
                    duration: quiz.duration,
                    numberOfAttempt: quiz.numberOfAttempt,
                    questions: quiz.questions.map(question => {
                        return {
                            title: question.title,
                            score: question.score,
                            options: question.options.map(option => {
                                return {
                                    content: option.content,
                                    answerExplain: option.answerExplain,
                                    isCorrect: option.isCorrect
                                };
                            })
                        };
                    })
                };
            })
        };
    };

    const saveSectionContent = async (sectionId) => {
        const section = courseData.sections.find(s => s.id === sectionId);
        const formattedSectionData = formatSectionData(section);

        // Prepare the full course data in the required format
        const dataToSend = {
            ...courseData,
            sections: [formattedSectionData] // This example assumes updating one section at a time
        };

        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`https://www.kidpro-production.somee.com/api/v1/courses/${courseData.id}?action=Save`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(dataToSend)
            });

            if (!response.ok) {
                throw new Error('Failed to save section content.');
            }

            const responseData = await response.json();
            console.log('Section content saved successfully:', responseData);
            // Handle further actions here, like notifying the user
        } catch (error) {
            console.error('Error saving section content:', error);
            // Handle error, like showing an error message
        }
    };

    useEffect(() => {
        setIsLoading(true);
        const accessToken = localStorage.getItem('accessToken');

        const fetchData = () => {
            fetch('https://www.kidpro-production.somee.com/api/v1/courses?status=Draft&action=manage', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log('data: ', data.results);
                    setCurrentPageData(data.results);
                })
                .catch(error => console.error('Error fetching data:', error))
                .finally(() => {
                    setIsLoading(false);
                });;
        };
        fetchData();
    }, []);

    const fetchCourseData = (id) => {
        setIsLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        fetch(`https://www.kidpro-production.somee.com/api/v1/courses/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setSelectedCourse(data); // Set the selected course data
                setCurrentComponent('syllabusInformation'); // Switch to syllabusInformation component
                setIsLoading(false);
            })
            .catch(error => console.error('Error fetching course data:', error));
    };

    const SyllabusInformation = ({ goBack }) => {
        if (!selectedCourse) {
            return (
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            );
        }
        return (
            <div>
                <div className="header">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-start">
                            <div>
                                <h5 className='mb'>CREATE COURSE</h5>
                                <hr />
                            </div>
                            <i class="fa-solid fa-book"></i>
                        </div>
                        <div>
                            <button onClick={goBack}>Back</button>
                        </div>
                    </div>

                </div>
                <div className='syllabus-content'>
                    <div className='pt-2 px-4 pb-2'>
                        <div className="d-flex">
                            <div style={{ width: '120px' }}>
                                <p className='blue'>Course title</p>
                            </div>
                            <div>
                                <p>{selectedCourse.name}</p>
                            </div>
                        </div>
                        <div className="d-flex" >
                            <div style={{ width: '170px' }}>
                                <p className='blue'>Course target</p>
                            </div>
                            <div>
                                <p>{selectedCourse.courseTarget}</p>
                            </div>
                        </div>
                        <div className="d-flex" >
                            <div style={{ width: '120px' }}>
                                <p className='blue'>Section</p>
                            </div>
                            <div>
                                {selectedCourse && selectedCourse.sections.map((section, index) => (
                                    <div key={index}>{section.name}</div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className='mb-0 blue'>Evaluation methods</p>
                            <div style={{ marginLeft: '200px' }}>
                                <div className="d-flex">
                                    <p className='mb-0 pt-1'>Quiz section</p>
                                    <span style={{ border: '1px solid #F69E4A', borderRadius: '5px', padding: '2px', marginLeft: '10px' }}>30%</span>
                                </div>
                                <div className="d-flex mt-2">
                                    <p className='mb-0 pt-1'>Quiz total</p>
                                    <span style={{ border: '1px solid #F69E4A', borderRadius: '5px', padding: '2px', marginLeft: '30px' }}>50%</span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button onClick={() => setCurrentComponent('createCourse')} style={{ backgroundColor: '#FD8569', color: 'white', border: 'none', borderRadius: '5px', height: '40px', width: '150px' }}>CREATE COURSE</button>
                        </div>
                    </div>

                </div>
            </div>

        );
    }

    const CreateCourse = ({ selectedCourse, goBack }) => {
        const initializedCourseStructure = {
            ...selectedCourse,
            sections: selectedCourse.sections.map(section => ({
                ...section,
                contentTypes: section.contentTypes || [] // Ensure each section has a contentTypes array
            })),
        };

        const [courseStructure, setCourseStructure] = useState(initializedCourseStructure);

        const saveSectionContent = (sectionId) => {
            const updatedContentItems = courseStructure.sections.find(section => section.id === sectionId)?.contentTypes.map(contentType => {
                // This is a simplified representation. You'll need to fetch the actual updated content from your state or components
                return {
                    ...contentType,
                    // title: Updated title from state or component,
                    // content: Updated content from state or component,
                };
            });

            // Update the course structure with the updated content items for the section
            const updatedSections = courseStructure.sections.map(section => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        contentTypes: updatedContentItems, // Assuming 'contentTypes' holds your content items
                    };
                }
                return section;
            });

            // Update the course structure state
            setCourseStructure(prevState => ({
                ...prevState,
                sections: updatedSections,
            }));

            // Here you can also make an API call to save the updated section content to the server
        };


        const handleDocumentChange = (sectionId, fieldName, value) => {
            // Update the course structure with the new document details
            const updatedSections = courseStructure.sections.map((section) => {
                if (section.id === sectionId) {
                    // Update the document within the found section
                    const updatedDocument = { ...section.document, [fieldName]: value };
                    return { ...section, document: updatedDocument };
                }
                return section;
            });

            // Update the course structure state
            setCourseStructure((prevState) => ({
                ...prevState,
                sections: updatedSections,
            }));
        };



        // Function to add a new content type to a section
        const addContentTypeToSection = (sectionId, contentType) => {
            const updatedCourseStructure = { ...courseStructure };
            const sectionIndex = updatedCourseStructure.sections.findIndex(section => section.id === sectionId);
            if (sectionIndex > -1) {
                const newContentType = {
                    id: Math.random().toString(36).substr(2, 9), // Generate a pseudo-random ID
                    type: contentType,
                };
                updatedCourseStructure.sections[sectionIndex].contentTypes.push(newContentType);
                setCourseStructure(updatedCourseStructure);
            }
        };

        // Function to remove a content type from a section
        const removeContentType = (sectionId, contentTypeId) => {
            const updatedCourseStructure = { ...courseStructure };
            const sectionIndex = updatedCourseStructure.sections.findIndex(section => section.id === sectionId);
            if (sectionIndex > -1) {
                updatedCourseStructure.sections[sectionIndex].contentTypes = updatedCourseStructure.sections[sectionIndex].contentTypes.filter(contentType => contentType.id !== contentTypeId);
                setCourseStructure(updatedCourseStructure);
            }
        };

        // Function to render content types based on the state
        const renderContentTypes = (section) => {
            if (!Array.isArray(section.contentTypes)) {
                // If contentTypes is not an array, return null or an appropriate fallback
                return null;
            }

            return section.contentTypes.map((contentType) => {
                switch (contentType.type) {
                    case 'video':
                        return <NewVideo key={contentType.id} removeSelf={() => removeContentType(section.id, contentType.id)} />;
                    case 'document':
                        return (
                            <NewDocument
                                key={contentType.id}
                                sectionId={section.id}
                                title={section.document ? section.document.title : ''}
                                content={section.document ? section.document.content : ''}
                                removeSelf={() => removeContentType(section.id, contentType.id)}
                                handleDocumentChange={handleDocumentChange} // Pass the function here
                            />

                        );
                    case 'quiz':
                        return <NewQuiz key={contentType.id} removeSelf={() => removeContentType(section.id, contentType.id)} />;
                    default:
                        return null;
                }
            });
        };

        return (
            <div className='teacher-create'>
                <div className='create-course'>
                    <div className="header">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex justify-content-start">
                                <div>
                                    <h5 className='mb'>CREATE COURSE</h5>
                                    <hr />
                                </div>
                                <i class="fa-solid fa-book"></i>
                            </div>
                            <div>
                                <button onClick={goBack}>Back</button>
                            </div>
                        </div>
                    </div>
                    <div className="create-course-content">
                        <div style={{ padding: '10px 20px' }}>
                            <div className='d-flex'>
                                <div className="d-flex justify-content-start">
                                    <p className='title blue'>Course Title</p>
                                </div>
                                <div><p>{courseStructure.name}</p></div>
                            </div>

                            <div>
                                <div className="d-flex justify-content-start">
                                    <p className='title blue'>Section</p>
                                    <span className='sub-title orange'>*</span>
                                </div>

                                <div className="super-render">
                                    {courseStructure.sections.map((section) => (
                                        <div key={section.id}>
                                            <div data-bs-toggle="collapse" data-bs-target={`#collapse${section.id}`} aria-expanded="false" aria-controls={`collapse${section.id}`}>
                                                {section.name}
                                            </div>
                                            <div id={`collapse${section.id}`} className="collapse">
                                                <div className="render-content">
                                                    {renderContentTypes(section)}
                                                </div>
                                                <button onClick={() => addContentTypeToSection(section.id, 'video')}>Add Video</button>
                                                <button onClick={() => addContentTypeToSection(section.id, 'document')}>Add Document</button>
                                                <button onClick={() => addContentTypeToSection(section.id, 'quiz')}>Add Quiz</button>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button onClick={saveSectionContent(section.id)}>Save section</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            <div>
                                <p className='title blue'>Image Course</p>
                                <p className='mb-0'>Max size <span className='orange'>100Mb</span>. The required type image is <span className='orange'>JPG, PNG</span>.</p>
                                <button className='button'><i class="fa-solid fa-circle-plus"></i>  Upload file</button>
                            </div>

                            <div>
                                <div className="d-flex">
                                    <input id="check" type="checkbox" />
                                    <label for="check">Tôi sẽ chịu trách nhiệm nếu nội dung khóa học không chuẩn mực với đạo đức của một giáo viên</label>
                                </div>

                                <div className="d-flex justify-content-end">
                                    <button>SAVE DRAFT</button>
                                    <button>POST COURSE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderComponent = () => {
        switch (currentComponent) {
            case 'syllabusInformation':
                return <SyllabusInformation goBack={() => setCurrentComponent('default')} />;
            case 'createCourse':
                return <CreateCourse selectedCourse={selectedCourse} goBack={() => setCurrentComponent('syllabusInformation')} />;
            default:
                return (
                    <div className='syllabus'>
                        <div className="header">
                            <div className="d-flex justify-content-start">
                                <div>
                                    <h5 className='mb'>CREATE COURSE</h5>
                                    <hr />
                                </div>
                                <i class="fa-solid fa-book"></i>
                            </div>
                        </div>
                        <div className="syllabus-content">
                            <h5 className='mb-2 ms-3'>Syllabus</h5>
                            <hr style={{ margin: '0px' }} />
                            <div>
                                <div className="search d-flex justify-content-center">
                                    <input type="text" placeholder='Search course' />
                                    <div className='text-center' style={{ height: '30px', border: '1px solid #988E8E66', borderLeft: 'none', width: '5%', paddingTop: '5px', borderRadius: '0 10px 10px 0' }}>
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                </div>

                                <div className='px-3' style={{ minHeight: '500px' }}>
                                    {isLoading ? (
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        currentPageData.map((course, index) => (
                                            <div key={index} className="syllabus-item">
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex justify-content-start">
                                                        <img className='img-responsive' src={simp} alt="" />
                                                        <div className='ms-3'>
                                                            <p className='mb-1 mt-2'>{course.name}</p>
                                                            <p className='mb-1 title blue'>Create date: {course.createdDate}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => fetchCourseData(course.id)} className='mt-3' style={{ width: '100px', backgroundColor: '#EF7E54', border: 'none', borderRadius: '10px', color: 'white' }}>View</button>
                                                    </div>

                                                </div>
                                            </div>
                                        )))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return renderComponent();
}

const CreateQuiz = () => {
    return (
        <div>
            <h5>Create Quiz</h5>
        </div>
    )
}

const TeacherSetting = () => {
    // State to track the current selected menu
    const [selectedMenu, setSelectedMenu] = useState('editProfile');

    // Handler function to change the selected menu
    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    //upload avatar
    const [avatar, setAvatar] = useState(null); // For storing the file
    const [preview, setPreview] = useState(''); // For storing the image preview URL

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.substr(0, 5) === "image") {
            setAvatar(file);
            setPreview(URL.createObjectURL(file));
        } else {
            setAvatar(null);
            setPreview('');
        }
    };

    const [newChildDOB, setNewChildDOB] = useState('');

    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case 'editProfile':
                return (
                    <div className='edit-profile'>
                        <div className="d-flex justify-content-start">
                            {preview ? (
                                <img className='img-responsive' src={preview} alt="Avatar Preview" style={{ marginRight: '10px' }} />
                            ) : (
                                <img className='img-responsive' src={demo} alt="" style={{ marginRight: '10px' }} />
                            )}
                            <div>
                                <p className='mb'>Your avatar</p>
                                <span>JPG or PNG no bigger than 10Mb</span><br />
                                <input
                                    type="file"
                                    id="avatarInput"
                                    style={{ display: 'none' }}
                                    onChange={handleAvatarChange}
                                    accept="image/png, image/jpeg"
                                />
                                <label htmlFor="avatarInput" style={{ cursor: 'pointer', color: '#FF8A00' }}>
                                    <i className="fa-solid fa-upload"></i> Click to upload
                                </label>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: '20px' }}>
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <p className='mb'>First and last name</p>
                                <input type="text" placeholder='Kim Jennie' style={{ width: '100%', height: '50px', paddingLeft: '15px' }} />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <p className='mb'>Date of birth</p>
                                <div className="d-flex">
                                    <DatePicker wrapperClassName="datePicker" selected={newChildDOB} onChange={(date) => setNewChildDOB(date)} />
                                    <div style={{ width: '15%', textAlign: 'center', border: '1px solid #21212180', borderLeft: 'none', height: '50px' }}>
                                        <i style={{ marginTop: '15px' }} class="fa-solid fa-calendar-days"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: '20px' }}>
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <p className='mb'>Gender</p>
                                <select style={{ width: '50%', height: '50px' }} name="" id="">
                                    <option value="">Male</option>
                                    <option value="">Female</option>
                                    <option value="">Other</option>
                                </select>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <p className='mb'>Phone number</p>
                                <input style={{ width: '100%', height: '50px' }} type="text" placeholder='+84 123123123' />
                            </div>
                        </div>

                        <div>
                            <p>Personal information</p>
                            <textarea
                                placeholder="Write the reason for order cancel"
                                value={inputValue}
                                onChange={handleChange}
                                maxLength="256"
                                className="form-control w-100"
                                style={{ minHeight: '150px' }}
                            ></textarea>
                        </div>
                    </div>
                );
            case 'password':
                return <div className='teacher-password'>
                    <p className='mb'>Current password</p>
                    <input type="password" placeholder='Current password' />

                    <p className='mb' style={{ marginTop: '20px' }}>New password</p>
                    <input type="password" placeholder='New password' />

                    <p className='mb' style={{ marginTop: '20px' }}>Confirm new password</p>
                    <input type="password" placeholder='Confirm new password' /><br />

                    <button style={{ backgroundColor: '#1A9CB7', color: 'white', width: '150px', borderRadius: '10px', height: '40px', marginTop: '20px', border: 'none' }}>Save password</button>
                </div>;
            case 'socialProfile':
                return <div>Social Profile Content Here</div>;
            case 'certificate':
                return <div>Certificate Content Here</div>;
            default:
                return <div>Select a menu</div>;
        }
    };

    return (
        <div className='teacher-setting'>
            <div className="header">
                <div className="d-flex justify-content-start">
                    <div>
                        <h5 className='mb'>SETTING</h5>
                        <hr />
                    </div>
                    <i class="fa-solid fa-gear"></i>
                </div>
            </div>
            <div className="teacher-setting-content">
                <div className="setting-menu d-flex justify-content-start">
                    <div
                        onClick={() => handleMenuClick('editProfile')}
                        className={`mb ${selectedMenu === 'editProfile' ? 'active-menu-item' : ''}`}>
                        <p className='mb'>Edit profile</p>
                        <hr />
                    </div>
                    <div
                        onClick={() => handleMenuClick('password')}
                        className={`mb ${selectedMenu === 'password' ? 'active-menu-item' : ''}`}
                        style={{ marginLeft: '15px' }}>
                        <p className='mb'>Password</p>
                        <hr />
                    </div>
                    <div
                        onClick={() => handleMenuClick('socialProfile')}
                        className={`mb ${selectedMenu === 'socialProfile' ? 'active-menu-item' : ''}`}
                        style={{ marginLeft: '15px' }}>
                        <p className='mb'>Social profile</p>
                        <hr />
                    </div>
                    <div
                        onClick={() => handleMenuClick('certificate')}
                        className={`mb ${selectedMenu === 'certificate' ? 'active-menu-item' : ''}`}
                        style={{ marginLeft: '15px' }}>
                        <p className='mb'>Certificate</p>
                        <hr />
                    </div>
                </div>
                <div>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default function TeacherAccount() {
    // State to track the active menu item
    const [activeMenu, setActiveMenu] = useState('notification');

    const renderContent = () => {
        console.log("Active Menu:", activeMenu);
        switch (activeMenu) {
            case 'notification':
                return <TeacherNotification />;
            case 'myCourses':
                return <TeacherCourse />;
            case 'schedule':
                return <TeacherSchedule />;
            case 'teacherCourses':
                return <TeacherClasses />;
            case 'createCourse':
                return <Syllabus setActiveMenu={setActiveMenu} />;
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
                backgroundImage: `url(${background})`, backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat', height: '100vh', overflow: 'hidden'
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
                                <div className="d-flex justify-content-between">
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
