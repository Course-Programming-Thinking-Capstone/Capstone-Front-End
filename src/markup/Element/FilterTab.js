import React,{ Component} from 'react'; 
import {Link} from 'react-router-dom';
import Lightbox from 'react-18-image-lightbox';

import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';


//images
import gallery1 from './../../images/gallery/pic1.jpg';
import gallery2 from './../../images/gallery/pic2.jpg';
import gallery3 from './../../images/gallery/pic3.jpg';
import gallery4 from './../../images/gallery/pic4.jpg';
import gallery5 from './../../images/gallery/pic5.jpg';
import gallery6 from './../../images/gallery/pic6.jpg';

const imageBlog = [
	{ id:'0', Large_img: gallery1 , title:'Education'},
	{ id:'1', Large_img: gallery2 , title:'Drawing'},
	{ id:'2', Large_img: gallery3 , title:'Lunch'},
	{ id:'3', Large_img: gallery4 , title:'Education'},
	{ id:'4', Large_img: gallery5 , title:'Lunch'},
	{ id:'5', Large_img: gallery6 , title:'Drawing'},
	{ id:'6', Large_img: gallery1 , title:'Lunch'},
	{ id:'7', Large_img: gallery2 , title:'Game'}, 
	{ id:'8', Large_img: gallery3 , title:'Lunch'},
	{ id:'9', Large_img: gallery4,  title:'Education'},
	{ id:'10', Large_img: gallery3, title:'Drawing'},
	{ id:'11', Large_img: gallery6, title:'Game'},
]
const image = [
	gallery1 ,
	gallery2 ,
	gallery3 ,
	gallery4 ,
	gallery5 ,
	gallery6 ,
	gallery1 ,
	gallery2 ,
	gallery3 ,
	gallery4,
	gallery3,
	gallery6,
]


const filterData = [
	{id:'0', title:'All', },
	{id:'1', title:'Drawing', },
	{id:'2', title:'Education', },
	{id:'3', title:'Game', },
	{id:'4', title:'Lunch', },
];

class FilterTab extends Component{
	constructor(props) {	
		super(props);	
		this.state = {
			photoIndex: 0,
			isOpen: false,
		};
		this.state = {
			items: imageBlog,
			filterCategory: 'All',
		} 
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

	
	setFilterCategory = (category) => {
		this.setState({ filterCategory: category });
	};
	render(){
		const { photoIndex, isOpen } = this.state;	
		const { items, filterCategory } = this.state;	
		
		const filteredItems = filterCategory === 'All'
		? items			
		: items.filter(item => item.title === filterCategory);		
		return(		
			<div className="section-full content-inner">				
				<div className="container-fluid">
					<div className="section-head text-center">
						<h2 className="head-title text-secondry">Gallery of our classes</h2>
						<p>We provide three classes with nine to twenty children each aged twelve months to six years of age.</p>
					</div>
					<div className="clearfix" id="lightgallery">
						<div className="row">
							<div className="col-lg-12 text-center">
								<div className="site-filters filter-style1 clearfix m-b20">
									<ul className="filters" data-toggle="buttons">										
										{filterData.map((item , index)=>(
											<li  className={`btn ${item.title === filterCategory ? "active" : "" }`} key={index}												
												onClick={() => {
													this.setFilterCategory(item.title)														
												}}
											>
												<Link to={"#"}><span>{item.title}</span></Link>
											</li>
										))}											
									</ul>
								</div>
							</div>
						</div>	
					</div>
					<ul className="dlab-gallery-listing gallery-grid-4 gallery mfp-gallery">
						<ResponsiveMasonry
							columnsCountBreakPoints={{350: 1, 750: 2, 900: 4}}
						>
							<Masonry
								className={'my-gallery-class'}
								gutter={"25px"}	
							>
								{filteredItems.map((item, index)=>(
									<li className="drawing card-container" key={index}>
										<div className="dlab-box frame-box m-b30">
											<div className="dlab-thum dlab-img-overlay1 "> 
												<img src={item.Large_img} alt="" />
												<div className="overlay-bx">
													<div className="overlay-icon"> 														
														<Link   
															onClick={() => {
																this.setPhotoIndex(index);		
															}}
															className="" 
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
					</ul>
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
			</div>
		)
	}
} 

export default FilterTab;