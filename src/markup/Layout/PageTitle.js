import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import bnr from './../../images/pattern/pattern.jpg';

const PageTitle = ({ motherMenu, activeMenu }) => {
	return (
		<div className="dlab-bnr-inr" style={{ backgroundImage: "url(" + bnr + ")", backgroundSize: "auto" }}>
			<div className="container">
				<div className="dlab-bnr-inr-entry">
					<h1 className="text-white">{motherMenu}</h1>
					<div className="breadcrumb-row">
						<ul className="list-inline">
							<li><Link to={"/"}><i className="fa fa-home"></i></Link></li>
							<li>Home</li>
							<li>{activeMenu}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageTitle;