import React, { Component, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ThemeButton from './Element/ThemeButton/ThemeButton';
//ScrollToTop
import ScrollToTop from './Element/ScrollToTop';
import AuthCheck from './Element/AuthCheck';

import Index1 from './Pages/Index1';
import Classes from './Pages/Classes';
import ClassesDetail from './Pages/ClassesDetail';
import Teachers from './Pages/Teachers';
import TeachersDetail from './Pages/TeachersDetail';

import ErrorPage from './Pages/ErrorPage';
import Register from './Pages/Register';
import Schedule from './Pages/Schedule';
import CoursesPlan from './Pages/CoursesPlan';
import CourseStudy from './Pages/CourseStudy';
import CourseQuiz from './Pages/CourseQuiz';
import Order from './Pages/Order';
import OrderDetail from './Pages/OrderDetail';
import CoursePayment from './Pages/CoursePayment';
import OrderCancel from './Pages/OrderCancel';
import PaymentSuccess from './Pages/PaymentSuccess';
import Account from './Pages/Account';
import Verification from './Pages/Verification';
import TeacherAccount from './Pages/Teacher/TeacherAccount/TeacherAccount';
import Staff from './Pages/Staff';
import Admin from './Pages/Admin';
import TeacherSchedule from './Pages/Teacher/TeacherAccout/TeacherSchedule/TeacherSchedule';
import TeacherNotification from './Pages/Teacher/TeacherAccout/TeacherNotification/TeacherNotification';
import TeacherCourse from './Pages/Teacher/TeacherAccout/TeacherCourse/TeacherCourse';
import TeacherClasses from './Pages/Teacher/TeacherAccout/TeacherClass/TeacherClass';
import Syllabus from './Pages/Teacher/TeacherAccout/Syllabus/Syllabus';
import Quiz from './Pages/Teacher/TeacherAccout/CreateQuiz/Quiz';
import TeacherSetting from './Pages/Teacher/TeacherAccout/TeacherSetting/TeacherSetting';
import SyllabusInformation from './Pages/Teacher/TeacherAccout/Syllabus/syllabusInformation/SyllabusInformation';
import Login from './Pages/Login';
import VerifyEmail from './Pages/VerifyEmail';


export default function Markup() {

	return (
		<BrowserRouter basename='/'>
			<AuthCheck />
			<div className="page-wraper">
				<Routes>
					//route for guess
					<Route path='/' exact element={<Index1 />} />
					<Route path='/login' exact element={<Login />} />
					<Route path='/register' exact element={<Register />} />
					<Route path='/verify' exact element={<VerifyEmail />} />


					<Route path='/classes' exact element={<Classes />} />
					<Route path='/classes-details' exact element={<ClassesDetail />} />
					<Route path='/teachers' exact element={<Teachers />} />
					<Route path="/teachers-details/:id" exact element={<TeachersDetail />} />
					<Route path='/error-404' exact element={<ErrorPage />} />


					<Route path='/schedule' exact element={<Schedule />} />
					<Route path='/courses-plan' exact element={<CoursesPlan />} />
					<Route path='/courses-study' exact element={<CourseStudy />} />
					<Route path='/courses-quiz' exact element={<CourseQuiz />} />
					<Route path='/order' exact element={<Order />} />
					<Route path="/order-detail/:orderId" exact element={<OrderDetail />} />
					<Route path='/order-cancel/:orderId' exact element={<OrderCancel />} />
					<Route path='/payment' exact element={<CoursePayment />} />
					<Route path='/payment-success' exact element={<PaymentSuccess />} />
					<Route path='/account' exact element={<Account />} />
					<Route path='/verification' exact element={<Verification />} />
					<Route path='/verification' exact element={<Verification />} />
					<Route path='/teacher-account' exact element={<TeacherAccount />} />
					<Route path='/teacher-account/schedule' exact element={<TeacherSchedule />} />
					<Route path='/teacher-account/notification' exact element={<TeacherNotification />} />
					<Route path='/teacher-account/courses' exact element={<TeacherCourse />} />
					<Route path='/teacher-account/classes' exact element={<TeacherClasses />} />
					<Route path='/teacher-account/syllabuses' exact element={<Syllabus />} />
					<Route path='/teacher-account/syllabuses/detail' exact element={<SyllabusInformation />} />
					<Route path='/teacher-account/quizzes' exact element={<Quiz />} />
					<Route path='/teacher-account/setting' exact element={<TeacherSetting />} />
					<Route path='/staff' exact element={<Staff />} />
					<Route path='/admin' exact element={<Admin />} />

				</Routes>
			</div>
			<ScrollToTop />
		</BrowserRouter>
	)
}

