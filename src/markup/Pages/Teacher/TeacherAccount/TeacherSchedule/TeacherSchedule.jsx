import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

const TeacherSchedule = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin]}
      initialView="timeGridWeek"
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      }}
      height="auto"
      hiddenDays={[0]}
      slotMinTime="07:00:00"
      slotMaxTime="23:00:00"
    />
  );
};

export default TeacherSchedule;
