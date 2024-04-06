import React, { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const TeacherScheduleComponent = () => {
  const [schedule, setSchedule] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0); // set the date to the start of the day
    return date;
  };
  

  const transformToEvents = (data) => {
    const dayIndices = {
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6
    };

    const getNextOccurrence = (date, dayIndex) => {
      const resultDate = new Date(date);
      let daysToAdd = dayIndex - resultDate.getDay();
      if (daysToAdd < 0) daysToAdd += 7; // If it's past the day of the week, go to next week
      if (daysToAdd !== 0) resultDate.setDate(resultDate.getDate() + daysToAdd); // Only add days if it's not already the correct day
      return resultDate;
    };


    return data.flatMap((item) => {
      const startDate = parseDate(item.dayStart);
      const endDate = parseDate(item.dayEnd);
      const events = [];

      console.log('Start Date:', startDate);
      console.log('End Date:', endDate);

      item.days.forEach((day) => {
        let currentDate = getNextOccurrence(startDate, dayIndices[day]);

        while (currentDate <= endDate) {
          const dateStr = currentDate.toISOString().split('T')[0];
          console.log(`${day} Date:`, currentDate.toISOString());

          events.push({
            title: item.classCode,
            start: `${dateStr}T${item.slotStart}`,
            end: `${dateStr}T${item.slotEnd}`,
          });

          // Increment to the next occurrence for the same weekday
          currentDate.setDate(currentDate.getDate() + 7);
        }
      });

      return events;
    });
  };


  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("https://www.kidpro-production.somee.com/api/v1/Classes/teacher-or-student", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('API data:', data); // Check the fetched data // Check the generated events

        const eventArray = transformToEvents(data);
        console.log('eventArray: ', eventArray);
        setSchedule(eventArray);

      } catch (error) {
        console.error("Failed to fetch schedule", error);
      }
    };

    fetchSchedule();
  }, []);
  console.log('Final schedule state: ', schedule);
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      }}
      events={schedule}
      hiddenDays={[0]}
    // slotMinTime="07:00:00"
    // slotMaxTime="23:00:00"
    />

  );
};

export default TeacherScheduleComponent;
