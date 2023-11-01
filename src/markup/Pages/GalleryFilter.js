import React,{Fragment,Component} from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import PageTitle from '../Layout/PageTitle';
import FilterTab from '../Element/FilterTab';


class GalleryFilter extends Component{
	render(){
		return(
			<Fragment>
				<Header />
				<div className="page-content">
					<PageTitle  motherMenu="Gallery Filter"  activeMenu="Gallery Filter" />
					<div className="content-block">
						<FilterTab />
					</div>
				</div>	
				<Footer />
			</Fragment>
		)
	}
}
export default GalleryFilter;