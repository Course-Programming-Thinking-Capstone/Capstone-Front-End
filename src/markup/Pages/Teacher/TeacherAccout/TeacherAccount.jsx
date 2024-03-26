import React, { useState, useEffect } from "react";
import background from "./../../../../images/background/teacherBackground.jpg";
import demo from "./../../../../images/gallery/demo.jpg";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { teacherActiveMenuSelector } from "../../../../store/selector";

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

export default function TeacherAccount({ child }) {
  const teacherActiveMenu = useSelector(teacherActiveMenuSelector);

  const getMenuItemStyle = (menuItem) => {
    return menuItem === teacherActiveMenu
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
                <Link
                  to="/teacher-account/notification"
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("notification")}
                >
                  <i class="fa-solid fa-bell"></i>
                  <p className="mb">Notification</p>
                </Link>

                <Link
                  to="/teacher-account/courses"
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("myCourses")}
                >
                  <i class="fa-solid fa-book-open"></i>
                  <p className="mb">My courses</p>
                </Link>

                <Link
                  to="/teacher-account/schedule"
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("schedule")}
                >
                  <i class="fa-solid fa-calendar-days"></i>
                  <p className="mb">Schedule</p>
                </Link>

                <Link
                  to="/teacher-account/classes"
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("classes")}
                >
                  <i class="fa-solid fa-user"></i>
                  <p className="mb">My class</p>
                </Link>

                <Link
                  to="/teacher-account/syllabuses"
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("syllabuses")}
                >
                  <i class="fa-solid fa-book"></i>
                  <p className="mb">Syllabus</p>
                </Link>

                <Link
                  to="/teacher-account/quizzes"
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("quizzes")}
                >
                  <i class="fa-solid fa-pen-to-square"></i>
                  <p className="mb">Quiz</p>
                </Link>

                <Link
                  to="/teacher-account/setting"
                  className="item d-flex justify-content-start"
                  style={getMenuItemStyle("setting")}
                >
                  <i class="fa-solid fa-gear"></i>
                  <p className="mb">Setting</p>
                </Link>

                <div className="item d-flex justify-content-start">
                  <i class="fa-solid fa-right-from-bracket"></i>
                  <p className="mb">Log out</p>
                </div>
              </div>
            </div>
            <div className="col-lg-9">{child}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
