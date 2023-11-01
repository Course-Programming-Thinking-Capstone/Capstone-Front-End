import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
//images
import bnr1 from './../../images/line2.png';
import clsimg1 from './../../images/classes/pic1.jpg';
import clsimg2 from './../../images/classes/pic2.jpg';
import clsimg3 from './../../images/classes/pic3.jpg';
import clsimg4 from './../../images/classes/pic4.jpg';
import clsimg5 from './../../images/classes/pic5.jpg';
import clsimg6 from './../../images/classes/pic6.jpg';

const classesBlog =[
	{images: clsimg1, title: 'Art Drawing Classes'},	
	{images: clsimg4, title: 'The Answer To Everything.'},	
	{images: clsimg3, title: 'The Miracle Of Education.' },	
	{images: clsimg5, title: 'Ten Things To Know About'},	
	{images: clsimg2, title: 'The Story Of Education'},	
	{images: clsimg6, title: 'The Shocking Revelation'},	
];

class Classes extends Component{
	render(){
		return(
			<Fragment>
				<Header />
				<div className="page-content">
					<PageTitle  motherMenu="Classes"  activeMenu="Classes" />
					<div className="content-block">
						<div className="section-full bg-white content-inner" style={{backgroundImage:"url("+ bnr1+")", backgroundSize:"contain",backgroundRepeat: "no-repeat",backgroundPosition: "center"}}>
							<div className="container">
								<div className="row sp40">
									{classesBlog.map((data, index)=>(
										<div className="col-lg-4 col-md-6 col-sm-6" key={index}>
											<div className="class-item">
												<div className="class-media"> 
													<img src={data.images} alt=""/>
													<p>
														<span>Class Time:</span> 
														08:00 am - 10:00 am
													</p>
												</div>
												<div className="class-info">
													<h4><Link to={"/classes-details"}>{data.title}</Link></h4>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit nulla felis ipsum.</p>
													<ul className="schedule">
														<li className="bg-blue class-size"><span>Class Size</span> <span>30 - 40</span> </li>
														<li className="bg-green years-old"><span>Years Old</span> <span>5 - 6</span> </li>
														<li className="bg-orange tution"><span>Tution Fee</span> <span>$1500</span> </li>
													</ul>
												</div>
											</div>
										</div>
									))}	
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
export default Classes;