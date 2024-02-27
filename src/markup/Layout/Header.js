import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// images
import logo from './../../images/logo.png';
import LanguageSwitcher from '../Element/LanguageSwitcher';


const Header = () => {
    // sidebar open	
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // header scroll
    const [headerFix, setheaderFix] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setheaderFix(window.scrollY > 50);
        });
    }, []);

    const rolesMenus = {
        Teacher: [
            { maintitle: 'Home', to: '/classes' },
            { maintitle: 'Schedule', to: '/schedule' },
            // { maintitle: 'Account', to: '/teachers-details/:id' },
        ],
        Student: [
            { maintitle: 'Courses', to: '/courses' },
            { maintitle: 'Profile', to: '/profile' },
        ],
        guest: [
            { maintitle: 'Home', to: '/' },
            { maintitle: 'Course', to: '/classes' },
            { maintitle: 'Teacher', to: '/teachers' },
            { maintitle: 'Login', to: '/register' },
        ],
        Staff: [
            { maintitle: 'Courses', to: '/courses' },
            { maintitle: 'Profile', to: '/profile' },
        ],
    };

    let userRole = localStorage.getItem('userRole') || 'guest';

    if (!rolesMenus[userRole]) {
        // If userRole is not found or invalid, default to 'guest'
        userRole = 'guest';
    }

    // Current path
    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    return (
        <Fragment>
            <header className="site-header header mo-left">
                <div className="top-bar">
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <div className="dlab-topbar-left">
                                <ul>
                                    <li><i className="fa fa-phone m-r5"></i> 000 1234 6789</li>{" "}
                                    <li><i className="fa fa-map-marker m-r5"></i> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức </li>
                                </ul>
                            </div>
                            <div className="dlab-topbar-right">
                                <LanguageSwitcher />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`sticky-header main-bar-wraper navbar-expand-lg ${headerFix ? "is-fixed" : ""}`}>
                    <div className="main-bar clearfix ">
                        <div className="container clearfix">

                            <div className="logo-header mostion">
                                <Link to={"/"} className="dez-page"><h1 style={{ marginBottom: '0px' }}>KidsPro</h1></Link>
                            </div>

                            <button className={`navbar-toggler navicon justify-content-end ${sidebarOpen ? 'open' : 'collapsed'}`}
                                type="button"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
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
                                    {rolesMenus[userRole].map((item, ind) => (
                                        <li key={ind} className={item.to === path ? 'active' : ''}>
                                            <Link to={item.to}>{item.maintitle}</Link>
                                        </li>
                                    ))}
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
