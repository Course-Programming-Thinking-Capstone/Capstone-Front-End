import React from "react";
import background from "./../../../../images/background/teacherBackground.jpg";
import demo from "./../../../../images/gallery/demo.jpg";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { teacherActiveMenuSelector } from "../../../../store/selector";
import { Image } from "react-bootstrap";

export default function TeacherAccount({ child }) {
  //retrieve user information
  const user = JSON.parse(localStorage.getItem("user"));

  const teacherActiveMenu = useSelector(teacherActiveMenuSelector);
  const navigate = useNavigate();

  const getMenuItemStyle = (menuItem) => {
    return menuItem === teacherActiveMenu
      ? { backgroundColor: "#F69E4A", color: "white" }
      : { color: "#212121CC" }; // Example: light grey background for active menu
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/home");
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
                <Image
                  src={user.pictureUrl !== null ? user.pictureUrl : demo}
                  alt="User avatar"
                  title="avatar"
                  roundedCircle
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
              <h5 className="text-center mt-2">{user.fullName}</h5>
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
                  to="/teacher/notification"
                  className="item d-flex justify-content-start align-items-center"
                  style={getMenuItemStyle("notification")}
                >
                  <i className="fa-solid fa-bell"></i>
                  <div className="mx-4">Notification</div>
                </Link>

                <Link
                  to="/teacher/courses"
                  className="item d-flex justify-content-start align-items-center"
                  style={getMenuItemStyle("myCourses")}
                >
                  <i
                    className="fa-solid fa-book-open"
                    style={{ width: "19px", height: "100%" }}
                  ></i>
                  <div className="mx-4">My courses</div>
                </Link>

                <Link
                  to="/teacher/schedule"
                  className="item d-flex justify-content-start align-items-center"
                  style={getMenuItemStyle("schedule")}
                >
                  <i className="fa-solid fa-calendar-days"></i>
                  <div className="mx-4">Schedule</div>
                </Link>

                <Link
                  to="/teacher/classes"
                  className="item d-flex justify-content-start align-items-center"
                  style={getMenuItemStyle("classes")}
                >
                  <i className="fa-solid fa-user"></i>
                  <div className="mx-4">My class</div>
                </Link>

                <Link
                  to="/teacher/syllabuses"
                  className="item d-flex justify-content-start align-items-center"
                  style={getMenuItemStyle("syllabuses")}
                >
                  <i className="fa-solid fa-book"></i>
                  <div className="mx-4">Syllabus</div>
                </Link>

                {/* <Link
                  to="/teacher/quizzes"
                  className="item d-flex justify-content-start align-items-center"
                  style={getMenuItemStyle("quizzes")}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  <div className="mx-4">Quiz</div>
                </Link> */}

                <Link
                  to="/teacher/setting"
                  className="item d-flex justify-content-start align-items-center"
                  style={getMenuItemStyle("setting")}
                >
                  <i className="fa-solid fa-gear"></i>
                  <div className="mx-4">Setting</div>
                </Link>

                <div
                  className="item d-flex justify-content-start align-items-center"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <div className="mx-4">Log out</div>
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
