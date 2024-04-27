import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import demo from "../../../images/gallery/demo.jpg";
import simp from "../../../images/gallery/simp.jpg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import StaffOrder from "./StaffOrder/StaffOrder";
import background from "./../../../images/background/adminStaffBackground.jpg";
import instance from "../../../helper/apis/baseApi/baseApi";

export default function Staff() {
  const [activeContent, setActiveContent] = useState("");
  const [activeItem, setActiveItem] = useState("");
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  const navigate = useNavigate();

  const handleMenuItemClick = (path) => {
    navigate(`/staff/${path.toLowerCase()}`); // Adjust path as needed
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear the local storage
    navigate("/login"); // Navigate to login page
  };

  const getItemClass = (itemName) => {
    return `item d-flex justify-content-start ${activeItem === itemName ? "active" : ""
      }`;
  };


  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    let activePath = pathSegments[2]?.toLowerCase(); // Convert path segment to lowercase
    let activeMenu;

    if (activePath === "staff-order") {
      activeMenu = "Order";
    } else if (activePath === "staff-notification") {
      activeMenu = "Notification";
    } else {
      activeMenu = activePath
        ? activePath.charAt(0).toUpperCase() + activePath.slice(1)
        : "";
    }

    console.log("Active Menu Item:", activeMenu);
    console.log("Path:", activePath);

    setActiveItem(activeMenu);
  }, [location]);

  const fetchUnreadCount = async () => {
    try {
      const response = await instance.get('api/v1/notifications/account/number-of-unread');
      setUnreadCount(response.data);  // Ensure this is getting an integer
      console.log('Initial unread count fetched:', response.data);
    } catch (error) {
      console.error('Error fetching unread notifications count:', error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, []);

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
              onClick={() => handleMenuItemClick("staff-notification")}
            >
              <div style={{ position: 'relative' }}>
                <i class="fa-solid fa-bell"></i>
                {unreadCount > 0 && <div className="notification-badge">{unreadCount}</div>}
                <span>Notification</span>
              </div>

            </div>

            <div
              className={getItemClass("Moderating")}
              onClick={() => handleMenuItemClick("Moderating")}
            >
              <i class="fa-solid fa-circle-stop"></i>
              <span>Moderating</span>
            </div>
            <div
              className={getItemClass("Order")}
              onClick={() => handleMenuItemClick("staff-order")}
            >
              <i class="fa-solid fa-cart-shopping"></i>
              <span>Order</span>
            </div>
            <div
              className={getItemClass("Class")}
              onClick={() => handleMenuItemClick("Class")}
            >
              <i class="fa-solid fa-user"></i>
              <span>Class</span>
            </div>
            <div
              className={getItemClass("Course")}
              onClick={() => handleMenuItemClick("Course")}
            >
              <i class="fa-solid fa-book"></i>
              <span>Course</span>
            </div>
            <div
              className="item d-flex justify-content-start"
              onClick={handleLogout}
            >
              <i class="fa-solid fa-right-from-bracket"></i>
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
