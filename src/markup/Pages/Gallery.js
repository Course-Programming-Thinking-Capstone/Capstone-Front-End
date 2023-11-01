import React,{Fragment,Component} from 'react';
import {Link} from 'react-router-dom';

import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';
import Lightbox from 'react-18-image-lightbox';

//Component
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';

//images
import gallery1 from './../../images/gallery/pic1.jpg';
import gallery2 from './../../images/gallery/pic2.jpg';
import gallery3 from './../../images/gallery/pic3.jpg';
import gallery4 from './../../images/gallery/pic4.jpg';
import gallery5 from './../../images/gallery/pic5.jpg';
import gallery6 from './../../images/gallery/pic6.jpg';


const image = [
	gallery1 ,
	gallery2 ,
	gallery3,
	gallery4 ,
	gallery5 ,
	gallery6,
	gallery1,
	gallery2 ,
	gallery3,
	gallery4 ,
	gallery5 ,
	gallery6,
];


class Gallery extends Component{	
	constructor(props) {	
		super(props);	
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
		const { photoIndex, isOpen } = this.state;		
		return(
			<Fragment>
				<Header />
				<div className="page-content">
					<PageTitle  motherMenu="Gallery Grid"  activeMenu="Gallery Grid" />
					<div className="content-block">
						<div className="section-full content-inner">
							<div className="container">
								<div className="section-head text-center">
									<h2 className="head-title text-secondry">Gallery of our classes</h2>
									<p>We provide three classes with nine to twenty children each aged twelve months to six years of age.</p>
								</div>
								
								<div className="clearfix" id="lightgallery">
									<ul id="masonry" className="dlab-gallery-listing gallery-grid-4 gallery">
										<ResponsiveMasonry
											columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
										>
											<Masonry
												className={'my-gallery-class'} 														
												gutter={"30px"}														
											>											
												{image.map((image,index)=>(
													<li className="web design card-container"  key={index}>
														<div className="dlab-box frame-box m-b30">
															<div className="dlab-thum dlab-img-overlay1 ">
																<img src={image} alt={`index ${index}`} /> 
																<div className="overlay-bx">
																	<div className="overlay-icon"> 																		
																		<Link to={"#"}																			
																			onClick={() => {
																				this.setPhotoIndex(index);		
																			}}
																			className="check-km open" 
																		>
																			<i className="fa fa-search icon-bx-xs"></i>
																		</Link>
																	</div>
																</div>
															</div>
														</div>
													</li>
												))}
												
											</Masonry>	
										</ResponsiveMasonry>

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
									</ul>
								</div>
									
							</div>
						</div>
					</div>
				</div>	
				<Footer />
			</Fragment>
		)
	}
	
}
export default Gallery;