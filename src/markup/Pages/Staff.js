import React, { useState } from 'react';
import demo from './../../images/gallery/demo.jpg';
import simp from './../../images/gallery/simp.jpg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModeratingLesson = ({ onBack }) => {
    const [selectedContent, setSelectedContent] = useState(null);

    const selectContent = (contentId) => {
        setSelectedContent(contentId);
    };

    const renderSelectedContent = () => {
        switch (selectedContent) {
            case 'video1':
                return <div className='d-flex justify-content-center'>
                    <iframe width="560" height="315"
                        src="https://www.youtube.com/embed/O36r05htZXU?si=FO9qoMv1hUXum7CM"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>;
            case 'reading1':
                return <div>
                    <h5>What is programming?</h5>
                    <p>Welcome to Business Analysis & Process Management Course. This is a project-based
                        course which should take approximately 2 hours to finish. Before diving into the project,
                        please take a look at the course objectives and structure</p>
                    <div className="d-flex justify-content-center">
                        <img width="560" height="315" src={simp} alt="" />
                    </div>
                    <p>Welcome to Business Analysis & Process Management Course. This is a project-based
                        course which should take approximately 2 hours to finish. Before diving into the project,
                        please take a look at the course objectives and structure</p>
                </div>;
            case 'reading2':
                return <div>
                    <h5>What is programming?</h5>
                    <p>Welcome to Business Analysis & Process Management Course. This is a project-based
                        course which should take approximately 2 hours to finish. Before diving into the project,
                        please take a look at the course objectives and structure</p>
                    <div className="d-flex justify-content-center">
                        <img width="560" height="315" src={simp} alt="" />
                    </div>
                    <p>Welcome to Business Analysis & Process Management Course. This is a project-based
                        course which should take approximately 2 hours to finish. Before diving into the project,
                        please take a look at the course objectives and structure</p>
                </div>;
            case 'video2':
                return <div className='d-flex justify-content-center'>
                    <iframe width="560" height="315"
                        src="https://www.youtube.com/embed/O36r05htZXU?si=FO9qoMv1hUXum7CM"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>;
            case 'quiz':
                return <p>Quiz: Test your tech knowledge!</p>;
            default:
                return <p>Select a topic to see more information.</p>;
        }
    };

    return (
        <div className="moderating-lesson">
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
            <div className='mt-3'>
                <div className="d-flex justify-content-start ms-5" onClick={() => selectContent('video1')}>
                    <i className="fa-solid fa-circle-play" />
                    <div className='ms-3'>
                        <p className='mb-0'>Welcome to technology</p>
                        <span>Video - 1 min</span>
                    </div>
                </div>
                <div className="d-flex justify-content-start mt-3 ms-5" onClick={() => selectContent('reading1')}>
                    <i className="fa-solid fa-book" />
                    <div className='ms-3'>
                        <p className="mb-0">Technology overview</p>
                        <span>Reading - 2 min</span>
                    </div>
                </div>
                <div className="d-flex justify-content-start mt-3 ms-5" onClick={() => selectContent('reading2')}>
                    <i className="fa-solid fa-book" />
                    <div className='ms-3'>
                        <p className="mb-0">Technology overview</p>
                        <span>Reading - 2 min</span>
                    </div>
                </div>
                <div className="d-flex justify-content-start mt-3 ms-5" onClick={() => selectContent('video2')}>
                    <i className="fa-solid fa-circle-play" />
                    <div className='ms-3'>
                        <p className="mb-0">Welcome to technology</p>
                        <span>Video - 1 min</span>
                    </div>
                </div>
                <div className="d-flex justify-content-start mt-3 ms-5" onClick={() => selectContent('quiz')}>
                    <i className="fa-solid fa-pen-to-square" />
                    <div className='ms-3'>
                        <p className="mb-0">Graded Quiz: Test your tech knowledge!</p>
                        <span>Quiz - 10 questions</span>
                    </div>
                </div>
            </div>
            <div className="render-lesson">
                {renderSelectedContent()}
            </div>
        </div>
    );
}

const ModeratingDetail = ({ onBack }) => {
    const [showLesson, setShowLesson] = useState(false);
    const [modalApproveShow, setApproveModalShow] = React.useState(false);
    const [modalApproveSetting, setApproveSetting] = React.useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [courseType, setCourseType] = useState('');
    const [modalRefuseShow, setRefuseShow] = React.useState(false);

    const handleViewLesson = () => {
        setShowLesson(true);
    };

    if (showLesson) {
        return <ModeratingLesson onBack={() => setShowLesson(false)} />;
    }

    const handleApprove = () => {
        setApproveModalShow(false);
        setApproveSetting(true);
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };

    const handleCourseTypeSelect = (type) => setCourseType(type);

    return (
        <div className='moderating-detail'>
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
                                <div style={{ marginTop: '10px' }}>
                                    <div className="d-flex justiy-content-start">
                                        <p style={{ color: '#1A9CB7' }}>Price</p>
                                        <span style={{ color: '#FF8A00' }}>*</span>
                                    </div>
                                    <p>The lowest price is 10.00</p>
                                    <input type="number" placeholder='10' />
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="d-flex justify-content-end">
                        <button onClick={() => { setApproveSetting(false) }} style={{ height: '35px', width: '120px', backgroundColor: '#F15C58', color: 'white', borderRadius: '10px', border: 'none' }} >Close</button>
                        <button onClick={() => { setApproveSetting(false) }} style={{ height: '35px', width: '120px', backgroundColor: '#1A9CB7', color: 'white', borderRadius: '10px', border: 'none' }} >Approve</button>
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
                        <button style={{ backgroundColor: '#7F7C7C', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px' }} onClick={onBack} ><i class="fa-solid fa-chevron-left"></i>Back</button>
                        <button onClick={() => setRefuseShow(true)} style={{ backgroundColor: '#F25B58', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px' }}><i class="fa-solid fa-x"></i> Refuse</button>
                        <button onClick={() => setApproveModalShow(true)} style={{ color: '#FF8A00', backgroundColor: 'white', border: 'none', borderRadius: '5px' }}><i class="fa-solid fa-check"></i>Approve</button>
                    </div>
                </div>
            </div>

            <div className="moderating-detail-content">

                <div>
                    <img src={simp} alt="" />
                    <p className='title blue mb-1' style={{ margin: '12px 0px 12px 0px' }}>What is programming?</p>
                    <div className="d-flex justify-content-between" style={{ padding: '12px 50px' }}>
                        <div className="d-flex">
                            <i class="fa-solid fa-book"></i>
                            <p className='mb-0 ms-1'>4 lessons</p>
                        </div>
                        <div className="d-flex">
                            <i class="fa-solid fa-circle-play"></i>
                            <p className='mb-0 ms-1'>4 videos</p>
                        </div>
                        <div className="d-flex">
                            <i class="fa-solid fa-book-open"></i>
                            <p className='mb-0 ms-1'>4 documents</p>
                        </div>
                        <div className="d-flex">
                            <i class="fa-solid fa-pen-to-square"></i>
                            <p className='mb-0 ms-1'>4 quiz</p>
                        </div>
                    </div>
                    <div>
                        <p>This is a guided project for both beginners and professionals
                            managing small to medium enterprises or working in the fields
                            of business analysis & business process management. It provides
                            you with the initial know-how of analyzing businesses......</p>
                    </div>
                </div>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Lesson 1
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <div className="d-flex justify-content-between mt-3">
                                    <div className="d-flex justify-content-start">
                                        <i className="fa-solid fa-circle-play" />
                                        <div className='ms-3'>
                                            <p className='mb-0'>Welcome to technology</p>
                                            <span>Video - 1 min</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={handleViewLesson} style={{ backgroundColor: '#F15C58', color: 'white', border: 'none', borderRadius: '5px' }}>View lesson</button>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start mt-3">
                                    <i className="fa-solid fa-book" />
                                    <div className='ms-3'>
                                        <p className="mb-0">Technology overview</p>
                                        <span>Reading - 2 min</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start mt-3">
                                    <i className="fa-solid fa-book" />
                                    <div className='ms-3'>
                                        <p className="mb-0">Technology overview</p>
                                        <span>Reading - 2 min</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start mt-3">
                                    <i className="fa-solid fa-circle-play" />
                                    <div className='ms-3'>
                                        <p className="mb-0">Welcome to technology</p>
                                        <span>Video - 1 min</span>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-start mt-3">
                                    <i className="fa-solid fa-pen-to-square" />
                                    <div className='ms-3'>
                                        <p className="mb-0">Graded Quiz: Test your tech knowledge!</p>
                                        <span>Quiz - 10 questions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Lesson 2
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Lesson 3
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFour">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                Lesson 4
                            </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <strong>This is the fourth item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}

const StaffNotification = () => {
    return (
        <div className='staff-notification'>
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
    );
}

const StaffModerating = () => {
    const [showDetail, setShowDetail] = useState(false);

    const handleViewDetail = () => {
        setShowDetail(true);
    };

    const handleBack = () => {
        setShowDetail(false);
    };

    if (showDetail) {
        return <ModeratingDetail onBack={handleBack} />;
    }

    return (
        <div className='staff-moderating'>
            <div className="header">
                <div className="d-flex justify-content-start">
                    <div>
                        <h5 className='mb'>MODERATING</h5>
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
                                <p style={{ fontSize: '18px', fontWeight: 500 }}>What is programming </p>
                                <span>|</span>
                                <span style={{ color: '#1A9CB7' }}>Teacher: Nguyễn Ngọc Lâm</span>
                            </div>
                            <p style={{ marginTop: '10px', color: '#FF8A00' }} className='mb'>4 sections</p>
                        </div>
                    </div>
                    <div className='right'>
                        <p><i class="fa-regular fa-clock"></i>  09-02-2024 at 9:30 AM</p>
                        <div onClick={handleViewDetail} className='text-center' style={{ marginTop: '10px', float: 'right', backgroundColor: '#FFA63D', marginRight: '15px', height: '25px', borderRadius: '10px', width: '80px', color: 'white', cursor: 'pointer' }}>
                            <p >View Detail</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Staff() {
    const [activeContent, setActiveContent] = useState('');
    const [activeItem, setActiveItem] = useState('');

    const handleMenuItemClick = (content) => {
        setActiveContent(content);
        setActiveItem(content); // Set the active item to manage styling
    };

    const renderContent = () => {
        switch (activeContent) {
            case 'Notification':
                return <StaffNotification />;
            case 'Moderating':
                return <StaffModerating />;
            case 'Order':
                return <div>Your orders...</div>;
            case 'Class':
                return <div>Class information...</div>;
            case 'Course':
                return <div>Course details...</div>;
            default:
                return <div>Select a menu item to see the content</div>;
        }
    };

    const getItemClass = (itemName) => {
        return `item d-flex justify-content-start ${activeItem === itemName ? 'active' : ''}`;
    };

    return (
        <div>
            <div className="staff row">
                <div className="menu col-lg-2">
                    <div className="logo text-center">
                        <h5>KidsPro</h5>
                    </div>
                    <div>
                        <div className={getItemClass('Notification')} onClick={() => handleMenuItemClick('Notification')}>
                            <i class="fa-solid fa-bell"></i>
                            <span>Notification</span>
                        </div>
                        <div className={getItemClass('Moderating')} onClick={() => handleMenuItemClick('Moderating')}>
                            <i class="fa-solid fa-circle-stop"></i>
                            <span>Moderating</span>
                        </div>
                        <div className={getItemClass('Order')} onClick={() => handleMenuItemClick('Order')}>
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span>Order</span>
                        </div>
                        <div className={getItemClass('Class')} onClick={() => handleMenuItemClick('Class')}>
                            <i class="fa-solid fa-user"></i>
                            <span>Class</span>
                        </div>
                        <div className={getItemClass('Course')} onClick={() => handleMenuItemClick('Course')}>
                            <i class="fa-solid fa-book"></i>
                            <span>Course</span>
                        </div>
                    </div>
                    <div className="d-flex">
                        <i class="fa-solid fa-right-from-bracket"></i>
                        Log out
                    </div>
                </div>

                <div className='col-lg-10'>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}
