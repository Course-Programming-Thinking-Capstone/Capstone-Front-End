import React, { Component, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ThemeButton from './Element/ThemeButton/ThemeButton';
//ScrollToTop
import ScrollToTop from './Element/ScrollToTop';
import AuthCheck from './Element/AuthCheck';

import Index1 from './Pages/Index1';
import Index3 from './Pages/Index3';
import Index2 from './Pages/Index2';
import AboutUs1 from './Pages/AboutUs1';
import AboutUs2 from './Pages/AboutUs2';
import Classes from './Pages/Classes';
import ClassesDetail from './Pages/ClassesDetail';
import Teachers from './Pages/Teachers';
import TeachersDetail from './Pages/TeachersDetail';
import ComingSoon from './Pages/ComingSoon';
import Faqs from './Pages/Faqs';
import Event from './Pages/Event';
import EventDetail from './Pages/EventDetail';
import ErrorPage from './Pages/ErrorPage';
import BlogStandard from './Pages/BlogStandard';
import BlogClassicGrid from './Pages/BlogClassicGrid';
import BlogDetails from './Pages/BlogDetails';
import Gallery from './Pages/Gallery';
import GalleryMasonary from './Pages/GalleryMasonary';
import GalleryFilter from './Pages/GalleryFilter';
import Contact from './Pages/Contact';
import Dashboard from './Pages/Dashboard';
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


export default function Markup() {

	return (
		<BrowserRouter basename='/'>
			<AuthCheck />
			<div className="page-wraper">
				<Routes>
					<Route path='/' exact element={<Index1 />} />
					<Route path='/index-2' exact element={<Index2 />} />
					<Route path='/index-3' exact element={<Index3 />} />
					<Route path='/about-1' exact element={<AboutUs1 />} />
					<Route path='/about-2' exact element={<AboutUs2 />} />
					<Route path='/classes' exact element={<Classes />} />
					<Route path='/classes-details' exact element={<ClassesDetail />} />
					<Route path='/teachers' exact element={<Teachers />} />
					<Route path="/teachers-details/:id" exact element={<TeachersDetail />} />
					<Route path='/coming-soon' exact element={<ComingSoon />} />
					<Route path='/faqs' exact element={<Faqs />} />
					<Route path='/event' exact element={<Event />} />
					<Route path='/event-details' exact element={<EventDetail />} />
					<Route path='/error-404' exact element={<ErrorPage />} />
					<Route path='/blog-standard' exact element={<BlogStandard />} />
					<Route path='/blog-classic-grid' exact element={<BlogClassicGrid />} />
					<Route path='/blog-details' exact element={<BlogDetails />} />
					<Route path='/gallery' exact element={<Gallery />} />
					<Route path='/gallery-masonary' exact element={<GalleryMasonary />} />
					<Route path='/gallery-filter' exact element={<GalleryFilter />} />
					<Route path='/contact-us' exact element={<Contact />} />
					<Route path='/dashboard' exact element={<Dashboard />} />
					<Route path='/register' exact element={<Register />} />
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
					<Route path='/teacher-account' exact element={<TeacherAccount />} />
					<Route path='/staff' exact element={<Staff />} />
					<Route path='/admin' exact element={<Admin />} />

				</Routes>
			</div>
			<ScrollToTop />
		</BrowserRouter>
	)
}

