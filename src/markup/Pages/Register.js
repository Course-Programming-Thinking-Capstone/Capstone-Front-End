import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import background from "./../../images/background/loginBackground.webp";
import instance from "../../helper/apis/baseApi/baseApi";
import { Spinner } from "react-bootstrap";
import { register } from "../../helper/apis/auth/auth";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const navigateToLogin = () => navigate("/login");

  const notifyRegisterSuccess = () =>
    toast.success("Registration successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeButton: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyRegisterFail = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeButton: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const checkPasswordFormat = (input) => {
    var regex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(input);
  }

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) return;
    try {
      setIsLoading(true);
      // const response = await registerUser(
      //   username,
      //   password,
      //   email,
      //   reEnteredPassword
      // );

      // const response = await instance.post(
      //   `api/v1/authentication/register/email`,
      //   { email, fullName: username, password, rePassword: reEnteredPassword }
      // );

      const data = await register({ email: email, fullName: username, password: password, rePassword: reEnteredPassword });

      navigate("/verify");
      return data;
    } catch (error) {
      let errorMessage;
      if (error.response) {

        errorMessage = error.response?.data?.message || "Register fail.";
      } else {

        errorMessage = error.message || "Register fail.";
      }

      notifyRegisterFail(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    let isValid = true;
    setUsernameError("");
    setPasswordError("");
    setEmailError("");
    setRePasswordError("");

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long.");
      isValid = false;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      isValid = false;
    } else if (!checkPasswordFormat(password)) {
      setPasswordError("Password must contain both letters and numbers.");
      isValid = false;
    }
    if (password !== reEnteredPassword) {
      setRePasswordError("Passwords do not match.");
      isValid = false;
    }



    return isValid;
  };

  const registerUser = async (username, password, email, rePassword) => {
    try {
      const response = await instance.post(
        `api/v1/authentication/register/email`,
        { email, fullName: username, password, rePassword }
      );

      const data = response.data;
      navigate("/verify");
      return data;
    } catch (error) {
      let errorMessage = null;
      if (error.response) {

        errorMessage = error.response?.data?.message || "Register fail.";
      } else {

        errorMessage = error.message || "Register fail.";
      }
      notifyRegisterFail(errorMessage);
    }
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
      <div className="register-container col-lg-4 col-md-8 col-sm-12">
        <h2 className="text-center" style={{ color: "#FF8A00" }}>
          Register
        </h2>
        <ToastContainer />
        <form onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter fullname"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && (
              <div className="error text-start">{usernameError}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="error text-start">{emailError}</div>}
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
            {passwordError && (
              <div className="error text-start">{passwordError}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="reEnterPassword"
              placeholder="Re-enter password"
              value={reEnteredPassword}
              onChange={(e) => setReEnteredPassword(e.target.value)}
            />
            {rePasswordError && (
              <div className="error text-start">{rePasswordError}</div>
            )}
          </div>

          <div className="d-flex justify-content-center align-items-center mt-3">
            <button type="submit">
              <div className="d-flex justify-content-center align-items-center">
                {isLoading ? (
                  <Spinner
                    animation="border"
                    variant="light"
                    style={{ fontSize: "14px" }}
                  />
                ) : (
                  <>Register</>
                )}
              </div>
            </button>
          </div>

          <div className="d-flex justify-content-center mt-3">
            <div className="d-flex">
              <p className="mb-0">Already have an acount ? </p>
              <span
                onClick={navigateToLogin}
                className="ms-2"
                style={{ color: "#FF8A00", cursor: "pointer" }}
              >
                {" "}
                Login
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
