import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
            <div>
                <p>Create class</p>
                <div className='p-3'>
                    <p className='blue mb-1'>Class's code</p>
                    <input type="text" placeholder="Type class's code. Ex: VNR202" value={classCode} onChange={e => setClassCode(e.target.value)} />

                    <p className='blue mb-1 mt-4'>Select course</p>
                    <select name="" id=""></select>
                    <p className='blue mb-1 mt-4'>Duration start class</p>
                    <div className='d-flex justify-content-around'>
                        <DatePicker selected={openDay} onChange={(date) => setOpenDay(date)} minDate={today} enableTabLoop={false} />
                        <DatePicker selected={closeDay} onChange={(date) => setCloseDay(date)} minDate={openDay || today} enableTabLoop={false} />
                    </div>
                    <button className='mt-4' onClick={handleCreateClass}>Create class</button>
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
        const slotDuration = Number(classData.slotTime);
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
            slotTime: classData.slotTime,
            roomUrl: roomUrl
        };

        try {
            const response = await fetch('https://www.kidpro-production.somee.com/api/v1/classes/schedules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
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
            alert('Schedule created successfully!');

        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };
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
            <div>
                <p>Create schedule</p>
                <div className='p-3'>
                    <div className="d-flex">
                        <p>Slot duration</p>
                        <span>{classData.slotTime}</span>
                    </div>
                    <div className="study-day">
                        {renderRow(firstRowDays)}
                        {renderRow(secondRowDays)}
                    </div>
                    <div>
                        <SlotTimeSelection />
                    </div>
                    <div>
                        <input value={roomUrl}
                            onChange={e => setRoomUrl(e.target.value)} type="text" placeholder='Link discord' />
                    </div>
                </div>
            </div>
            <button onClick={handleCreateSchedule}>Create schedule</button>
        </div>
    )
}

const StaffClassDetail = () => {
    const [view, setView] = useState('detail');
    const [classData, setClassData] = useState(null);

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
                    </div>
                );
        }
    };

    return renderView();
};

export default StaffClassDetail;
