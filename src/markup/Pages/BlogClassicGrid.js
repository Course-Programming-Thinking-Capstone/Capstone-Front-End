import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';

//images
import grid4 from './../../images/blog/grid/pic4.jpg'; 
import grid5 from './../../images/blog/grid/pic5.jpg'; 
import grid6 from './../../images/blog/grid/pic6.jpg'; 
import grid7 from './../../images/blog/grid/pic7.jpg'; 
import grid8 from './../../images/blog/grid/pic8.jpg'; 
import grid9 from './../../images/blog/grid/pic9.jpg'; 

const postgridBlog=[
	{image: grid9, title: 'Why is Early Education Essential?' },	
	{image: grid8, title: 'The Shocking Revelation of Education.' },	
	{image: grid7, title: 'Five Things Nobody Told You About' },	
	{image: grid4, title: 'Here is What People Are Saying About' },	
	{image: grid5, title: 'Seven Things You Probably Did not Know About' },	
	{image: grid6, title: 'Why is Early Education Essential?' },	
];
	
// Masonry section


class BlogClassicGrid extends Component{
	render(){
		return(
			<Fragment>
				<Header />
					<div className="page-content">
						<PageTitle  motherMenu="Blog Classic Grid"  activeMenu="Blog Classic Grid" />
						<div className="content-block">							
							<div className="section-full content-inner">
								<div className="container">
									<div className="dlab-blog-grid-3 " id="masonry">
										<ResponsiveMasonry
											columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
										>
											<Masonry												
												gutter={"25px"}
												
											>
												{postgridBlog.map((data,index)=>(
													<div className="card-container"  key={index}>
														<div className="blog-post blog-grid style-2">
															<div className="dlab-post-media">
																<Link to={"/blog-details"}><img src={data.image} alt="" /></Link>
															</div>
															<div className="dlab-info">
																<div className="dlab-post-title ">
																	<h5 className="post-title"><Link to={"/blog-details"}>{data.title}</Link></h5>
																</div>
																<div className="dlab-post-meta">
																	<ul className="align-items-center">
																		<li className="post-date"><i className="fa fa-calendar"></i><strong>10 Aug</strong> <span>2016</span></li>
																		<li className="post-author"><i className="fa fa-user"></i>By <Link to={"/blog-details"}>Jone</Link></li>
																	</ul>
																</div>
																<div className="dlab-post-text">
																	<p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks.</p>
																</div>
																<div className="dlab-post-readmore blog-share"> 
																	<Link to={"/blog-details"} title="READ MORE" rel="bookmark" className="btn black">READ MORE</Link>
																</div>
															</div>
														</div>
													</div>
												))}
											</Masonry>		
										</ResponsiveMasonry>
									</div>
									{/*  Pagination  */}
									<div className="row">
										<div className="col-lg-12 col-md-12 col-sm-12 " >
											<div className="pagination-bx rounded pagination-lg clearfix primary">
												<ul className="pagination justify-content-center">
													<li className="previous"><Link to={"#"}><i className="ti-arrow-left"></i> Prev</Link></li>
													<li className="active"><Link to={"#"}>1</Link></li>
													<li><Link to={"#"}>2</Link></li>
													<li><Link to={"#"}>3</Link></li>
													<li className="next"><Link to={"#"}>Next <i className="ti-arrow-right"></i></Link></li>
												</ul>
											</div>
										</div>
									</div>									
								</div>
							</div>
							{/* blog grid  End*/}
						</div>
					</div>
				<Footer />
			</Fragment>
		)
	}
}
export default BlogClassicGrid;