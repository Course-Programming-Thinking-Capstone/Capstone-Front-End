import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import background from "./../../../images/background/adminStaffBackground.jpg";
import "./Admin.css";
import { useDispatch } from "react-redux";
import { changeAdminActiveMenu } from "../../../store/slices/menu/menuSlice";
import "./Admin.css";
import {
  adminActiveMenuSelector,
} from "../../../store/selector";
import { useSelector } from "react-redux";

export default function Admin() {
  const [activeContent, setActiveContent] = useState("");
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeMenu = useSelector(adminActiveMenuSelector);

  const handleMenuItemClick = (content) => {
    setActiveContent(content);
    setActiveItem(content);
    dispatch(changeAdminActiveMenu({ adminActiveMenu: content }));
    navigate(`/admin/${content?.toLowerCase()}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/home");
  };


  const getItemClass = (itemName) => {
    return `item d-flex justify-content-start align-items-center mt-3 mb-0 admin-menu-item ${activeMenu === itemName ? "active" : ""
      }`;
  };

  return (
    <div>
      <div className="staff row">
        <div className="menu col-lg-2 admin-menu-container">
          <div className="logo text-center mb-5">
            <h5>KidsPro</h5>
          </div>
          <div>
            {/* <div
              className={getItemClass("Notification")}
              onClick={() => handleMenuItemClick("Notification")}
            >
              <i className="fa-solid fa-bell"></i>
              <span>Notification</span>
            </div> */}
            <div
              className={getItemClass("Dashboard")}
              onClick={() => handleMenuItemClick("Dashboard")}
            >
              <i className="fa-solid fa-chart-line"></i>
              <span>Dashboard</span>
            </div>
            <div
              className={getItemClass("Course")}
              onClick={() => handleMenuItemClick("Course")}
            >
              <i className="fa-solid fa-book" style={{ fontSize: "18px" }}></i>
              <span>Course</span>
            </div>
            <div
              className={getItemClass("Certificate")}
            // onClick={() => handleMenuItemClick("Certificate")}
            >
              <i className="fa-solid fa-medal" style={{ fontSize: "18px" }}></i>
              <span>Certificate</span>
            </div>
            <div
              className={getItemClass("User")}
              onClick={() => handleMenuItemClick("User")}
            >
              <i className="fa-solid fa-user" style={{ fontSize: "18px" }}></i>
              <span>User</span>
            </div>
            <div
              className={getItemClass("Game")}
              onClick={() => handleMenuItemClick("Game")}
            >
              <i
                className="fa-solid fa-gamepad"
                style={{ fontSize: "18px" }}
              ></i>
              <span>Game</span>
            </div>
            <div
              className={getItemClass("Order")}
            // onClick={() => handleMenuItemClick("Order")}
            >
              <i
                className="fa-solid fa-cart-shopping"
                style={{ fontSize: "18px" }}
              ></i>
              <span>Order</span>
            </div>
            <div
              className={getItemClass("SyllabusAd")}
              onClick={() => handleMenuItemClick("SyllabusAd")}
            >
              <i className="fa-solid fa-book" style={{ fontSize: "18px" }}></i>
              <span>Syllabus</span>
            </div>

            <div
              className="item d-flex justify-content-start align-items-center mt-3 admin-menu-item"
              onClick={handleLogout}
            >
              <i
                className="fa-solid fa-right-from-bracket "
                style={{ fontSize: "18px" }}
              ></i>
              <div className="mx-4">Log out</div>
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
