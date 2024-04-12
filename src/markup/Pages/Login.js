import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import background from "./../../images/background/loginBackground.webp";
import { loginApi } from "../../helper/apis/auth/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const navigateToRegister = () => navigate("/register");

  const notifyLoginFail = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) return;

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const loginData = isEmail ? { email: email, password: password } : { account: email, password: password };
    try {
      const apiUrl = isEmail
        ? "https://www.kidpro-production.somee.com/api/v1/authentication/login/email"
        : "https://www.kidpro-production.somee.com/api/v1/authentication/login/account";

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      // Check if the response was successful
      if (!response.ok) {
        const errorText = await response.text(); // Try to read text instead of JSON
        throw new Error(errorText || "Something went wrong");
      }

      const responseData = await response.json();
      console.log('responseData: ', responseData);
      const user = {
        role: responseData.role,
        fullName: responseData.fullName,
        avatarUrl: responseData.avatarUrl,
        email: responseData.email,
        gender: responseData.gender,
        point: responseData.point,
      };

      localStorage.setItem("user", JSON.stringify(user));

      localStorage.setItem("accessToken", responseData.accessToken);

      switch (responseData.role) {
        case "Admin":
          navigate("/admin")
          break;
        case "Staff":
          navigate("/staff")
          break;
        case "Parent":
          navigate("/home")
          break;
        case "Teacher":
          navigate("/teacher")
          break;
        case "Student":
          navigate("/student-home")
          break;
        default:

          break;
      }

    } catch (error) {
      console.error(`Error: ${error.message}`);
      notifyLoginFail(error.message);
    }
  };

  const isFormValid = () => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters long.");
      isValid = false;
    }
    return isValid;
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="login-container">
        <h2 className="text-center" style={{ color: "#FF8A00" }}>
          Login form
        </h2>
        <ToastContainer />
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="error">{emailError}</div>}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <div className="error">{passwordError}</div>}
          </div>

          <div className="d-flex justify-content-center mt-5">
            <button type="submit">Login</button>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <div className="d-flex">
              <p className="mb-0">Do not have an acount ? </p>
              <span
                onClick={navigateToRegister}
                className="ms-2"
                style={{ color: "#FF8A00", cursor: "pointer" }}
              >
                {" "}
                Register
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
