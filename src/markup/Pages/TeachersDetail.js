import React,{Fragment,useRef} from 'react';
import emailjs from '@emailjs/browser';
import {Link} from 'react-router-dom';

//Component
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
import VideoPopup from '../Element/VideoPopup';
//Images
import bnr1 from './../../images/line2.png';
import bnr2 from './../../images/background/bg4.jpg';
import team1 from './../../images/team/pic1.jpg';

const TeachersDetail = () =>{
	const form = useRef();
	const sendEmail = (e) => {
		e.preventDefault();
		//emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
		emailjs.sendForm('service_zubfdvh', 'template_iy1pb0b', e.target, 'user_FvNIKVJ7om2PphifhzMm2')
		  .then((result) => {
			  console.log(result.text);
		  }, (error) => {
			  console.log(error.text);
		  });
		  e.target.reset()
	 };
	
	return(
		<Fragment>
			<Header />
				<div className="page-content">
					<PageTitle motherMenu="Teachers Details" activeMenu="Teachers Details" />
					<div className="content-block">
						<div className="section-full bg-white content-inner-2 teacher-info" style={{backgroundImage:"url("+ bnr1 +")", backgroundSize:"contain",backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
							<div className="container">
								<div className="row">
									<div className="col-lg-6 col-md-12 col-sm-12 m-b15">
										<div className="teacher-meida">
											<img src={team1} alt=""/>
										</div>
									</div>
									<div className="col-lg-6 col-md-12 col-sm-12 teacher-content align-self-center">
										<h2 className="teacher-title">Jone Doe</h2>
										<span className="teacher-coures">English</span>
										<p className="m-b15">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn.</p>
										<p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
										<ul className="list-inline">
											<li><Link to={"#"} ><i className="fa fa-facebook"></i></Link></li>
											<li><Link to={"#"} ><i className="fa fa-google-plus"></i></Link></li>
											<li><Link to={"#"} ><i className="fa fa-linkedin"></i></Link></li>
											<li><Link to={"#"} ><i className="fa fa-instagram"></i></Link></li>
											<li><Link to={"#"} ><i className="fa fa-twitter"></i></Link></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="section-full bg-white content-inner-2 about-content bg-img-fix" style={{backgroundImage:"url("+ bnr2 +")"}}>
							<div className="container">
								<div className="row">
									<div className="col-lg-12 col-md-12 col-sm-12 col-12 " style={{visibility: "visible", animationDuration: "2s", animationDelay: "0.2s", animationName: "fadeIn"}}>
										<div className="section-head text-center gallery-mpg">
											<div className="video-play">
												<VideoPopup />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="section-full content-inner-2">
							<div className="container">
								<div className="row">
									<div className="col-lg-6 section-head">
										<h2 className="text-secondry">My Skills</h2>
										<p className="m-b0">Suspendisse facilisis commodo lobortis. Nullam mollis lobortis ex vel faucibus. Proin nec viverra turpis. Nulla eget justo scelerisque, pretium purus vel, congue libero. Suspendisse potenti. Sed risus nisi  Suspendisse potenti. Sed risus nisi  Suspendisse potenti. Sed risus nisi </p>
									</div>
									<div className="col-lg-6">
										<div className="progress-section">
											<div className="progress-bx">
												<h6 className="title">2D Drawings</h6>
												<div className="count-box">93%</div>
												<div className="progress">
													<div className="progress-bar bg-blue" style={{width:"93%"}} ></div>
												</div>
											</div>
											<div className="progress-bx">
												<h6 className="title">3D Modeling</h6>
												<div className="count-box">70%</div>
												<div className="progress">
													<div className="progress-bar bg-green" style={{width:"70%"}} ></div>
												</div>
											</div>
											<div className="progress-bx">
												<h6 className="title">Moodboard</h6>
												<div className="count-box">48%</div>
												<div className="progress">
													<div className="progress-bar bg-orange" style={{width:"48%"}} ></div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row contact-box">
									<div className="section-head text-center col-md-12">
										<h2 className="text-secondry">Contact Me</h2>
										<p className="m-b0">Meh synth Schlitz, tempor duis single-origin coffee ea next level ethnic fingerstache fanny pack nostrud. Photo booth anim 8</p>
									</div>
									<div className="dzFormMsg"></div>
									<form method="post" className="dzForm col-md-12" ref={form} onSubmit={sendEmail}>
										<input type="hidden" value="Contact" name="dzToDo" />
										<div className="row">
											<div className="col-md-4 col-sm-4">
												<div className="form-group">
													<input name="name" type="text" required="required" className="form-control" placeholder="Enter your name" />
												</div>
											</div>
											<div className="col-md-4 col-sm-4">
												<div className="form-group">
													<input name="dzEmail" type="email" className="form-control" required="required"  placeholder="Your Email Address" />
												</div>
											</div>
											<div className="col-md-4 col-sm-4">
												<div className="form-group">
													<input name="dzOther[Phone]" type="text" required="required" className="form-control" placeholder="Phone" />
												</div>
											</div>
											<div className="col-md-12 col-sm-12">
												<div className="form-group">
													<textarea name="dzMessage" rows="4" className="form-control" required="required" placeholder="Your message here"></textarea>
												</div>
											</div>
											<div className="col-md-12 col-sm-12">
												<div className="form-group">
													<div className="g-recaptcha" data-sitekey="6LefsVUUAAAAADBPsLZzsNnETChealv6PYGzv3ZN" data-callback="verifyRecaptchaCallback" data-expired-callback="expiredRecaptchaCallback"></div>
													<input className="form-control d-none" style={{display:"none"}} data-recaptcha="true" data-error="Please complete the Captcha" />
												</div>
											</div>
											<div className="col-md-12 col-sm-12 text-center">
												<button name="submit" type="submit" value="Submit" className="btn radius-xl btn-lg">Send Message<span></span></button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			<Footer />
		</Fragment>
	)
}

function InputBlog(){
	return(
		<>
			<div className="col-md-4 col-sm-4">
				<div className="form-group">
					<input name="dzName" type="text" required="required" className="form-control" placeholder="Enter your name" />
				</div>
			</div>
			<div className="col-md-4 col-sm-4">
				<div className="form-group">
					<input name="dzEmail" type="email" className="form-control" required="required"  placeholder="Your Email Address" />
				</div>
			</div>
			<div className="col-md-4 col-sm-4">
				<div className="form-group">
					<input name="dzOther[Phone]" type="text" required="required" className="form-control" placeholder="Phone" />
				</div>
			</div>
			<div className="col-md-12 col-sm-12">
				<div className="form-group">
					<textarea name="dzMessage" rows="4" className="form-control" required="required" placeholder="Your message here"></textarea>
				</div>
			</div>
		</>
	)
}
export {InputBlog};
export default TeachersDetail;