import React,{Component} from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom';
import grid1 from './../../images/blog/grid/pic1.jpg';
import grid2 from './../../images/blog/grid/pic2.jpg';
import grid3 from './../../images/blog/grid/pic3.jpg';
import classes from './../../images/classes/codingClass.png';


function SampleNextArrow(props) {
  const { onClick } = props;
  return (
  	<div className="owl-nav home-banner-nav2">
		<div className="owl-next"  onClick={onClick}/>
	</div>	
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
	<div className="owl-nav home-banner-nav2">
		<div className=" owl-prev " onClick={onClick}/>
	</div>
  );
} 

const latestBlog = [
	{ image: grid1,	 },
	{ image: grid2,	 },
	{ image: grid3,	 },
	{ image: grid2,	 },
]
class FromSlider extends Component{	
	render(){
		var settings = {		
			arrows: true,
            slidesToShow: 3,			
            infinite: true,
			autoPlay: true,
			nextArrow: <SampleNextArrow />,
			prevArrow: <SamplePrevArrow />,
			responsive: [
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 3,
				  }
				},
				{
				  breakpoint: 991,
				  settings: {
					slidesToShow: 2,
				  }
				},
				{
				  breakpoint: 576,
				  settings: {
					slidesToShow: 1,
				  }
				}
			]
        };
		return(
			<Slider className="blog-carousel owl-carousel owl-theme dots-none sprite-nav owl-btn-center-lr " {...settings}>
				{latestBlog.map((item, index) => (
					<div className="item p-3 wow bounceInUp" data-wow-duration="2s" data-wow-delay="0.2s" key={index}>
						<div className="blog-post blog-grid ">
							<div className="dlab-post-media frame-box">
								<Link to={"/blog-details"}><img src={classes} alt="" /></Link>
							</div>
							<div className="dlab-info">
								<div className="dlab-post-title">
									<h4 className="post-title"><Link to={"/blog-details"}>The Biggest Contribution Of Education Blog To Humanity.</Link></h4>
								</div>
								<div className="dlab-post-text">
								   <p>Separation Tips You and your child are about to have an amazing and fun...</p>
								</div>
								<div className="dlab-post-readmore"> 
									<Link to={"/blog-details"} title="READ MORE" rel="bookmark" className="btn-link">Read More</Link>
								</div>
							</div>
						</div>
					</div>
				))}	
			</Slider>				
		)
	}
}
export default FromSlider;