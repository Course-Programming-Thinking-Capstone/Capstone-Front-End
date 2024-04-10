import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import demo from '../../../../images/gallery/demo.jpg';
import simp from '../../../../images/gallery/simp.jpg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import background from '../../../../images/background/adminStaffBackground.jpg';

const ModeratingLesson = ({ onBack, section }) => {
    const [selectedLesson, setSelectedLesson] = useState(null);

    const handleSelectLesson = (lesson) => {
        setSelectedLesson(lesson);
    };

    console.log('section: ', section);
    function getIconBasedOnType(type) {
        const iconMap = {
            'Video': 'fa-solid fa-circle-play',
            'Document': 'fa-solid fa-book-open',
            'Quiz': 'fa-solid fa-pen-to-square',
        };
        return iconMap[type] || 'fa-solid fa-file';
    }

    const renderLessonContent = () => {
        if (!selectedLesson) return <p>Select a lesson to see the content.</p>;

        // Here you can customize how to display the content based on the selected lesson
        return (
            <div>
                {selectedLesson.type === 'Video' && selectedLesson.resourceUrl && (
                    <div>{selectedLesson.resourceUrl}</div>
                )}
                {selectedLesson.type === 'Document' && (
                    <div>
                        {/* Here you can render the document content, for example as a link or embedded object */}
                        <p>{selectedLesson.content || "Document content goes here."}</p>
                    </div>
                )}
                {selectedLesson.type === 'Quiz' && (
                    <div>
                        <p>Quiz content goes here.</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="moderating-lesson mx-5" style={{ backgroundColor: 'white' }}>
            <div className="header">
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                        <div>
                            <h5 className='mb'>MODERATING</h5>
                            <hr />
                        </div>
                        <i style={{ color: '#ff8a00', marginLeft: '10px', fontSize: '20px' }} class="fa-solid fa-bell"></i>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button onClick={onBack} style={{ backgroundColor: '#7F7C7C', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px' }} ><i class="fa-solid fa-chevron-left"></i>Back</button>
                    </div>
                </div>
            </div>
            <div>

            </div>
            <div className='mt-3'>
                {section.lessons.map((lesson) => (
                    <div className={`d-flex justify-content-start ms-5 mt-2 ${selectedLesson && selectedLesson.id === lesson.id ? 'selected-lesson' : ''}`} key={lesson.id} onClick={() => handleSelectLesson(lesson)}>
                        <i style={{ fontSize: '19px', marginTop: '12px' }} className={getIconBasedOnType(lesson.type)} />
                        <div className='ms-3'>
                            <p className='mb-0'>{lesson.name}</p>
                            <span>{lesson.type} - {lesson.duration} min</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="render-lesson">
                {renderLessonContent()}
            </div>
        </div>
    );
}

const ModeratingQuiz = ({ onBack, quiz }) => {
    console.log('quiz: ', quiz);
    return (
        <div className="moderating-quiz" style={{ backgroundColor: 'white', width: 1100, height: 650, marginLeft: 65, marginTop: 60, borderRadius: 30,overflowY:'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 5, alignItems: 'center',marginTop:20 }}>
                <p style={{fontWeight:'bolder',fontSize:20,height:0}}>Quiz Name: <span style={{fontWeight:'500',fontSize:18,marginLeft:5}}>{quiz.title}</span></p>
                <button onClick={onBack} style={{ height: 30, width: 60,borderRadius:10,borderColor:"white",borderStyle:'solid',backgroundColor:'#1A9CB7',color:'white' }}>Back</button>
            </div>
            <hr />
            <div>
                <p style={{fontWeight:'bold',color:"#EF7E54",marginLeft:100}}>Test time <span style={{ borderWidth: 2, borderStyle: 'solid', padding: '10px 15px', borderColor: '#D4D4D4',borderRadius:10,marginLeft:30 }}>{quiz.duration}</span></p>
                <p style={{fontWeight:'bold',color:"#EF7E54",marginLeft:100}}>Quiz Content</p>
                {quiz && quiz.questions.map((question, index) => (
                    <div key={index} style={{ marginBottom: 20}}>
                        <div style={{ borderRadius:'10px',backgroundColor: '#FBEDE1',width:900,marginLeft:100,height:450 }}>
                            <div style={{ backgroundColor: '#F6D3C8',paddingLeft:35,fontWeight:'bold',borderTopLeftRadius:10,borderTopRightRadius:10,height:50,paddingTop:15 }}>{question.order} .</div>
                            <p style={{ color: '#EF7E54', fontWeight: '600',paddingLeft:50,color:'#EF7E54',height:0,marginTop:5 }}>Question</p>
                            <p style={{textAlign:'center',height:0}}>{question.title}</p>
                            <div style={{width:800, marginLeft:50}}>
                                <hr style={{height:3}}/>
                            </div>
                            <p style={{paddingLeft:50,color:'#EF7E54',fontWeight:'600',height:10}}>Answer</p>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className='d-flex' style={{paddingLeft:50,borderWidth:2,borderColor:'red',borderStyle:'solid',width:800, marginLeft:50,marginBottom:15,borderRadius:10,backgroundColor:'white', alignItems:'center',height:50,display:'flex',flexDirection:'row',justifyContent:'space-between',paddingRight:10}} >
                                    <p style={{height:0}}>{option.content}</p>
                                    {option.isCorrect && (
                                        <span style={{ marginLeft: '10px', color: 'green',borderStyle:'solid',borderColor:'white',borderRadius:30,paddingLeft:15,paddingRight:15,backgroundColor:'#F15C58',color:'white',fontWeight:'500',paddingTop:5,paddingBottom:5}}>Correct</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


const ModeratingDetail = ({ onBack, courseId }) => {
    const [showLesson, setShowLesson] = useState(false);
    const [modalApproveShow, setApproveModalShow] = React.useState(false);
    const [modalApproveSetting, setApproveSetting] = React.useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [courseType, setCourseType] = useState('');
    const [modalRefuseShow, setRefuseShow] = React.useState(false);
    const [courseDetails, setCourseDetails] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [price, setPrice] = useState(10);
    const [showQuiz, setShowQuiz] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);


    useEffect(() => {
        const fetchCourseDetails = async () => {
            const accessToken = localStorage.getItem('accessToken'); // Or your method of getting the token
            try {
                const response = await fetch(`https://www.kidpro-production.somee.com/api/v1/courses/${courseId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(' moderatingDetailData: ', data);
                setCourseDetails(data); // Assuming the API returns the details directly
            } catch (error) {
                console.error("Failed to fetch course details", error);
            }
        };

        if (courseId) {
            fetchCourseDetails();
        }
    }, [courseId]);

    const handleViewLesson = (section) => {
        setSelectedSection(section); // Set the selected section
        setShowLesson(true); // Show the ModeratingLesson component
    };

    const handleViewQuiz = (quiz) => {
        setSelectedQuiz(quiz);
        setShowQuiz(true);
    };

    if (showLesson && selectedSection) {
        return <ModeratingLesson onBack={() => setShowLesson(false)} section={selectedSection} />;
    }

    if (showQuiz && selectedQuiz) {
        return <ModeratingQuiz onBack={() => setShowQuiz(false)} quiz={selectedQuiz} />;
    }

    const handleApprove = () => {
        setApproveModalShow(false);
        setApproveSetting(true);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleCourseTypeSelect = (type) => setCourseType(type);

    function getIconBasedOnType(type) {
        const iconMap = {
            'Video': 'fa-solid fa-circle-play',
            'Document': 'fa-solid fa-book-open',
        };
        return iconMap[type] || 'fa-solid fa-file';
    }

    const approveCourse = async () => {
        const isFree = courseType === 'free';
        const isAdminSetup = selectedOption === 'option2';
        const payload = {
            isFree,
            isAdminSetup,
            price: isFree ? 0 : price, // Use the state variable price
        };

        console.log('payload: ', payload);
        const accessToken = localStorage.getItem('accessToken'); // Or your method of getting the token

        try {
            const response = await fetch(`https://www.kidpro-production.somee.com/api/v1/courses/${courseId}/approve`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            console.log('Approve response:');
            // Handle the successful approval
        } catch (error) {
            console.error("Failed to approve course", error);
            // Handle the error
        }
    };


    const setupNowContent = (
        <div style={{ padding: '15px', border: '1px solid #D4D4D4', marginTop: '20px' }}>
            <p className='mb-0' style={{ color: '#1A9CB7' }}>Fee</p>
            <div style={{ padding: '15px' }}>
                <span style={{ fontSize: '14px' }}>Choose the type of course:</span>
                <div
                    onClick={() => handleCourseTypeSelect('free')}
                    className="d-flex justify-content-start align-items-center"
                    style={{
                        cursor: 'pointer',
                        margin: '10px 0',
                        color: courseType === 'free' ? '#1A9CB7' : 'inherit', // Change text color if selected
                    }}
                >
                    {courseType === 'free' ? <i className="fa-solid fa-circle" style={{ color: '#1A9CB7' }}></i> : <i className="fa-regular fa-circle"></i>}
                    <p className='mb-0 ms-3'>Free course</p>
                </div>
                <div
                    onClick={() => handleCourseTypeSelect('paid')}
                    className="d-flex justify-content-start align-items-center"
                    style={{
                        cursor: 'pointer',
                        color: courseType === 'paid' ? '#1A9CB7' : 'inherit', // Change text color if selected
                    }}
                >
                    {courseType === 'paid' ? <i className="fa-solid fa-circle" style={{ color: '#1A9CB7' }}></i> : <i className="fa-regular fa-circle"></i>}
                    <p className='mb-0 ms-3'>Paid</p>
                </div>
                {courseType === 'paid' && (
                    <div className='px-5' style={{ marginTop: '10px' }}>
                        <div className="d-flex justiy-content-start">
                            <p className='mb-1' style={{ color: '#1A9CB7' }}>Price (VND)</p>
                            <span style={{ color: '#FF8A00' }}>*</span>
                        </div>
                        <p className='mb-1'>The lowest price is 10.00</p>
                        <input
                            type="number"
                            min="10"
                            placeholder='Enter price'
                            style={{ outline: 'none' }}
                            value={price}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue >= 10) {
                                    setPrice(newValue);
                                }
                            }}
                            disabled={courseType !== 'paid'}
                        />

                    </div>
                )}
            </div>

        </div>
    );

    const adminSetupContent = (
        <div>
            <p>Admin will contact you to set up the details.</p>
        </div>
    );

    const renderSetupContent = () => {
        if (selectedOption === 'option2') {
            return adminSetupContent;
        }
        // Default to "set up now" content
        return setupNowContent;
    };

    return (
        <div className='moderating-detail' style={{
            height: '680px',
            overflowX: 'hidden',
            overflowY: 'hidden',
            width: '1000px',
            backgroundColor: 'white',
            borderRadius: 30,
            marginLeft: 100
        }}>
            <div style={{
                backgroundColor: 'white',
                height: '650px',
                overflow: 'auto',
                width: '920px',
                paddingRight: 70
            }}>
                <Modal
                    show={modalApproveShow}
                    onHide={() => setApproveModalShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body>
                        <div className="text-center">
                            <h4>The course meets the standards and is approved to be posted to the system</h4>
                        </div>
                        <div className="d-flex justify-content-around">
                            <button style={{ height: '35px', width: '120px', backgroundColor: '#F15C58', color: 'white', borderRadius: '10px', border: 'none' }} onClick={() => setApproveModalShow(false)}>Close</button>
                            <button style={{ height: '35px', width: '120px', backgroundColor: '#1A9CB7', color: 'white', borderRadius: '10px', border: 'none' }} onClick={handleApprove}>Approve</button>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal
                    show={modalApproveSetting}
                    size='lg'
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body style={{ padding: '20px 40px' }}>
                        <div className='d-flex justify-content-between'>
                            <div
                                onClick={() => handleOptionSelect('option1')}
                                className='d-flex justify-content-around'
                                style={{
                                    cursor: 'pointer',
                                    padding: '15px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '35%',
                                    borderRadius: '10px',
                                    border: selectedOption === 'option1' ? '2px solid #1A9CB7' : 'none'
                                }}>
                                {selectedOption === 'option1' ? <i style={{ color: '#1A9CB7' }} className="fa-solid fa-circle"></i> : <i style={{ color: '#1A9CB7' }} className="fa-regular fa-circle"></i>}
                                <p className='mb-0' style={{ marginLeft: '5px' }}>Set up now</p>
                            </div>
                            <div
                                onClick={() => handleOptionSelect('option2')}
                                className='d-flex justify-content-around'
                                style={{
                                    cursor: 'pointer',
                                    padding: '15px 20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '35%',
                                    borderRadius: '10px',
                                    border: selectedOption === 'option2' ? '2px solid #1A9CB7' : 'none'
                                }}>
                                {selectedOption === 'option2' ? <i style={{ color: '#1A9CB7' }} className="fa-solid fa-circle"></i> : <i style={{ color: '#1A9CB7' }} className="fa-regular fa-circle"></i>}
                                <p className='mb-0' style={{ marginLeft: '5px' }}>Admin set up</p>
                            </div>
                        </div>

                        {renderSetupContent()}

                        <div className="d-flex justify-content-end mt-3">
                            <button className='me-3' onClick={() => { setApproveSetting(false) }} style={{ height: '35px', width: '120px', backgroundColor: '#F15C58', color: 'white', borderRadius: '10px', border: 'none' }} >Close</button>
                            <button onClick={approveCourse} style={{ height: '35px', width: '120px', backgroundColor: '#1A9CB7', color: 'white', borderRadius: '10px', border: 'none' }} >Moderation</button>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal
                    show={modalRefuseShow}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body>
                        <div >
                            <p style={{ color: '#1A9CB7' }}>Reason refuse course</p>
                            <textarea name="" id="" rows="4" style={{ width: '100%', }} placeholder='Write reason'></textarea>
                        </div>
                        <div className="d-flex">
                            <p className='mb-0 mt-2' style={{ color: '#1A9CB7' }}>Send to teacher: </p>
                            <span style={{ border: '1px solid #FF8A00', color: '#FF8A00', margin: '5px 10px', padding: '5px 10px', borderRadius: '10px' }}>Nguyễn Ngọc Lâm</span>
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                            <button className='mx-2' style={{ height: '35px', width: '120px', backgroundColor: '#F15C58', color: 'white', borderRadius: '10px', border: 'none' }} onClick={() => setRefuseShow(false)}>Cancel</button>
                            <button style={{ height: '35px', width: '120px', backgroundColor: '#1A9CB7', color: 'white', borderRadius: '10px', border: 'none' }} onClick={() => setRefuseShow(false)}>Send</button>
                        </div>
                    </Modal.Body>
                </Modal>

                <div className="header" style={{ marginBottom: 10 }}>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-start">
                            <div>
                                <h5 className='mb'>Course Detail</h5>
                                <hr />
                            </div>
                            <i style={{ color: '#ff8a00', marginLeft: '10px', fontSize: '20px' }} class="fa-solid fa-bell"></i>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button style={{ backgroundColor: '#7F7C7C', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px' }} onClick={onBack} ><i class="fa-solid fa-chevron-left" style={{ marginRight: 5 }}></i>Back</button>
                            <button onClick={() => setRefuseShow(true)} style={{ backgroundColor: '#F25B58', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px' }}><i class="fa-solid fa-x" style={{ marginRight: 5 }}></i> Refuse</button>
                            <button onClick={() => setApproveModalShow(true)} style={{ color: '#FF8A00', backgroundColor: 'white', borderRadius: 5, borderColor: '#FF8A00', borderStyle: 'solid', borderWidth: 2 }}><i class="fa-solid fa-check" style={{ marginRight: 5 }}></i>Approve</button>
                        </div>
                    </div>
                </div>

                <div className="moderating-detail-content">

                    <div>
                        <img src={simp} alt="" />
                        <h4 className='title blue mb-1' style={{ margin: '12px 0px 12px 0px' }}>{courseDetails && courseDetails.name}</h4>
                        <div className="d-flex justify-content-between" style={{ padding: '12px 150px', fontSize: '18px' }}>
                            <div className="d-flex">
                                <i class="fa-solid fa-book mt-1"></i>
                                <p className='mb-0 ms-1'>4 lessons</p>
                            </div>
                            <div className="d-flex">
                                <i class="fa-solid fa-circle-play mt-1"></i>
                                <p className='mb-0 ms-1'>4 videos</p>
                            </div>
                            <div className="d-flex">
                                <i class="fa-solid fa-book-open mt-1"></i>
                                <p className='mb-0 ms-1'>4 documents</p>
                            </div>
                            <div className="d-flex">
                                <i class="fa-solid fa-pen-to-square mt-1"></i>
                                <p className='mb-0 ms-1'>4 quiz</p>
                            </div>
                        </div>
                        <div>
                            <p>{courseDetails && courseDetails.description}</p>
                        </div>
                    </div>

                    <div className="accordion" id="accordionExample">
                        {courseDetails && courseDetails.sections && courseDetails.sections.map((section, index) => (
                            <div className="accordion-item" key={section.id}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                                        <span style={{ fontWeight: 'bold', marginRight: 10 }}>Section {section.order}:  </span>{section.name}
                                    </button>
                                </h2>
                                <div id={`collapse${index}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="d-flex justify-content-end" style={{ alignItems: 'center' }}>
                                            <button onClick={() => handleViewLesson(section)} className='me-3' style={{ backgroundColor: '#F15C58', border: 'none', borderRadius: '8px', color: 'white' }}>View lesson</button>
                                        </div>
                                        {section.lessons.map((lesson, lessonIndex) => (
                                            <div className="lesson-item" key={lesson.id}>
                                                <div className='lesson-content d-flex justify-content-start ms-3'>
                                                    <i className={getIconBasedOnType(lesson.type)}></i>
                                                    <p className='ms-2'>{lesson.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div class="accordion mt-5" id="collapseQuiz" style={{ marginBottom: 10 }}>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOneHundred">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOneHundred" aria-expanded="true" aria-controls="collapseOneHundred">
                                    Quiz
                                </button>
                            </h2>
                            <div id="collapseOneHundred" class="accordion-collapse collapse show" aria-labelledby="headingOneHundred" data-bs-parent="#accordionQuiz">
                                <div class="accordion-body">
                                    {courseDetails && courseDetails.sections && courseDetails.sections.map((section, sectionIndex) => (
                                        <div className='ms-3' key={section.id}>
                                            {section.quizzes && section.quizzes.map((quiz, quizIndex) => (
                                                <div key={quiz.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <p>Section {sectionIndex + 1}: Quiz {quizIndex + 1}: {quiz.title}</p>
                                                    <button onClick={() => handleViewQuiz(quiz)} style={{ backgroundColor: '#F15C58', border: 'none', borderRadius: '8px', color: 'white', height: 23, width: 93 }}>View Quiz</button>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function StaffModerating() {
    const [courses, setCourses] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);

    const handleViewDetail = (courseId) => {
        setSelectedCourseId(courseId);
        setShowDetail(true);
    };

    const handleBack = () => {
        setShowDetail(false);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await fetch('https://www.kidpro-production.somee.com/api/v1/courses?status=Pending&action=manage', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('data: ', data);
                setCourses(data); // Assuming the response has the data directly
            } catch (error) {
                console.error("Failed to fetch courses", error);
            }
        };

        fetchCourses();
    }, []);

    if (showDetail) {
        return <ModeratingDetail courseId={selectedCourseId} onBack={handleBack} />;
    }

    return (
        <div className='staff-moderating mx-5' style={{ backgroundColor: 'white', borderRadius: 30 }}>
            <div className="header">
                <div className="d-flex justify-content-start">
                    <div>
                        <h5 className='mb'>MODERATING</h5>
                        <hr />
                    </div>
                    <i class="fa-solid fa-bell"></i>
                </div>
            </div>
            {Array.isArray(courses.results) && courses.results.map((course, index) => (
                <div className="item" key={course.id || index}>
                    <div className="d-flex justify-content-between">
                        <div className="left d-flex justify-content-start">
                            <img src={demo} alt="" />
                            <div style={{ marginLeft: '20px' }}>
                                <div className='d-flex justify-content-start'>
                                    <p style={{ fontSize: '18px', fontWeight: 500 }}>{course.name} </p>
                                    <span>|</span>
                                    <span style={{ color: '#1A9CB7' }}>Teacher: Nguyễn Ngọc Lâm</span>
                                </div>
                                <p style={{ marginTop: '10px', color: '#FF8A00' }} className='mb'>4 sections</p>
                            </div>
                        </div>
                        <div className='right'>
                            <div className="d-flex">
                                <i class="fa-regular fa-clock mt-1"></i>
                                <p className='ms-1'>{new Date(course.createdDate).toLocaleString()}</p>
                            </div>
                            <div onClick={() => handleViewDetail(course.id)} className='text-center' style={{ marginTop: '10px', float: 'right', backgroundColor: '#FFA63D', marginRight: '15px', height: '25px', borderRadius: '10px', width: '80px', color: 'white', cursor: 'pointer' }}>
                                <p >View Detail</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}