import React, { useState, useEffect, useRef } from 'react';
import background from './../../images/background/adminStaffBackground.jpg';
import simp from './../../images/gallery/simp.jpg';
import Modal from 'react-bootstrap/Modal';
import ReactPaginate from 'react-paginate';

import basic from './../../images/icon/basicGame.png';
import sequence from './../../images/icon/sequenceGame.png';
import loop from './../../images/icon/loopGame.png';
import functionGame from './../../images/icon/functionGame.png';
import condition from './../../images/icon/conditionGame.png';
import custom from './../../images/icon/customGame.png';

function SearchableDropdown({ options, selectedValue, onChange }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const filtered = options.filter(option =>
            option.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredOptions(filtered);
    }, [searchTerm, options]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownRef]);

    // Find the selected option's label
    const selectedOptionLabel = options.find(option => option.id === selectedValue)?.fullName || '';

    return (
        <div ref={dropdownRef} style={{ position: 'relative' }}>
            <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc' }}>
                {selectedOptionLabel || 'Select an option'}
            </div>
            {isDropdownOpen && (
                <>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{ padding: '10px', margin: '5px 0', width: 'calc(100% - 20px)', boxSizing: 'border-box' }}
                    />
                    <ul style={{ listStyleType: 'none', margin: 0, padding: 0, maxHeight: '200px', overflowY: 'auto', position: 'absolute', width: '100%', border: '1px solid #ccc', backgroundColor: '#fff', zIndex: 1000 }}>
                        {filteredOptions.map(option => (
                            <li key={option.id} onClick={() => { onChange(option.id); setIsDropdownOpen(false); }} style={{ padding: '10px', cursor: 'pointer' }}>
                                {option.fullName}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

const Syllabus = () => {
    const [showCreateSyllabus, setShowCreateSyllabus] = useState(false);
    const [courses, setCourses] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4; // You can set this to however many items you want per page
    const pageCount = Math.ceil(courses.length / itemsPerPage);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const offset = currentPage * itemsPerPage;
    const currentPageData = courses.slice(offset, offset + itemsPerPage);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('https://www.kidpro-production.somee.com/api/v1/courses?status=Draft&action=manage', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    // Handle response errors
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to fetch courses');
                }

                const data = await response.json();
                setCourses(data.results || []);
            } catch (error) {
                console.error('Error fetching courses:', error.message);
            }
        };

        fetchCourses();
    }, [accessToken]);

    const CreateSyllabus = () => {
        const [teachers, setTeachers] = useState([]);
        const [modalShow, setModalShow] = React.useState(false);
        const [sections, setSections] = useState([]);
        const [newSectionName, setNewSectionName] = useState('');

        const [courseName, setCourseName] = useState('');
        const [courseTarget, setCourseTarget] = useState('');
        const [selectedTeacherId, setSelectedTeacherId] = useState(null);

        const handleAddSection = () => {
            if (newSectionName.trim() !== '') {
                setSections([...sections, newSectionName.trim()]);
                setNewSectionName('');
                setModalShow(false);
            }
        };

        useEffect(() => {
            const fetchTeachers = async () => {
                try {
                    const response = await fetch('https://www.kidpro-production.somee.com/api/v1/users/admin/account?role=Teacher&page=1&size=100', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${accessToken}`
                        }
                    });
                    if (!response.ok) {
                        const errorResponse = await response.json(); // Parsing the error response
                        console.error('Failed to create course:', errorResponse);
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const text = await response.text();
                    if (!text) {
                        console.error('Response body is empty');
                        return;
                    }
                    // Now parse the text as JSON since the body has been read as text
                    const data = JSON.parse(text);
                    if (!data.results) {
                        console.error('No results found');
                        return;
                    }
                    const teachersData = data.results.filter(item => item.role === 'Teacher');
                    setTeachers(teachersData);
                } catch (error) {
                    console.error('Failed to fetch teachers:', error);
                }
            };
            fetchTeachers();
        }, []);

        const handleSaveChanges = async () => {
            const courseData = {
                name: courseName,
                courseTarget: courseTarget,
                teacherId: selectedTeacherId,
                sections: sections.map(sectionName => ({ name: sectionName }))
            };

            try {
                const response = await fetch('https://www.kidpro-production.somee.com/api/v1/courses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(courseData)
                });

                if (!response.ok) {
                    const errorResponse = await response.json(); // Parsing the error response
                    console.error('Failed to create course:', errorResponse);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Handle a successful response
                const responseData = await response.json();
                console.log('Course successfully created:', responseData);
                // Optionally, clear the form or give user feedback
            } catch (errors) {
                console.error('Failed to create course:', errors);
            }
        };

        return (
            <div style={{ padding: '20px 80px' }}>
                <div className='create-syllabus'>
                    <div className="header">
                        <div className="d-flex justify-content-between">
                            <div className="d-flex justify-content-start">
                                <div>
                                    <h5 className='mb'>CREATE SYLLABUS</h5>
                                    <hr />
                                </div>
                                <i className="fa-solid fa-book"></i>
                            </div>
                            <div>
                                <button onClick={() => setShowCreateSyllabus(false)} style={{ backgroundColor: '#7F7C7C', color: 'white', border: 'none', borderRadius: '10px', padding: '5px 10px' }}>
                                    <i style={{ color: 'white' }} className="fa-solid fa-chevron-left"></i> Back
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="d-flex justify-content-start">
                                <div className="d-flex justify-content-start">
                                    <p className='mb-0 blue'>Course title</p>
                                    <span className='orange'>*</span>
                                </div>
                                <input className='ms-3' style={{ width: '400px' }} type="text" placeholder='Course title' value={courseName} onChange={e => setCourseName(e.target.value)} />
                            </div>

                            <div className="d-flex justify-content-start">
                                <p className='mb-0 blue'>Course target</p>
                                <span className='orange'>*</span>
                            </div>
                            <textarea name="" id="" rows="4" style={{ width: '100%' }} value={courseTarget} onChange={e => setCourseTarget(e.target.value)}></textarea>
                        </div>

                        <div className="d-flex justify-content-start">
                            <p className='mb-0 blue'>Section</p>
                            <span className='orange'>*</span>
                        </div>

                        <Modal
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                            show={modalShow}
                        >
                            <Modal.Body>
                                <div className="text-center">
                                    <h5 style={{ color: '#ff8a00' }}>Add new section</h5>
                                </div>
                                <div className='mt-4'>
                                    <p className='mb-0'>Section's name</p>
                                    <input value={newSectionName}
                                        onChange={(e) => setNewSectionName(e.target.value)}
                                        type="text"
                                        placeholder="Write section's name"
                                        style={{ width: '100%', borderRadius: '7px', outline: 'none' }} />
                                </div>
                                <div className="d-flex justify-content-end mt-4">
                                    <button style={{ backgroundColor: '#1a9cb7', color: 'white', border: 'none', borderRadius: '5px', height: '35px', width: '100px' }} className='mx-4' onClick={() => setModalShow(false)}>Cancel</button>
                                    <button style={{ backgroundColor: '#ff8a00', color: 'white', border: 'none', borderRadius: '5px', height: '35px', width: '100px' }} onClick={handleAddSection}>Add</button>
                                </div>
                            </Modal.Body>
                        </Modal>
                        <div className="render-section">
                            {sections.map((section, index) => (
                                <div className='ps-4 pt-2 pb-2' key={index} style={{ border: '1px solid #D4D4D4' }}>
                                    <p className='mb-0'>{section}</p>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <button style={{ backgroundColor: '#E53E5C', color: 'white', border: 'none', borderRadius: '10px', height: '35px' }} onClick={() => setModalShow(true)}><i class="fa-solid fa-circle-plus"></i>New section</button>
                        </div>

                        <div>
                            <div className="d-flex justify-content-start">
                                <p className='mb-0 blue'>Teacher</p>
                                <span className='orange'>*</span>
                            </div>
                            <SearchableDropdown
                                options={teachers}
                                selectedValue={selectedTeacherId}
                                onChange={(id) => setSelectedTeacherId(id)}
                            />
                        </div>

                        <div className="d-flex justify-content-end mt-4">
                            <button style={{ backgroundColor: '#FD8569', color: 'white', border: 'none', borderRadius: '7px', height: '35px', width: '150px' }} onClick={handleSaveChanges}>SAVE CHANGES</button>
                        </div>

                    </div>
                </div>
            </div>

        );
    }

    // Conditional rendering based on showCreateSyllabus
    if (showCreateSyllabus) {
        return <CreateSyllabus />;
    }

    return (
        <div className='admin-syllabus'>
            <div className='syllabus'>
                <div className="header">
                    <div className="d-flex justify-content-start">
                        <div>
                            <h5 className='mb'>SYLLABUS</h5>
                            <hr />
                        </div>
                        <i class="fa-solid fa-book"></i>
                    </div>
                </div>

                <div className="syllabus-content">
                    <div className='d-flex justify-content-between'>
                        <div className="d-flex justify-content-start" style={{ width: '30%', border: '1px solid #EF7E54', padding: '10px 15px', borderRadius: '10px', color: 'white' }}>
                            <div className='text-center' style={{ width: '50%' }}>
                                <h5 className='mb-0'>SYLLABUS LIST</h5>
                            </div>
                            <div className="d-flex justify-content-around" style={{ width: '50%', backgroundColor: '#FF8A00', borderRadius: '10px' }}>
                                <p className='mb-0'>Total syllabus</p>
                                <span>12</span>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => setShowCreateSyllabus(true)} style={{ backgroundColor: '#EF7E54', color: 'white', border: 'none', borderRadius: '10px', padding: '5px 10px' }}><i class="fa-solid fa-circle-plus"></i>        Create syllabus</button>
                        </div>
                    </div>

                    <div>
                        <div className="search d-flex justify-content-center">
                            <input type="text" placeholder='Search course' />
                            <div className='text-center' style={{ height: '30px', border: '1px solid #988E8E66', borderLeft: 'none', width: '5%', paddingTop: '5px', borderRadius: '0 10px 10px 0' }}>
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>

                        <div className='px-3'>
                            {currentPageData.map((course, index) => (
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
                                            <button className='mt-3' style={{ width: '100px', backgroundColor: '#EF7E54', border: 'none', borderRadius: '10px', color: 'white' }}>Edit</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex justify-content-center">
                            <ReactPaginate
                                previousLabel={"← Previous"}
                                nextLabel={"Next →"}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                previousLinkClassName={"pagination__link"}
                                nextLinkClassName={"pagination__link"}
                                disabledClassName={"pagination__link--disabled"}
                                activeClassName={"pagination__link--active"}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

const Game = () => {
    return (
        <div className='game-setting'>
            <div className="game-setting-content">

                <div className="header">
                    <div className="d-flex justify-content-start">
                        <div>
                            <h5 className='mb'>Game</h5>
                            <hr />
                        </div>
                        <i class="fa-solid fa-gamepad"></i>
                    </div>
                </div>
                <div className='row'>
                    <div className="item col-lg-6 col-md-6 col-sm-12">
                        <div className="item-content">

                            <p className="title blue fw-bold mb-2">Basic mode</p>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex level">
                                    <span>15</span>
                                    <p className='mb-0 ms-2'>Level</p>
                                </div>
                                <div>
                                    <img className='img-responsive' src={basic} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item col-lg-6 col-md-6 col-sm-12">
                        <div className="item-content">

                            <p className="title blue fw-bold mb-2">Sequence mode</p>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex level">
                                    <span>15</span>
                                    <p className='mb-0 ms-2'>Level</p>
                                </div>
                                <div>
                                    <img className='img-responsive' src={sequence} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item col-lg-6 col-md-6 col-sm-12">
                        <div className="item-content">

                            <p className="title blue fw-bold mb-2">Loop mode</p>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex level">
                                    <span>15</span>
                                    <p className='mb-0 ms-2'>Level</p>
                                </div>
                                <div>
                                    <img className='img-responsive' src={loop} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item col-lg-6 col-md-6 col-sm-12">
                        <div className="item-content">

                            <p className="title blue fw-bold mb-2">Function mode</p>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex level">
                                    <span>15</span>
                                    <p className='mb-0 ms-2'>Level</p>
                                </div>
                                <div>
                                    <img className='img-responsive' src={functionGame} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item col-lg-6 col-md-6 col-sm-12">
                        <div className="item-content">

                            <p className="title blue fw-bold mb-2">Condition mode</p>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex level">
                                    <span>15</span>
                                    <p className='mb-0 ms-2'>Level</p>
                                </div>
                                <div>
                                    <img className='img-responsive' src={condition} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="item col-lg-6 col-md-6 col-sm-12">
                        <div className="item-content">
                            <p className="title blue fw-bold mb-2">Custom mode</p>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex level">
                                    <span>15</span>
                                    <p className='mb-0 ms-2'>Level</p>
                                </div>
                                <div>
                                    <img className='img-responsive' src={custom} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Admin() {
    const [activeContent, setActiveContent] = useState('');
    const [activeItem, setActiveItem] = useState('');
    const accessToken = localStorage.getItem('accessToken');

    const handleMenuItemClick = (content) => {
        setActiveContent(content);
        setActiveItem(content);
    };

    const renderContent = () => {
        switch (activeContent) {
            case 'Notification':
                return <div></div>;
            case 'Dashboard':
                return <div></div>;
            case 'Certificate':
                return <div>Your orders...</div>;
            case 'User':
                return <div>Class information...</div>;
            case 'Course':
                return <div>Course details...</div>;
            case 'Game':
                return <Game />;
            case 'Order':
                return <div>Course details...</div>;
            case 'Syllabus':
                return <Syllabus />;
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
                        <div className={getItemClass('Dashboard')} onClick={() => handleMenuItemClick('Dashboard')}>
                            <i class="fa-solid fa-chart-line"></i>
                            <span>Dashboard</span>
                        </div>
                        <div className={getItemClass('Certificate')} onClick={() => handleMenuItemClick('Certificate')}>
                            <i class="fa-solid fa-medal"></i>
                            <span>Certificate</span>
                        </div>
                        <div className={getItemClass('User')} onClick={() => handleMenuItemClick('User')}>
                            <i class="fa-solid fa-user"></i>
                            <span>User</span>
                        </div>
                        <div className={getItemClass('Course')} onClick={() => handleMenuItemClick('Course')}>
                            <i class="fa-solid fa-book"></i>
                            <span>Course</span>
                        </div>
                        <div className={getItemClass('Game')} onClick={() => handleMenuItemClick('Game')}>
                            <i class="fa-solid fa-gamepad"></i>
                            <span>Game</span>
                        </div>
                        <div className={getItemClass('Order')} onClick={() => handleMenuItemClick('Order')}>
                            <i class="fa-solid fa-cart-shopping"></i>
                            <span>Order</span>
                        </div>
                        <div className={getItemClass('Syllabus')} onClick={() => handleMenuItemClick('Syllabus')}>
                            <i class="fa-solid fa-book"></i>
                            <span>Syllabus</span>
                        </div>
                        <div className='item'>
                            <i class="fa-solid fa-book"></i>
                            <span>Log out</span>
                        </div>
                    </div>
                </div>

                <div className='col-lg-10' style={{
                    backgroundImage: `url(${background})`, backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat', height: '100vh', overflow: 'hidden'
                }}>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}
