import React,{Fragment, useState, useEffect, useReducer } from 'react';
import {Link} from 'react-router-dom';

//images
import logo from './../../images/logo.png';


const MenuList = [
	{
		maintitle:'Home',
		classChange: 'sub-menu-down',
		content : [
			{ heading:'Home 1', to:''},
			{ heading:'Home 2', to:'index-2'},
			{ heading:'Home 3', to:'index-3'},
		]
	},
	{
		maintitle:'About',
		classChange: 'sub-menu-down',
		content : [
			{ heading:'About Us 1', to:'about-1'},
			{ heading:'About Us 2', to:'about-2'},
		]
	},
	{
		maintitle:'Classes',
		classChange: 'sub-menu-down',
		content : [
			{ heading:'Classes', to:'classes'},
			{ heading:'Classes Details', to:'classes-details'},
		]
	},
	{
		maintitle:'Teachers',
		classChange: 'sub-menu-down',
		content : [
			{ heading:'Teachers', to:'teachers'},
			{ heading:'Teachers Details', to:'teachers-details'},
		]
	},
	{
		maintitle:'Pages',
		classChange: 'sub-menu-down',
		content : [
			{ heading:'Comign Soon', to:'coming-soon'},
			{ heading:'Faqs', to:'faqs'},
			{ heading:'Event', to:'event'},
			{ heading:'Event Details', to:'event-details'},
			{ heading:'Error 404', to:'error-404'},
		]
	},
	{
		maintitle: 'Blog',
		classChange: 'sub-menu-down',
		content : [
			{ heading: 'Standard', to:'blog-standard'},
			{ heading: 'Classic', to:'blog-classic-grid'},
			{ heading: 'Blog Details', to:'blog-details'}
		]
	},
	{
		maintitle: 'Our Gallery',
		classChange: 'sub-menu-down',
		content : [
			{ heading: 'Gallery Grid', to:'gallery'},
			{ heading: 'Gallery Masonary', to:'gallery-masonary'},
			{ heading: 'Gallery Tiles Filter', to:'gallery-filter'}
		]
	},
	{
		maintitle:'Contact Us',
		to:"/contact-us"
	}
];

const Header = () =>{
	//sidebar open	
	const [sidebarOpen, setSidebarOpen]= useState(false);
	//header scroll
	const [headerFix, setheaderFix] = useState(false);
	useEffect(() => {
	  window.addEventListener("scroll", () => {
		setheaderFix(window.scrollY > 50);
	  });
	}, []);

	// Menu dropdown list on small size
	const reducer = (previousState, updatedState) => ({
    	...previousState,
    	...updatedState,
  	});
  	const initialState = {
    	active: "",
    	// activeSubmenu: "",
  	};
	const [state, setState] = useReducer(reducer, initialState);
	const handleMenuActive = (status) => {
			setState({ active: status });
		if (state.active === status) {
			setState({ active: "" });
		}
	};

	/// Path
	let path = window.location.pathname;
	path = path.split("/");
	path = path[path.length - 1];

	useEffect(() => {
	   MenuList.forEach((data) => {
		 data.content?.forEach((item) => {        
		   if(path === item.to){         
			 setState({active : data.maintitle})          
		   }
		   item.content?.forEach(ele => {
			 if(path === ele.to){
			   setState({ active : data.maintitle})
			 }
		   })
		 })
	 })
	 },[path]);
	
	
	return(
		<Fragment>
			<header className="site-header header mo-left">
				<div className="top-bar">
					<div className="container">
						<div className="d-flex justify-content-between">
							<div className="dlab-topbar-left">
								<ul>
									<li><i className="fa fa-phone m-r5"></i> 001 1234 6789</li>{" "}
									<li><i className="fa fa-map-marker m-r5"></i> 6701 Democracy Blvd, Suite 300, USA</li>
								</ul>
							</div>
							<div className="dlab-topbar-right">
								<ul>
									<li><i className="fa fa-clock-o m-r5"></i> Opening Time : 9:30am-5:30pm</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				
				<div className={`sticky-header main-bar-wraper navbar-expand-lg ${
						headerFix ? "is-fixed" : ""
					}`}
				>
					<div className="main-bar clearfix ">
						<div className="container clearfix">
							
							<div className="logo-header mostion">
								<Link to={"/"} className="dez-page"><img src={logo} alt="" /></Link>
							</div>
							
							<button className={`navbar-toggler navicon justify-content-end ${ sidebarOpen ? 'open': 'collapsed'}`} 
								type="button" 
								onClick={()=>setSidebarOpen(!sidebarOpen)}
							>
								<span></span>
								<span></span>
								<span></span>
							</button>
						
							<div className={`header-nav navbar-collapse collapse myNavbar justify-content-end ${sidebarOpen ? 'show' : ''}`}>
								<div className="logo-header mostion">
									<Link to={"/"} className="dez-page"><img src={logo} alt="" /></Link>
								</div>
								
								<ul className="nav navbar-nav">	
									{MenuList.map((item, ind)=>{
										let menuClass = item.classChange;
										if(menuClass === "sub-menu-down") {
											return(
												<li className={`${state.active === item.maintitle ? "open active" : ""} ${item.to === path ? 'active' : ''}`} 
												 key={ind}													
												>
													<Link to={'#'}
														onClick={() => {
															handleMenuActive(item.maintitle);
														}}
													>{item.maintitle} <i className="fa fa-chevron-down"></i></Link>
													<ul className="sub-menu">
														{item.content && item.content.map((data, index)=>(
															<li key={index}>
																<Link to={`/${data.to}`}>{data.heading}</Link>
															</li>
														))}
													</ul>	
												</li>
											)
										}else {
											return(
												<li key={ind}><Link to={item.to}>{item.maintitle}</Link></li>
											)
										}
									})}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</header>
		</Fragment>
	)
	
}
export default Header;