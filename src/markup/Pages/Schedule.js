import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Draggable } from '@fullcalendar/interaction';
import interactionPlugin from '@fullcalendar/interaction';
import Header from '../Layout/Header';

export default function Schedule() {
    return (
        <div>
            <Header />
            <div className='container'>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    headerToolbar={{
                        start: 'prev next today',
                        center: 'title',
                        end: 'dayGridMonth timeGridWeek timeGridDay list',
                    }}
                    height={"auto"}
                    initialView="dayGridMonth" />
            </div>
        </div>
    )
}
