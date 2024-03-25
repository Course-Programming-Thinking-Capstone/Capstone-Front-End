import React, { useState, useEffect } from "react";
import background from "./../../../../images/background/teacherBackground.jpg";
import demo from "./../../../../images/gallery/demo.jpg";

import TeacherNotification from "./TeacherNotification/TeacherNotification";
import TeacherCourse from "./TeacherCourse/TeacherCourse";
import TeacherSchedule from "./TeacherSchedule/TeacherSchedule";
import TeacherClasses from "./TeacherClass/TeacherClass";
import Syllabus from "./Syllabus/Syllabus";
import TeacherSetting from "./TeacherSetting/TeacherSetting";
import CreateQuiz from "./CreateQuiz/CreateQuiz";

export default function TeacherAccount() {
  // State to track the active menu item
  const [activeMenu, setActiveMenu] = useState("notification");

  const renderContent = () => {
    console.log("Active Menu:", activeMenu);
    switch (activeMenu) {
      case "notification":
        return <TeacherNotification />;
      case "myCourses":
        return <TeacherCourse />;
      case "schedule":
        return <TeacherSchedule />;
      case "teacherCourses":
        return <TeacherClasses />;
      case "createCourse":
        return <Syllabus /*setActiveMenu={setActiveMenu}*/ />;
      case "createQuiz":
        return <CreateQuiz />;
      case "teacherSetting":
        return <TeacherSetting />;

      default:
        return <TeacherNotification />;
    }
  };

  const getMenuItemStyle = (menuItem) => {
    return menuItem === activeMenu
      ? { backgroundColor: "#F69E4A", color: "white" }
      : {}; // Example: light grey background for active menu
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div className="teacher-account container">
          <div className="row">
            <div className="menu col-lg-3">
              <div className="d-flex justify-content-center">
                <img src={demo} alt="" />
              </div>
              <h5 className="text-center">Kim Jennie</h5>
              <div className="d-flex justify-content-center">
                <button>Edit profile</button>
              </div>
              <div className="info d-flex justify-content-center">
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="mb text-center">10</p>
                    <span>Student</span>
                  </div>
                  <div>
                    <p className="mb text-center">8</p>
                    <span>Course</span>
                  </div>
                </div>
              </div>
              <div className="menu-content">
                <div
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("notification")}
                  onClick={() => setActiveMenu("notification")}
                >
                  <i class="fa-solid fa-bell"></i>
                  <p className="mb">Notification</p>
                </div>
                <div
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("myCourses")}
                  onClick={() => setActiveMenu("myCourses")}
                >
                  <i class="fa-solid fa-book-open"></i>
                  <p className="mb">My courses</p>
                </div>
                <div
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("schedule")}
                  onClick={() => setActiveMenu("schedule")}
                >
                  <i class="fa-solid fa-calendar-days"></i>
                  <p className="mb">Schedule</p>
                </div>
                <div
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("teacherCourses")}
                  onClick={() => setActiveMenu("teacherCourses")}
                >
                  <i class="fa-solid fa-user"></i>
                  <p className="mb">My class</p>
                </div>
                <div
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("createCourse")}
                  onClick={() => setActiveMenu("createCourse")}
                >
                  <i class="fa-solid fa-book"></i>
                  <p className="mb">Create course</p>
                </div>
                <div
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("createQuiz")}
                  onClick={() => setActiveMenu("createQuiz")}
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                  <p className="mb">Quiz</p>
                </div>
                <div
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("teacherSetting")}
                  onClick={() => setActiveMenu("teacherSetting")}
                >
                  <i class="fa-solid fa-gear"></i>
                  <p className="mb">Setting</p>
                </div>
                <div className="item d-flex justify-content-start">
                  <i class="fa-solid fa-right-from-bracket"></i>
                  <p className="mb">Log out</p>
                </div>
              </div>
            </div>
            <div className="col-lg-9">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

//update lesson data
const updateLessonInSection = (
  sectionId,
  lessonIndex,
  lessonFieldName,
  lessonFieldValue,
  courseStructure,
  setCourseStructure
) => {
  const sectionIndex = courseStructure.sections.findIndex(
    (section) => section.id === sectionId
  );

  if (sectionIndex !== -1) {
    const section = { ...courseStructure.sections[sectionIndex] };

    // Check if the lesson index is valid for the section
    if (lessonIndex >= 0 && lessonIndex < section.lessons.length) {
      // Update the lesson with the new information
      const updatedLessons = [...section.lessons];
      //update lesson
      updatedLessons[lessonIndex] = {
        ...updatedLessons[lessonIndex],
        [lessonFieldName]: lessonFieldValue,
      };

      // Update the section with the modified lessons
      const updatedSections = [...courseStructure.sections];
      updatedSections[sectionIndex] = { ...section, lessons: updatedLessons };

      // Update the courseStructure state with the modified section
      setCourseStructure((prevCourseStructure) => ({
        ...prevCourseStructure,
        sections: updatedSections,
      }));
    } else {
      console.error(
        `Invalid lesson index ${lessonIndex} in section with ID ${sectionId}`
      );
    }
  } else {
    console.error(`Section with ID ${sectionId} not found`);
  }
};
