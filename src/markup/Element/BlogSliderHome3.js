import React from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom';

import pic1  from './../../images/blog/pic1.png';
import pic2  from './../../images/blog/pic2.png';
import pic3  from './../../images/blog/pic3.png';

function SampleNextArrow(props) {
    const { onClick } = props;
    return (
        <div className="owl-nav">
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
      { image: pic1, title:'The Trust About Education Blog is About to be revealed.' },
      { image: pic2, title:'The Biggest contribution of education blog of Humanity.' },
      { image: pic3, title:'Five Reasone Why People like Education Blog' },
      { image: pic2, title:'The Trust About Education Blog is About to be revealed.' },
  ]

const settings = {		
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
const BlogSliderHome3 = () => {
    return (
        <Slider className="blog-carousel2 owl-carousel owl-theme dots-none sprite-nav owl-btn-center-lr " {...settings}>
            {latestBlog.map((item, index) => (
                <div className="item p-4" key={index}>
                    <div className="blog-post blog-grid style-1">
                        <div className="dlab-post-media">
                            <Link to={"/blog-details"}><img src={item.image} alt="" /></Link>
                        </div>
                        <div className="dlab-info">
                            <div className="dlab-post-title">
                                <h4 className="post-title"><Link to={"/blog-details"}>{item.title}</Link></h4>
                            </div>
                            <div className="dlab-post-text">
                                <p>lorem ipsum dolor amet here a was a voluptas recusandae, corporis nec, metus numquam, facilis, nascetur?</p>
                            </div>
                            <div className="dlab-post-readmore"> 
                                <Link to={"/blog-details"}  className="btn-link">Read More</Link>
                            </div>
                        </div>
                    </div>
                </div>                
            ))}	
        </Slider>
    );
};

export default BlogSliderHome3;