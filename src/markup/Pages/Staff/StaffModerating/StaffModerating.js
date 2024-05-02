import React, { useState, useEffect } from 'react';
import demo from '../../../../images/gallery/demo.jpg';
import Modal from 'react-bootstrap/Modal';
import background from '../../../../images/background/staff1.jpg';
import instance from '../../../../helper/apis/baseApi/baseApi';
import { convertUtcToLocalTime, formatDateV1 } from '../../../../helper/utils/DateUtil';
import { ToastContainer, toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { getCloudVideoUrl } from '../../../../helper/apis/course/course';
import { LoadingSpinner } from '../../../Layout/Components/LoadingSpinner';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import "./StaffModerating.css";
import { ConfirmModal } from '../../../Layout/Components/Notification/ConfirmModal';
import { useNavigate } from 'react-router-dom';


const ModeratingLesson = ({ onBack, section }) => {
    const [selectedLesson, setSelectedLesson] = useState(section.lessons[0]);

    const [currentLessonVideoUrl, setCurrentLessonVideoUrl] = useState(null);
    const handleSelectLesson = async (lesson) => {
        if (lesson.type === 'Video') {
            await getVideoUrl(lesson);
        }
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

    useEffect(() => {
        if (section?.lessons[0]?.type === "Video") {
            getVideoUrl(section?.lessons[0]);
        }
    }, [])

    //notification
    const notifyApiFail = (message) =>
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeButton: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    //get video function

    const getVideoUrl = async (lesson) => {
        //log

        if (lesson) {
            if (lesson?.resourceUrl !== undefined && lesson?.resourceUrl !== null) {
                const videoUrl = lesson?.resourceUrl
                setCurrentLessonVideoUrl(videoUrl);
                return;
            }
            const videoName = lesson?.name;
            try {
                const videoUrl = await getCloudVideoUrl({ videoName: videoName, sectionId: section?.id });

                setCurrentLessonVideoUrl(videoUrl);
            } catch (error) {
                let message;
                if (error.response) {

                    message =
                        error.response?.data?.message || "Error when get lesson.";
                } else {

                    message = error.message || "Error when get lesson.";
                }
                notifyApiFail(message);
            }
        }
    }

    const renderLessonContent = () => {

        if (!selectedLesson) return <p>Select a lesson to see the content.</p>;
        return (
            <div>
                {selectedLesson.type === 'Video' && (
                    <div style={{ marginLeft: 170, marginTop: 5 }}>
                        <iframe
                            title="Embedded Video"
                            width="800"
                            height="500"
                            src={currentLessonVideoUrl}
                            // frameborder="0"
                            allowFullScreen

                        style={{ border: '2px solid white',marginTop:'1rem',borderRadius:10 }} 
                        ></iframe>
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
            <ToastContainer />
            <div className="mx-5" style={{ backgroundColor: 'white', borderRadius: 20, borderStyle: 'solid', border: 'none', marginTop: 30, height: 700, overflowY: 'auto' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 47, paddingTop: 20, paddingRight: 30 }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div>
                            <h5 className='mb' >Lesson {section.order}:<span style={{ marginLeft: 8 }}>{section.name}</span></h5>
                        </div>
                        <i style={{ color: '#ff8a00', marginLeft: '10px', fontSize: '20px' }} className="fa-solid fa-book-open-reader"></i>
                    </div>
                    <div>
                        <button onClick={onBack} style={{ backgroundColor: '#1A9CB7', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px', padding: '5px 5px' }} ><i className="fa-solid fa-chevron-left" style={{ paddingRight: 5 }}></i>Back</button>
                    </div>
                </div>
                <div>
                    {section?.lessons?.map((lesson, index) => (
                        <div
                            key={index}
                            style={{
                                cursor: 'pointer', backgroundColor: selectedLesson && selectedLesson.id === lesson.id ? '#FED37E' : 'transparent', width: 600, borderTopRightRadius: 25, borderBottomRightRadius: 25, padding: '10px 0px 10px 130px'
                                , color: selectedLesson && selectedLesson.id === lesson.id ? '#f8f8f8' : 'black',
                                fontWeight: selectedLesson && selectedLesson.id === lesson.id ? 'bold' : 'normal', fontSize: 16
                            }}
                            className={`d-flex justify-content-start mt-2 ${selectedLesson && selectedLesson.id === lesson.id ? 'selected-lesson' : ''}`}
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
                <button onClick={onBack} style={{ backgroundColor: '#1A9CB7', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px', padding: '5px 5px' }} ><i className="fa-solid fa-chevron-left" style={{ paddingRight: 5 }}></i>Back</button>
            </div>
            <hr />
            <div>
                <p style={{ fontWeight: 'bold', color: "#EF7E54", marginLeft: 100 }}>Test time <span style={{ borderWidth: 2, borderStyle: 'solid', padding: '10px 15px', borderColor: '#D4D4D4', borderRadius: 10, marginLeft: 30 }}>{quiz.duration}</span></p>
                <p style={{ fontWeight: 'bold', color: "#EF7E54", marginLeft: 100 }}>Quiz Content</p>
                {quiz && quiz.questions.map((question, index) => (
                    <div key={index} style={{ marginBottom: 20 }}>
                        <div style={{ borderRadius: '10px', backgroundColor: '#FBEDE1', width: 900, marginLeft: 100, height: 450 }}>
                            <div style={{ backgroundColor: '#F6D3C8', paddingLeft: 35, fontWeight: 'bold', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 50, paddingTop: 15 }}>Question {question.order} .</div>
                            <p style={{ textAlign: 'center', height: 0 ,marginTop:'1.5rem'}}>{question.title}</p>
                            <div style={{ width: 800, marginLeft: 50 }}>
                                <hr style={{ height: 3 }} />
                            </div>
                            <p style={{ paddingLeft: 50, color: '#EF7E54', fontWeight: '600', height: 10 }}>Answer</p>
                            {question.options.map((option, optionIndex) => (
                                <div key={optionIndex} className='d-flex' style={{ paddingLeft: 50, borderWidth: 2, borderColor: '#FBEDE1', borderStyle: 'solid', width: 800, marginLeft: 50, marginBottom: 15, borderRadius: 10, backgroundColor: 'white', alignItems: 'center', height: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10 }} >
                                    <p style={{ height: 0 }}>{option.content}</p>
                                    {option.isCorrect && (
                                        <span style={{ marginLeft: '10px', borderStyle: 'solid', borderColor: 'white', borderRadius: 30, paddingLeft: 15, paddingRight: 15, backgroundColor: '#F15C58', color: 'white', fontWeight: '500', paddingTop: 5, paddingBottom: 5 }}>Correct</span>
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
    const [price, setPrice] = useState(10000);
    const [priceError, setPriceError] = useState('');
    const [formattedPrice, setFormattedPrice] = useState("");
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                setIsLoading(true);
                const response = await instance.get(`api/v1/courses/${courseId}?action=manage`);
                const data = response.data
                setCourseDetails(data); // Assuming the API returns the details directly
            } catch (error) {
                // let message;
                if (error.response) {

                    // message =
                    //     error.response?.data?.message || "Error when fetch course detail.";
                } else {

                    // message = error.message || "Error when fetch course detail.";
                }
                navigate("/not-found");
            } finally {
                setIsLoading(false);
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

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleCourseTypeSelect = (type) => setCourseType(type);

    function getIconBasedOnType(type) {
        const iconMap = {
            'Video': 'fa-solid fa-circle-play',
            'Document': 'fa-solid fa-book-open',
            'Quiz': 'fa-solid fa-book'
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
        setBackdropOpen(true);
        if (selectedOption !== 'option2') { // This means normal user setup is active
            if (!courseType) {
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
                return; // Stop the function execution if no course type is selected
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
        }

        const isFree = courseType === 'free';
        const isAdminSetup = selectedOption === 'option2';
        const payload = {
            isFree,
            isAdminSetup,
            price: isFree ? undefined : price, // Use the state variable price
        };

        try {
            const response = await instance.patch(`api/v1/courses/${courseId}/approve`, payload);
            if (response.status === 200) { // Check if the HTTP status code is 200 OK
                toast.success("Approve course successfully", {
                    position: "top-right",
                    autoClose: 2000, // Toast will auto close after 2 seconds
                    hideProgressBar: true,
                    onClose: () => {
                        onBack();
                    }
                });
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {

            toast.error("Failed to approve course", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
            });
        } finally {
            setBackdropOpen(false); // Close the backdrop regardless of the result
        }
    };

    const setupNowContent = (
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
                            type="number"
                            placeholder='Enter price'
                            value={price}
                            onChange={handlePriceChange}
                            disabled={courseType !== 'paid'}
                            style={{ border: '1px solid #FF8A00', borderRadius: '8px', outline: 'none' }}
                        />
                        {priceError && <p style={{ color: 'red' }}>{priceError}</p>}
                    </div>
                )}
            </div>
        </div>
    );

    const adminSetupContent = (
        <div className='d-flex justify-content-center my-5 py-5' style={{ border: '2px solid #1A9CB7', borderRadius: '8px' }}>
            <p className='mb-0'>This course will be transferred to the admin for approval</p>
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
        <div className='moderating-detail moderating-detail-container px-5 py-4' >
            <div className='moderating-detail-container-content' >
                {isLoading ? (<LoadingSpinner />) :
                    (<>
                        <ConfirmModal
                            message={"The course meets the standards and is approved to be posted to the system"}
                            acceptLabel={"Approve"}
                            closeLabel={"Close"}
                            handleAccept={handleApprove}
                            handleDeny={() => setApproveModalShow(false)}
                            show={modalApproveShow} />

                        <ToastContainer />
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={backdropOpen}
                            onClick={() => setBackdropOpen(false)}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>

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
                                        <p className='mb-0' style={{ marginLeft: '5px', color: '#FF8A00' }}>Set up now</p>
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
                                        <p className='mb-0' style={{ marginLeft: '5px', color: '#FF8A00' }}>Admin set up</p>
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
                                    <p style={{ color: '#1A9CB7', textAlign: 'center', fontSize: '20px', fontWeight: '600' }}>Reason refuse course</p>
                                    <textarea name="" id="" rows="4" style={{
                                        width: '100%',
                                        paddingLeft: '10px',
                                        borderRadius: 10,
                                        paddingTop: '10px',
                                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                        borderColor: 'lightblue'
                                    }} placeholder='Write your reason'></textarea>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <div className="d-flex" style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        border: '1px solid lightblue',
                                        color: '#FF8A00',
                                        padding: '5px 10px',
                                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                        borderRadius: '10px',
                                        width: '65%'
                                    }}>
                                        <p className='mb-0 ' style={{ color: '#1A9CB7', marginRight: '10px' }}>Send to teacher: <span style={{ marginTop: '9px', color: '#FF8A00' }}>{courseDetails?.modifiedByName}</span></p>
                                        {/* <span style={{ marginTop: '9px' }}>Nguyễn Ngọc Lâm</span> */}

                                    </div>
                                </div>
                                <div className="d-flex" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }}>
                                    <button className='mx-2' style={{ height: '40px', width: '120px', backgroundColor: '#F15C58', color: 'white', borderRadius: '20px', border: 'none' }} onClick={() => setRefuseShow(false)}>Cancel</button>
                                    <button style={{ height: '40px', width: '120px', backgroundColor: '#1A9CB7', color: 'white', borderRadius: '20px', border: 'none', marginLeft: '45px', marginRight: '7px' }} onClick={() => setRefuseShow(false)}>Send</button>
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
                                    <i style={{ color: '#ff8a00', marginLeft: '10px', fontSize: '20px' }} className="fa-solid fa-bell"></i>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button style={{ backgroundColor: '#7F7C7C', color: 'white', border: 'none', marginRight: '10px', borderRadius: '7px', paddingRight: 7 }} onClick={onBack} ><i className="fa-solid fa-chevron-left" style={{ marginRight: 5 }}></i>Back</button>
                                    <button onClick={() => setRefuseShow(true)} style={{ backgroundColor: '#F25B58', color: 'white', border: 'none', marginRight: '10px', borderRadius: '7px', paddingTop: 5, paddingBottom: 5, paddingRight: 7 }}><i className="fa-solid fa-x" style={{ marginRight: 5 }}></i> Refuse</button>
                                    <button onClick={() => setApproveModalShow(true)} style={{ color: '#FF8A00', backgroundColor: 'white', borderRadius: '7px', borderColor: '#FF8A00', borderStyle: 'solid', borderWidth: 2, paddingRight: 7 }}><i className="fa-solid fa-check" style={{ marginRight: 5 }}></i>Approve</button>
                                </div>
                            </div>
                        </div>

                        <div className="moderating-detail-content">

                            <div>
                                <img
                                    src={courseDetails?.pictureUrl ?? background}
                                    alt=""
                                    style={{
                                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                        border: '2px solid white',
                                        borderRadius: '15px',
                                        height: '335px',
                                        imageRendering: 'pixelated',
                                    }}
                                />
                                <h4 className='title blue mb-1' style={{ margin: '12px 0px 12px 0px', textAlign: "center" }}>{courseDetails && courseDetails.name}</h4>
                                {/* <div className="d-flex justify-content-between" style={{ padding: '12px 150px', fontSize: '18px' }}>
                                    <div className="d-flex">
                                        <i className="fa-solid fa-book mt-1"></i>
                                        <p className='mb-0 ms-1'>{courseDetails && courseDetails.totalLesson} lessons</p>
                                    </div>
                                    <div className="d-flex">
                                        <i className="fa-solid fa-circle-play mt-1"></i>
                                        <p className='mb-0 ms-1'>{courseDetails && courseDetails.totalVideo} videos</p>
                                    </div>
                                    <div className="d-flex">
                                        <i className="fa-solid fa-book-open mt-1"></i>
                                        <p className='mb-0 ms-1'>{courseDetails && courseDetails.totalDocument} documents</p>
                                    </div>
                                    <div className="d-flex">
                                        <i className="fa-solid fa-pen-to-square mt-1"></i>
                                        <p className='mb-0 ms-1'>{courseDetails && courseDetails.totalQuiz} quiz</p>
                                    </div>
                                </div> */}
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
                                                    <button onClick={() => handleViewLesson(section)} className='me-3' style={{ backgroundColor: '#F15C58', border: 'none', borderRadius: '8px', color: 'white',height:30 }}>View lesson</button>
                                                </div>
                                                {section.lessons.map((lesson, lessonIndex) => (
                                                    <div className="lesson-item" key={lesson.id}>
                                                        <div className='lesson-content d-flex justify-content-start ms-3'>
                                                            <i className={getIconBasedOnType(lesson.type)}></i>
                                                            <p className='ms-2'>{lesson.name}</p>
                                                        </div>
                                                    </div>
                                                ))}

                                                {section.quizzes.map((quiz, index) => (
                                                    <div className="lesson-item" key={index}>
                                                        <div className='lesson-content d-flex justify-content-between align-items-center ms-3'>
                                                            <div style={{display:"flex",alignItems:'center',justifyContent:'center'}}>
                                                                <i className={getIconBasedOnType("Quiz")}></i>
                                                                <p className='ms-2' style={{marginBottom:0}}>{quiz.title}</p>
                                                            </div>
                                                            <button onClick={() => handleViewQuiz(quiz)} style={{ backgroundColor: '#F15C58', border: 'none', borderRadius: '8px', color: 'white', height: 30, width: 93 ,marginRight:'1rem'}}>View Quiz</button>
                                                        </div>

                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* <div className="accordion mt-5" id="collapseQuiz" style={{ marginBottom: 10 }}>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOneHundred">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOneHundred" aria-expanded="true" aria-controls="collapseOneHundred">
                                            Quiz
                                        </button>
                                    </h2>
                                    <div id="collapseOneHundred" className="accordion-collapse collapse show" aria-labelledby="headingOneHundred" data-bs-parent="#accordionQuiz">
                                        <div className="accordion-body">
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
                            </div> */}

                        </div>
                    </>)}
            </div>
        </div>
    );
}

export default function StaffModerating() {
    const [courses, setCourses] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;
    const [isLoading, setIsLoading] = useState(false);


    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleViewDetail = (courseId) => {
        setSelectedCourseId(courseId);
        setShowDetail(true);
    };

    const handleBack = () => {
        setShowDetail(false);
        fetchCourses();
    };

    const fetchCourses = async () => {
        setIsLoading(true)
        try {
            const response = await instance.get(`api/v1/courses?status=Pending&action=manage`);
            const data = response.data

            //log


            setCourses(data);
            setTotalPages(Math.ceil(data.total / itemsPerPage));
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    if (showDetail) {
        return <ModeratingDetail courseId={selectedCourseId} onBack={handleBack} />;
    }

    return (
        <div className='mx-5' style={{ backgroundColor: 'white', borderRadius: "15px", height: "90vh" }}>
            <div className='staff-moderating my-0' >
                <div className="header">
                    <div className="d-flex justify-content-start">
                        <div>
                            <h5 className='mb'>MODERATING</h5>
                            <hr />
                        </div>
                        <i className="fa-solid fa-bell"></i>
                    </div>
                </div>
                <div className="staff-moderating-courses-container">
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : (Array.isArray(courses.results) && courses.results.map((course, index) => (
                        <div className="item" key={course.id || index}>
                            <div className="d-flex justify-content-between">
                                <div className="left d-flex justify-content-start">
                                    <img src={(course && course.pictureUrl) ? course.pictureUrl : demo} alt="" />
                                    <div style={{ marginLeft: '20px' }}>
                                        <div className='d-flex justify-content-start'>
                                            <p style={{ fontSize: '18px', fontWeight: 500 }}>{course.name} </p>
                                        </div>
                                        <div className="d-flex">
                                            <i className="fa-regular fa-clock mt-1"></i>
                                            <p className='ms-1'>{formatDateV1(convertUtcToLocalTime(course.createdDate))}</p>
                                        </div>
                                        {/* <p style={{ marginTop: '10px', color: '#FF8A00' }} className='mb'>4 sections</p> */}
                                    </div>
                                </div>
                                <div className='right'>
                                    {/* <div className="d-flex">
                                        <i className="fa-regular fa-clock mt-1"></i>
                                        <p className='ms-1'>{course.status}</p>
                                    </div> */}
                                    <div onClick={() => handleViewDetail(course.id)} className='text-center' style={{ float: 'right', backgroundColor: '#FFA63D', marginRight: '15px', height: '30px', borderRadius: '10px', width: '80px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <p style={{ margin: '0' }}>View Detail</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>

                {/* <div className="d-flex justify-content-center">
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                        forcePage={currentPage}
                    />

                </div> */}
                <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    bottom='1'
                    my={2}
                >
                    <Pagination
                        count={courses?.totalPages <= 0 ? 1 : courses.totalPages}
                        color="primary"
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{
                                    previous: ArrowBack,
                                    next: ArrowForward,
                                }}
                                {...item}
                            />
                        )}
                    />
                </Stack>
            </div>

        </div>
    );
}