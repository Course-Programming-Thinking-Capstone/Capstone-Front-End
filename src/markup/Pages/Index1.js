import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import BannerSlider from '../Element/BannerSlider';
import FromSlider from '../Element/FromSlider';
import TestiMonialSlider from '../Element/TestiMonialSlider';
import TeacherSlider from '../Element/TeacherSlider';
import GallerySlider from '../Element/GallerySlider';
import LanguageSwitcher from '../Element/LanguageSwitcher';

import icon1 from './../../images/icon/icon1.jpg';
import icon2 from './../../images/icon/icon2.jpg';
import icon3 from './../../images/icon/icon3.jpg';
import icon4 from './../../images/icon/icon4.jpg';
import bgimg1 from './../../images/line.png';
import bgimg2 from './../../images/background/bg1.jpg';
import bgimg3 from './../../images/line2.png';
import bg7 from './../../images/background/bg7.webp';
import imgcloud from './../../images/cloud.png';
import chopper from './../../images/chopper.png';
import backwhite from './../../images/back-white.png';
import backpink from './../../images/back-pink.png';
import backgreen from './../../images/back-green.png';
import backred from './../../images/back-red.png';
import team1 from './../../images/team/pic1.png';
import team2 from './../../images/team/pic2.png';
import team3 from './../../images/team/pic3.png';
import team4 from './../../images/team/pic4.png';
import teacher from './../../images/team/teacher.png';


// const iconBlog = [
// 	{ image: icon1, title1: 'To Think Creatively', title2: 'and Create' },
// 	{ image: icon2, title1: 'To Feel Fne and to', title2: 'Understand Emotions' },
// 	{ image: icon3, title1: 'To be Independent', title2: 'and Active' },
// 	{ image: icon4, title1: 'To Apply', title2: 'Knowledge in Life' },
// ];
const iconBlog2 = [
	{ icon: <i className="flaticon-rattle text-blue" />, title: 'Infants', },
	{ icon: <i className="flaticon-bricks text-green" />, title: 'I myself', },
	{ icon: <i className="flaticon-puzzle text-orange" />, title: 'Goodie', },
];
const teacherBlog = [
	{ name: 'Kate Doe', image1: backwhite, image2: teacher },
	{ name: 'Jone Doe', image1: backpink, image2: teacher },
	{ name: 'Manie Doe', image1: backgreen, image2: teacher },
	{ name: 'Jennie Doe', image1: backred, image2: teacher },
];

const Index1 = () => {
	const { t } = useTranslation();
	useEffect(() => {
		document.body.setAttribute('data-theme-color', 'color_1')
	}, [])
	return (
		<Fragment>
			<Header />
			<div className="page-content bg-white">
				<BannerSlider />
				<div className="content-block">
					{/*  About Us */}
					<div className="section-full bg-white content-inner-1 text-center">
						<div className="container">
							<div className="section-head">
								<h2 className="head-title text-secondry">{t('welcome_message')}</h2>
								<p>{t('welcome_content')}</p>
							</div>
							<div className="row">
								<div className="col-lg-3 col-md-6 col-sm-6 col-12">
									<div className="icon-bx-wraper sr-iconbox m-b20">
										<div className="icon-lg m-b20">
											<Link to={"#"} className="icon-cell"><img src={icon1} alt="" /></Link>
										</div>
										<div className="icon-content">
											<h6 className="dlab-tilte">{t('welcome_content_1')}</h6>
										</div>
									</div>
								</div>
								<div className="col-lg-3 col-md-6 col-sm-6 col-12">
									<div className="icon-bx-wraper sr-iconbox m-b20">
										<div className="icon-lg m-b20">
											<Link to={"#"} className="icon-cell"><img src={icon2} alt="" /></Link>
										</div>
										<div className="icon-content">
											<h6 className="dlab-tilte">{t('welcome_content_2')}</h6>
										</div>
									</div>
								</div>
								<div className="col-lg-3 col-md-6 col-sm-6 col-12">
									<div className="icon-bx-wraper sr-iconbox m-b20">
										<div className="icon-lg m-b20">
											<Link to={"#"} className="icon-cell"><img src={icon3} alt="" /></Link>
										</div>
										<div className="icon-content">
											<h6 className="dlab-tilte">{t('welcome_content_3')}</h6>
										</div>
									</div>
								</div>
								<div className="col-lg-3 col-md-6 col-sm-6 col-12">
									<div className="icon-bx-wraper sr-iconbox m-b20">
										<div className="icon-lg m-b20">
											<Link to={"#"} className="icon-cell"><img src={icon4} alt="" /></Link>
										</div>
										<div className="icon-content">
											<h6 className="dlab-tilte">{t('welcome_content_4')}</h6>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*  About Us End*/}
					{/* <div className="section-full bg-white content-inner-2 about-box" style={{ backgroundImage: "url(" + bgimg1 + ")", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-7 col-md-12 col-sm-12 col-12">
									<div className="section-head">
										<h2 className="head-title text-secondry">Do you dream that<br />your child will become<br />intelligent?</h2>
										<p>
											The concept of school and pre-school education consists of 3 programs of development and training in our academy, developed in collaboration with the institute of the children's university, which will help your children to learn subjects in the best possible way.
										</p>
										<Link to={"./faqs"} className="btn btn-md kids-btn radius-xl">Learn more</Link>
									</div>
								</div>
								<div className="col-lg-5 col-md-12 col-sm-12 col-12">
									{iconBlog2.map((item, index) => (
										<div className="icon-bx-wraper left" key={index}>
											<div className="icon-lg m-b20"> <span className="icon-cell">{item.icon}</span> </div>
											<div className="icon-content">
												<h2 className="dlab-tilte">{item.title}</h2>
												<p>Lectus placerat a ultricies a,interdum donec eget metus auguen u Fusce mollis imperdiet interdum donec eget metus.</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div> */}
					<EducationBanner />
					<div className="section-full bg-white content-inner-1">
						<div className="container">
							<div className="section-head text-center">
								<h2 className="head-title text-secondry">{t("gallery_class")}</h2>
								<p>{t("gallery_content")}</p>
							</div>
							<GallerySlider />
						</div>
					</div>
					{/* <div className="section-full bg-white content-inner-1" style={{ backgroundImage: "url(" + bgimg3 + ")", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
						<div className="container">
							<div className="section-head text-center">
								<h2 className="head-title text-secondry">About the Teachers</h2>
								<p>We have an excellent teacher to child ratio at our Kindergarten to ensure that each child receives the attention he or she needs</p>
							</div>
							<TeacherSlider />
						</div>
					</div> */}
					<div className="section-full our-teachers content-inner-2">
						<img src={imgcloud} className="background-img slideskew5" alt="" />
						<img src={chopper} className="background-img2 slideskew6" alt="" />
						<div className="container">
							<div className="section-head text-center style-1">
								<h2 className="head-title text-secondry">{t("teacher_message")}</h2>
								<p>{t("teacher_content")}</p>
							</div>
							<div className="section-content text-center ">
								<div className="row">
									{teacherBlog.map((item, index) => (
										<div className="col-lg-3 col-sm-6" key={index}>
											<div className="dez-team-box m-b30 hover dez-img-effect">
												<div className="dez-media">
													<Link to={"#"}><img width="358" height="460" alt="" src={item.image2} /> </Link>
													<div className="overlay-bx style-1">
														<ul className="list-inline">
															<li><Link to={"#"}><i className="fa fa-facebook"></i></Link></li>
															<li><Link to={"#"}><i className="fa fa-instagram"></i></Link></li>
														</ul>
													</div>
												</div>
												<div className="p-a10 dez-team-info"
													style={{
														backgroundImage: `url(${item.image1})`,
														backgroundSize: "contain",
														backgroundRepeat: "no-repeat",
														backgroundPosition: "center"
													}}
												>
													<div className="about-team style-1">
														<h5 className="team-title"><a href="teachers-details.html">{item.name}</a></h5>
														<span className="team-info style-1">Teacher</span>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
					{/* <div className="section-full bg-white content-inner-1">
						<div className="container">
							<div className="section-head text-center">
								<h2 className="head-title text-secondry">Testimonials about center</h2>
								<p>We have an excellent teacher to child ratio at our Kindergarten to ensure that each child receives the attention he or she needs</p>
							</div>
							<TestiMonialSlider />
						</div>
					</div> */}
					<div className="section-full bg-white content-inner">
						<div className="container">
							<div className="section-head text-center">
								<h2 className="head-title text-secondry">From the Blog</h2>
								<p>We have an excellent teacher to child ratio at our Kindergarten to ensure that each child receives the attention he or she needs</p>
							</div>
							<FromSlider />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</Fragment>
	)

}
function EducationBanner() {
	const { t } = useTranslation();
	return (
		<>
			<div className="section-full bg-white content-inner-2 about-content bg-img-fix" style={{ backgroundImage: "url(" + bg7 + ")" }}>
				<div className="about-overlay-box"></div>
				<div className="container">
					<div className="section-head text-center">
						<p className="text-white text-center">{t('join_message')}</p>
						<h2 className="head-title text-yellow text-center">{t('join_call')}</h2>
						<h3 className='text-warning text-center display-4'>0903 123 456</h3>
						<Link to={"/contact-us"} className="btn btn-md radius-xl text-center">{t('join_read')}</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export { EducationBanner };
export default Index1;