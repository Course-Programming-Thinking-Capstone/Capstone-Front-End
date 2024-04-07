import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import background from "./../../../images/background/adminStaffBackground.jpg";
import Game from "./Game/Game";
import Syllabus from "./Syllabus/SyllabusAd";

export default function Admin() {
  const [activeContent, setActiveContent] = useState("");
  const [activeItem, setActiveItem] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleMenuItemClick = (content) => {
    setActiveContent(content);
    setActiveItem(content);
    navigate(`/admin/${content.toLowerCase()}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeContent) {
      case "Notification":
        return <div></div>;
      case "Dashboard":
        return <div></div>;
      case "Certificate":
        return <div>Your orders...</div>;
      case "User":
        return <div>Class information...</div>;
      case "Course":
        return <div>Course details...</div>;
      case "Game":
        return <Game />;
      case "Order":
        return <div>Course details...</div>;
      case "Syllabus":
        return <Syllabus />;
      default:
        return <div>Select a menu item to see the content</div>;
    }
  };

  const getItemClass = (itemName) => {
    return `item d-flex justify-content-start ${
      activeItem === itemName ? "active" : ""
    }`;
  };

  return (
    <div>
      <div className="staff row">
        <div className="menu col-lg-2">
          <div className="logo text-center">
            <h5>KidsPro</h5>
          </div>
          <div>
            <div
              className={getItemClass("Notification")}
              onClick={() => handleMenuItemClick("Notification")}
            >
              <i className="fa-solid fa-bell"></i>
              <span>Notification</span>
            </div>
            <div
              className={getItemClass("Dashboard")}
              onClick={() => handleMenuItemClick("Dashboard")}
            >
              <i className="fa-solid fa-chart-line"></i>
              <span>Dashboard</span>
            </div>
            <div
              className={getItemClass("Certificate")}
              onClick={() => handleMenuItemClick("Certificate")}
            >
              <i className="fa-solid fa-medal"></i>
              <span>Certificate</span>
            </div>
            <div
              className={getItemClass("User")}
              onClick={() => handleMenuItemClick("User")}
            >
              <i className="fa-solid fa-user"></i>
              <span>User</span>
            </div>
            <div
              className={getItemClass("Course")}
              onClick={() => handleMenuItemClick("Course")}
            >
              <i className="fa-solid fa-book"></i>
              <span>Course</span>
            </div>
            <div
              className={getItemClass("Game")}
              onClick={() => handleMenuItemClick("Game")}
            >
              <i className="fa-solid fa-gamepad"></i>
              <span>Game</span>
            </div>
            <div
              className={getItemClass("Order")}
              onClick={() => handleMenuItemClick("Order")}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Order</span>
            </div>
            <div
              className={getItemClass("SyllabusAd")}
              onClick={() => handleMenuItemClick("SyllabusAd")}
            >
              <i className="fa-solid fa-book"></i>
              <span>Syllabus</span>
            </div>
            <div className="item" onClick={handleLogout}>
              <i className="fa-solid fa-book"></i>
              <span>Log out</span>
            </div>
          </div>
        </div>

        <div
          className="col-lg-10"
          style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
