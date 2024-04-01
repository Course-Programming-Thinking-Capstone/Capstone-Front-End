import React, { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactPaginate from 'react-paginate';

const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="date-picker-custom-input d-flex justify-content-between p-1" onClick={onClick} ref={ref} style={{ border: '1px solid black', width: '150px', height: '30px' }} >
        <div>
            {value}
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
            alert('Please fill out all fields');
            return;
        }

        const data = {
            classCode: classCode,
            openDay: formatBirthday(openDay),
            closeDay: formatBirthday(closeDay),
            courseId: 1 // Set courseId to 1 as default
        };

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
                throw new Error('Failed to create class');
            }
            const responseData = await response.json();
            console.log('responseData: ', responseData);

            // If the API call was successful, proceed to the next component
            onNext(responseData);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='staff-create-class mx-5'>
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
            <div className='mt-3'>
                <p className='mb-2' style={{ color: '#F69E4A' }}>Create class</p>
                <div className='p-5'>
                    <p className='blue mb-1'>Class's code</p>
                    <input type="text" placeholder="Type class's code. Ex: VNR202" value={classCode} onChange={e => setClassCode(e.target.value)} style={{ width: '300px' }} />

                    <p className='blue mb-1 mt-4'>Select course</p>
                    <select name="" id=""></select>
                    <p className='blue mb-1 mt-4'>Duration start class</p>
                    <div className='d-flex justify-content-center'>
                        <div className="d-flex">
                            <DatePicker
                                selected={openDay}
                                onChange={(date) => setOpenDay(date)}
                                minDate={today}
                                enableTabLoop={false}
                                customInput={<CustomInput />} />

                        </div>
                        <i style={{ fontSize: '18px' }} class="fa-solid fa-arrow-right mx-3 mt-1"></i>
                        <div className="d-flex">
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
    )
}

const CreateSchedule = ({ onBack, classData }) => {
    const [checkedDays, setCheckedDays] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
    });
    const [scheduleCreated, setScheduleCreated] = useState(false);
    const [classDetails, setClassDetails] = useState(null);
    const accessToken = localStorage.getItem('accessToken');
    const [createdClassId, setCreatedClassId] = useState(null);

    const toggleDay = (day) => {
        setCheckedDays(prevState => ({
            ...prevState,
            [day]: !prevState[day]
        }));
    };

    const getCheckedDays = () => {
        // This function could be used to get the days that are checked
        // For instance, before making a POST request
        return Object.entries(checkedDays).filter(([day, isChecked]) => isChecked).map(([day]) => day);
    };

    const firstRowDays = Object.entries(checkedDays).slice(0, 3);
    const secondRowDays = Object.entries(checkedDays).slice(3);

    const [roomUrl, setRoomUrl] = useState('');
    const [selectedSlotId, setSelectedSlotId] = useState(null);

    const renderRow = (days) => (
        <div className="d-flex justify-content-around">
            {days.map(([day, isChecked]) => (
                <div key={day} className="d-flex" onClick={() => toggleDay(day)} style={{ width: '200px' }}>
                    <i style={{ fontSize: '25px', color: '#1A9CB7' }} className={isChecked ? "fa-solid fa-square-check" : "fa-regular fa-square"}></i>
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

    const SlotTimeSelection = () => {
        const slotDuration = Number(classData.slotDuration);
        if (isNaN(slotDuration)) {
            // If slotTime is not a valid number, log an error and return early
            console.error('slotTime is not a valid number:', classData.slotTime);
            return <p>Error: Slot time is invalid.</p>;
        }

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
        </div>; // Or some other placeholder content
    }

    const handleCreateSchedule = async () => {
        const checkedDaysArray = getCheckedDays(); // This gets the list of checked days
        const days = checkedDaysArray.length > 0 ? checkedDaysArray : ["NoDay"];

        const data = {
            days: days,
            classId: classData.classId,
            slot: selectedSlotId,
            slotTime: classData.slotDuration,
            roomUrl: roomUrl
        };

        try {
            const response = await fetch('https://www.kidpro-production.somee.com/api/v1/classes/schedules', {
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

            // Handle response data if necessary
            const responseData = await response.json();
            console.log(responseData);
            setCreatedClassId(classData.classId);
            setScheduleCreated(true);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    if (scheduleCreated && createdClassId) {
        return <ClassContent classId={createdClassId} setView={setView} />;
    }

    return (
        <div className='staff-schedule mx-5'>
            <div className="header">
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                        <div>
                            <h5 className='mb'>Create schedule</h5>
                            <hr />
                        </div>
                        <i class="fa-solid fa-bell"></i>
                    </div>
                    <div>
                        <button style={{ backgroundColor: '#7F7C7C', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px' }} onClick={onBack}>Back</button>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <p className='mb-2' style={{ color: '#F69E4A' }}>Create schedule</p>
                <div className='p-5'>
                    <div className="d-flex">
                        <p className='blue'>Slot duration</p>
                        <span className='ms-5'>{classData.slotDuration} minutes/slot</span>
                    </div>
                    <p className='blue'>Study day</p>
                    <div className="study-day">
                        {renderRow(firstRowDays)}
                        {renderRow(secondRowDays)}
                    </div>
                    <p className='blue'>Slot time</p>
                    <div>
                        <SlotTimeSelection />
                    </div>
                    <div>
                        <p className='blue'>Link discord</p>
                        <input value={roomUrl}
                            onChange={e => setRoomUrl(e.target.value)} type="text" placeholder='Link discord' />
                    </div>
                    <div className="d-flex justify-content-end">
                        <button style={{ backgroundColor: '#F25B58', color: 'white', border: 'none', borderRadius: '8px', height: '30px' }} onClick={handleCreateSchedule}>Create schedule</button>
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



    return (
        <div className='staff-class-content' style={{ padding: '20px 50px', backgroundColor: 'white', margin: '30px 80px', minHeight: '700px', }}>
            <div className="header">
                <div className="d-flex justify-content-start">
                    <div>
                        <h5 className='mb'>Class detail</h5>
                        <hr />
                    </div>
                    <i class="fa-solid fa-bell"></i>
                </div>
            </div>
            <div>
                <div>CLASS {classDetails.classCode}</div>
                <div className='px-4'>
                    <p className='mb-2 blue'>CLASS INFORMATION</p>
                    <div className="d-flex">
                        <div style={{ marginLeft: '200px' }}>
                            <p className='mb-1'>Course</p>
                            <p className='mb-1'>Number of students</p>
                            <p className='mb-1'>Teacher</p>
                            <p className='mb-1'>Class time</p>
                            <p className='mb-1'>Slot time</p>
                        </div>
                        <div style={{ marginLeft: '50px' }}>
                            <p className='mb-1'>{classDetails.courseName}</p>
                            <p className='mb-1'>{classDetails.students.length}</p>
                            <p className='mb-1'>
                                {classDetails.teacherName ? (
                                    <p className='mb-1'>{classDetails.teacherName} / <button onClick={() => setView('addTeacher')} style={{ backgroundColor: '#1A9CB7', height: '25px', fontSize: '14px' }}>Edit</button></p>
                                ) : (
                                    <button onClick={() => setView('addTeacher')} style={{ backgroundColor: '#1A9CB7', height: '25px', fontSize: '14px' }}>Add teacher</button>
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
                            <p className='mb-1'>{classDetails.roomUrl}</p>
                        </div>
                    </div>
                </div>
                <div className='px-4'>
                    <div className="d-flex justify-content-between">
                        <p>LIST STUDENT</p>
                        <button>Add student</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

const TeacherForm = ({ onBack, onSave }) => {
    return (
        <div>
            <div className='d-flex justify-content-between'>
                <p>Add teacher</p>
                <button>Back</button>
            </div>
            <p>Current class</p>
            <div></div>

            <div>
                <p className='blue'>Teacher</p>
                <select name="" id=""></select>
            </div>
            <div>
                <p>His/her classes</p>
                <div>
                    <div className="d-flex">
                        <p className='blue'>Class code</p>
                        <select name="" id=""></select>
                    </div>
                    <div className="d-flex">
                        <p className='blue'>Study day</p>
                        <p></p>
                    </div>
                    <div className="d-flex">
                        <p className='blue'>Slot</p>

                    </div>
                    <div className="d-flex justify-content-end">
                        <button>Save Teacher</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

const StaffClassDetail = () => {
    const [view, setView] = useState('detail');
    const [classData, setClassData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const accessToken = localStorage.getItem('accessToken');

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
            setClassData(data.classes); // Adjust to use 'classes' based on your actual data structure
            setTotalPages(data.totalPage); // Use 'totalPage' directly from the API response
        } catch (error) {
            console.error("Failed to fetch class data", error);
        }
    };


    const handlePageClick = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const renderView = () => {
        switch (view) {
            case 'createClass':
                return <CreateClass
                    onBack={() => setView('detail')}
                    onNext={(data) => {
                        setClassData(data); // Set class data on successful API call
                        setView('createSchedule');
                    }} />;
            case 'createSchedule':
                return <CreateSchedule onBack={() => setView('createClass')} classData={classData} />;
            case 'addTeacher':
                return <TeacherForm onBack={() => setView('detail')} />;
                case 'classContent':
                    return <ClassContent classId={selectedClassId} setView={setView} />;
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
                                                <p className='mb-1'>Start: {classItem.start}</p>
                                                <p className='mb-1'>End: {classItem.end}</p>
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            <button style={{ backgroundColor: '#EF7E54', color: 'white', border: 'none', borderRadius: '8px' }}>View</button>
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

export default StaffClassDetail;
