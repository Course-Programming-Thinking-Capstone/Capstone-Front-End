import React from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom';

import test  from './../../images/testimonials/pic4.png';
import quote  from './../../images/quotes.png';


function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div className="owl-nav ">
            <div className="owl-next"  onClick={onClick}>
                <i className="la la-arrow-right" />
            </div>
      </div>	
    );
  }
  
function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
        <div className="owl-nav">
        <div className=" owl-prev " onClick={onClick}>
            <i className="la la-arrow-left" />
        </div>
        </div>
    );
} 

const latestBlog = [
    { image: test  },
    { image: test  },
    { image: test },
]

const settings = {		
    arrows: true,
    slidesToShow: 1,		
    infinite: true,
    autoPlay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    
};

const CenterSliderHome3 = () => {
    return (
        <Slider className="testimonial-carousel owl-carousel owl-theme dots-none sprite-nav owl-btn-center-lr " {...settings}>
            {latestBlog.map((item, index) => (
                <div className="item" key={index}>
                    <div className="testimonial-1">
                        <div className="testimonial-media"> 
                            <img src={item.image} alt="" />
                        </div>
                        <div className="testimonial-inner">
                            <div className="dz-quotes">
                                <img src={quote} alt="" />
                            </div>
                            <div className="testimonial-text">
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
                            </div>
                            <div className="testimonial-detail d-flex align-items-center">
                                <div className="testimonial-profile">
                                    <div className="testimonial-info">
                                        <h5 className="name">John Doe</h5>
                                        <span className="position">Client</span>
                                    </div>
                                </div>
                                <div className="testimonial-marking">
                                    <Link to={"#"}><i className="la la-star"></i></Link>
                                    <Link to={"#"}><i className="la la-star"></i></Link>
                                    <Link to={"#"}><i className="la la-star"></i></Link>
                                    <Link to={"#"}><i className="la la-star"></i></Link>
                                    <Link to={"#"}><i className="la la-star"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>              
            ))}	
        </Slider>
    );
};

export default CenterSliderHome3;