import React, { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import instance from '../../../../../helper/apis/baseApi/baseApi';

const TeacherScheduleComponent = () => {
  const [schedule, setSchedule] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await instance.get(`api/v1/Classes/teacher-or-student`);
        const data = response.data;
        console.log('API data:', data);

        const newEvents = data.map((item) => {
          const occurrences = getEventOccurrences(item);
          return occurrences.map((date) => ({
            title: item.classCode,
            start: `${date}T${item.startSlot}`,
            end: `${date}T${item.endSlot}`,
          }));
        }).flat();

        setEvents(newEvents);
      } catch (error) {
        console.error("Failed to fetch schedule", error);
      }
    };

    fetchSchedule();
  }, []);

  function getEventOccurrences(item) {
    // Replace slashes with hyphens and parse the dates as UTC
    const startString = item.openClass.replace(/\//g, '-') + 'T00:00:00Z';
    const endString = item.closeClass.replace(/\//g, '-') + 'T23:59:59Z';

    const start = new Date(startString);
    const end = new Date(endString);

    console.log('start: ', start);
    console.log('end: ', end);

    const daysOfWeekMap = {
      'Sunday': 0, // Based on getUTCDay(), Sunday is 0
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6
    };

    let dates = [];
    while (start <= end) {
      // Get the day of the week in UTC
      const dayOfWeek = start.getUTCDay();

      // Use the mapping to get the string representation of the day
      const dayName = Object.keys(daysOfWeekMap).find(key => daysOfWeekMap[key] === dayOfWeek);

      // Check if the day of week matches the days we need to create an event for
      if (item.days.includes(dayName)) {
        // Push the date in the format FullCalendar expects, without conversion to local time
        dates.push(start.toISOString().split('T')[0]);
      }
      // Add one day in UTC
      start.setUTCDate(start.getUTCDate() + 1);
    }

    console.log('Occurrences:', dates); // Log to see the output
    return dates;
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      }}
      events={events}
      slotMinTime="07:00:00"
      slotMaxTime="23:00:00"
    />

  );
};

export default TeacherScheduleComponent;
