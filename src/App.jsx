import React from "react";
import Markup from "./markup/Markup";

import "react-18-image-lightbox/style.css";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "swiper/css";
import "./css/plugins.css";
import "./css/style.css";
import "./css/templete.css";
import "./css/skin/skin.css";

import "./plugins/bootstrap-select/bootstrap-select.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-modal-video/css/modal-video.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index1 from "./markup/Pages/Index1";
import PrivateRoute from "./markup/Layout/Components/Route/PrivateRoute";
import Login from "./markup/Pages/Login";
import Register from "./markup/Pages/Register";
import VerifyEmail from "./markup/Pages/VerifyEmail";
import VerifyEmailConfirm from "./markup/Pages/VerifyEmailConfirm";
import Admin from "./markup/Pages/Admin/Admin";
import Game from "./markup/Pages/Admin/Game/Game";
import GameData from "./markup/Pages/Admin/Game/GameData";
import TeacherAccount from "./markup/Pages/Teacher/TeacherAccount/TeacherAccount";
import Schedule from "./markup/Pages/Schedule";
import TeacherNotification from "./markup/Pages/Teacher/TeacherAccount/TeacherNotification/TeacherNotification";
import TeacherCourse from "./markup/Pages/Teacher/TeacherAccount/TeacherCourse/TeacherCourse";
import TeacherClasses from "./markup/Pages/Teacher/TeacherAccount/TeacherClass/TeacherClass";
import Syllabus from "./markup/Pages/Teacher/TeacherAccount/Syllabus/Syllabus";
import SyllabusInformation from "./markup/Pages/Teacher/TeacherAccount/Syllabus/syllabusInformation/SyllabusInformation";
import Quiz from "./markup/Pages/Teacher/TeacherAccount/CreateQuiz/Quiz";
import TeacherSetting from "./markup/Pages/Teacher/TeacherAccount/TeacherSetting/TeacherSetting";
import Staff from "./markup/Pages/Staff/Staff";
import StaffOrder from "./markup/Pages/Staff/StaffOrder/StaffOrder";
import StaffOrderDetail from "./markup/Pages/Staff/StaffOrder/StaffOrderDetail";
import TeacherSchedule from "./markup/Pages/Teacher/TeacherAccount/TeacherSchedule/TeacherSchedule";
import { DragAndDropComponent } from "./markup/Pages/Admin/Game/TextDnd";
import StaffClassDetail from "./markup/Pages/Staff/StaffClassDetail/StaffClassDetail";
import SyllabusAd from "./markup/Pages/Admin/Syllabus/SyllabusAd";
import CreateCourseContent from "./markup/Pages/Teacher/TeacherAccount/Syllabus/createCourse/CreateCourseContent";

// function App() {
// 	return (
// 		<div className="App">

// 			<Markup />
// 		</div>
// 	);
// }

const App = () => {
  return (
    <div className="App">
      <BrowserRouter basename="/">
        <div className="page-wraper">
          <Routes>
            {/* Public page */}
            {/* Home page */}
            <Route path="/" exact element={<Index1 />}></Route>

            {/* Unauthenticated pages */}
            {/* Login */}
            <Route
              path="/login"
              element={<PrivateRoute page="login" component={<Login />} />}
            />

            {/* Register */}
            <Route
              path="/register"
              element={
                <PrivateRoute page="register" component={<Register />} />
              }
            />

            <Route
              path="/verify"
              element={
                <PrivateRoute page="verify" component={<VerifyEmail />} />
              }
            />

            <Route
              path="/verify-confirm"
              element={
                <PrivateRoute
                  page="verify-confirm"
                  component={<VerifyEmailConfirm />}
                />
              }
            />

            {/* Authenticated page */}
            {/* Admin pages */}
            <Route
              path="/admin"
              element={<PrivateRoute page="admin" component={<Admin />} />}
            >
              <Route
                path="game"
                element={
                  <PrivateRoute page="admin/game" component={<Game />} />
                }
              />

              <Route
                path="game-data"
                element={
                  <PrivateRoute
                    page="admin/game-data"
                    component={<GameData />}
                  />
                }
              />
              <Route
                path="syllabusad"
                element={
                  <PrivateRoute
                    page="admin/syllabusad"
                    component={<SyllabusAd />}
                  />
                }
              />
            </Route>

            {/* Staff pages */}
            <Route
              path="/staff"
              element={<PrivateRoute page="staff" component={<Staff />} />}
            >
              <Route
                path="staff-order"
                element={
                  <PrivateRoute
                    page="staff/staff-order"
                    component={<StaffOrder />}
                  />
                }
              />

              <Route
                path="staff-order-detail"
                element={
                  <PrivateRoute
                    page="staff/staff-order-detail"
                    component={<StaffOrderDetail />}
                  />
                }
              />
              <Route
                path="class"
                element={
                  <PrivateRoute
                    page="staff/class"
                    component={<StaffClassDetail />}
                  />
                }
              />
            </Route>

            {/* Teacher pages */}

            <Route
              path="/teacher-account"
              element={
                <PrivateRoute
                  page="teacher-account"
                  component={<TeacherAccount />}
                />
              }
            />

            <Route
              path="teacher-account/schedule"
              element={
                <PrivateRoute
                  page="teacher-account/schedule"
                  component={<TeacherSchedule />}
                />
              }
            />

            <Route
              path="teacher-account/notification"
              element={
                <PrivateRoute
                  page="teacher-account/notification"
                  component={<TeacherNotification />}
                />
              }
            />

            <Route
              path="teacher-account/courses"
              element={
                <PrivateRoute
                  page="teacher-account/courses"
                  component={<TeacherCourse />}
                />
              }
            />

            <Route
              path="teacher-account/classes"
              element={
                <PrivateRoute
                  page="teacher-account/classes"
                  component={<TeacherClasses />}
                />
              }
            />

            <Route
              path="/teacher-account/syllabuses"
              element={
                <PrivateRoute
                  page="teacher-account/syllabuses"
                  component={<Syllabus />}
                />
              }
            />
            <Route
              path="teacher-account/syllabuses/detail"
              element={
                <PrivateRoute
                  page="teacher-account/syllabuses/detail"
                  component={<SyllabusInformation />}
                />
              }
            />

            <Route
              path="teacher-account/syllabuses/create-course"
              element={
                <PrivateRoute
                  page="teacher-account/syllabuses/create-course"
                  component={<CreateCourseContent />}
                />
              }
            />

            <Route
              path="teacher-account/quizzes"
              element={
                <PrivateRoute
                  page="teacher-account/quizzes"
                  component={<Quiz />}
                />
              }
            />

            <Route
              path="teacher-account/setting"
              element={
                <PrivateRoute
                  page="teacher-account/setting"
                  component={<TeacherSetting />}
                />
              }
            />

            {/* Parent pages  */}

            {/* Student pages */}

            {/* Error pages  */}
            <Route path="/error-404" element={<Index1 />} />

            {/* Test pages */}
            <Route path="/test" element={<DragAndDropComponent />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
