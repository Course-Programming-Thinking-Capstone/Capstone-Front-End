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
										<button style={{ width: '50%', backgroundColor: '#EF7E54', textAlign: 'center', color: 'white', padding: '15px 0', border: 'none', borderRadius: '4px', marginTop: '15px', fontWeight: 'bold' }} onClick={BuyCourse}>
											BUY NOW
										</button>
									</div>
								</div>
								<div className="col-lg-4 col-md-12 col-sm-12">
									<h5 className='orange'>Select class for course</h5>
									<div className="details-tbl widget">
										<div className='ps-4 pt-2' style={{ border: '1px solid #7F7C7C', borderRadius:'8px' }}>
											<p>Class: <span style={{ color: '#F15C58' }}>VNR202</span></p>
											<p>Date start: <span style={{ fontWeight: 'bold' }}>2/2/2024 - 2/6/2024</span></p>
											<p>Study day: <span className='blue' style={{ fontWeight: 'bold' }}>Monday - Tuesday</span></p>
											<p>Slot time: <span style={{ fontWeight: 'bold' }}>8:00 AM - 8:50 AM</span></p>
											<p>Teacher: <span style={{ fontWeight: 'bold' }}>Nguyen Ngoc Lam</span></p>
										</div>

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
