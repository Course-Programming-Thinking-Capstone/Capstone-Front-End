import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import background from "./../../images/background/loginBackground.webp";
import CenterSliderHome3 from "../Element/CenterSliderHome3";
import instance from "../../helper/apis/baseApi/baseApi";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function VerifyEmailConfirm() {
  const { email, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!email || !token) {
      console.error("Email and token are required.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await instance.get(`api/v1/authentication/confirm/check/Email=${encodeURIComponent(email)}&Token=${token}`);
        console.log(response.data);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    verifyEmail();
  }, [email, token]);

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        display: 'flex', // Added this
        flexDirection: 'column', // Added this, use 'row' if you want horizontal layout
        justifyContent: 'center', // This will center the content vertically
        alignItems: 'center', // This will center the content horizontally
        backgroundImage: `url(${background})`,
        minHeight: "100vh",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="verify col-lg-4 col-md-8 col-sm-12">
        <h3 className="text-center" style={{ color: "#FF8A00" }}>
          Your account has been activated, please login to our web for further
          service
        </h3>
        <div className="d-flex justify-content-center">
          <button
            style={{
              backgroundColor: "#FF8A00",
              border: "none",
              borderRadius: "8px",
              color: "white",
            }}
            onClick={navigateToLogin}
          >
            Login now
          </button>
        </div>
      </div>
    </div>
  );
}
