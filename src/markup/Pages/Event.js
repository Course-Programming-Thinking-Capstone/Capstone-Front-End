import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Layout/Header'; 
import Footer from '../Layout/Footer'; 
import PageTitle from '../Layout/PageTitle';
//Images
import large1 from './../../images/blog/large/pic1.jpg';
import large2 from './../../images/blog/large/pic2.jpg';
import large3 from './../../images/blog/large/pic3.jpg';

const eventBlog = [
	{images: large1, date: '05', title: 'Business Conferences 2017',},	
	{images: large2, date: '27', title: '5 Outrageous Ideas For You',},	
	{images: large3, date: '25', title: 'Seven Latest Developments',},	
	{images: large1, date: '03', title: 'Five Mind Numbing Facts About',},	
	{images: large2, date: '19', title: 'Five Ways To Introduce',},	
	{images: large3, date: '17', title: 'Ten Things To Know About',},	
];

class Event extends Component{
	render(){
		return(
			<Fragment>
			<Header />	
			<div className="page-content">
				<PageTitle  motherMenu="Event"  activeMenu="Event" />
				<div className="content-block">
					<div className="section-full bg-white content-inner">
						<div className="container">
							<div className="row">
								{eventBlog.map((item, index)=>(
									<div className="col-lg-6 col-md-6 col-sm-6" key={index}>
										<div className="event-box">
											<div className="event-media">
												<img src={item.images} alt=""/>
											</div>
											<div className="event-info">
												<div className="dlab-post-title">
													<h3 className="post-title"><Link to={"/event-details"}>{item.title}</Link></h3>
												</div>
												<div className="event-meta">
													<ul>
														<li className="post-date"><strong>{item.date}</strong><span>July</span></li>
														<li className="post-author"><i className="fa fa-map-marker"></i> 89 Newyork City.</li>
													</ul>
												</div>
												<div className="dlab-post-text">
												   <p>Lorem ipsum dolor sit amet elit. Cum veritatis sequi nulla nihil, dolor voluptatum nemo adipisci eligendi! Sed nisi perferendis, totam harum dicta.</p>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="row">
								<div className="col-lg-12 col-md-12 col-sm-12">
									<div className="pagination-bx rounded pagination-lg clearfix primary">
										<ul className="pagination justify-content-center">
											<li className="previous"><Link to={'#'}><i className="ti-arrow-left"></i> Prev</Link></li>
											<li className="active"><Link to={'#'}>1</Link></li>
											<li><Link to={'#'}>2</Link></li>
											<li><Link to={'#'}>3</Link></li>
											<li className="next"><Link to={'#'}>Next <i className="ti-arrow-right"></i></Link></li>
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
export default Event;