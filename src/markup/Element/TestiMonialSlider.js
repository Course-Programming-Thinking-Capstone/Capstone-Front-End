import React,{Component} from 'react';
import Slider from "react-slick";
import grid1 from './../../images/testimonials/pic2.jpg';


const latestBlog = [
	{ image: grid1,	 },
	{ image: grid1,	 },
]
class TestiMonialSlider extends Component{	
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
            slidesToShow: 1,			
            infinite: true,
			autoPlay: true,
			responsive: [
				{
				  breakpoint: 1200,
				  settings: {
					slidesToShow: 1,
				  }
				},
				{
				  breakpoint: 991,
				  settings: {
					slidesToShow: 1,
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
					<Slider className="client-carousel owl-carousel owl-theme  " ref={c => (this.slider = c)} {...settings}>
						{latestBlog.map((item, index) => (
							<div className="item" key={index}>
								<div className="client-box">
									<div className="testimonial-detail clearfix">
										<div className="testimonial-pic radius">
											<img src={item.image} width="100" height="100" alt="" />
										</div>
										<h5 className="testimonial-name m-t0 m-b5">Mr. Jone Deo</h5> 
										<span>Client</span> 
									</div>
									<div className="testimonial-text">
										<p>My younger son returns very happy with all activities happening at your school every day. I am glad that my son is being taught in your school. You have the motst qualified teachers in the area! My daughter is very satisfied with lessons of English and Math – they give her additional impact for development. Thank you!</p>
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
export default TestiMonialSlider;