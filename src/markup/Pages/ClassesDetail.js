import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';


import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

//images
import demo from './../../images/gallery/simp.jpg';
import bnr1 from './../../images/line2.png';
import gallery1 from './../../images/gallery/pic1.jpg';
import gallery2 from './../../images/gallery/pic2.jpg';
import gallery3 from './../../images/gallery/pic3.jpg';
import gallery4 from './../../images/gallery/pic4.jpg';
import gallery5 from './../../images/gallery/pic5.jpg';
import gallery7 from './../../images/gallery/pic7.jpg';
import gallery8 from './../../images/gallery/pic8.jpg';
import gallery9 from './../../images/gallery/pic9.jpg';

const galleryBlog = [
	{ image: gallery1, },
	{ image: gallery5, },
	{ image: gallery7, },
	{ image: gallery8, },
	{ image: gallery2, },
	{ image: gallery3, },
	{ image: gallery4, },
	{ image: gallery9, },
];

export default function ClassesDetail() {
	const navigate = useNavigate();

	const BuyCourse = () => {
		navigate('/payment');
	};

	return (
		<Fragment>
			<Header />
			<div className="page-content">
				<PageTitle motherMenu="Classes Detail" activeMenu="Classes Detail" />
				<div className="content-block">
					<div className="section-full bg-white content-inner" style={{ backgroundImage: "url(" + bnr1 + ")", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-8 col-md-12 col-sm-12 m-b15">
									<div className="classes-details">
										<div className="class-media">
											<img src={demo} alt="" />
										</div>
										<div className="class-info">
											<div className="dlab-post-title ">
												<h2 className="post-title m-t0">Tôi là simp chúa</h2>
												<p>Tôi phải tốt nghiệp sớm để kịp đi đám cưới nyc</p>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-12 col-sm-12">
									<div className="details-tbl widget">
										<ul className="class-details">
											<li>
												<div className="name"><i className="la la-clock-o"></i>Start Date</div>
												<div className="info">24 March 2017</div>
											</li>
											<li>
												<div className="name"><i className="la la-calendar-check-o"></i>Years Old</div>
												<div className="info">6-8 Years</div>
											</li>
											<li>
												<div className="name"><i className="la la-arrows"></i>Class Size</div>
												<div className="info">20-30 Kids</div>
											</li>
											<li>
												<div className="name"><i className="la la-hourglass"></i>Carry Time</div>
												<div className="info">5 Hours/6 Days</div>
											</li>
											<li>
												<div className="name"><i className="la la-history"></i>Coures Duration</div>
												<div className="info">10-12 Month</div>
											</li>
											<li>
												<div className="name"><i className="la la-clock-o"></i>Class Time</div>
												<div className="info">9:30am-5:30pm</div>
											</li>
											<li>
												<div className="name"><i class="fa-solid fa-video"></i>Google meet</div>
												<div className="info rating">Link gg meet</div>
											</li>
											<li>
												<div className="name"><i className="la la-user"></i>Teacher</div>
												<div className="info">Dinh Van Thanh An</div>
											</li>

										</ul>
										<button style={{ width: '100%', backgroundColor: '#ffa133', textAlign: 'center', color: 'white', padding: '15px 0', border: 'none', borderRadius: '4px', marginTop: '15px' }} onClick={BuyCourse}>
											Buy now
										</button>
									</div>


								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</Fragment>
	)
}
