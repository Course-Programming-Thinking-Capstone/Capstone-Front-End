import React from 'react';
import {Link} from 'react-router-dom';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import eyes  from './../../images/eyes.png';
import pic10  from './../../images/gallery/pic10.jpg';
import pic1  from './../../images/gallery/pic1.png';
import pic2  from './../../images/gallery/pic2.png';
import pic3  from './../../images/gallery/pic3.png';
import pic4  from './../../images/gallery/pic4.png';
import pic5  from './../../images/gallery/pic5.png';
import pic11  from './../../images/gallery/pic11.jpg';
import pic12  from './../../images/gallery/pic12.jpg';
import pic13  from './../../images/gallery/pic13.jpg';
import pic14  from './../../images/gallery/pic14.jpg';
import pic15  from './../../images/gallery/pic15.jpg';
import LightGallery from 'lightgallery/react';




const GalleryHome3 = ( ) => {   
    return (
            <div className="" id="lightgallery">
                <LightGallery                    
                    speed={500}
                    elementClassNames='row sp15'                    
                    thumbnail={false}
                    plugins={[lgThumbnail, lgZoom]}
                    selector={".open"}
                >
                    <div className="col-lg-4 col-sm-12">
                        <div className="dz-media media1">
                            <img src={pic10} alt="" />
                            <span data-exthumbimage={pic10} data-src={pic10} className="check-km dz-lightgallery open">
                                <Link to={"#"} className="dz-icon">
                                    <img src={eyes} className="media-icon" alt="" />
                                </Link>
                            </span>
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-12">
                        <div className="row sp15">
                            <div className="col-lg-12">
                                <div className="dz-media-inner">
                                    <div className="row sp15">
                                        <div className="col-md-6">
                                            <div className="dz-media media2">
                                                <img src={pic1} alt="" />
                                                <span data-exthumbimage={pic11} data-src={pic11} className="check-km dz-lightgallery open">
                                                    <Link to={"#"} className="dz-icon">
                                                        <img src={eyes} className="media-icon" alt="" />
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="dz-media media2">
                                                <img src={pic2} alt="" />
                                                <span data-exthumbimage={pic12} data-src={pic12} className="check-km dz-lightgallery open">
                                                    <Link to={"#"} className="dz-icon">
                                                        <img src={eyes} className="media-icon" alt="" />
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>	
                            </div>	
                            <div className="col-sm-12">
                                <div className="dz-media media3">
                                    <img src={pic3} alt="" />
                                    <span data-exthumbimage={pic14} data-src={pic14} className="check-km dz-lightgallery open" >
                                        <Link to={"#"} className="dz-icon">
                                            <img src={eyes} className="media-icon" alt="" />
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="row sp15">
                            <div className="col-lg-12 col-md-6">
                                <div className="dz-media media4">
                                    <img src={pic4} alt="" />
                                    <span data-exthumbimage={pic13} data-src={pic13} className="check-km dz-lightgallery open">
                                        <Link to={"#"} className="dz-icon">
                                            <img src={eyes} className="media-icon" alt="" />
                                        </Link>
                                    </span>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-6">
                                <div className="dz-media media5" >
                                    <img src={pic15} alt="" />
                                    <span data-exthumbimage={pic15} data-src={pic15} className="check-km dz-lightgallery open">
                                        <Link to={pic5} className="dz-icon">
                                            <img src={eyes} className="media-icon" alt="" />
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </LightGallery>
              
            </div>
    );
};

export default GalleryHome3;