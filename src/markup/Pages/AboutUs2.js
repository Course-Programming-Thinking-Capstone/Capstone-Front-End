import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
import {EducationBanner} from './Index1';
import TeacherSlider from '../Element/TeacherSlider';
import FromSlider from '../Element/FromSlider';
//Images
import bnr1 from './../../images/line2.png';
import bnr2 from './../../images/line2.png';
import bnr3 from './../../images/background/bg6.jpg';
import CenterImg from './../../images/about/about-2.jpg';
import Children1 from './../../images/background/children1.png';
import Children2 from './../../images/background/children2.png';

const TextBlog =({title})=>{
	return(
		<div className="icon-content">
			<h5 className="dlab-tilte">{title}</h5>
			<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod..</p>
		</div>	
	)
}
function AcademyBlog(){
	return(
		<>
			<div className="container">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12">
						<div className="section-head text-center">
							<h2 className="head-title text-secondry">Welcome To Umang Academy</h2>
							<p>The concept of school and pre-school education consists of 3 programs of development and training in our academy.</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-4 col-md-6 col-sm-12">
						<div className="icon-bx-wraper right m-b30 about-iconbx">
							<div className="icon-bx-sm radius bg-pink"> <Link to={"#"} className="icon-cell"><i className="flaticon-bricks"></i></Link> </div>
							<TextBlog  title="Active Learning" />
						</div>
						<div className="icon-bx-wraper right m-b30 about-iconbx">
							<div className="icon-bx-sm radius bg-blue"> <Link to={"#"} className="icon-cell"><i className="flaticon-boy"></i></Link> </div>
							<TextBlog  title="Expert Teachers" />
						</div>
					</div>
					<div className="col-lg-4 col-md-6 col-sm-12 m-b30 d-md-none d-lg-block d-sm-none">
						<img src={CenterImg} alt=""/>
					</div>
					<div className="col-lg-4 col-md-6 col-sm-12">
						<div className="icon-bx-wraper left m-b30 about-iconbx">
							<div className="icon-bx-sm bg-green radius"> <Link to={"#"} className="icon-cell"><i className="flaticon-bus"></i></Link> </div>
							<TextBlog  title="Strategi Location" />
						</div>
						<div className="icon-bx-wraper left m-b30 about-iconbx">
							<div className="icon-bx-sm bg-orange radius"><Link to={"#"} className="icon-cell"><i className="flaticon-ice-cream"></i></Link> </div>
							<TextBlog  title="Full Day Programs" />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

class AboutUs2 extends Component{
	render(){
		return(
			<Fragment>
				<Header />
				<div className="page-content">
					
					<PageTitle  motherMenu="About Us 2"  activeMenu="About Us 2" />
					
					<div className="content-block">
						{/* Section-1 */}
						<div className="section-full bg-white content-inner-1 about-kids" style={{backgroundImage:"url("+ bnr1 +")", backgroundSize:"contain" ,backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
							<AcademyBlog />
							<div className="childern-box">
								<div className="childern-1"><img src={Children1} alt=""/></div>
								<div className="childern-2"><img src={Children2} alt=""/></div>
							</div>
						</div>							
						<EducationBanner />	
						
						<div className="section-full bg-white content-inner-1" style={{backgroundImage:"url("+ bnr2 +")", backgroundSize:"contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
							<div className="container">
								<div className="section-head text-center">
									<h2 className="head-title text-secondry">About the Teachers</h2>
									<p>We have an excellent teacher to child ratio at our Kindergarten to ensure that each child receives the attention he or she needs</p>
								</div>
								<TeacherSlider />
							</div>
						</div>
						
						<div className="section-full bg-white content-inner-2 about-content bg-img-fix" style={{backgroundImage:"url("+ bnr3 +")"}}>
							<div className="container">
								<div className="row">
									<div className="col-lg-12 col-md-12 col-sm-12 col-12 wow fadeIn about-text" data-wow-delay="0.2s" data-wow-duration="2s" style={{visibility: "visible", animationDuration: "2s", animationDelay: "0.2s", animationName: "fadeIn"}}>
										<div className="section-head text-center">
											<h4 className="text-white">Join Our New Session</h4>
											<h2>Call To Enrol Your Child <br/><span className="text-yellow">222 4444 000</span></h2>
											<Link to={"/about-1"} className="btn btn-md radius-xl">Read More</Link>
										</div>
									</div>
								</div>
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
						{/* Section-5 End*/}
					</div>
				</div>
				<Footer />
			</Fragment>
		)
	}
}
export {AcademyBlog};
export default AboutUs2;