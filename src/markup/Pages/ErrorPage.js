import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
import search from './../../images/icon/search-icon.png';

class ErrorPage extends Component{
	render(){
		return(
			<Fragment>
				<Header />
				<div className="page-content">
					<PageTitle  motherMenu="Error 404"  activeMenu="Error 404" />
					<div className="content-block">
						<div className="section-full content-inner-2">
							<div className="container">
								<div className="error-page text-center">
									<div className="dz_error">404</div>
									<h2 className="error-head">The Link You Folowed Probably Broken, or the page has been removed...</h2>
									<div className="m-b30">
										<div className="subscribe-form p-a0">
											{/* <form>
												<div className="input-group">
													<input name="text" className="form-control radius-no bg-black" placeholder="Type and hit Enter..." type="text" />
													<span className="input-group-btn">
														<button type="submit" className="btn radius-no white"><img src={search} alt="" /></button>
													</span> 
												</div>
											</form> */}
										</div>
									</div>
									<Link to={"/"} className="btn radius-xl btn-lg">Return to Home</Link>
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
export default ErrorPage;