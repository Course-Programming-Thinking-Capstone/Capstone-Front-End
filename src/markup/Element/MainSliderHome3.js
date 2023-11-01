import React from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom';


//Images
import profile1 from './../../images/profile1.png';
import profile2 from './../../images/profile2.png';
import profile3 from './../../images/profile3.png';
import sun from './../../images/sun.png';
import star from './../../images/star.png';
import banner4 from './../../images/banner4.png';
import banner3 from './../../images/main-slider/slide3.jpg';
import banner1 from './../../images/main-slider/slide1.jpg';

const sliderBlog = [
    {image:banner4},
    {image:banner3},
    {image:banner1},
];

const settings = {		
    arrows: true,
    slidesToShow: 1,		
    fade: true,
    infinite: true,
    autoPlay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    
};



function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div className="owl-nav">
            <div className="owl-next" onClick={onClick}>
                <i className="la la-arrow-right" />
            </div>
      </div>	
    );
  }
  
  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className="owl-nav">
        <div className=" owl-prev "  style={{zIndex:1 }} onClick={onClick}>
            <i className="la la-arrow-left" />
        </div>
      </div>
    );
  } 


const MainSliderHome3 = ({openModal}) => {
    return (
        <>
            <Slider className="owl-slider owl-carousel owl-theme owl-btn-center-lr dots-none banner-slider " {...settings}>
                {sliderBlog.map((item, index) => (
                    <div className="item slide-item" key={index}>
                        <div className="slide-item-img"><img src={item.image} alt="" className='w-100'/></div>
                        <div className="slide-content">
                            <div className="slide-content-box container">
                                <div className="slide-content-area">
                                    <h2 className="slider-title">Children Academy First Researchers</h2>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                    <div className="dz-banner-buttons d-flex align-items-center">	
                                        <Link to={"/contect-us"} className="btn btn-md kids-btn radius-xl style-1">Join us</Link>
                                        <Link to={"#"} className="video-btn style-1 popup-youtube d-flex align-items-center" 
                                            onClick={()=> openModal(true)}
                                        >
                                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="24" cy="24" r="24" fill="#245550"></circle>
                                                <g clipPath="url(#clip0_16_95)">
                                                    <path 
                                                        d="M33.641 23.2152L19.241 15.1152C18.962 14.9586 18.6218 14.9622 18.3464 15.1224C18.0692 15.2844 17.9 15.5796 17.9 15.9V32.1C17.9 32.4204 18.0692 32.7156 18.3464 32.8776C18.4868 32.9586 18.6434 33 18.8 33C18.9512 33 19.1042 32.9622 19.241 32.8848L33.641 24.7848C33.9236 24.6246 34.1 24.3258 34.1 24C34.1 23.6742 33.9236 23.3754 33.641 23.2152V23.2152Z" fill="#E9FCE9"
                                                    >
                                                    </path>
                                                </g>
                                                <defs>
                                                <clipPath id="clip0_16_95">
                                                <rect width="18" height="18" fill="white" transform="translate(17 15)"></rect>
                                                </clipPath>
                                                </defs>
                                            </svg><span>Watch Video</span>
                                        </Link>
                                    </div>
                                    <div className="dz-parents-profile d-flex align-items-center">
                                        <div className="dz-profile-media"><Link to={"#"} className="dz-image"><img src={profile1} alt="profile1" /></Link></div>
                                        <div className="dz-profile-media"><Link to={"#"} className="dz-image"><img src={profile2} alt="profile2" /></Link></div>
                                        <div className="dz-profile-media"><Link to={"#"} className="dz-image"><img src={profile3} alt="profile3" /></Link></div>
                                        <span>20K+ Supportive Parents</span>
                                    </div>
                                </div>
                            </div>
                            <img src={sun} className="background-img rotate-360" alt="" />
                            <img src={star} className="background-img2 rotate-360" alt="" />
                        </div>
                    </div>                 
                ))}	
            </Slider>
            
        </>
    );
};

export default MainSliderHome3;