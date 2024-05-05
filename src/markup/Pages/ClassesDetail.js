import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
import demo from './../../images/gallery/simp.jpg';
import { toast, ToastContainer } from 'react-toastify';
import instance from './../../helper/apis/baseApi/baseApi';

export default function ClassesDetail() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [courseDetails, setCourseDetails] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedClassId, setSelectedClassId] = useState(null);

	useEffect(() => {
		const fetchCourseDetails = async () => {
			try {
				setIsLoading(true);
				const response = await instance.get(`api/v1/courses/${id}`);
				const data = response.data;

				console.log('courseDetail: ', data);
				setCourseDetails(data);
			} catch (error) {
				navigate('/not-found')
				console.error('There was a problem with the fetch operation:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCourseDetails();
	}, [id]);

	const handleClassClick = (classId) => {
		setSelectedClassId(classId);
	};

	const BuyCourse = () => {
		if (!selectedClassId) {
			toast.error("Please choose your class", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeButton: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			return;
		}

		navigate('/payment', { state: { courseId: courseDetails.id, classId: selectedClassId,ImageCourse:courseDetails.pictureUrl } });
	};



	return (
		<div>
			<Header />
			<ToastContainer />
			<div className="page-content">
				<PageTitle motherMenu="Course detail" activeMenu="Course detail" />

				{isLoading ? (
					<div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '200px' }}>
						<div className="spinner-border text-primary" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				) : (
					<div className="content-block">
						<div className="section-full bg-white content-inner">
							<div className="container">
								<div className="row">
									<div className="col-lg-8 col-md-12 col-sm-12 m-b15">
										<div className="classes-details">
											<div className="class-media">
												<img style={{ borderRadius: 10, height: '517px' }} src={courseDetails.pictureUrl} alt="" />
											</div>
											<div className="class-info">
												<div className="dlab-post-title ">
													<h2 className="post-title m-t0">{courseDetails.name}</h2>
													<p>{courseDetails.description}</p>
												</div>
											</div>
											<button style={{ width: '50%', backgroundColor: '#EF7E54', textAlign: 'center', color: 'white', padding: '15px 0', border: 'none', borderRadius: '4px', marginTop: '15px', fontWeight: 'bold' }} onClick={BuyCourse}>
												BUY NOW
											</button>
										</div>
									</div>
									<div className="col-lg-4 col-md-12 col-sm-12" style={{ maxHeight: '600px', overflowY: 'auto'}}>
										<h5 style={{ textAlign: 'center' }} className='orange'>Select class for course</h5>
										{courseDetails && courseDetails.classes && courseDetails.classes.length > 0 ? (
											courseDetails.classes
												.filter(classDetail => classDetail.classStatus !== "Closed") // Filter out closed classes
												.map((classDetail) => {
													// Ensure slot times are available before slicing
													const startTime = classDetail.startSlot ? classDetail.startSlot.slice(0, 5) : "N/A";
													const endTime = classDetail.endSlot ? classDetail.endSlot.slice(0, 5) : "N/A";

													// Refactor dates to DD/MM/YYYY
													const startDate = classDetail.openClass ? new Date(classDetail.openClass).toLocaleDateString("en-GB") : "Date Not Available";
													const endDate = classDetail.closeClass ? new Date(classDetail.closeClass).toLocaleDateString("en-GB") : "Date Not Available";

													return (
														<div key={classDetail.classId} className={`details-tbl widget mb-3 ${selectedClassId === classDetail.classId ? 'selected-class' : ''}`} onClick={() => handleClassClick(classDetail.classId)} style={{ cursor: 'pointer', border: selectedClassId === classDetail.classId ? '3px solid #FF8A00' : '3px solid  #7F7C7C', borderRadius: '8px' }}>
															<div className='ps-4 pt-2'>
																<p>Class: <span style={{ color: '#F15C58', fontWeight: 'bold' }}>{classDetail.classCode}</span></p>
																<p>Date start: <span style={{ fontWeight: 'bold' }}>{startDate} - {endDate}</span></p>
																<p>Study day: <span className='blue' style={{ fontWeight: 'bold' }}>{classDetail.days.join(', ')}</span></p>
																<p>Slot time: <span style={{ fontWeight: 'bold' }}>({startTime} - {endTime})</span></p>
																<div className="teacher-info">
																	<p>Teacher: <span style={{
																		fontWeight: 'bold',
																		fontFamily: '"Noto Sans", "Arial", sans-serif',
																	}}>{classDetail.teacherName}</span></p>
																</div>
															</div>
														</div>
													);
												})
										) : (
											<p>This course does not have any class yet.</p>
										)}

									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	)
}
