import React,{Fragment,Component} from 'react';
import {Link} from 'react-router-dom';
import LightGallery from 'lightgallery/react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
import ClassDetailContent from '../Element/ClassDetailContent';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

//images
import bnr1 from './../../images/line2.png';
import recent1 from './../../images/blog/recent-blog/pic1.jpg';
import recent2 from './../../images/blog/recent-blog/pic2.jpg';
import gallery1 from './../../images/gallery/pic1.jpg';
import gallery2 from './../../images/gallery/pic2.jpg';
import gallery3 from './../../images/gallery/pic3.jpg';
import gallery4 from './../../images/gallery/pic4.jpg';
import gallery5 from './../../images/gallery/pic5.jpg';
import gallery7 from './../../images/gallery/pic7.jpg';
import gallery8 from './../../images/gallery/pic8.jpg';
import gallery9 from './../../images/gallery/pic9.jpg';

function PostMedia(){
	return(
		<>
			<div className="dlab-post-meta">
				<ul>
					<li className="post-author">By Jone</li>
					<li className="post-comment"><i className="fa fa-comments"></i> 28</li>
				</ul>
			</div>	
				
		</>
	)
}
function LightGalleryBlog(){
	const onInit = () => {
        
    };
	return(
		<>
			<LightGallery
                onInit={onInit}
                speed={500}
				
                plugins={[lgThumbnail, lgZoom]}
            >			
				{galleryBlog.map((data,index)=>(
					<li key={index} data-src={data.image}>
						<span className="check-km"><img src={data.image} alt="" /></span>
					</li>
				))}
			</LightGallery>
			
		</>
	)
}
const galleryBlog=[
	{image: gallery1 ,},	
	{image: gallery5 ,},	
	{image: gallery7 ,},	
	{image: gallery8 ,},	
	{image: gallery2 ,},	
	{image: gallery3 ,},	
	{image: gallery4 ,},	
	{image: gallery9 ,},
];

class ClassesDetail extends Component{
	render(){
		return(
			<Fragment>	
				<Header />
				<div className="page-content">
					<PageTitle motherMenu="Classes Detail" activeMenu="Classes Detail" />
					<div className="content-block">
						<div className="section-full bg-white content-inner" style={{backgroundImage:"url("+ bnr1 +")", backgroundSize:"contain",backgroundRepeat: "no-repeat",backgroundPosition: "center"}}>
							<div className="container">
								<div className="row">
									<div className="col-lg-8 col-md-12 col-sm-12 m-b15">
										<ClassDetailContent />
									</div>
									<div className="col-lg-4 col-md-12 col-sm-12">
										<div className="widget">
											<h5 className="widget-title">Search</h5>
											<div className="search-bx style-1">
												<form role="search" method="post">
													<div className="input-group">
														<input name="text" className="form-control" placeholder="Enter your keywords..." type="text" />
														<span className="input-group-btn">
															<button type="submit" className="fa fa-search text-primary"></button>
														</span> 
													</div>
												</form>
											</div>
										</div>
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
										</div>
										<div className="widget recent-posts-entry">
											<h5 className="widget-title">Recent Posts</h5>
											<div className="widget-post-bx">
												<div className="widget-post clearfix">
													<div className="dlab-post-media"> <img src={recent1} width="200" height="143" alt="" /> </div>
													<div className="dlab-post-info">
														<div className="dlab-post-header">
															<h6 className="post-title"><Link to={"/blog-details"}>Reasons Why You Cannot Learn Kids Education Well.</Link></h6>
														</div>
														<PostMedia />
													</div>
												</div>
												<div className="widget-post clearfix">
													<div className="dlab-post-media"> <img src={recent2} width="200" height="143" alt="" /> </div>
													<div className="dlab-post-info">
														<div className="dlab-post-header">
															<h6 className="post-title"><Link to={"/blog-details"}>Small But Important Things To Observe In Kids.</Link></h6>
														</div>
														<PostMedia />
													</div>
												</div>
											</div>
										</div>
										<div className="widget widget_gallery gallery-grid-4">
											<h5 className="widget-title">Our services</h5>
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

export {LightGalleryBlog}
export default ClassesDetail;