import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import largeimg from './../../images/blog/large/pic1.jpg';

function Paragraph(){
	return(
		<>
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting.
			</p>
		</>
	)
}
class ClassDetailContent extends Component{
	render(){
		return(
			<Fragment>
				<div className="classes-details">
					<div className="class-media">
						<img src={largeimg} alt=""/>
					</div>
					<div className="class-info">
						<div className="dlab-post-title ">
							<h2 className="post-title m-t0"><Link to={"/classes"}>Asertivelly recaptiualize best rofesionally</Link></h2>
						</div>
						<div className="dlab-post-meta m-b20">
							<ul className="d-flex align-items-center">
								<li className="post-date"> <i className="la la-calendar-o"></i><strong>10 Aug</strong> <span> 2016</span> </li>
								<li className="post-author"><i className="la la-user"></i>By <Link to={"/classes"}>demongo</Link> </li>
								<li className="post-comment"><i className="la la-comment"></i> <Link to={"/classes"}>0 Comments</Link> </li>
							</ul>
						</div>
						<div className="dlab-post-text">
							<Paragraph />	
							<blockquote>
								Lorem Ipsum is simply dummy text of the printing and typesetting industry. Has been the industry's standard text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimencenturies.
							</blockquote>
							<Paragraph />
							<h4>Funny Kids</h4>	
							<Paragraph />
						</div>
						<div className="dlab-post-tags clear">
							<div className="post-tags"> 
								<Link className="me-1" to={"#"}>Child </Link> 
								<Link className="me-1" to={"#"}>Eduction </Link> 
								<Link className="me-1" to={"#"}>Money </Link> 
								<Link className="me-1" to={"#"}>Resturent </Link> 
								<Link className="me-1" to={"#"}>Child </Link> 
								<Link className="me-1" to={"#"}>Eduction </Link> 
								<Link className="me-1" to={"#"}>Money </Link> 
								<Link className="" to={"#"}>Resturent </Link> 
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}
export default ClassDetailContent;