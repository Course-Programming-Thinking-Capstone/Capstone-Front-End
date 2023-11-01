import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import CountUp from 'react-countup';
import ModalVideo from 'react-modal-video'

// component
import Header from '../Layout/Header';
import Footer2 from '../Layout/Footer2';
import MainSliderHome3 from '../Element/MainSliderHome3';
import GalleryHome3 from '../Element/GalleryHome3';

//Images
import cloud from './../../images/icon/cloud.png';
import pattern from './../../images/shape/bg-pattren1.jpg';
import star1 from './../../images/icon/star1.png';
import star2 from './../../images/icon/star2.png';
import star3 from './../../images/icon/star3.png';
import star4 from './../../images/icon/star4.png';
import icon1 from './../../images/icon/icon1.png';
import icon2 from './../../images/icon/icon2.png';
import icon3 from './../../images/icon/icon3.png';
import icon4 from './../../images/icon/icon4.png';
import bird from './../../images/about/bird.png';
import abouticon2 from './../../images/about/icon2.png';
import abouticon1 from './../../images/about/icon1.png';
import iconbg1 from './../../images/about/icon-bg1.png';
import iconbg2 from './../../images/about/icon-bg2.png';
import wellbg from './../../images/background/wall-bg.png';
import iconwell from './../../images/background/icons-wall.png';
import cycle from './../../images/cycle.png';
import imgcloud from './../../images/cloud.png';
import imgcloud2 from './../../images/cloud2.png';
import chopper from './../../images/chopper.png';
import backwhite from './../../images/back-white.png';
import backpink from './../../images/back-pink.png';
import backgreen from './../../images/back-green.png';
import backred from './../../images/back-red.png';
import  team1 from './../../images/team/pic1.png';
import  team2 from './../../images/team/pic2.png';
import  team3 from './../../images/team/pic3.png';
import  team4 from './../../images/team/pic4.png';
import BlogSliderHome3 from '../Element/BlogSliderHome3';
import CenterSliderHome3 from '../Element/CenterSliderHome3';

const counterBlog = [
    {title:'Success Stories', number:'8', label:'K+'},
    {title:'Expert Instructor', number:'200', label:'+'},
    {title:'Worldwide Students', number:'108', label:'K+'},
    {title:'Trendy Subjects', number:'310', label:'+'},
    
];
const iconBoxBlog = [
    {image: star1, image2:icon1, title:'To Think Creatively ', title2:'and Create'},
    {image: star2, image2:icon2, title:'To Feel Fne and to ', title2:'Understand Emotions'},
    {image: star3, image2:icon3, title:'To be Independent ', title2:'and Active'},
    {image: star4, image2:icon4, title:'To Apply', title2:'Knowledge in Life'},
];

const teacherBlog = [
    {name:'Kate Doe', image1:backwhite, image2:team1},
    {name:'Jone Doe', image1:backpink, image2:team2},
    {name:'Manie Doe', image1:backgreen, image2:team3},
    {name:'Jennie Doe', image1:backred, image2:team4},
];

// `url(${Background})`

const Index3 = () => {
    const [isOpen, setOpen] = useState(false)
    useEffect(() => {
        document.body.setAttribute('data-theme-color', 'color_2')        
    }, [])
    return (
        <>
            <div className='data-typography-1'>
                <Header />
                    <div className="page-content bg-white style-1">
                        <div className="main-slider">
			                <div className="banner-inner">
                                <MainSliderHome3 openModal={setOpen}/>
                            </div>
                        </div>    
                        <div className="banner-counter" style={{backgroundImage:`url(${pattern})`, backgroundSize:"cover"}}>
                            <div className="container">
                                <div className="row align-items-center banner-counter-inner">
                                    {counterBlog.map((item, ind)=>(
                                        <div className="col-md-3 col-6 m-b10 dz-line" key={ind}>
                                            <div className="dz-counter-box">
                                                <h4 className="dz-numbers"><CountUp end={item.number} />{item.label}</h4>
                                                <h6 className="dz-names">{item.title}</h6>
                                            </div>
                                        </div>
                                    ))}                                
                                </div>
                            </div>
                        </div>
                        <div className="content-block">
                            <div className="section-full bg-white content-inner-2 text-center about-us">
                                <img src={cloud} className="background-img slideskew" alt="" />                       
                                <div className="container">
                                    <div className="section-head style-1">
                                        <h2 className="head-title text-secondry">Welcome to  Kids Center</h2>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                    </div>
                                    <div className="row">
                                        {iconBoxBlog.map((item, index)=>(
                                            <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={index}>
                                                <div className="icon-bx-wraper sr-iconbox m-b20 style-1">
                                                    <div className="dz-icon-bg m-b10" style={{ backgroundImage:`url(${item.image})`,
                                                        backgroundPosition:"center",backgroundRepeat: "no-repeat", backgroundSize:"contain"}}
                                                    >
                                                        <div className="icon-lg">
                                                            <Link to={"#"} className="icon-cell"><img src={item.image2} className="slideskew-1" alt="" /></Link>
                                                        </div>
                                                    </div>
                                                    <div className="icon-content">
                                                        <h6 className="dlab-tilte">{item.title} <br/> {item.title2}</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}                                
                                    </div>
                                </div>
                            </div>
                            <div className="section-full content-inner-2 about-work">                    
                                <div className="container">
                                    <div className="about-work-inner">	
                                        <div className="row">	
                                            <div className="col-lg-7">	
                                                <div className="row">
                                                    <div className="col-xl-9 col-lg-10 col-sm-12 about-work-content content-1">
                                                        <div className="section-head style-1">
                                                            <h2 className="head-title text-secondry">Do you dream <br /> that your child will become intelligent?</h2>
                                                            <p>The concept of school and pre-school  education consists of 3 programs of development and training in our academy</p>
                                                        </div>
                                                        <a href="contect-us.html" className="btn btn-md kids-btn radius-xl style-2">Learn More</a>
                                                    </div>
                                                    <div className="col-xl-3 col-lg-2 m-b30 d-md-none d-lg-block d-none">
                                                        <div className="dz-about-media">	
                                                            <img src={bird} alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-5 col-sm-12 about-work-content content-2">
                                                <div className="row align-items-center">
                                                    <div className="col-lg-12 col-sm-6">
                                                        <div className="icon-bx-wraper left m-b30 about-icon-box box-1 d-flex align-items-center slideskew1">
                                                                <div className="dz-icon-bg" 
                                                                    style={{backgroundImage:`url(${iconbg1})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "contain" }}
                                                                >	
                                                                    <div className="dz-icon"> 
                                                                        <Link to={"#"} className="icon-cell"><img src={abouticon1} alt="" /></Link> 
                                                                    </div>
                                                                </div>	
                                                            <div className="icon-content">
                                                                <h5 className="dlab-tilte">Active Learning</h5>
                                                                <p>The concept of school and pre -school education consists of 3 programs of</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 col-sm-6">
                                                        <div className="icon-bx-wraper left m-b10 about-icon-box box-2 d-flex align-items-center slideskew2">
                                                            <div className="dz-icon-bg" 
                                                                style={{backgroundImage:`url(${iconbg2})`, backgroundPosition: "center", 
                                                                backgroundRepeat: "no-repeat", backgroundSize: "contain"}}
                                                            >	
                                                                <div className="dz-icon"> 
                                                                    <Link to={"#"} className="icon-cell"><img src={abouticon2} alt="" /></Link> 
                                                                </div>
                                                            </div>
                                                            <div className="icon-content">
                                                                <h5 className="dlab-tilte">Full Day Programs</h5>
                                                                <p>The concept of school and pre -school education consists of 3 programs of</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-full bg-white content-inner-2 about-info" style={{backgroundImage:`url(${wellbg})`, 
                                backgroundSize:"cover", backgroundRepeat:"no-repeat",backgroundPosition:"top" }}
                            >
                                <div className="container">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6 col-md-8 col-sm-12 col-12">
                                            <div className="section-head style-1">
                                                <h2 className="head-title text-secondry">Education from birth begins with us</h2>
                                                <p>The concept of school and pre-school education consists of 3 programs of development and training in our academy, developed in collaboration with the</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-full content-inner-2 our-portfolio" style={{backgroundImage:`url(${iconwell})`,
                                backgroundSize:"cover",backgroundRepeat:"no-repeat", backgroundPosition:"center" }}
                            >
                                <img src={cycle} className="background-img slideskew3" alt="" />
                                <img src={imgcloud} className="background-img2 slideskew4" alt="" />
                                <div className="container">
                                    <div className="our-portifolio-inner">
                                        <div className="section-head text-center style-1">
                                            <h2 className="head-title text-secondry">Gallery of our classes</h2>
                                            <p>The concept of school and pre-school education consists of programs of development and training in our academy, developed in</p>
                                        </div>
                                        <GalleryHome3 />                                
                                    </div>
                                </div>
                            </div>
                            <div className="section-full our-teachers content-inner-2">
                                <img src={imgcloud} className="background-img slideskew5" alt="" />
                                <img src={chopper} className="background-img2 slideskew6" alt="" />
                                <div className="container">
                                    <div className="section-head text-center style-1">
                                        <h2 className="head-title text-secondry">About the Teachers</h2>
                                        <p>We have an excellent teacher to child ratio at our Kindergarten to ensure that each child receives the attention he or she needs</p>
                                    </div>    
                                    <div className="section-content text-center ">
                                        <div className="row">
                                            {teacherBlog.map((item, index)=>(
                                                <div className="col-lg-3 col-sm-6" key={index}>
                                                    <div className="dez-team-box m-b30 hover dez-img-effect">
                                                        <div className="dez-media"> 
                                                            <Link to={"#"}><img width="358" height="460" alt="" src={item.image2} /> </Link>
                                                            <div className="overlay-bx style-1">	
                                                                <ul className="list-inline">
                                                                    <li><Link to={"#"}><i className="fa fa-facebook"></i></Link></li>
                                                                    <li><Link to={"#"}><i className="fa fa-google-plus"></i></Link></li>
                                                                    <li><Link to={"#"}><i className="fa fa-linkedin"></i></Link></li>
                                                                    <li><Link to={"#"}><i className="fa fa-instagram"></i></Link></li>
                                                                    <li><Link to={"#"}><i className="fa fa-twitter"></i></Link></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="p-a10 dez-team-info" 
                                                            style={{backgroundImage:`url(${item.image1})`, 
                                                                backgroundSize:"contain", 
                                                                backgroundRepeat: 	"no-repeat", 
                                                                backgroundPosition:"center" 
                                                            }}
                                                        >
                                                            <div className="about-team style-1">
                                                                <h5 className="team-title"><a href="teachers-details.html">{item.name}</a></h5>	
                                                                <span className="team-info style-1">Teacher</span>
                                                            </div>		
                                                        </div>	
                                                    </div>
                                                </div>
                                            ))}                                   
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="section-full content-inner-2 testimonial">
                                <img src={imgcloud} className="background-img slideskew7" alt="" />
                                <img src={imgcloud2} className="background-img2 slideskew7" alt="" />
                                    <div className="container">
                                        <div className="section-head text-center style-1">
                                            <h2 className="head-title text-secondry">Testimonials about center</h2>
                                            <p>We have an excellent teacher to child ratio at our Kindergarten to ensure that each child receives the attention he or she needs</p>
                                        </div>
                                        <CenterSliderHome3 />
                                    </div>
                                </div>
                            <div className="section-full bg-white content-inner-2 our-blog">
                                <img src={imgcloud} className="background-img slideskew7" alt="" />
                                <div className="container">
                                    <div className="section-head text-center style-1">
                                        <h2 className="head-title text-secondry">From the Blog</h2>
                                        <p>We have an excellent teacher to child ratio at our Kindergarten to ensure that each child receives the attention he or she needs</p>
                                    </div>
                                    <BlogSliderHome3 />
                                </div>
                            </div>
                        </div>
                    </div>
                    <ModalVideo channel='youtube' autoPlay isOpen={isOpen} videoId="DfeFDZ9P4n8" onClose={() => setOpen(false)} />
                <Footer2 />   
            </div>
        </>
    );
};

export default Index3;