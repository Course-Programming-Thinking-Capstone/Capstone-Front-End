import React,{Component} from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom';
import pic1 from './../../images/classes/pic1.jpg';
import pic2 from './../../images/classes/pic2.jpg';
import pic3 from './../../images/classes/pic3.jpg';


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
	{ image: pic1,	 },
	{ image: pic2,	 },
	{ image: pic3,	 },
	{ image: pic1,	 },
]
class ClassesSlider extends Component{	
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
					<div className="item p-2" key={index}>
						<div className="class-item">
							<div className="class-media"> 
								<img src={item.image} alt="" />
								<p>
									<span>Class Time:</span> 
									08:00 am - 10:00 am
								</p>
							</div>
							<div className="class-info">
								<h4><Link to={"/classes-details"}>Art Drawing Classes</Link></h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla felis ipsum.</p>
								<ul className="schedule">
									<li className="bg-blue class-size"><span>Class Size</span> <span>30 - 40</span> </li>
									<li className="bg-green years-old"><span>Years Old</span> <span>5 - 6</span> </li>
									<li className="bg-orange tution"><span>Tution Fee</span> <span>$1500</span> </li>
								</ul>
							</div>
						</div>
					</div>
				))}	
			</Slider>				
		)
	}
}
export default ClassesSlider;