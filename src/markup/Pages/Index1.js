import React,{Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import BannerSlider from '../Element/BannerSlider';
import FromSlider from '../Element/FromSlider';
import TestiMonialSlider from '../Element/TestiMonialSlider';
import TeacherSlider from '../Element/TeacherSlider';
import GallerySlider from '../Element/GallerySlider';

import icon1 from './../../images/icon/icon1.jpg';
import icon2 from './../../images/icon/icon2.jpg';
import icon3 from './../../images/icon/icon3.jpg';
import icon4 from './../../images/icon/icon4.jpg';
import bgimg1 from './../../images/line.png';
import bgimg2 from './../../images/background/bg1.jpg';
import bgimg3 from './../../images/line2.png';

const iconBlog = [
	{ image: icon1 , title1: 'To Think Creatively', title2: 'and Create' },	
	{ image: icon2 , title1: 'To Feel Fne and to', title2:'Understand Emotions' },	
	{ image: icon3 , title1: 'To be Independent', title2: 'and Active' },	
	{ image: icon4 , title1: 'To Apply', title2:'Knowledge in Life' },	
];
const iconBlog2 = [
	{ icon:  <i className="flaticon-rattle text-blue" />, title: 'Infants', },	
	{ icon:  <i className="flaticon-bricks text-green" />, title: 'I myself', },	
	{ icon:  <i className="flaticon-puzzle text-orange" />, title: 'Goodie',  },	
];

const Index1 = () =>{	
	useEffect(() => {
        document.body.setAttribute('data-theme-color', 'color_1')
    }, [])
	return(
		<Fragment>
			<Header />
			<div className="page-content bg-white">
				<BannerSlider />				
				<div className="content-block">
					{/*  About Us */}
						<div className="section-full bg-white content-inner-1 text-center">
							<div className="container">
								<div className="section-head">
									<h2 className="head-title text-secondry">Welcome to  Kids Center</h2>
									<p>Fill your child's childhood with the joy of learning!</p>
								</div>
								<div className="row">
									{iconBlog.map((data, index)=>(
										<div className="col-lg-3 col-md-6 col-sm-6 col-12" key={index}>
											<div className="icon-bx-wraper sr-iconbox m-b20">
												<div className="icon-lg m-b20">
													<Link to={"#"} className="icon-cell"><img src={data.image} alt=""/></Link>
												</div>
												<div className="icon-content">
													<h6 className="dlab-tilte">{data.title1}<br/>{data.title2}</h6>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					{/*  About Us End*/}
					<div className="section-full bg-white content-inner-2 about-box" style={{backgroundImage:"url(" + bgimg1 +")",  backgroundSize:"contain",backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
						<div className="container">
							<div className="row">
								<div className="col-lg-7 col-md-12 col-sm-12 col-12">
									<div className="section-head">
										<h2 className="head-title text-secondry">Do you dream that<br/>your child will become<br/>intelligent?</h2>
										<p>
											The concept of school and pre-school education consists of 3 programs of development and training in our academy, developed in collaboration with the institute of the children's university, which will help your children to learn subjects in the best possible way.
											</p>
										<Link to={"./faqs"} className="btn btn-md kids-btn radius-xl">Learn more</Link>
									</div>
								</div>
								<div className="col-lg-5 col-md-12 col-sm-12 col-12">
									{iconBlog2.map((item, index)=>(
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
					</div>
					<EducationBanner />
					<div className="section-full bg-white content-inner-1">
						<div className="container">
							<div className="section-head text-center">
								<h2 className="head-title text-secondry">Gallery of our classes</h2>
								<p>We provide three classes with nine to twenty children each aged twelve months to six years of age.</p>
							</div>
							<GallerySlider />
						</div>
					</div>
					<div className="section-full bg-white content-inner-1" style={{backgroundImage:"url("+ bgimg3 +")", backgroundSize:"contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
						<div className="container">
							<div className="section-head text-center">
								<h2 className="head-title text-secondry">About the Teachers</h2>
								<p>We have an excellent teacher to child ratio at our Kindergarten to ensure that each child receives the attention he or she needs</p>
							</div>
							<TeacherSlider />
						</div>
					</div>
					<div className="section-full bg-white content-inner-1">
						<div className="container">
							<div className="section-head text-center">
								<h2 className="head-title text-secondry">Testimonials about center</h2>
								<p>We have an excellent teacher to child ratio at our Kindergarten to ensure that each child receives the attention he or she needs</p>
							</div>
							<TestiMonialSlider />
						</div>
					</div>
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
function EducationBanner(){
	return(
		<>
			<div className="section-full bg-white content-inner-2 about-content bg-img-fix" style={{backgroundImage:"url("+ bgimg2 +")"}}>
				<div className="about-overlay-box"></div>
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-12 col-sm-12 col-12">
							<div className="section-head">
								<h2 className="head-title text-yellow">Education from birth<br/>begins with us</h2>
								<p className="text-white">Our children's academy, together with one of the oldest private schools, created a joint school preparation project. The goal of the project is the harmonious development, socializationfor admission to the best educational institutions of our city.</p>
							</div>
						</div>
						<div className="col-lg-6 col-md-6 col-sm-12 col-12"></div>
					</div>
				</div>
			</div>
		</>
	)
}
export {EducationBanner};
export default Index1;