import React, { Fragment, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';

//images
import background from './../../images/background/allCourseBackground.jpg';
import bnr1 from './../../images/line2.png';
import clsimg1 from './../../images/classes/pic1.jpg';
import clsimg2 from './../../images/classes/pic2.jpg';
import clsimg3 from './../../images/classes/pic3.jpg';
import clsimg4 from './../../images/classes/pic4.jpg';
import clsimg5 from './../../images/classes/pic5.jpg';
import clsimg6 from './../../images/classes/pic6.jpg';
import classes from './../../images/classes/codingClass.png';

const classesBlog = [
	{ images: clsimg1, title: 'Art Drawing Classes' },
	{ images: clsimg4, title: 'The Answer To Everything.' },
	{ images: clsimg3, title: 'The Miracle Of Education.' },
	{ images: clsimg5, title: 'Ten Things To Know About' },
	{ images: clsimg2, title: 'The Story Of Education' },
	{ images: clsimg6, title: 'The Shocking Revelation' },
];

class Classes extends Component {
	render() {
		return (
			<Fragment>
				<Header />
				<div className="course">
					<PageTitle motherMenu="Classes" activeMenu="Classes" />

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
									<h5>Free courses</h5>
									<h4>Suitable for children from 7 years old</h4>
									<p>Build a basic programming foundation</p>
								</div>
								<div className="row sp40">
									{classesBlog.map((data, index) => (
										<div className="col-lg-4 col-md-6 col-sm-6" key={index}>
											<div className="class-item">
												<div className="class-media">
													<img src={classes} alt="" />
													<p>
														<span>Class Time:</span>
														08:00 am - 10:00 am
													</p>
												</div>
												<div className="class-info">
													<h4><Link to={"/classes-details"}>{data.title}</Link></h4>
													<p>Learn what programming is, technology is very
														interesting</p>
													<ul className="schedule">
														<li className="bg-blue class-size"><span>Class Size</span> <span>30 - 40</span> </li>
														<li className="bg-green years-old"><span>Years Old</span> <span>5 - 6</span> </li>
														<li className="bg-orange tution"><span>Teacher</span> <span>LamNN</span> </li>
													</ul>
												</div>
											</div>
										</div>
									))}
								</div>

								<div className="all-course-header">
									<h5>Free courses</h5>
									<h4>Suitable for children from 7 years old</h4>
									<p>Build a basic programming foundation</p>
								</div>

								<div className="row sp40">
									{classesBlog.map((data, index) => (
										<div className="col-lg-4 col-md-6 col-sm-6" key={index}>
											<div className="class-item">
												<div className="class-media">
													<img src={classes} alt="" />
													<p>
														<span>Class Time:</span>
														08:00 am - 10:00 am
													</p>
												</div>
												<div className="class-info">
													<h4><Link to={"/classes-details"}>{data.title}</Link></h4>
													<p>Learn what programming is, technology is very
														interesting</p>
													<ul className="schedule">
														<li className="bg-blue class-size"><span>Class Size</span> <span>30 - 40</span> </li>
														<li className="bg-green years-old"><span>Years Old</span> <span>5 - 6</span> </li>
														<li className="bg-orange tution"><span>Teacher</span> <span>LamNN</span> </li>
													</ul>
												</div>
											</div>
										</div>
									))}
								</div>

							</div>
						</div>
					</div>
				</div>
				<Footer />
			</Fragment>
		)
	}
}
export default Classes;