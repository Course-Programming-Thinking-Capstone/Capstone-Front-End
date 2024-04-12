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
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import StaffModerating from "./markup/Pages/Staff/StaffModerating/StaffModerating";
import Classes from "./markup/Pages/Classes";
import ClassesDetail from "./markup/Pages/ClassesDetail";
import CoursePayment from "./markup/Pages/CoursePayment";
import PaymentSuccess from "./markup/Pages/PaymentSuccess";
import CoursesPlan from "./markup/Pages/CoursesPlan";
import { NotFound } from "./markup/Pages/NotFound/NotFound";
import { EditText } from "./markup/Pages/TestPage/EditText";
import ErrorPage from "./markup/Pages/ErrorPage";
import StudentHome from "./markup/Pages/StudentHome";
import CourseStudy from "./markup/Pages/CourseStudy";
import Order from "./markup/Pages/Order";

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
            <Route path="/" element={<Navigate to="/home" />}></Route>
            <Route
              path="/home"
              element={<PrivateRoute page="home" component={<Index1 />} />}
            />

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
                path="staff-order-detail/:orderId"
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

              <Route
                path="moderating"
                element={
                  <PrivateRoute
                    page="staff/moderating"
                    component={<StaffModerating />}
                  />
                }
              />
            </Route>

            {/* Teacher pages */}

            <Route
              path="/teacher"
              element={
                <PrivateRoute page="teacher" component={<TeacherAccount />} />
              }
            />

            <Route
              path="teacher/schedule"
              element={
                <PrivateRoute
                  page="teacher/schedule"
                  component={<TeacherSchedule />}
                />
              }
            />

            <Route
              path="teacher/notification"
              element={
                <PrivateRoute
                  page="teacher/notification"
                  component={<TeacherNotification />}
                />
              }
            />

            <Route
              path="teacher/courses"
              element={
                <PrivateRoute
                  page="teacher/courses"
                  component={<TeacherCourse />}
                />
              }
            />

            <Route
              path="teacher/classes"
              element={
                <PrivateRoute
                  page="teacher/classes"
                  component={<TeacherClasses />}
                />
              }
            />

            <Route
              path="/teacher/syllabuses"
              element={
                <PrivateRoute
                  page="teacher/syllabuses"
                  component={<Syllabus />}
                />
              }
            />
            <Route
              path="teacher/syllabuses/detail"
              element={
                <PrivateRoute
                  page="teacher/syllabuses/detail"
                  component={<SyllabusInformation />}
                />
              }
            />

            <Route
              path="teacher/syllabuses/create-course"
              element={
                <PrivateRoute
                  page="teacher/syllabuses/create-course"
                  component={<CreateCourseContent />}
                />
              }
            />

            <Route
              path="teacher/quizzes"
              element={
                <PrivateRoute page="teacher/quizzes" component={<Quiz />} />
              }
            />

            <Route
              path="teacher/setting"
              element={
                <PrivateRoute
                  page="teacher/setting"
                  component={<TeacherSetting />}
                />
              }
            />

            {/* Parent pages  */}
            <Route
              path="/classes"
              element={<PrivateRoute page="classes" component={<Classes />} />}
            />

            <Route
              path="/classes-detail/:id"
              element={
                <PrivateRoute
                  page="classes-detail"
                  component={<ClassesDetail />}
                />
              }
            />

            <Route
              path="/order"
              element={
                <PrivateRoute
                  page="order"
                  component={<Order />}
                />
              }
            />

            <Route
              path="/payment"
              element={
                <PrivateRoute page="payment" component={<CoursePayment />} />
              }
            />
            <Route
              path="/payment-success/:orderId"
              element={
                <PrivateRoute
                  page="payment-success"
                  component={<PaymentSuccess />}
                />
              }
            />
            {/* Student pages */}

            <Route
              path="/student-home"
              element={
                <PrivateRoute
                  page="student-home"
                  component={<StudentHome />}
                />
              }
            />
            <Route
              path="/courses-plan/:courseId"
              element={
                <PrivateRoute
                  page="courses-plan"
                  component={<CoursesPlan />}
                />
              }
            />

            <Route
              path="/courses-study"
              element={
                <PrivateRoute
                  page="courses-study"
                  component={<CourseStudy />}
                />
              }
            />

            {/* Test page */}
            <Route path="/test" element={<DragAndDropComponent />} />

            {/* Error pages  */}
            <Route path="/not-found" element={<ErrorPage />} />
            <Route path="*" element={<Navigate to="/not-found" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
