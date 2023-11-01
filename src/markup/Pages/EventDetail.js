import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Layout/Header'; 
import Footer from '../Layout/Footer'; 
import PageTitle from '../Layout/PageTitle';
import {LightGalleryBlog} from './ClassesDetail';
//images
import bnr1 from './../../images/line2.png';
import large1 from './../../images/blog/large/pic-large.jpg';
import recent2 from './../../images/blog/recent-blog/pic2.jpg';
import recent3 from './../../images/blog/recent-blog/pic3.jpg';

class EventDetail extends Component{
	render(){
		return(
			<Fragment>
			<Header />	
			<div className="page-content">
				<PageTitle  motherMenu="Event"  activeMenu="Event" />
					<div className="content-block">
						<div className="section-full bg-white content-inner" style={{backgroundImage:"url(" + bnr1 + ")", backgroundSize:"contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
							<div className="container">
								<div className="row">
									<div className="col-md-12">
										<div className="class-media m-b50">
											<img src={large1} alt=""/>
										</div>
									</div>
									<div className="col-lg-8 col-md-12 col-sm-12 m-b30">
										<div className="classes-details">
											<div className="class-info">
												<div className="dlab-post-title ">
													<h2 className="post-title m-t0"><Link to={"/event"}>Asertivelly recaptiualize best profesionally</Link></h2>
												</div>
												<div className="dlab-post-meta m-b20">
													<ul className="d-flex align-items-center">
														<li className="post-date"> <i className="la la-calendar-o"></i><strong>10 Aug</strong> <span> 2016</span> </li>
														<li className="post-author"><i className="la la-user"></i>By <Link to={"/event"}>demongo</Link> </li>
														<li className="post-comment"><i className="la la-comment"></i> <Link to={"/event"}>0 Comments</Link> </li>
													</ul>
												</div>
												<div className="dlab-post-text">
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting  printer a galley Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard text ever since the.</p>
														
													<blockquote>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Has been the industry's standard text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimencenturies.</blockquote>
														
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen It has urvived not only five centuries, but also the leap into electronic typesetting.</p>
													<h4>Funny Kids</h4>	
													<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.</p>
												</div>
												<div className="dlab-post-tags clear">
													<div className="post-tags"> 
														<Link className="me-1" to={"#"}>Child </Link> 
														<Link className="me-1" to={"#"}>Eduction </Link> 
														<Link className="me-1" to={"#"}>Money </Link> 
														<Link className="me-1" to={"#"}>Resturent </Link> 
														<Link className="me-1" to={"#"}>Child </Link> 
														<Link className="me-1" to={"#"}>Eduction </Link> 
														<Link className="me-1" to={"#"}>Money </Link> 
														<Link className="" to={"#"}>Resturent </Link> 
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-4 col-md-12 col-sm-12">
										<div className="details-tbl widget">
											<ul className="class-details">
												<li>
													<div className="name"><i className="la la-clock-o"></i>Date</div>
													<div className="info">24 March 2017</div>
												</li>
												<li>
													<div className="name"><i className="la la-hourglass"></i>Time</div>
													<div className="info">5 Hours/6 Days</div>
												</li>
												<li>
													<div className="name"><i className="la la-history"></i>Venue</div>
													<div className="info">Greenville Avenue California, TX 70240 USA View On Map</div>
												</li>
											</ul>
										</div>
										<div className="widget recent-posts-entry">
											<h5 className="widget-title">Upcoming Event</h5>
											<div className="widget-post-bx">
												<div className="widget-post clearfix">
													<div className="dlab-post-media"> <img src={recent3} width="200" height="143" alt="" /> </div>
													<div className="dlab-post-info">
														<div className="dlab-post-header">
															<h6 className="post-title"><Link to={"/event"}>Reasons Why You Cannot Learn Kids Education Well.</Link></h6>
														</div>
														<div className="dlab-post-meta">
															<ul>
																<li className="post-author">By Jone</li>
																<li className="post-comment"><i className="fa fa-comments"></i> 28</li>
															</ul>
														</div>
													</div>
												</div>
												<div className="widget-post clearfix">
													<div className="dlab-post-media"> <img src={recent2} width="200" height="143" alt="" /> </div>
													<div className="dlab-post-info">
														<div className="dlab-post-header">
															<h6 className="post-title"><Link to={"/event"}>Small But Important Things To Observe In Kids.</Link></h6>
														</div>
														<div className="dlab-post-meta">
															<ul>
																<li className="post-author">By Jone</li>
																<li className="post-comment"><i className="fa fa-comments"></i> 28</li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="widget widget_gallery gallery-grid-4">
											<h5 className="widget-title">Event Gallery</h5>
											<ul id="lightgallery">
												<LightGalleryBlog />
											</ul>
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
}
export default EventDetail;