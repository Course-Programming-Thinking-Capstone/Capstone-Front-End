import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
import bnr1 from './../../images/line2.png';
import team1 from './../../images/team/pic1.jpg';
import team2 from './../../images/team/pic2.jpg';
import team3 from './../../images/team/pic3.jpg';
import team4 from './../../images/team/pic4.jpg';
import team5 from './../../images/team/pic5.jpg';
import team6 from './../../images/team/pic6.jpg';
import team7 from './../../images/team/pic7.jpg';
import team8 from './../../images/team/pic8.jpg';

const teamBlog = [
	{image: team1 ,}, {image: team2 ,}, {image: team3 ,},
	{image: team4 ,}, {image: team5 ,}, {image: team6 ,},
	{image: team7 ,}, {image: team8 ,}, {image: team3 ,},
	{image: team4 ,}, {image: team5 ,}, {image: team6 ,},
];

class Teachers extends Component{
	render(){
		return(
			<Fragment>
				<Header />
					<div className="page-content">
						<PageTitle motherMenu="Teachers" activeMenu="Teachers" />
						<div className="content-block">
							<div className="section-full bg-white content-inner" style={{backgroundImage:"url("+ bnr1 +")", backgroundSize:"contain", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
								<div className="container">
									<div className="section-head text-center">
										<h2 className="head-title text-secondry">About the Teachers</h2>
										<p>
											We have an excellent teacher to child ratio at our Kindergarten to ensure that each child receives the attention he or she needs
										</p>
									</div>
									<div className="row">
										{teamBlog.map((data,index)=>(
											<div className="col-lg-3 col-md-6 col-sm-6" key={index}>
												 <div className="dlab-box box-frame1 team-box m-b40">
													<div className="dlab-thum"> 
														<Link to={"/teachers-details"}>
															<img src={data.image} alt="" />
														</Link>
														<div className="overlay-bx">
															<h5 className="team-title"><Link to={"/teachers-details"}>Jone Doe</Link></h5>
															<span className="team-info">Teachers</span>
															<ul className="list-inline">
																<li><Link to={"#"}><i className="fa fa-facebook"></i></Link></li>
																<li><Link to={"#"}><i className="fa fa-google-plus"></i></Link></li>
																<li><Link to={"#"}><i className="fa fa-linkedin"></i></Link></li>
																<li><Link to={"#"}><i className="fa fa-instagram"></i></Link></li>
																<li><Link to={"#"}><i className="fa fa-twitter"></i></Link></li>
															</ul>
														</div>
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

export default Teachers;