import React, { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactPaginate from 'react-paginate';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StaffClassDetail() {
    const [view, setView] = useState('detail');
    const [classData, setClassData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const accessToken = localStorage.getItem('accessToken');
    const [selectedClassId, setSelectedClassId] = useState(null);
    const [classIdForTeacherForm, setClassIdForTeacherForm] = useState(null);
    const [classIdForStudentForm, setClassIdForStudentForm] = useState(null);
    const [classIdForForm, setClassIdForForm] = useState(null);

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="date-picker-custom-input d-flex justify-content-between p-1" onClick={onClick} ref={ref} style={{ border: '1px solid #F69E4A', width: '150px', height: '30px' }} >
            <div>
                {formatDate(value)}
            </div>
            <div>
                <i className="fa-regular fa-calendar-days" />
            </div>
        </div>
    ));

    const CreateClass = ({ onBack, onNext }) => {
        const accessToken = localStorage.getItem('accessToken');
        const [classCode, setClassCode] = useState('');
        const [openDay, setOpenDay] = useState('');
        const [closeDay, setCloseDay] = useState('');
        const today = new Date().toISOString().split('T')[0];
        const [courses, setCourses] = useState([]);
        const [selectedCourseId, setSelectedCourseId] = useState('');
        const [scheduleCreated, setScheduleCreated] = useState(false);
        const [classDetails, setClassDetails] = useState(null);
        const [isScheduleSectionEnabled, setIsScheduleSectionEnabled] = useState(false);
        const [createdClassDetails, setCreatedClassDetails] = useState(null);
        const [createdClassId, setCreatedClassId] = useState(null); const [checkedDays, setCheckedDays] = useState({
            Monday: false,
            Tuesday: false,
            Wednesday: false,
            Thursday: false,
            Friday: false,
            Saturday: false,
        });

        useEffect(() => {
            const fetchCourses = async () => {
                try {
                    const response = await fetch('https://www.kidpro-production.somee.com/api/v1/courses?status=Active&action=manage', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch courses');
                    }
                    const data = await response.json();
                    setCourses(data.results); // Assuming the results are in data.results
                    if (data.results.length > 0) {
                        setSelectedCourseId(data.results[0].id); // Default to the first course
                    }
                } catch (error) {
                    alert(error.message);
                }
            };

            fetchCourses();
        }, [accessToken]); // accessToken is a dependency here

        const formatBirthday = (date) => {
            const d = new Date(date);
            let month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        };

        const handleCreateClass = async () => {
            // Ensure all fields are filled out (basic validation)
            if (!classCode || !openDay || !closeDay) {
                toast.error('Please fill out all fields', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return;
            }

            const data = {
                classCode: classCode,
                openDay: formatBirthday(openDay),
                closeDay: formatBirthday(closeDay),
                courseId: selectedCourseId
            };

            console.log('data: ', data);
            try {
                const response = await fetch('https://www.kidpro-production.somee.com/api/v1/classes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to create class');
                }
                const responseData = await response.json();
                console.log('createClass: ', responseData);

                setIsScheduleSectionEnabled(true);
                setCreatedClassDetails(responseData);
                toast.success('Create class successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } catch (error) {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        };

        const toggleDay = (day) => {
            setCheckedDays(prevState => ({
                ...prevState,
                [day]: !prevState[day]
            }));
        };

        const getCheckedDays = () => {
            return Object.entries(checkedDays).filter(([day, isChecked]) => isChecked).map(([day]) => day);
        };

        const firstRowDays = Object.entries(checkedDays).slice(0, 3);
        const secondRowDays = Object.entries(checkedDays).slice(3);

        const [selectedSlotId, setSelectedSlotId] = useState(null);

        const renderRow = (days) => (
            <div className="d-flex justify-content-around">
                {days.map(([day, isChecked]) => (
                    <div key={day} className="d-flex" onClick={() => toggleDay(day)} style={{ width: '200px' }}>
                        <i style={{ fontSize: '25px', color: '#1A9CB7', cursor: 'pointer' }} className={isChecked ? "fa-solid fa-square-check" : "fa-regular fa-square"}></i>
                        <p className='ms-2' style={{ fontSize: '18px' }}>{day}</p>
                    </div>
                ))}
            </div>
        );

        const calculateEndTime = (startTime, slotDuration) => {
            let [hours, minutes] = startTime.split(':').map(Number);
            minutes += slotDuration; // Ensure slotDuration is an integer
            hours += Math.floor(minutes / 60);
            minutes %= 60;
            // Pad the hours and minutes with leading zeros if necessary
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        };

        const SlotTimeSelection = ({ classDetails }) => {
            if (!classDetails) {
                return <p>Loading or not available...</p>;
            }

            const slotDuration = Number(classDetails.slotDuration);

            const slots = [
                { id: 1, start: '8:00' },
                { id: 2, start: '10:00' },
                { id: 3, start: '14:00' },
                { id: 4, start: '16:00' },
                { id: 5, start: '18:00' },
                { id: 6, start: '20:00' }
            ].map(slot => ({
                ...slot,
                end: calculateEndTime(slot.start, slotDuration),
            }));

            // Split slots into two rows for rendering
            const firstRowSlots = slots.slice(0, 3);
            const secondRowSlots = slots.slice(3);

            const handleSlotSelection = (id) => {
                setSelectedSlotId(id);
            };

            const renderSlot = (slot) => (
                <div key={slot.id} className="d-flex align-items-center" onClick={() => handleSlotSelection(slot.id)} style={{ cursor: 'pointer', padding: '10px', width: '250px' }}>
                    <i style={{ fontSize: '25px', color: '#1A9CB7' }} className={selectedSlotId === slot.id ? "fa-solid fa-circle" : "fa-regular fa-circle"}></i>
                    <p className='ms-2 my-2' style={{ fontSize: '16px' }}>Slot {slot.id} ({slot.start} - {slot.end})</p>
                </div>
            );

            return (
                <div>
                    <div className="d-flex justify-content-around">
                        {firstRowSlots.map(renderSlot)}
                    </div>
                    <div className="d-flex justify-content-around">
                        {secondRowSlots.map(renderSlot)}
                    </div>
                </div>
            );
        };

        if (!classData) {
            return <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>;
        }

        const handleCreateSchedule = async () => {
            const checkedDaysArray = getCheckedDays();
            const days = checkedDaysArray.length > 0 ? checkedDaysArray : ["NoDay"];

            const data = {
                days: days,
                classId: createdClassDetails.classId,
                slot: selectedSlotId,
                slotTime: createdClassDetails.slotDuration,
            };

            try {
                const response = await fetch('https://www.kidpro-production.somee.com/api/v1/Classes/schedules', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to create schedule');
                }

                const responseData = await response.json();
                console.log('responseData: ', responseData);

                setSelectedClassId(responseData.classId);
                setView('classContent');

            } catch (error) {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeButton: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        };


        return (
            <div className='staff-create-class mx-5'>
                <ToastContainer />
                <div className="header">
                    <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-start">
                            <div>
                                <h5 className='mb'>Class detail</h5>
                                <hr />
                            </div>
                            <i class="fa-solid fa-bell"></i>
                        </div>
                        <div>
                            <button style={{ backgroundColor: '#7F7C7C', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px' }} onClick={onBack}>Back</button>
                        </div>
                    </div>
                </div>
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Create class
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div className='p-5'>
                                    <p className='blue mb-1'>Class's code</p>
                                    <input className='ms-3'
                                        type="text"
                                        placeholder="Type class's code. Ex: VNR202"
                                        value={classCode} onChange={e => setClassCode(e.target.value)}
                                        style={{ width: '300px', height: '35px', outline: 'none', border: '1px solid #F69E4A', borderRadius: '8px' }} />


                                    <p className='blue mb-1 mt-4'>Select course</p>
                                    <select className='ms-3' style={{ width: '300px', height: '35px', outline: 'none', border: '1px solid #F69E4A', borderRadius: '8px' }}
                                        value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
                                        {courses.map(course => (
                                            <option key={course.id} value={course.id}>{course.name}</option>
                                        ))}
                                    </select>


                                    <p className='blue mb-1 mt-4'>Duration start class</p>
                                    <div className='d-flex justify-content-center'>
                                        <div className="d-flex">
                                            <p className='mt-1 me-2'>Start</p>
                                            <DatePicker
                                                selected={openDay}
                                                onChange={(date) => setOpenDay(date)}
                                                minDate={today}
                                                enableTabLoop={false}
                                                customInput={<CustomInput />} />

                                        </div>
                                        <i style={{ fontSize: '18px' }} class="fa-solid fa-arrow-right mx-3 mt-2"></i>
                                        <div className="d-flex">
                                            <p className='mt-1 me-2'>End</p>
                                            <DatePicker
                                                selected={closeDay}
                                                onChange={(date) => setCloseDay(date)}
                                                minDate={openDay || today}
                                                enableTabLoop={false}
                                                customInput={<CustomInput />} />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='mt-4' style={{ backgroundColor: '#F25B58', color: 'white', border: 'none', borderRadius: '8px', height: '30px' }} onClick={handleCreateClass}>Create class</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button"
                                data-bs-toggle={isScheduleSectionEnabled ? "collapse" : ""}
                                data-bs-target="#collapseTwo" aria-expanded="false"
                                aria-controls="collapseTwo" disabled={!isScheduleSectionEnabled}>
                                Create schedule
                            </button>
                        </h2>
                        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div className='p-5'>
                                    <div className="d-flex">
                                        <p className='blue'>Slot duration</p>
                                        <span className='ms-5'>{createdClassDetails && createdClassDetails.slotDuration} minutes/slot</span>
                                    </div>
                                    <p className='blue'>Study day</p>
                                    <div className="study-day">
                                        {renderRow(firstRowDays)}
                                        {renderRow(secondRowDays)}
                                    </div>
                                    <p className='blue'>Slot time</p>
                                    <div>
                                        {createdClassDetails && <SlotTimeSelection classDetails={createdClassDetails} />}
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <button style={{ backgroundColor: '#F25B58', color: 'white', border: 'none', borderRadius: '8px', height: '30px' }} onClick={handleCreateSchedule}>Create schedule</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const ClassContent = ({ classId, setView }) => {
        const [classDetails, setClassDetails] = useState(null);
        const [loading, setLoading] = useState(true);
        const accessToken = localStorage.getItem('accessToken');
        const [currentPage, setCurrentPage] = useState(0); // Note: react-paginate uses 0-indexing for pages
        const studentsPerPage = 3; // Number of students you want per page

        const pageCount = Math.ceil(classDetails?.students.length / studentsPerPage);

        const handlePageClick = (selectedItem) => {
            setCurrentPage(selectedItem.selected);
        };

        const handleAddTeacherClick = () => {
            navigateToView('addTeacher', classId);
        };

        // Calculate the students to be displayed on the current page
        const currentStudents = classDetails?.students.slice(
            currentPage * studentsPerPage,
            (currentPage + 1) * studentsPerPage
        );

        useEffect(() => {
            const fetchClassDetails = async () => {
                try {
                    const response = await fetch(`https://www.kidpro-production.somee.com/api/v1/Classes/detail/${classId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log('data: ', data);
                    setClassDetails(data);
                } catch (error) {
                    console.error("Failed to fetch class details", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchClassDetails();
        }, [classId, accessToken]); // Fetch class details when classId changes

        if (loading) {
            return <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>;
        }

        if (!classDetails) {
            return <div>Class details not found.</div>;
        }
        const getDayStyle = (day) => {
            const isScheduledDay = classDetails.studyDay.includes(day);
            return {
                borderRadius: '50%',
                border: isScheduledDay ? 'none' : "1px solid black",
                height: '45px',
                width: '45px',
                backgroundColor: isScheduledDay ? '#FD8569' : 'transparent',
                color: isScheduledDay ? 'white' : 'black',
            };
        };

        const handleOpenNewTab = (url) => {
            window.open(url, '_blank');
        };



        return (
            <div className='staff-class-content' style={{ padding: '20px 50px', backgroundColor: 'white', margin: '30px 80px', minHeight: '700px', }}>
                <div className="header">
                    <div className='d-flex justify-content-between'>
                        <div className="d-flex justify-content-start">
                            <div>
                                <h5 className='mb'>Class detail</h5>
                                <hr />
                            </div>
                            <i class="fa-solid fa-bell"></i>
                        </div>
                        <div>
                            <button style={{ backgroundColor: '#7F7C7C', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px' }} onClick={() => navigateToView('detail')}>Back</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='px-4 mt-2'>
                        <p className='mb-2 blue'>CLASS INFORMATION</p>
                        <div className="d-flex">
                            <div style={{ marginLeft: '200px' }}>

                                <p className='mb-1'>Class</p>
                                <p className='mb-1'>Course</p>
                                <p className='mb-1'>Number of students</p>
                                <p className='mb-1'>Teacher</p>
                                <p className='mb-1'>Class time</p>
                                <p className='mb-1'>Slot time</p>
                            </div>
                            <div style={{ marginLeft: '50px' }}>
                                <p className=' mb-1' style={{ color: '#FD8569', fontWeight: 'bold' }}>
                                    {classDetails.classCode}
                                </p>
                                <p className='mb-1'>{classDetails.courseName}</p>
                                <p className='mb-1'>{classDetails.students.length}</p>
                                <p className='mb-1'>
                                    {classDetails.teacherName ? (
                                        <p className='mb-1'>{classDetails.teacherName} / <button onClick={handleAddTeacherClick} style={{ backgroundColor: '#1A9CB7', height: '25px', fontSize: '14px', border: 'none', borderRadius: '8px', color: 'white' }}>Edit</button></p>
                                    ) : (
                                        <button onClick={handleAddTeacherClick} style={{ backgroundColor: '#1A9CB7', height: '25px', fontSize: '14px', border: 'none', borderRadius: '8px', color: 'white' }}>Add teacher</button>
                                    )}
                                </p>
                                <p className='mb-1'>{classDetails.openClass} - {classDetails.closeClass}</p>
                                <p className='mb-1'>{classDetails.slotDuration} minutes/slot</p>
                            </div>
                        </div>
                    </div>
                    <div className='px-4'>
                        <p className='mb-2 blue'>CLASS SCHEDULE</p>
                        <div className="d-flex">
                            <div style={{ marginLeft: '200px' }}>
                                <p className='mb-1'>Study day</p>
                                <p className='mb-1 mt-4'>Slot</p>
                                <p className='mb-1'>Total slot</p>
                                <p className='mb-1'>Link discord</p>
                            </div>
                            <div style={{ marginLeft: '100px' }}>
                                <div className='d-flex'>
                                    <div className='mb-1 ms-3 text-center' style={getDayStyle("Monday")}>
                                        <p className='text-center mt-2' style={{ fontSize: '18px' }}>M</p>
                                    </div>
                                    <div className='mb-1 ms-3 text-center' style={getDayStyle("Tuesday")}>
                                        <p className='text-center mt-2' style={{ fontSize: '18px' }}>T</p>
                                    </div>
                                    <div className='mb-1 ms-3 text-center' style={getDayStyle("Wednesday")}>
                                        <p className='text-center mt-2' style={{ fontSize: '18px' }}>W</p>
                                    </div>
                                    <div className='mb-1 ms-3 text-center' style={getDayStyle("Thursday")}>
                                        <p className='text-center mt-2' style={{ fontSize: '18px' }}>Th</p>
                                    </div>
                                    <div className='mb-1 ms-3 text-center' style={getDayStyle("Friday")}>
                                        <p className='text-center mt-2' style={{ fontSize: '18px' }}>F</p>
                                    </div>
                                    <div className='mb-1 ms-3 text-center' style={getDayStyle("Saturday")}>
                                        <p className='text-center mt-2' style={{ fontSize: '18px' }}>Sa</p>
                                    </div>
                                </div>
                                <p className='mb-1'>Slot {classDetails.slotNumber} ({classDetails.startSlot} - {classDetails.endSlot})</p>
                                <p className='mb-1'>{classDetails.totalSlot}</p>
                                <button onClick={() => handleOpenNewTab(classDetails.roomUrl)}>Open Discord Link</button>
                                
                            </div>
                        </div>
                    </div>
                    <div className='px-4'>
                        <div className="d-flex justify-content-between">
                            <p className='blue'>LIST STUDENT</p>
                            <button onClick={() => navigateToStudentForm(classId)} style={{ backgroundColor: '#FFA63D', color: 'white', border: 'none', borderRadius: '8px', height: '35px' }}>Add student</button>

                        </div>
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead >
                                    <tr>
                                        <th className='text-center' style={{ backgroundColor: '#1A9CB7', color: 'white' }}>#</th>
                                        <th className='text-center' style={{ backgroundColor: '#1A9CB7', color: 'white' }}>Full name</th>
                                        <th className='text-center' style={{ backgroundColor: '#1A9CB7', color: 'white' }}>Date of birth</th>
                                        <th className='text-center' style={{ backgroundColor: '#1A9CB7', color: 'white' }}>Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentStudents?.map((student, index) => (
                                        <tr key={index}>
                                            <td className='text-center'>{index + 1 + currentPage * studentsPerPage}</td>
                                            <td className='text-center'>{student.studentName}</td>
                                            <td className='text-center'>{student.dateOfBirth}</td>
                                            <td className='text-center'>{student.gender}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <ReactPaginate
                                previousLabel={'previous'}
                                nextLabel={'next'}
                                breakLabel={'...'}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const TeacherForm = ({ onBack }) => {
        const accessToken = localStorage.getItem('accessToken');
        const [teachers, setTeachers] = useState([]);
        const [currentClass, setCurrentClass] = useState([]);
        const [isLoading, setIsLoading] = useState([]);
        const [isTeacherLoading, setIsTeacherLoading] = useState(false);
        const [selectedTeacherId, setSelectedTeacherId] = useState(null);
        const [selectedTeacherSchedules, setSelectedTeacherSchedules] = useState([]);
        const [selectedScheduleIndex, setSelectedScheduleIndex] = useState(null);
        const classId = classIdForForm;

        useEffect(() => {
            // Optionally, fetch class details if needed to get study days and slots
            const fetchClassDetails = async () => {
                try {
                    const response = await fetch(`https://www.kidpro-production.somee.com/api/v1/Classes/detail/${classId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const classData = await response.json();
                    console.log('classData: ', classData);
                    setCurrentClass(classData);
                } catch (error) {
                    console.error("Failed to fetch class details", error);
                }
            };

            if (classId) {
                fetchClassDetails();
            }
        }, [classId, accessToken]);

        useEffect(() => {
            const fetchTeachers = async () => {
                setIsLoading(true);
                try {
                    const response = await fetch('https://www.kidpro-production.somee.com/api/v1/Classes/teachers', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log('data: ', data);
                    setTeachers(data);
                } catch (error) {
                    console.error("Failed to fetch teachers", error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchTeachers();
        }, [accessToken]);

        const handleTeacherSelection = (event) => {
            const teacherId = event.target.value;

            if (!teacherId) {
                setSelectedTeacherId(null);
                setSelectedTeacherSchedules([]);
                setSelectedScheduleIndex(null);
            } else {
                setSelectedTeacherId(teacherId);
                setIsTeacherLoading(true);

                const selectedTeacher = teachers.find(teacher => teacher.teacherId.toString() === teacherId);

                if (selectedTeacher && selectedTeacher.schedules && selectedTeacher.schedules.length > 0) {
                    setSelectedTeacherSchedules(selectedTeacher.schedules);
                    setSelectedScheduleIndex(0);
                } else {
                    setSelectedTeacherSchedules([]);
                    setSelectedScheduleIndex(null);
                }

                setIsTeacherLoading(false);
            }
        };

        const addTeacherToClass = async () => {
            if (!selectedTeacherId) {
                alert('Please select a teacher first.');
                return;
            }
            setIsLoading(true);
            try {
                const response = await fetch(`https://www.kidpro-production.somee.com/api/v1/Classes/teacher/add-to-class?classId=${classId}&teacherId=${selectedTeacherId}`, {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    // If the response is not 2xx, throw an error
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const addTeacher = await response.json();
                console.log('Success:', addTeacher);
                alert('Teacher added successfully to the class.');

            } catch (error) {
                console.error('Failed to add teacher to class:', error);
                alert('Failed to add teacher to class.');
            } finally {
                setIsLoading(false); // Stop loading indicator
            }
        };

        return (
            <div className='my-5 p-5' style={{ backgroundColor: 'white', marginLeft: '120px', marginRight: '120px' }}>
                <div className='d-flex justify-content-between'>
                    <div>
                        <h3 className='orange mb-1'>Add teacher</h3>
                    </div>
                    <div>
                        <button style={{ backgroundColor: '#7F7C7C', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px' }} onClick={() => navigateToView('classContent', classId)}>Back</button>
                    </div>
                </div>
                <div className='p-3'>

                    <div className="d-flex">
                        <p style={{ color: '#F11616' }}>Current class</p>
                        <p className='ms-3'>{currentClass.studyDay?.join(', ')}</p>
                    </div>

                    <div className="d-flex ms-5">
                        <p>Slot {currentClass.slotNumber} ({currentClass.startSlot} - {currentClass.endSlot})</p>
                    </div>
                    <div></div>

                    <div>
                        <p className='blue mb-1'>Teacher</p>
                        <select name="teacher" id="teacher-select" disabled={isLoading} onChange={handleTeacherSelection}>
                            <option value="">Please choose the teacher</option>
                            {isLoading ? (
                                <option disabled>Loading teachers...</option>
                            ) : (
                                teachers.map((teacher) => (
                                    <option key={teacher.teacherId} value={teacher.teacherId}>
                                        {teacher.teacherName}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <div>
                        <p className='blue mb-1 mt-3'>His/her classes</p>
                        <div className='p-3'>
                            {isTeacherLoading ? (
                                <p>Loading teacher schedules...</p>
                            ) : selectedTeacherId && selectedTeacherSchedules.length === 0 ? (
                                <p>This teacher does not have any schedules yet.</p>
                            ) : (
                                <div>
                                    <div className="d-flex">
                                        <div>
                                            <p className='blue'>Class code</p>
                                        </div>
                                        <div>
                                            <select name="scheduleSelect"
                                                id="schedule-select"
                                                onChange={(e) => setSelectedScheduleIndex(e.target.value)}
                                                value={selectedScheduleIndex}>
                                                {selectedTeacherSchedules.map((schedule, index) => (
                                                    <option key={index} value={index}>
                                                        {schedule.className}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    {selectedScheduleIndex !== null && selectedTeacherSchedules[selectedScheduleIndex] && (
                                        <div>
                                            <div className="d-flex">
                                                <p className='blue'>Study day :</p>
                                                <p>{selectedTeacherSchedules[selectedScheduleIndex].studyDays?.join(', ')}</p>
                                            </div>

                                            <div className="d-flex">
                                                <p className='blue'>Slot:</p>
                                                <p>{selectedTeacherSchedules[selectedScheduleIndex].slot} ({selectedTeacherSchedules[selectedScheduleIndex].open} - {selectedTeacherSchedules[selectedScheduleIndex].close})</p>
                                            </div>
                                        </div>
                                    )}


                                </div>
                            )}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button style={{ backgroundColor: '#F15C58', border: 'none', borderRadius: '8px', color: 'white', width: '150px', height: '35px' }} onClick={addTeacherToClass}>Add teacher</button>
                    </div>
                </div>
            </div>
        )
    }

    const StudentForm = ({ onBack, classId }) => {
        const [currentClass, setCurrentClass] = useState([]);
        const accessToken = localStorage.getItem('accessToken');
        const [searchTerm, setSearchTerm] = useState('');
        const [searchResults, setSearchResults] = useState([]);
        const [isLoading, setIsLoading] = useState([]);
        const [isSearching, setIsSearching] = useState(false);
        const [pageNumber, setPageNumber] = useState(0);
        const studentsPerPage = 5;
        const pagesVisited = pageNumber * studentsPerPage;
        const [enrolledStudents, setEnrolledStudents] = useState([]);
        const [enrolledStudentsPageNumber, setEnrolledStudentsPageNumber] = useState(0);
        const enrolledStudentsPagesVisited = enrolledStudentsPageNumber * studentsPerPage;

        const enrolledStudentsPageCount = Math.ceil(enrolledStudents.length / studentsPerPage);

        const changeEnrolledStudentsPage = ({ selected }) => {
            setEnrolledStudentsPageNumber(selected);
        };

        // Displaying enrolled students for the current page
        const currentEnrolledStudents = enrolledStudents.slice(
            enrolledStudentsPagesVisited,
            enrolledStudentsPagesVisited + studentsPerPage
        );

        const pageCount = Math.ceil(searchResults.length / studentsPerPage);
        const changePage = ({ selected }) => {
            setPageNumber(selected);
        };

        useEffect(() => {
            const fetchClassDetails = async () => {
                try {
                    const response = await fetch(`https://www.kidpro-production.somee.com/api/v1/Classes/detail/${classId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const classData = await response.json();
                    console.log('classData: ', classData);

                    // Assuming classData includes a 'students' array with the necessary details
                    // Update the state for both currentClass and enrolledStudents
                    setCurrentClass(classData);
                    setEnrolledStudents(classData.students || []);
                } catch (error) {
                    console.error("Failed to fetch class details", error);
                }
            };

            if (classId) {
                fetchClassDetails();
            }
        }, [classId, accessToken]);


        const handleSearchChange = (event) => {
            setSearchTerm(event.target.value);
        };

        const executeSearch = async () => {
            if (!searchTerm.trim()) return;

            setIsSearching(true);
            try {
                const response = await fetch(`https://www.kidpro-production.somee.com/api/v1/Classes/students/search?input=${encodeURIComponent(searchTerm)}&classId=${classId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const searchData = await response.json();
                console.log('searchData: ', searchData);
                setSearchResults(searchData); // Update your state with the search result
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setIsSearching(false);
            }
        };

        // Function to handle adding a student
        const handleAddStudent = (studentToAdd) => {
            setEnrolledStudents((prevStudents) => {
                // Check if the student is already added to prevent duplicates
                const isAlreadyAdded = prevStudents.some(student => student.studentId === studentToAdd.studentId);
                if (!isAlreadyAdded) {
                    return [...prevStudents, studentToAdd];
                }
                return prevStudents;
            });
        };

        // Function to handle removing a student
        const handleRemoveStudent = (studentIdToRemove) => {
            setEnrolledStudents((prevStudents) => prevStudents.filter(student => student.studentId !== studentIdToRemove));
        };

        // Function to save changes
        const handleSaveChanges = async () => {
            setIsLoading(true);
            let response;
            try {
                response = await fetch('https://www.kidpro-production.somee.com/api/v1/Classes/students/add-or-remove', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        studentIds: enrolledStudents.map((student) => student.studentId), // Make sure to use student.studentId if that's the correct property
                        classId: classId,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const postListStudent = await response.json();
                console.log('postListStudent: ', postListStudent);
                alert('Students updated successfully.');
            } catch (error) {
                console.error("An error occurred:", error);
                if (response) {
                    try {
                        const errorResponse = await response.json();
                        console.log('Error response:', errorResponse);
                        alert(`Failed to update students: ${errorResponse.message || ''}`);
                    } catch (jsonError) {
                        console.error("Error reading error response:", jsonError);
                        alert('Failed to update students. An unknown error occurred.');
                    }
                } else {
                    alert('Failed to update students. No response from the server.');
                }
            } finally {
                setIsLoading(false);
            }
        };


        useEffect(() => {
            console.log(enrolledStudents);
        }, [enrolledStudents]);


        return (
            <div className='m-5 p-5' style={{ backgroundColor: 'white', minHeight: '600px' }}>
                <div className="d-flex justify-content-between">
                    <div>
                        <p className='orange' style={{ fontSize: '22px' }}>Add/Update students</p>
                    </div>
                    <div>
                        <button style={{ backgroundColor: '#7F7C7C', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px' }} onClick={onBack}>Back</button>
                    </div>
                </div>
                <div className='px-3'>
                    <div>
                        <div className="d-flex">
                            <p className='blue'>Class name</p>
                            <p className='ms-3'>{currentClass.classCode}</p>
                        </div>

                    </div>
                    <div className='d-flex justify-content-between'>
                        <div style={{ width: '45%' }}>
                            <div>
                                <p className='blue mb-1'>Search student's name</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <div>
                                        <input value={searchTerm}
                                            onChange={handleSearchChange}
                                            style={{ height: '35px', width: '300px', borderRadius: '8px 0px 0px 8px', borderRight: 'none', outline: 'none' }} type="text" placeholder="Type student's name" />
                                    </div>
                                    <div onClick={executeSearch} className='text-center' style={{ height: '35px', width: '50px', borderRadius: '0px 8px 8px 0px', border: 'none', outline: 'none', backgroundColor: '#F69E4A', cursor: 'pointer' }}>
                                        <i style={{ fontSize: '18px', marginTop: '8px', color: 'white' }} class="fa-solid fa-magnifying-glass"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className='text-center' style={{ backgroundColor: '#1A9CB7', color: 'white' }}>Full name</th>
                                            <th className='text-center' style={{ backgroundColor: '#1A9CB7', color: 'white' }}>Date of birth</th>
                                            <th className='text-center' style={{ backgroundColor: '#1A9CB7', color: 'white' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {searchResults.length > 0 ? (
                                            searchResults
                                                .slice(pagesVisited, pagesVisited + studentsPerPage)
                                                .map((student, index) => (
                                                    <tr key={index}>
                                                        <td className='text-center'>{student.studentName}</td>
                                                        <td className='text-center'>{student.dateOfBirth}</td>
                                                        <td className='text-center'>
                                                            <button style={{ border: 'none', color: '#FFA63D' }}
                                                                onClick={() => handleAddStudent(student)}>
                                                                <i style={{ fontSize: '18px' }} class="fa-solid fa-circle-plus"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">
                                                    No students found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-center">

                                <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={"pagination"}
                                    previousLinkClassName={"pagination__link"}
                                    nextLinkClassName={"pagination__link"}
                                    disabledClassName={"pagination__link--disabled"}
                                    activeClassName={"pagination__link--active"}
                                />
                            </div>
                        </div>
                        <div style={{ width: '45%', marginTop: '50px' }}>
                            <p className='blue mb-0'>Current class student list</p>
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th className='text-center' style={{ backgroundColor: '#1A9CB7', color: 'white' }}>Full name</th>
                                            <th className='text-center' style={{ backgroundColor: '#1A9CB7', color: 'white' }}>Date of birth</th>
                                            <th className='text-center' style={{ backgroundColor: '#1A9CB7', color: 'white' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {enrolledStudents.map((student, index) => (
                                            <tr key={index}>
                                                <td className='text-center'>{student.studentName}</td>
                                                <td className='text-center'>{student.dateOfBirth}</td>
                                                <td className='text-center'>
                                                    <button style={{ border: 'none', color: '#FFA63D' }}
                                                        onClick={() => handleRemoveStudent(student.studentId)}>
                                                        <i style={{ fontSize: '18px' }} className="fa-solid fa-circle-minus"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <ReactPaginate
                                    previousLabel={"Previous"}
                                    nextLabel={"Next"}
                                    pageCount={enrolledStudentsPageCount}
                                    onPageChange={changeEnrolledStudentsPage}
                                    containerClassName={"pagination"}
                                    previousLinkClassName={"pagination__link"}
                                    nextLinkClassName={"pagination__link"}
                                    disabledClassName={"pagination__link--disabled"}
                                    activeClassName={"pagination__link--active"}
                                />
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button style={{ backgroundColor: '#F15C58', color: 'white', border: 'none', borderRadius: '8px' }} onClick={handleSaveChanges}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const handleViewClassContent = (classId) => {
        setSelectedClassId(classId);
        setView('classContent');
    };

    const navigateToView = (viewName, classId = null) => {
        if (classId) {
            setClassIdForForm(classId);
        }
        setView(viewName);
    };


    useEffect(() => {
        if (view === 'detail') {
            fetchClassData(currentPage);
        }
    }, [view, currentPage]);

    const fetchClassData = async (page) => {
        const url = `https://www.kidpro-production.somee.com/api/v1/Classes?page=${page}&size=4`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            console.log('data: ', data);
            setClassData(data.classes);
            setTotalPages(data.totalPage);
        } catch (error) {
            console.error("Failed to fetch class data", error);
        }
    };


    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        let day = '' + d.getDate(),
            month = '' + (d.getMonth() + 1),
            year = d.getFullYear();

        if (day.length < 2)
            day = '0' + day;
        if (month.length < 2)
            month = '0' + month;

        return [day, month, year].join('/');
    };


    const renderView = () => {
        switch (view) {
            case 'createClass':
                return <CreateClass
                    onBack={() => setView('detail')} />;
            case 'addTeacher':
                return <TeacherForm classId={classIdForTeacherForm} onBack={() => setView('classContent')} />;
            case 'addStudent':
                return <StudentForm classId={classIdForStudentForm} onBack={() => setView('classContent')} />;
            case 'classContent':
                return <ClassContent
                    classId={selectedClassId}
                    setView={setView}
                />;
            default:
                return (
                    <div className='staff-class-detail mx-5'>
                        <div className="header">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex justify-content-start">
                                    <div>
                                        <h5 className='mb'>CLASS</h5>
                                        <hr />
                                    </div>
                                    <i className="fa-solid fa-bell"></i>
                                </div>
                                <div>
                                    <button style={{ backgroundColor: '#F25B58', color: 'white', border: 'none', borderRadius: '8px', height: '30px' }} onClick={() => setView('createClass')}><i style={{ color: 'white' }} className="fa-solid fa-circle-plus"></i>Create class</button>
                                </div>
                            </div>
                        </div>
                        <div className='render-list'>
                            {classData && classData.map((classItem, index) => (
                                <div key={index} className='py-2 px-5 mt-2'>
                                    <div className="d-flex justify-content-between px-3 py-2" style={{ border: '1px solid #EF7E54', borderRadius: '8px' }}>
                                        <div>
                                            <p>Class Code: {classItem.classCode}</p>
                                            <div className="d-flex justify-content-start">
                                                <p className='mb-1'>Start: {formatDate(classItem.dayStart)}</p>
                                                <p className='mb-1 ms-3'>End: {formatDate(classItem.dayEnd)}</p>
                                            </div>

                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <button onClick={() => handleViewClassContent(classItem.classId)} style={{ backgroundColor: '#EF7E54', color: 'white', border: 'none', borderRadius: '8px' }}>View</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='d-flex justify-content-center'>
                            {totalPages > 0 && ( // Conditional rendering
                                <ReactPaginate
                                    previousLabel={'previous'}
                                    nextLabel={'next'}
                                    breakLabel={'...'}
                                    pageCount={totalPages} // Make sure this is a valid number
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination'}
                                    subContainerClassName={'pages pagination'}
                                    activeClassName={'active'}
                                />
                            )}
                        </div>
                    </div>
                );
        }
    };

    return renderView();
};


