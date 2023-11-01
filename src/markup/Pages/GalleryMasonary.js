import React,{Fragment,Component} from 'react';
import {Link} from 'react-router-dom';
// import SimpleReactLightbox,{SRLWrapper,useLightbox} from 'simple-react-lightbox'; 
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';
import Lightbox from 'react-18-image-lightbox';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';

//images
import masonary1 from './../../images/gallery/masonary/pic1.jpg';
import masonary2 from './../../images/gallery/masonary/pic2.jpg';
import masonary3 from './../../images/gallery/masonary/pic3.jpg';
import masonary4 from './../../images/gallery/masonary/pic4.jpg';
import masonary5 from './../../images/gallery/masonary/pic5.jpg';
import masonary6 from './../../images/gallery/masonary/pic6.jpg';
import masonary7 from './../../images/gallery/masonary/pic7.jpg';
import masonary8 from './../../images/gallery/masonary/pic8.jpg';
import masonary9 from './../../images/gallery/masonary/pic9.jpg';

const image =[
	 masonary1 ,  
	 masonary2 ,  
	 masonary3 ,
	 masonary4 ,  
	 masonary5 ,  
	 masonary6 ,
	 masonary1 ,  
	 masonary2 ,  
	 masonary3 ,
	 masonary7 ,  
	 masonary8 ,  
	 masonary9 
];

class GalleryMasonary extends Component{
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
					<PageTitle  motherMenu="Gallery Masonary"  activeMenu="Gallery Masonary" />
					<div className="content-block">
						<div className="section-full content-inner">
							<div className="container">
								<div className="section-head text-center">
									<h2 className="head-title text-secondry">Gallery of our classes</h2>
									<p>We provide three classes with nine to twenty children each aged twelve months to six years of age.</p>
								</div>
								
									<div className="clearfix" id="lightgallery">
										<ul id="masonry" className="dlab-gallery-listing gallery-grid-4 gallery mfp-gallery masonry-gallery">
											<ResponsiveMasonry
												columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
											>
												<Masonry
													className={'my-gallery-class'} 														
													gutter={"25px"}														
												>	
												
													{image.map((image,index)=>(
														<li className="web design card-container  "  key={index}>
															<div className="dlab-box frame-box m-b30">
																<div className="dlab-thum dlab-img-overlay1 ">
																	<img src={image} alt="" /> 
																	<div className="overlay-bx">
																		<div className="overlay-icon"> 
																			<Link  					
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
export default GalleryMasonary;