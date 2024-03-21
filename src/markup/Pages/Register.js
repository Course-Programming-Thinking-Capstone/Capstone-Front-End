import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import bg8 from './../../images/background/bg8.png'

export default function Register() {

    const [activeTab, setActiveTab] = useState('register');
    const [username, setUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const [registerMail, setRegisterMail] = useState('');
    const [loginMail, setLoginMail] = useState('');

    const [registerUsernameError, setRegisterUsernameError] = useState('');
    const [registerPasswordError, setRegisterPasswordError] = useState('');
    const [registerMailError, setRegisterPhoneError] = useState('');
    const [registerRePasswordError, setRegisterRePasswordError] = useState('');

    const [loginMailError, setLoginMailError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');

    const notifyRegisterSuccess = () => toast.success('Registration sucessfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const notifyRegisterFail = (message) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const notifyLoginFail = (message) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setLoginMailError('');
        setLoginPasswordError('');

        if (!/\S+@\S+\.\S+/.test(loginMail)) {
            setLoginMailError('Please enter a valid email address');
            return; // Stop the function here
        }

        try {
            // Corrected to use loginMail
            const response = await loginUser(loginMail, loginPassword);
            console.log("Login success", response); // Confirm login success
            const role = response.role;
            localStorage.setItem('userRole', role);
            localStorage.setItem('accessToken', response.accessToken);
            // Redirect based on role
            switch (role) {
                case "Admin":
                    window.location.href = "/admin";
                    break;
                case "Teacher":
                    window.location.href = "/teacher-account";
                    break;
                case "Staff":
                    window.location.href = "/staff";
                    break;
                case "Parent":
                    window.location.href = "/classes";
                    break;
                case "Student":
                    window.location.href = "/course-plan";
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Login failed:', error);
            if (error instanceof Error) {
                notifyLoginFail(error.message);
            } else {
                notifyLoginFail("An unknown error occurred.");
            }
        }

    };

    const isPhoneNumberValid = (phone) => {
        const cleanedPhone = phone.trim().replace(/\D/g, ''); // Remove non-digit characters and trim spaces
        return cleanedPhone.length >= 9 && cleanedPhone.length <= 13;
    };


    const isPasswordMatch = (pwd1, pwd2) => {
        return pwd1 === pwd2;
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        let isValid = true;

        // Reset error messages
        setRegisterUsernameError('');
        setRegisterPasswordError('');
        setRegisterPhoneError('');
        setRegisterRePasswordError('');

        // Validation checks
        if (username.length < 6) {
            setRegisterUsernameError('Username must be at least 6 characters.');
            isValid = false;
        }

        if (!isPasswordMatch(registerPassword, reEnteredPassword)) {
            setRegisterRePasswordError('Passwords do not match.');
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await registerUser(username, registerPassword, registerMail);
                setActiveTab('login');
            } catch (error) {
                if (error instanceof Error) {
                    notifyLoginFail(error.message);
                } else {
                    notifyLoginFail("An unknown error occurred.");
                }
            }
        }
    };

    const registerUser = async (username, registerPassword, registerMail) => {
        const url = 'https://www.kidpro-production.somee.com/api/v1/authentication/register/email';
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": registerMail,
                    "fullName": username,
                    "password": registerPassword,
                }),
            });
    
            if (!response.ok) {
                // Attempt to parse error details only if there is a response body
                const text = await response.text();
                const errorDetails = text ? JSON.parse(text) : {};
                console.error('API Error:', errorDetails);
                throw new Error(`HTTP error! Status: ${response.status}. ${errorDetails.message || ''}`);
            }
    
            console.log("success");
            // Parse and return the JSON only if there is a response body
            const text = await response.text();
            notifyRegisterSuccess();
            return text ? JSON.parse(text) : {};
        } catch (error) {
            notifyRegisterFail(error.message)
            throw error; // Re-throw the error to be handled in the calling function
        }
    };
    

    const loginUser = async (loginMail, password) => {
        const url = `https://www.kidpro-production.somee.com/api/v1/authentication/login/email`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email": loginMail,
                    "password": password
                }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                // Now log or throw the specific message you're interested in
                console.log('API Error Details:', errorDetails);
                throw new Error(`Login error: ${errorDetails.message || "Unknown error"}`);
            }
            console.log("success");

            return await response.json();
        } catch (error) {
            throw error;
        }
    };


    return (
        <div className="form-body">
            {/* Website Logo */}
            {/* <div className="website-logo">
                <a href="index.html">
                    <div className="logo">
                        <img className="logo-size" src="images/logo-light.svg" alt="Logo" />
                    </div>
                </a>
            </div> */}

            {/* Form Row */}
            <div className="row">
                {/* Image Section */}
                <div className="img-holder col-lg-6 d-none d-lg-block">
                    <div className="bg"></div>
                    <div className="info-holder">
                        <img src={bg8} alt="Info Graphic" />
                    </div>
                </div>

                {/* Form Section */}
                <div className="form-holder col-lg-6 col-md-12 col-sm-12">
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                    <div className="form-content">
                        <div className="tab-links">
                            <button
                                className={`tab-link ${activeTab === 'login' ? 'active' : ''}`}
                                onClick={() => setActiveTab('login')}
                            >
                                Login
                            </button>
                            <button
                                className={`tab-link ${activeTab === 'register' ? 'active' : ''}`}
                                onClick={() => setActiveTab('register')}
                            >
                                Register
                            </button>
                        </div>
                        <div className="form-items" style={{ minHeight: '350px' }}>
                            {activeTab === 'register' && (
                                <form onSubmit={handleRegisterSubmit}>
                                    <input className="form-control" type="text" name="name" placeholder="Your name" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                    {registerUsernameError && <div className="error-message">{registerUsernameError}</div>}
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="phone"
                                        placeholder="Your email"
                                        required
                                        value={registerMail}
                                        onChange={(e) => setRegisterMail(e.target.value)}
                                    />
                                    {registerMailError && <div className="error-message" style={{ color: 'red' }}>{registerMailError}</div>}
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        required
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                    />
                                    {registerPasswordError && <div className="error-message" style={{ color: 'red' }}>{registerPasswordError}</div>}
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="rePassword"
                                        placeholder="Re-enter password"
                                        required
                                        value={reEnteredPassword}
                                        onChange={(e) => setReEnteredPassword(e.target.value)}
                                    />
                                    {registerRePasswordError && <div className="error-message" style={{ color: 'red' }}>{registerRePasswordError}</div>}
                                    <div className="form-button">
                                        <button id="submit" type="submit" className="ibtn">Register</button>
                                    </div>
                                </form>
                            )}

                            {activeTab === 'login' && (
                                <form onSubmit={handleLoginSubmit}>
                                    <input className="form-control" type="text" placeholder="Your email" required value={loginMail} onChange={(e) => setLoginMail(e.target.value)} />
                                    {loginMailError && <div className="error-message">{loginMailError}</div>}
                                    <input
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                    />
                                    {loginPasswordError && <div className="error-message" style={{ color: 'red' }}>{loginPasswordError}</div>}
                                    <div className="form-button">
                                        <button id="submit" type="submit" className="ibtn">Login</button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}