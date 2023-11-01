import React,{Component} from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom';
import Lightbox from 'react-18-image-lightbox';


import galery1 from './../../images/gallery/pic1.jpg';
import galery2 from './../../images/gallery/pic2.jpg';
import galery3 from './../../images/gallery/pic3.jpg';
import galery4 from './../../images/gallery/pic4.jpg';
import galery5 from './../../images/gallery/pic5.jpg';
import galery6 from './../../images/gallery/pic6.jpg';


const image = [
	galery1,
	galery2,
	galery3,
	galery4,
	galery5,
	galery6,
]
class GallerySlider extends Component{	
	constructor(props) {
		super(props);
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.state = {
			photoIndex: 0,
			isOpen: false,
		};
	}
	next() {
		this.slider.slickNext();
	}
	previous() {
		this.slider.slickPrev();
	}	
	setPhotoIndex = (newIndex) => {		
		this.setState({ photoIndex: newIndex });		
		this.setState({ isOpen: true });
	}
	setIsOpen = (newIsOpen) => {
		this.setState({ isOpen: newIsOpen });
	}
	
	render(){	
		var settings = {		
			arrows: false,
            slidesToShow: 3,			
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
		const { photoIndex, isOpen } = this.state;		
		return(
			<>	
				
				<div className="sprite-nav">
					<Slider className="gallery-carousel owl-carousel owl-theme dots-none " ref={c => (this.slider = c)} {...settings}>
						{image.map((image, index) => (
							<div className="item p-3" key={index}>
								<div className="dlab-box frame-box">
								<div className="dlab-thum dlab-img-overlay1"> 
									<img src={image} alt={`index ${index}`} />
									<div className="overlay-bx">
										<div className="overlay-icon"> 													
											<Link to={"#"} 
												onClick={() => {
													this.setPhotoIndex(index);															
												}}
												className="check-km" 
											>
												<i className="fa fa-search icon-bx-xs"></i>
											</Link>
											
										</div>
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
					{isOpen && (
						<Lightbox
							mainSrc={image[photoIndex]}
							nextSrc={image[(photoIndex + 1) % image.length]}
							prevSrc={image[(photoIndex + image.length - 1) % image.length]}
							onCloseRequest={() => this.setIsOpen(false)}
							onImageLoad={() =>
								this.setPhotoIndex((photoIndex ))
							}
							onMovePrevRequest={() =>
								this.setPhotoIndex((photoIndex + image.length - 1) % image.length)
							}
							onMoveNextRequest={() =>
								this.setPhotoIndex((photoIndex + 1) % image.length)
							}
							
						/>
					)}
				</div>	
					
			</>	
		)
	}
}
export default GallerySlider;