import React,{Component} from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom';
import team1 from './../../images/team/pic1.jpg';
import team2 from './../../images/team/pic2.jpg';
import team3 from './../../images/team/pic3.jpg';
import team4 from './../../images/team/pic4.jpg';


const latestBlog = [
	{ image: team1,	 },
	{ image: team2,	 },
	{ image: team3,	 },
	{ image: team4,	 },
	{ image: team3,	 },
]
class TeacherSlider extends Component{	
	constructor(props) {
		super(props);
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
	}
	next() {
		this.slider.slickNext();
	}
	previous() {
		this.slider.slickPrev();
	}
	render(){
		var settings = {		
			arrows: false,
            slidesToShow: 4,			
            infinite: true,
			autoPlay: true,
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
					slidesToShow: 3,
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
			<>	
				<div className="sprite-nav">
					<Slider className="team-carousel owl-carousel owl-theme dots-none  " ref={c => (this.slider = c)} {...settings}>
						{latestBlog.map((item, index) => (
							<div className="item" key="index">
								 <div className="dlab-box box-frame1 team-box">
									<div className="dlab-thum"> 
										<Link to={"/teachers-details"}>
											<img src={item.image} alt="" />
										</Link>
										<div className="overlay-bx">
											<h5 className="team-title"><Link to={"/teachers-details"}>Jone Doe</Link></h5>
											<span className="team-info">Teachers</span>
											<ul className="list-inline">
												<li><Link to={'#'}><i className="fa fa-facebook"></i></Link></li>
												<li><Link to={'#'}><i className="fa fa-google-plus"></i></Link></li>
												<li><Link to={'#'}><i className="fa fa-linkedin"></i></Link></li>
												<li><Link to={'#'}><i className="fa fa-instagram"></i></Link></li>
												<li><Link to={'#'}><i className="fa fa-twitter"></i></Link></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						))}	
					</Slider>		
					<div className="owl-nav" style={{ textAlign: "center" }}>
						<div className=" owl-prev " onClick={this.previous}/>
						<div className="owl-next " onClick={this.next}/>
					</div>
				</div>	
			</>	
		)
	}
}
export default TeacherSlider;