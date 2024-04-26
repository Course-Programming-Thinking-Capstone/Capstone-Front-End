import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import demo from '../../../../images/gallery/demo.jpg';
import simp from '../../../../images/gallery/simp.jpg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import background from '../../../../images/background/adminStaffBackground.jpg';
import instance from '../../../../helper/apis/baseApi/baseApi';
import ReactPaginate from 'react-paginate';
import { convertUtcToLocalTime, formatDateV1 } from '../../../../helper/utils/DateUtil';
import { ToastContainer, toast } from 'react-toastify';

const ModeratingLesson = ({ onBack, section }) => {
    const [selectedLesson, setSelectedLesson] = useState(section.lessons[0]);
    const handleSelectLesson = (lesson) => {
        setSelectedLesson(lesson);
    };
    const getDriveFileID = (url) => {
        const parts = url.split('/');
        return parts[parts.length - 2];
    };
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
        return (
            <div>
                {selectedLesson.type === 'Video' && selectedLesson.resourceUrl && (
                    <div style={{ marginLeft: 170, marginTop: 5 }}>
                        <iframe
                            title="Embedded Video"
                            width="800"
                            height="340"
                            src={`https://drive.google.com/file/d/${getDriveFileID(selectedLesson.resourceUrl)}/preview`}
                            // frameborder="0"
                            allowFullScreen
                        // style={{ border: '2px solid white' }} 
                        ></iframe>
                        <p style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>{selectedLesson.name}</p>
                    </div>
                )}
                {selectedLesson.type === 'Document' && (
                    <div style={{ paddingLeft: 50, paddingRight: 30 }}>
                        {/* <p style={{fontSize:20, fontWeight:'bold'}}>{selectedLesson.name}</p> */}
                        {/* <p style={{paddingRight:20,lineHeight:2.7,textAlign:'start'}}>{selectedLesson.content || "Document content goes here."}</p> */}
                        <div style={{ paddingRight: 20, lineHeight: 2.7, textAlign: 'start' }} dangerouslySetInnerHTML={{ __html: selectedLesson.content }} />
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
        <div>
            <div className="mx-5" style={{ backgroundColor: 'white', borderRadius: 20, borderStyle: 'solid', border: 'none', marginTop: 30, height: 700, overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 47, paddingTop: 20, paddingRight: 30 }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div>
                            <h5 className='mb' >Lesson {section.order}:<span style={{ marginLeft: 8 }}>{section.name}</span></h5>
                        </div>
                        <i style={{ color: '#ff8a00', marginLeft: '10px', fontSize: '20px' }} class="fa-solid fa-book-open-reader"></i>
                    </div>
                    <div>
                        <button onClick={onBack} style={{ backgroundColor: '#1A9CB7', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px', padding: '5px 5px' }} ><i class="fa-solid fa-chevron-left" style={{ paddingRight: 5 }}></i>Back</button>
                    </div>
                </div>
                <div>
                    {section.lessons.map((lesson) => (
                        <div
                            style={{
                                cursor: 'pointer', backgroundColor: selectedLesson && selectedLesson.id === lesson.id ? '#FED37E' : 'transparent', width: 600, borderTopRightRadius: 25, borderBottomRightRadius: 25, padding: '10px 0px 10px 130px'
                                , color: selectedLesson && selectedLesson.id === lesson.id ? '#f8f8f8' : 'black',
                                fontWeight: selectedLesson && selectedLesson.id === lesson.id ? 'bold' : 'normal', fontSize: 16
                            }}
                            className={`d-flex justify-content-start mt-2 ${selectedLesson && selectedLesson.id === lesson.id ? 'selected-lesson' : ''}`}
                            key={lesson.id}
                            onClick={() => handleSelectLesson(lesson)}
                        >
                            <i style={{ fontSize: '19px', marginTop: '12px' }} className={getIconBasedOnType(lesson.type)} />
                            <div className='ms-3'>
                                <p className='mb-0' >{lesson.name}</p>
                                <span>{lesson.type} - {lesson.duration} min</span>
                            </div>
                        </div>
                    ))}
                </div>
                <hr style={{ backgroundColor: '#FFCF7B', height: 2, marginBottom: 0 }} />
                <div className="render-lesson">
                    {renderLessonContent()}
                </div>
            </div>
        </div>
    );
}

const ModeratingQuiz = ({ onBack, quiz }) => {
    return (
        <div className="moderating-quiz" style={{ backgroundColor: 'white', width: 1100, height: 650, marginLeft: 65, marginTop: 60, borderRadius: 30, overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 30, paddingRight: 5, alignItems: 'center', marginTop: 20 }}>
                <p style={{ fontWeight: 'bolder', fontSize: 20, height: 0 }}>Quiz Name: <span style={{ fontWeight: '500', fontSize: 18, marginLeft: 5 }}>{quiz.title}</span></p>
                <button onClick={onBack} style={{ height: 30, width: 60, borderRadius: 10, borderColor: "white", borderStyle: 'solid', backgroundColor: '#1A9CB7', color: 'white' }}>Back</button>
            </div>
            <hr />
            <div>
                <p style={{ fontWeight: 'bold', color: "#EF7E54", marginLeft: 100 }}>Test time <span style={{ borderWidth: 2, borderStyle: 'solid', padding: '10px 15px', borderColor: '#D4D4D4', borderRadius: 10, marginLeft: 30 }}>{quiz.duration}</span></p>
                <p style={{ fontWeight: 'bold', color: "#EF7E54", marginLeft: 100 }}>Quiz Content</p>
                {quiz && quiz.questions.map((question, index) => (
                    <div key={index} style={{ marginBottom: 20 }}>
                        <div style={{ borderRadius: '10px', backgroundColor: '#FBEDE1', width: 900, marginLeft: 100, height: 450 }}>
                            <div style={{ backgroundColor: '#F6D3C8', paddingLeft: 35, fontWeight: 'bold', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 50, paddingTop: 15 }}>{question.order} .</div>
                            <p style={{ color: '#EF7E54', fontWeight: '600', paddingLeft: 50, color: '#EF7E54', height: 0, marginTop: 5 }}>Question</p>
                            <p style={{ textAlign: 'center', height: 0 }}>{question.title}</p>
                            <div style={{ width: 800, marginLeft: 50 }}>
                                <hr style={{ height: 3 }} />
                            </div>
                            <p style={{ paddingLeft: 50, color: '#EF7E54', fontWeight: '600', height: 10 }}>Answer</p>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className='d-flex' style={{ paddingLeft: 50, borderWidth: 2, borderColor: '#FBEDE1', borderStyle: 'solid', width: 800, marginLeft: 50, marginBottom: 15, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }} >
                                    <p style={{ height: 0 }}>{option.content}</p>
                                    {option.isCorrect && (
                                        <span style={{ marginLeft: '10px', color: 'green', borderStyle: 'solid', borderColor: 'white', borderRadius: 30, paddingLeft: 15, paddingRight: 15, backgroundColor: '#F15C58', color: 'white', fontWeight: '500', paddingTop: 5, paddingBottom: 5 }}>Correct</span>
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
    const [selectedOption, setSelectedOption] = useState('option1');
    const [courseType, setCourseType] = useState('');
    const [modalRefuseShow, setRefuseShow] = React.useState(false);
    const [courseDetails, setCourseDetails] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [price, setPrice] = useState("");
    const [formattedPrice, setFormattedPrice] = useState("");
    const [priceError, setPriceError] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await instance.get(`api/v1/courses/${courseId}`);
                const data = response.data

                //log
                console.log(`Course details data: ${JSON.stringify(data, null, 2)}`)
                setCourseDetails(data); // Assuming the API returns the details directly
            } catch (error) {
                console.error("Failed to fetch course details", error);
            }
        };

        if (courseId) {
            fetchCourseDetails();
        }
    }, [courseId]);

    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove all non-numeric characters
        const number = value ? parseInt(value, 10) : '';
        setPrice(number); // Update the raw price
        const formatted = number.toLocaleString(); // Format with commas
        setFormattedPrice(formatted); // Update the display price

        if (number < 10000 || number > 100000000) {
            setPriceError('Price must be between 10,000 and 100,000,000.');
        } else {
            setPriceError('');
        }
    };

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

    const handleCourseTypeSelect = (type) => setCourseType(type);

    function getIconBasedOnType(type) {
        const iconMap = {
            'Video': 'fa-solid fa-circle-play',
            'Document': 'fa-solid fa-book-open',
        };
        return iconMap[type] || 'fa-solid fa-file';
    }

    const courseTypeStyle = (type) => ({
        cursor: 'pointer',
        margin: '10px 0',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        border: courseType === type ? '2px solid #1A9CB7' : 'none', // Dynamic border based on selection
        borderRadius: '8px', // Ensuring all sides are rounded
        backgroundColor: courseType === type ? '#E8F0FE' : 'inherit' // Change background color if selected
    });

    const approveCourse = async () => {
        if (!courseType) {
            // If no course type is selected
            toast.error("Please select a course type (Free or Paid).", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeButton: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return; // Stop the function execution
        }

        if (courseType === 'paid' && (!price || price < 10000 || price > 100000000)) {
            // If it's a paid course but the price is not set or out of bounds
            toast.error("Please enter a valid price between 10,000 and 100,000,000.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeButton: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return; // Stop the function execution
        }

        const isFree = courseType === 'free';
        const isAdminSetup = selectedOption === 'option2';
        const payload = {
            isFree,
            isAdminSetup,
            price: isFree ? 0 : price, // Use the state variable price
        };
        console.log('payload: ', payload);

        try {

            const response = await instance.patch(`api/v1/courses/${courseId}/approve`, payload);
            setTimeout(() => {

                window.location.reload();
            }, 2000)
        } catch (error) {
            console.error("Failed to approve course: ", JSON.stringify(error, null, 2));
            // Handle the error
        }
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
                <ToastContainer />

                <Modal
                    show={modalApproveSetting}
                    size='lg'
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Body style={{ padding: '20px 40px' }}>
                        <div style={{ padding: '15px', border: '2px solid #1A9CB7', marginTop: '20px', borderRadius: '8px' }}>
                            <p className='mb-0' style={{ color: '#1A9CB7' }}>Fee</p>
                            <div style={{ padding: '15px' }}>
                                <span style={{ fontSize: '14px' }}>Choose the type of course:</span>
                                <div onClick={() => handleCourseTypeSelect('free')} style={courseTypeStyle('free')}>
                                    <i className={courseType === 'free' ? "fa-solid fa-circle" : "fa-regular fa-circle"} style={{ color: '#1A9CB7' }}></i>
                                    <p className='mb-0 ms-3'>Free course</p>
                                </div>
                                <div onClick={() => handleCourseTypeSelect('paid')} style={courseTypeStyle('paid')}>
                                    <i className={courseType === 'paid' ? "fa-solid fa-circle" : "fa-regular fa-circle"} style={{ color: '#1A9CB7' }}></i>
                                    <p className='mb-0 ms-3'>Paid</p>
                                </div>
                                {courseType === 'paid' && (
                                    <div className='px-5' style={{ marginTop: '10px' }}>
                                        <div className="d-flex justiy-content-start">
                                            <p className='mb-1' style={{ color: '#1A9CB7' }}>Price (VND)</p>
                                            <span style={{ color: '#FF8A00' }}>*</span>
                                        </div>
                                        <p className='mb-1'>The lowest price is 10,000</p>
                                        <input
                                            type="text" // Changed to text to handle formatted input
                                            placeholder='Enter price'
                                            value={formattedPrice}
                                            onChange={handlePriceChange}
                                            disabled={courseType !== 'paid'}
                                            style={{ border: '1px solid #FF8A00', borderRadius: '8px', outline: 'none' }}
                                        />
                                        {priceError && <p style={{ color: 'red' }}>{priceError}</p>}
                                    </div>
                                )}
                            </div>
                        </div>

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
                        <img src={(courseDetails && courseDetails.pictureUrl) ? courseDetails.pictureUrl : simp} alt="" />
                        <h4 className='title blue mb-1' style={{ margin: '12px 0px 12px 0px' }}>{courseDetails && courseDetails.name}</h4>
                        <div className="d-flex justify-content-between" style={{ padding: '12px 150px', fontSize: '18px' }}>
                            <div className="d-flex">
                                <i class="fa-solid fa-book mt-1"></i>
                                <p className='mb-0 ms-1'>{courseDetails && courseDetails.totalLesson} lessons</p>
                            </div>
                            <div className="d-flex">
                                <i class="fa-solid fa-circle-play mt-1"></i>
                                <p className='mb-0 ms-1'>{courseDetails && courseDetails.totalVideo} videos</p>
                            </div>
                            <div className="d-flex">
                                <i class="fa-solid fa-book-open mt-1"></i>
                                <p className='mb-0 ms-1'>{courseDetails && courseDetails.totalDocument} documents</p>
                            </div>
                            <div className="d-flex">
                                <i class="fa-solid fa-pen-to-square mt-1"></i>
                                <p className='mb-0 ms-1'>{courseDetails && courseDetails.totalQuiz} quiz</p>
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
                                        <span style={{ fontWeight: 'bold', marginRight: 10 }}>Lesson {section.order}:  </span>{section.name}
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
                                                    <p>Lesson {sectionIndex + 1}: {quiz.title}</p>
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

export default function AdminModerating() {
    const [courses, setCourses] = useState([]);
    const [allCourses, setAllCourses] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('allCourses');

    const [currentPageAllCourses, setCurrentPageAllCourses] = useState(0);
    const [totalPagesAllCourses, setTotalPagesAllCourses] = useState(0);

    const [currentPageCourseMod, setCurrentPageCourseMod] = useState(0);
    const [totalPagesCourseMod, setTotalPagesCourseMod] = useState(0);

    const itemsPerPageAllCourse = 4;
    const itemsPerPage = 5;

    const handlePageClickAllCourses = (data) => {
        setCurrentPageAllCourses(data.selected);
    };

    const handlePageClickCourseMod = (data) => {
        setCurrentPageCourseMod(data.selected);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleViewDetail = (courseId) => {
        setSelectedCourseId(courseId);
        setShowDetail(true);
    };

    const handleBack = () => {
        setShowDetail(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
    };

    useEffect(() => {
        const fetchAllCourses = async () => {
            setIsLoading(true);
            try {
                const query = `api/v1/courses?action=manage&page=${currentPageAllCourses + 1}&size=${itemsPerPageAllCourse}${searchTerm ? `&name=${encodeURIComponent(searchTerm)}` : ''}${selectedStatus ? `&status=${selectedStatus}` : ''}`;
                const response = await instance.get(query);
                const data = response.data || {};
                setAllCourses(data.results || []);
                setTotalPagesAllCourses(data.totalPages || 0);
            } catch (error) {
                console.error("Failed to fetch all courses", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (activeTab === 'allCourses') {
            fetchAllCourses();
        }
    }, [currentPageAllCourses, activeTab, itemsPerPageAllCourse, searchTerm, selectedStatus]);


    useEffect(() => {
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const response = await instance.get(`api/v1/courses?status=Waiting&action=manage&page=${currentPageCourseMod + 1}&size=${itemsPerPage}`);
                const data = response.data || {};
                console.log('courses data: ', data);
                setCourses(data.results || []);
                setTotalPagesCourseMod(data.totalPages || 0);
                if (currentPageCourseMod >= data.totalPages) {
                    setCurrentPageCourseMod(0);
                }
            } catch (error) {
                console.error("Failed to fetch courses for moderation", error);
                setTotalPagesCourseMod(0);
            } finally {
                setIsLoading(false);
            }
        };

        if (activeTab === 'courseModeration') {
            fetchCourses();
        }
    }, [currentPageCourseMod, activeTab, itemsPerPage]);

    if (showDetail) {
        return <ModeratingDetail courseId={selectedCourseId} onBack={handleBack} />;
    }

    return (
        <div className='mx-5' style={{ backgroundColor: 'white', borderRadius: 30, minHeight: '650px' }}>
            <div className='staff-moderating' >
                <div className="header">
                    <div className="d-flex justify-content-start">
                        <div>
                            <h5 className='mb'>Course</h5>
                            <hr />
                        </div>
                        <i className="fa-solid fa-book"></i>
                    </div>
                </div>
                <div className='d-flex justify-content-around mt-3'>
                    <div className='text-center' style={{
                        cursor: 'pointer',
                        backgroundColor: activeTab === 'allCourses' ? '#FF8A00' : '',
                        color: activeTab === 'allCourses' ? 'white' : '',
                        border: "2px solid #FF8A00",
                        width: '250px',
                        padding: '10px',
                        borderRadius: '5px'
                    }} onClick={() => handleTabChange('allCourses')}>
                        <p className='mb-0'>ALL COURSE</p>
                    </div>
                    <div className='text-center' style={{
                        cursor: 'pointer',
                        backgroundColor: activeTab === 'courseModeration' ? '#FF8A00' : '',
                        color: activeTab === 'courseModeration' ? 'white' : '',
                        border: "2px solid #FF8A00",
                        width: '250px',
                        padding: '10px',
                        borderRadius: '5px'
                    }} onClick={() => handleTabChange('courseModeration')}>
                        <p className='mb-0'>COURSE MODERATION</p>
                    </div>
                </div>


                {activeTab === 'allCourses' && (
                    <div >
                        <div style={{ minHeight: '470px' }}>
                            <div className='d-flex mt-3'>
                                <div className="d-flex">
                                    <input
                                        className='ps-2'
                                        style={{ height: '35px', border: '1px solid #FFA63D', borderRadius: '8px 0px 0px 8px', outline: 'none', border: 'none', width: '300px' }}
                                        type="text"
                                        placeholder="Search courses"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    <div className='d-flex justify-content-center align-items-center' style={{ height: '35px', width: '50px', backgroundColor: '#FFA63D', borderRadius: '0px 8px 8px 0px', color: 'white', cursor: 'pointer' }}
                                        onClick={() => setCurrentPageAllCourses(0)}  // Reset page to 0 to refresh data from the first page based on new search term
                                    >
                                        <i class="fa-solid fa-magnifying-glass text-center"></i>
                                    </div>
                                </div>
                                <div>
                                    Status course
                                </div>
                                <div>
                                    <select
                                        style={{ margin: '10px 0', height: '35px', width: '200px', borderRadius: '5px' }}
                                        value={selectedStatus}
                                        onChange={handleStatusChange}
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="Draft">Draft</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Denied">Denied</option>
                                        <option value="Waiting">Waiting</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            {isLoading ? (
                                <div className='d-flex justify-content-center'>
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (allCourses && allCourses.map((course, index) => (
                                <div className="item" key={course.id || index}>
                                    <div className=" d-flex">
                                        <img style={{ height: '55px', width: '55px', borderRadius: '50%' }} src={(course && course.pictureUrl) ? course.pictureUrl : demo} alt="" />
                                        <div style={{ marginLeft: '20px', width: '50%' }}>
                                            <p className='mb-1' style={{ fontSize: '18px', fontWeight: 500 }}>{course.name} </p>
                                            <p className='mb-1'>Created date: {course.createdDate.split(' ')[0]}</p>
                                        </div>
                                        <div style={{ width: '20%' }}>
                                            <p>Created by: { }</p>
                                        </div>
                                        <div>
                                            <p>{course.status}</p>
                                        </div>
                                    </div>
                                </div>
                            )))}
                        </div>
                        <div className="d-flex justify-content-center">
                            <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                pageCount={totalPagesAllCourses} // total number of pages
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={4}
                                onPageChange={handlePageClickAllCourses} // handle page change
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'courseModeration' && (
                    <div>
                        <div style={{ minHeight: '470px' }}>
                            {courses && courses.map((course, index) => (
                                <div className="item" key={course.id || index}>
                                    <div className="d-flex justify-content-between">
                                        <div className="left d-flex justify-content-start">
                                            <img src={(course && course.pictureUrl) ? course.pictureUrl : demo} alt="" />
                                            <div style={{ marginLeft: '20px' }}>
                                                <div className='d-flex justify-content-start'>
                                                    <p style={{ fontSize: '18px', fontWeight: 500 }}>{course.name} </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='right'>
                                            <div onClick={() => handleViewDetail(course.id)} className='text-center' style={{ marginTop: '10px', float: 'right', backgroundColor: '#FFA63D', marginRight: '15px', height: '25px', borderRadius: '10px', width: '80px', color: 'white', cursor: 'pointer' }}>
                                                <p>View Detail</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-center">

                            < ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                pageCount={totalPagesCourseMod} // total number of pages
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClickCourseMod} // handle page change
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                            />
                        </div>
                    </div>
                )}

            </div>


        </div >
    );
}
