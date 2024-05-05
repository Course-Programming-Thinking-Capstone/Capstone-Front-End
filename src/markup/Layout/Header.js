import React, { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// images
import logo from "./../../images/logo.png";
import logo1 from "./../../images/background/logo1.jpg";

import LanguageSwitcher from "../Element/LanguageSwitcher";
import { colors } from "@mui/material";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerFix, setheaderFix] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setheaderFix(window.scrollY > 50);
    });
  }, []);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  let userRole = user ? user.role : "Guest";

  const rolesMenus = {
    Student: [
      { maintitle: "Home", to: "/student-home" },
      { maintitle: "Schedule", to: "/schedule" },
      { maintitle: "Certificate", to: "/schedule" },
      { maintitle: "Acount", to: "/account" },
      { maintitle: "Log out", to: "/logout" },
    ],
    Parent: [
      { maintitle: "Home", to: "/home" },
      { maintitle: "Courses", to: "/courses" },
      { maintitle: "Teacher", to: "/teachers" },
      { maintitle: "Order", to: "/order" },
      { maintitle: "Account", to: "/account" },
      { maintitle: "Log out", to: "/logout" },
    ],
    Guest: [
      { maintitle: "Home", to: "/" },
      { maintitle: "Courses", to: "/courses" },
      { maintitle: "Teacher", to: "/teacher" },
      { maintitle: "Login", to: "/login" },
    ],
  };

  if (!rolesMenus[userRole]) {
    // If userRole is not found or invalid, default to 'guest'
    userRole = "Guest";
  }

  const handleLogout = () => {
    localStorage.clear(); // Clear the user from local storage
    navigate("/home"); // Redirect to the login page
  };

  // Current path
  let path = window.location.pathname ?? "home";
  path = path.split("/");
  path = path[path.length - 1];

  return (
    <Fragment>
      <header className="site-header header mo-left">
        {/* <div className="top-bar">
          <div className="container">
            <div className="d-flex justify-content-between">
              <div className="dlab-topbar-left">
                <ul>
                  <li>
                    <i className="fa fa-phone m-r5"></i> 000 1234 6789
                  </li>{" "}
                  <li>
                    <i className="fa fa-map-marker m-r5"></i> Lô E2a-7, Đường
                    D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức{" "}
                  </li>
                </ul>
              </div>
              <div className="dlab-topbar-right">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div> */}

        <div
          className={`sticky-header main-bar-wraper navbar-expand-lg ${headerFix ? "is-fixed" : ""
            }`}
        >
          <div className="main-bar clearfix ">
            <div className="container clearfix">
              <div className="logo-header mostion">
                <Link to={"/"} className="dez-page">
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <img src={logo1} alt="" style={{width:'5rem', height:'3rem',marginRight:'0.5rem'}}/>
                    <h1 style={{ marginBottom: "0px", color: "#ff8a00" }}>KidsPro</h1>
                  </div>
                </Link>
              </div>

              <button
                className={`navbar-toggler navicon justify-content-end ${sidebarOpen ? "open" : "collapsed"
                  }`}
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <div
                className={`header-nav navbar-collapse collapse myNavbar justify-content-end ${sidebarOpen ? "show" : ""
                  }`}
              >
                <div className="logo-header mostion">
                  <Link to={"/"} className="dez-page">
                    <img src={logo} alt="" />
                  </Link>
                </div>

                <ul className="nav navbar-nav">
                  {rolesMenus[userRole]?.map(
                    (item, ind) =>
                      item && (
                        <li
                          key={ind}
                          className={item.to === path ? "active" : ""}
                        >
                          {item.maintitle === "Log out" ? (
                            <a href="#" onClick={handleLogout}>
                              {item?.maintitle}
                            </a>
                          ) : (
                            <Link to={item?.to}>{item?.maintitle}</Link>
                          )}
                        </li>
                      )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
