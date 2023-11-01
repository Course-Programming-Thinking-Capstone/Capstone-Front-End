import  React,{Fragment,useRef} from 'react';
import emailjs from '@emailjs/browser';
import {Link} from 'react-router-dom';

//Comp--
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';

const Contact = () => {
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
					<PageTitle motherMenu="Contact Us" activeMenu="Contact Us" />
					<div className="content-block">
						<div className="section-full bg-white">
							<div className="container">
								<div className="row align-items-center content-inner">
									<div className="col-lg-4 col-md-4 col-sm-6">
										<div className="icon-bx-wraper m-b30 left">
											<div className="icon-md m-b20 m-t5">
												<Link to={"#"} className="icon-cell text-blue">
													<i className="ti-headphone-alt"></i>
												</Link>
											</div>
											<div className="icon-content">
												<h4 className="dlab-tilte m-b5">Phone</h4>
												<p>Phone 01:(+032) 3456 7890 <br/> Phone 02: (+032) 3427 7670</p>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-sm-6">
										<div className="icon-bx-wraper m-b30 left">
											<div className="icon-md m-b20 m-t5">
												<Link to={"#"} className="icon-cell text-green">
													<i className="ti-location-pin"></i>
												</Link>
											</div>
											<div className="icon-content">
												<h4 className="dlab-tilte m-b5">Address</h4>
												<p>Spring Store London Oxford Street, 012 United Kingdom</p>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-4 col-sm-12">
										<div className="icon-bx-wraper m-b30 left">
											<div className="icon-md m-b20 m-t5">
												<Link to={"#"} className="icon-cell text-orange">
													<i className="ti-email"></i>
												</Link>
											</div>
											<div className="icon-content">
												<h4 className="dlab-tilte m-b5">Email</h4>
												<p>Example@msimple.net <br/> Info@Simplenet.net</p>
											</div>
										</div>
									</div>
								</div>
								<div className="row content-inner-4">
									<div className="banner-map col-md-12">										
										<iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.3825624477!2d75.65046970649679!3d26.88544791796718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C+Rajasthan!5e0!3m2!1sen!2sin!4v1500819483219" 
											className="align-self-stretch rounded-sm border-0" style={{width:"100%", height:"600px", }} allowfullscreen 
										/>
									</div>
								</div>
								<div className="row contact-box content-inner-5">
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
													<input name="dzName" type="text" required className="form-control" placeholder="Enter your name" />
												</div>
											</div>
											<div className="col-md-4 col-sm-4">
												<div className="form-group">
													<input name="dzEmail" type="email" className="form-control" required  placeholder="Your Email Address" />
												</div>
											</div>
											<div className="col-md-4 col-sm-4">
												<div className="form-group">
													<input name="dzOther[Phone]" type="text" required className="form-control" placeholder="Phone" />
												</div>
											</div>
											<div className="col-md-12 col-sm-12">
												<div className="form-group">
													<textarea name="dzMessage" rows="4" className="form-control" required placeholder="Your message here"></textarea>
												</div>
											</div>
											<div className="col-md-12 col-sm-12">
												<div className="form-group">
													<div className="g-recaptcha" data-sitekey="6LefsVUUAAAAADBPsLZzsNnETChealv6PYGzv3ZN" data-callback="verifyRecaptchaCallback" data-expired-callback="expiredRecaptchaCallback"></div>
													<input className="form-control d-none" style={{display:"none"}} data-recaptcha="true" required data-error="Please complete the Captcha" / >
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
export default Contact;