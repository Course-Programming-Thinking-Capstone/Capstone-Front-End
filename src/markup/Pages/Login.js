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
      }).then(res => res.json());
      
      if (response.accessToken && response.role) {
        localStorage.setItem("accessToken", response.accessToken);

        //store user information
        const user = {
          role: response.role,
          fullName: response.fullName,
          pictureUrl: response.pictureUrl,
          email: response.email,
          id: response.id,
        };

        localStorage.setItem("user", JSON.stringify(user));

        switch (response.role) {
          case "Admin":
            window.location.href = "/admin";
            break;
          case "Teacher":
            window.location.href = "/teacher";
            break;
          case "Staff":
            window.location.href = "/staff";
            break;
          case "Student":
            window.location.href = "/courses-plan";
            break;
          // Add more cases as needed for different roles
          default:
            window.location.href = "/";
            break;
        }
      } else {
        throw new Error("Missing role or accessToken in the response");
      }
    } catch (error) {
      if (error.response) {
        console.log(`Error response: ${error.response?.data?.message}`);
        notifyLoginFail(
          error.response?.data?.message || "Login failed. Please try again."
        );
      } else {
        console.log(`Error message abc: ${error.message}`);
        notifyLoginFail(error.message || "Login failed. Please try again.");
      }
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
