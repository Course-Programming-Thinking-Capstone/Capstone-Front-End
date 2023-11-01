import React from 'react';
import {Link} from 'react-router-dom';

//image
import logo from './../../images/logo.png';

const Footer2 = () => {
    return (        
        <footer className="site-footer style-1">
            <div className="footer-top style-1 content-inner-2">
                <div className="container wow fadeIn" data-wow-delay="0.5s">
                    <div className="footer-inner">
                        <div className="row">
                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 footer-col-4">
                                <div className="widget widget_ftabout">
                                    <div className="footer-logo">
                                        <a href="index.html"><img src={logo} alt="" /></a>
                                    </div>
                                    <p>lorem ipsum dolor amet here a was a voluptas recusandae, corporis nec, metus numquam, facilis, nascetur?</p>
                                    <ul className="list-inline">
                                        <li><Link to={"#"} className="btn-link"><i className="fa fa-facebook"></i></Link></li>
                                        <li><Link to={"#"} className="btn-link"><i className="fa fa-google-plus"></i></Link></li>
                                        <li><Link to={"#"} className="btn-link"><i className="fa fa-linkedin"></i></Link></li>
                                        <li><Link to={"#"} className="btn-link"><i className="fa fa-instagram"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 footer-col-4">
                                <div className="widget widget_services border-0">
                                    <h5 className="footer-title">Information</h5>
                                    <ul className="list-2">
                                        <li><Link to={"/index"}>Home</Link></li>
                                        <li><Link to={"/about-1"}>About </Link></li>
                                        <li><Link to={"/faqs"}>Faq</Link></li>
                                        <li><Link to={"/event"}>Event</Link></li>
                                        <li><Link to={"/blog-details"}>Blog</Link></li>
                                        <li><Link to={"/gallery"}>Gallery</Link></li>
                                        <li><Link to={"/classes"}>Classes</Link></li>
                                        <li><Link to={"/contect-us"}>Contact</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 footer-col-4">
                                <div className="widget widget_getintuch">
                                    <h5 className="footer-title">CONTACT</h5>
                                    <ul className="foot-address">
                                        <li><Link to={"#"} className="d-flex">
                                                <div className="dz-svg">	
                                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g clipPath="url(#clip0_66_513)">
                                                        <path d="M18.375 9.46484C18.375 15.5898 10.5 20.8398 10.5 20.8398C10.5 20.8398 2.625 15.5898 2.625 9.46484C2.625 7.37626 3.45469 5.37323 4.93153 3.89638C6.40838 2.41953 8.41142 1.58984 10.5 1.58984C12.5886 1.58984 14.5916 2.41953 16.0685 3.89638C17.5453 5.37323 18.375 7.37626 18.375 9.46484Z" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M10.5 12.0898C11.9497 12.0898 13.125 10.9146 13.125 9.46484C13.125 8.0151 11.9497 6.83984 10.5 6.83984C9.05025 6.83984 7.875 8.0151 7.875 9.46484C7.875 10.9146 9.05025 12.0898 10.5 12.0898Z" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_66_513"><rect width="21" height="21" fill="white" transform="translate(0 0.714844)"/></clipPath></defs>
                                                    </svg>
                                                </div>	
                                                    <span>6701 Democracy Blvd, Suite 300, USA</span>
                                            </Link>
                                        </li>
                                        <li><Link to={"#"} className="d-flex">
                                                <div className="dz-svg">	
                                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M19.25 15.5199V18.1449C19.251 18.3886 19.2011 18.6298 19.1034 18.8531C19.0058 19.0764 18.8626 19.2768 18.6831 19.4416C18.5035 19.6063 18.2915 19.7317 18.0607 19.8098C17.8298 19.8879 17.5852 19.9169 17.3425 19.8949C14.65 19.6024 12.0636 18.6823 9.79125 17.2087C7.6771 15.8653 5.88467 14.0728 4.54125 11.9587C3.06248 9.67598 2.14222 7.07705 1.855 4.37243C1.83314 4.13046 1.86189 3.88659 1.93944 3.65635C2.01699 3.42611 2.14163 3.21453 2.30542 3.0351C2.46922 2.85566 2.66858 2.7123 2.89082 2.61414C3.11306 2.51597 3.3533 2.46516 3.59625 2.46493H6.22125C6.6459 2.46075 7.05757 2.61112 7.37954 2.88802C7.70152 3.16492 7.91182 3.54944 7.97125 3.96993C8.08205 4.80999 8.28752 5.63481 8.58375 6.42868C8.70148 6.74186 8.72696 7.08223 8.65717 7.40945C8.58738 7.73667 8.42526 8.03703 8.19 8.27493L7.07875 9.38618C8.32436 11.5768 10.1382 13.3906 12.3288 14.6362L13.44 13.5249C13.6779 13.2897 13.9783 13.1275 14.3055 13.0578C14.6327 12.988 14.9731 13.0135 15.2863 13.1312C16.0801 13.4274 16.9049 13.6329 17.745 13.7437C18.17 13.8036 18.5582 14.0177 18.8357 14.3452C19.1132 14.6727 19.2607 15.0908 19.25 15.5199Z" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>	
                                                    <span>001 1234 6789</span>
                                            </Link>
                                        </li>
                                        <li><Link to={"#"} className="d-flex">
                                                <div className="dz-svg">		
                                                    <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M19.25 11.2148H14L12.25 13.8398H8.75L7 11.2148H1.75" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M4.76875 5.18609L1.75 11.2148V16.4648C1.75 16.929 1.93437 17.3741 2.26256 17.7023C2.59075 18.0305 3.03587 18.2148 3.5 18.2148H17.5C17.9641 18.2148 18.4092 18.0305 18.7374 17.7023C19.0656 17.3741 19.25 16.929 19.25 16.4648V11.2148L16.2312 5.18609C16.0864 4.89453 15.863 4.64917 15.5863 4.47759C15.3096 4.30601 14.9906 4.21502 14.665 4.21484H6.335C6.00943 4.21502 5.69036 4.30601 5.41366 4.47759C5.13697 4.64917 4.91363 4.89453 4.76875 5.18609Z" stroke="#4D4D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </div>	
                                                <span>info@example.com</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 footer-col-4 ">
                                <div className="widget widget_newsletter">
                                    <h5 className="footer-title">SUSCRIBE NOW</h5>
                                    <div className="subscribe-form m-b20">
                                        <form className="dzSubscribe" action="script/mailchamp.php" method="post">
                                            <div className="dzSubscribeMsg"></div>
                                            <div className="input-group">
                                                <input name="dzEmail" required="required"  className="form-control" placeholder="Enter Your Email" type="email" />
                                                <button name="submit" value="Submit" type="submit" className="btn btn-md radius-xl">Suscribe Now</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
            <div className="footer-bottom style-1">
                <div className="container">
                    <span>Copyright © 2023 Umang Academy. All right reserved</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer2;