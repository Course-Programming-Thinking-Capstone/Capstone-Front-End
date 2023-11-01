import React,{Fragment, useRef} from 'react';
import emailjs from '@emailjs/browser';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
//import {InputBlog} from './TeachersDetail';
import AccordionBlog2 from '../Element/AccordionBlog2';
import AccordionBlog3 from '../Element/AccordionBlog3';
//Images
import bnr1 from './../../images/line2.png';

const Faqs = () =>{
	const form = useRef();
	const sendEmail = (e) => {
		e.preventDefault();		
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
					<PageTitle motherMenu="Faq's" activeMenu="Faq's" />
					<div className="content-block">
						<div className="section-full bg-white content-inner-1 about-area" style={{backgroundImage:"url("+ bnr1 +")", backgroundSize:"contain", backgroundRepeat: "no-repeat",backgroundPosition: "center"}}>
							<div className="container">
								<div className="section-head text-center">
									<h2 className="head-title text-secondry">General Questions</h2>
									<p>The concept of school and pre-school education consists of 3 programs of development and training in our academy.</p>
								</div>
								<div className="row">
									<div className="col-lg-6 col-md-6 col-sm-12">
										<div className="m-b10">
											<AccordionBlog2 />	
										</div>
									</div>
									<div className="col-lg-6 col-md-6 col-sm-12 teacher-content">
										<div className="m-b10">
											<AccordionBlog3 />
										</div>	
									</div>
								</div>
							</div>
						</div>	
						<div className="section-full bg-white content-inner-2 about-area" style={{backgroundImage:"url("+ bnr1 +")", backgroundSize:"contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
							<div className="container">
								<div className="contact-box">
									<div className="section-head text-center col-md-12">
										<h2 className="text-secondry">Ask Questions?</h2>
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
													<input className="form-control d-none" style={{display:"none"}} data-recaptcha="true" required="required" data-error="Please complete the Captcha" />
												</div>
											</div>
											<div className="col-md-12 col-sm-12 text-center">
												<button name="submit" type="submit" defaultValue="Submit" className="btn radius-xl btn-lg">Send Message<span></span></button> 
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
export default Faqs;