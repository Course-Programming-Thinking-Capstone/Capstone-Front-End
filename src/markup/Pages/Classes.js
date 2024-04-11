import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
import ReactPaginate from 'react-paginate';

export default function Classes() {
	const [courses, setCourses] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageCount, setPageCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const accessToken = localStorage.getItem('accessToken');
	const navigate = useNavigate();

	const fetchCourses = async (page = 1) => {
		setIsLoading(true);
		try {
			const response = await fetch(`https://www.kidpro-production.somee.com/api/v1/courses?status=Active&page=${page}&size=6`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error('Failed to fetch courses');
			}
			const data = await response.json();
			console.log('data: ', data);
			setCourses(data.results);
			setPageCount(Math.ceil(data.total / 6));
		} catch (error) {
			console.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (accessToken) {
			fetchCourses(currentPage);
		}
	}, [accessToken, currentPage]);

	const handlePageClick = (data) => {
		const selectedPage = data.selected + 1;
		setCurrentPage(selectedPage);
	};

	const navigateToCourseDetail = (courseId) => {
		navigate(`/classes-detail/${courseId}`); // Use navigate with the course ID
	};

	return (
		<div>
			<Header />
			<div className="course">
				<PageTitle motherMenu="Courses" activeMenu="Courses" />

				<div>
					<div className="all-course">
						<div className='d-flex justify-content-center'>
							<div className='search d-flex'>
								<input type="text" placeholder='What do you want to learn?' />
								<div className='search-button'>
									<i class="fa-solid fa-magnifying-glass"></i>
								</div>
							</div>
						</div>
						<div className="container">
							<div className="all-course-header">
								<h5>Courses</h5>
								<h4>Suitable for children from 5 years old</h4>
								<p>Build a basic programming foundation</p>
							</div>

							<div className="row sp40">
								{isLoading ? (
									<div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100px' }}>
										<div className="spinner-border text-primary" role="status">
											<span className="visually-hidden">Loading...</span>
										</div>
									</div>
								) : (
									courses.map((course, index) => (
										<div className="col-lg-4 col-md-6 col-sm-6" key={index} onClick={() => navigateToCourseDetail(course.id)} style={{ cursor: 'pointer' }}>
											<div className="class-item">
												<div className="class-media">
													<img src={course.pictureUrl} />
												</div>
												<div className="class-info">
													<h4>{course.name}</h4>
													<p>{course.description.length > 70 ? `${course.description.substring(0, 70)}...` : course.description}</p>
													<div className='text-center p-2' style={{ backgroundColor: '#FFA63D', color: 'white', borderRadius: '8px' }}>
														<p className='mb-1' style={{ color: 'white', fontSize: '18px' }}>Price</p>
														{course.price} VND
													</div>
												</div>
											</div>
										</div>
									)))}
							</div>
							<div className='d-flex justify-content-center'>
								<ReactPaginate
									previousLabel={'← Previous'}
									nextLabel={'Next →'}
									breakLabel={'...'}
									pageCount={pageCount}
									marginPagesDisplayed={2}
									pageRangeDisplayed={5}
									onPageChange={handlePageClick}
									containerClassName={'pagination'}
									subContainerClassName={'pages pagination'}
									activeClassName={'active'}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
