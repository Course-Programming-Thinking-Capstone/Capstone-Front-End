import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Slider from "react-slick";	


//Images
import  bnr1 from './../../images/main-slider/slide1.jpg';
import  bnr2 from './../../images/main-slider/slide2.jpg';
import  bnr3 from './../../images/main-slider/slide3.jpg';


const carouselBlog = [
	{image: bnr2 },	
	{image: bnr3 },	
	{image: bnr1 },	
];

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div className="owl-nav home-banner-nav">
            <div className="owl-next"  onClick={onClick}>
                <i className="la la-arrow-right" />
            </div>
      </div>	
    );
}
  
function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="owl-nav home-banner-nav">
        <div className=" owl-prev " style={{zIndex:1}} onClick={onClick}>
            <i className="la la-arrow-left" />
        </div>
      </div>
    );
}

const settings = {		
    arrows: true,
    slidesToShow: 1,		
    infinite: true,
    autoPlay: true,
	fade: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    
};

class BannerSlider2 extends Component{			
	render(){
		return(
			<>				
				<Slider className="owl-slider owl-carousel owl-theme owl-btn-center-lr dots-none" {...settings}>
					{carouselBlog.map((item, index) => (
						<div className="item" key={index}>
							<div className="slide-item">
								<div className="slide-item-img"><img src={item.image}  alt="" width="100%" /></div>
								<div className="slide-content">
									<div className="slide-content-box container">
										<div className="slide-content-area">
											<h2 className="slider-title">Children Academy <span>First ReseaArchers</span></h2>
											<p>Children's Academy will provide a stimulating and safe environment for children ages three month</p>
											<Link to={"/contect-us"} className="btn btn-md kids-btn radius-xl">Join us</Link>
										</div>
									</div>
								</div>	
							</div>	
						</div>              
					))}	
				</Slider>
			</>
		)
	}
}

export default BannerSlider2;