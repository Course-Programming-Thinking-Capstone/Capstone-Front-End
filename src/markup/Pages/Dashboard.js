import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Draggable } from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction';

export default function Dashboard() {
    const [activeButton, setActiveButton] = useState('dashboard');
    const calendarRef = useRef(null);
    const externalElementRef = useRef(null);
    const [events, setEvents] = useState([]);
    const [eventsAddedToCalendar, setEventsAddedToCalendar] = useState(false);
    const [eventTitle, setEventTitle] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [eventName, setEventName] = useState('');
    const [eventStatus, setEventStatus] = useState('primary');

    const handleButtonClick = (button) => {
        setActiveButton(button);
    };

    const Block = () => {
        const [iconClass, setIconClass] = useState('');
    
        const iconClasses = ['', 'fa-regular fa-user', 'fa-solid fa-road', 'fa-solid fa-bullseye'];
        const handleClick = () => {
            setIconClass(prev => {
                const nextIndex = (iconClasses.indexOf(prev) + 1) % iconClasses.length;
                return iconClasses[nextIndex];
            });
        };
    
        return (
            <div className='sequence-block' onClick={handleClick}>
                {iconClass && <i className={iconClass}></i>}
            </div>
        );
    };

    const Grid = () => {
        const rows = 6;
        const cols = 8;
        const grid = [];
    
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid.push(<Block key={`${i}-${j}`} />);
            }
        }
    
        return (
            <div className="grid-container">
                {grid}
            </div>
        );
    };

    useEffect(() => {
        if (calendarRef.current && externalElementRef.current && !eventsAddedToCalendar) {
            const calendar = calendarRef.current.getApi();

            // make each external event draggable
            new Draggable(externalElementRef.current, {
                itemSelector: '.fc-event',
                eventData: function (eventEl) {
                    const title = eventEl.innerText.trim();
                    const backgroundColor = getEventBackgroundColor(title);
                    return {
                        title: title,
                        backgroundColor: backgroundColor,
                    };
                },
            });

            // add existing events to the calendar
            calendar.addEventSource(events);

            // set the flag to true to indicate that events have been added
            setEventsAddedToCalendar(true);
        }
    }, [calendarRef, events, eventsAddedToCalendar]);


    // Function to get custom color based on event title
    const getEventBackgroundColor = (eventTitle) => {
        // You can implement your logic to determine the color based on the event title
        // For example, you can return different colors for different titles
        if (eventTitle === 'Meeting') {
            return 'blue';
        } else {
            return 'green';
        }
    };

    useEffect(() => {
        // Apply custom event colors immediately when events are added
        if (calendarRef.current) {
            calendarRef.current.getApi().refetchEvents();
        }
    }, [events]);

    const handleDateClick = (arg) => {
        setSelectedDate(arg.date);
        setShowModal(true); // Open the modal using state
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal using state
    };

    const addEventToCalendar = () => {
        const newEvent = {
            title: eventName,
            start: selectedDate,
            backgroundColor: getBackgroundColor(eventStatus),
            borderColor: getBorderColor(eventStatus),
        };
        setEvents([...events, newEvent]);
        setShowModal(false); // Close the modal
    };

    const getBackgroundColor = (status) => {
        switch (status) {
            case 'success': return '#28a745'; // green
            case 'primary': return '#007bff'; // blue
            case 'danger': return '#dc3545'; // red
            default: return '#007bff';
        }
    };

    const getBorderColor = (status) => {
        // Optionally, you can define border colors for each status
        // For simplicity, we're using the same as background color
        return getBackgroundColor(status);
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                {/* Fixed Left Menu */}
                <div className='col-lg-2 d-none d-lg-block' style={{ height: '100vh', backgroundColor: '#2a3042' }}>
                    <div>
                        <h2 className='mt-2 text-center' style={{ color: 'white' }}>KidsPro</h2>
                    </div>
                    <button onClick={() => handleButtonClick('dashboard')} className={`btn ${activeButton === 'dashboard' ? 'btn-primary' : 'btn-secondary'} w-100 mt-2`}>
                        <i className="fa-solid fa-house"></i> <span className='ms-1'>Dashboard</span>
                    </button>
                    <button onClick={() => handleButtonClick('calendar')} className={`btn ${activeButton === 'calendar' ? 'btn-primary' : 'btn-secondary'} w-100 mt-2`}>
                        <i className="fa-regular fa-calendar-days"></i> <span className='ms-1'>Calendar</span>
                    </button>
                    <button onClick={() => handleButtonClick('Sequence mode')} className={`btn ${activeButton === 'Sequence mode' ? 'btn-primary' : 'btn-secondary'} w-100 mt-2`}>
                        <i className="fa-solid fa-envelope"></i> <span className='ms-1'>Sequence mode</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className='col-lg-10' style={{ padding: '20px' }}>
                    {activeButton === 'dashboard' && (
                        <div>
                            <h1>Dashboard</h1>
                            <p>This is the dashboard content.</p>
                        </div>
                    )}
                    {activeButton === 'calendar' && (
                        <div className='d-flex'>
                            <div ref={externalElementRef} style={{ border: '1px solid', padding: '10px', cursor: 'move', userSelect: 'none' }}>
                                <div className="fc-event" style={{ backgroundColor: 'blue', color: 'white', userSelect: 'none' }}>Meeting</div>
                                <div className="fc-event" style={{ backgroundColor: 'green', color: 'white' }}>Event Planning</div>
                            </div>
                            <FullCalendar
                                ref={calendarRef}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                                headerToolbar={{
                                    start: 'prev next today',
                                    center: 'title',
                                    end: 'dayGridMonth timeGridWeek timeGridDay list',
                                }}
                                height={"auto"}
                                initialView="dayGridMonth"
                                selectable={true}
                                select={handleDateClick}
                                events={events}
                                eventContent={(eventInfo) => {
                                    return (
                                        <div style={{ backgroundColor: eventInfo.event.backgroundColor, color: 'white', padding: '5px', borderRadius: '3px' }}>
                                            {eventInfo.event.title}
                                        </div>
                                    );
                                }}
                                datesSet={(arg) => {
                                    const listContent = document.querySelector('.fc-list-view .fc-list-table');
                                    if (listContent) {
                                        listContent.style.width = '100%';
                                    }
                                }}
                                dateClick={handleDateClick}
                            />

                            {/* Modal */}
                            {showModal && (
                                <div className="modal show" style={{ display: "block" }} role="dialog">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h4 className="modal-title">Add Event</h4>
                                                <button type="button" className="btn-close" onClick={closeModal}></button>
                                            </div>
                                            <div className="modal-body">
                                                <input
                                                    type="text"
                                                    className="form-control mb-2"
                                                    placeholder="Event Name"
                                                    value={eventName}
                                                    onChange={(e) => setEventName(e.target.value)}
                                                />
                                                <select
                                                    className="form-control"
                                                    value={eventStatus}
                                                    onChange={(e) => setEventStatus(e.target.value)}
                                                >
                                                    <option value="primary">Primary</option>
                                                    <option value="success">Success</option>
                                                    <option value="danger">Danger</option>
                                                </select>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-danger" onClick={closeModal}>Close</button>
                                                <button type="button" className="btn btn-success" onClick={addEventToCalendar}>Add Event</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showModal && <div className="modal-backdrop show"></div>}
                        </div>
                    )}
                    {activeButton === 'Sequence mode' && (
                        <div>
                            <h1>Add/edit level sequence</h1>
                            <Grid/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
