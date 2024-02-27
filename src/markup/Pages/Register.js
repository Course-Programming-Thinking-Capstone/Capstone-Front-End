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
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loginPhone, setLoginPhone] = useState('');

    const [registerUsernameError, setRegisterUsernameError] = useState('');
    const [registerPasswordError, setRegisterPasswordError] = useState('');
    const [registerPhoneError, setRegisterPhoneError] = useState('');
    const [registerRePasswordError, setRegisterRePasswordError] = useState('');

    const [loginPhoneError, setLoginPhoneError] = useState('');
    const [loginPasswordError, setLoginPasswordError] = useState('');

    const notifyRegisterSuccess = () => toast.success('Registration successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const notifyRegisterFail = () => toast.error('Registration failed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const notifyLoginSuccess = () => toast.success('Login successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const notifyLoginFail = () => toast.error('Login failed', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const validatePassword = (pwd) => {
        const hasNumbers = /\d/.test(pwd);
        const hasLetters = /[a-zA-Z]/.test(pwd);
        return hasNumbers && hasLetters;
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setLoginPhoneError('');
        setLoginPasswordError('');

        if (validatePassword(loginPassword)) {
            console.log("Login success");
            try {
                const response = await loginUser(loginPhone, loginPassword);
                console.log("Registration success", response);
                const role = response.role;
                localStorage.setItem('userRole', role);
                localStorage.setItem('accessToken', response.accessToken);
                switch (role) {
                    case "Admin":
                        window.location.href = "/dashboard";
                        break;
                    case "Teacher":
                        window.location.href = "/";
                        break;
                    case "Staff":
                        window.location.href = "/";
                        break;
                    case "Children":
                        window.location.href = "/";
                        break;
                    default:
                        break;
                }
                
                notifyLoginSuccess();
            } catch (error) {
                // Handle registration errors here, e.g., showing an error message to the user
                notifyLoginFail();
                console.error('Registration failed:', error);
            }
        } else {
            setLoginPasswordError('Username or password is incorrect');
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

        if (!validatePassword(registerPassword)) {
            setRegisterPasswordError('Password must contain both letters and numbers.');
            isValid = false;
        }

        if (!isPhoneNumberValid(phoneNumber)) {
            setRegisterPhoneError('Phone number must be between 9 and 13 digits.');
            isValid = false;
        }

        if (!isPasswordMatch(registerPassword, reEnteredPassword)) {
            setRegisterRePasswordError('Passwords do not match.');
            isValid = false;
        }



        // Proceed to register user if all validations are passed
        if (isValid) {
            try {
                const response = await registerUser(username, registerPassword, phoneNumber);
                console.log("Registration success", response);
                setActiveTab('login');
                notifyRegisterSuccess();
            } catch (error) {
                // Handle registration errors here, e.g., showing an error message to the user
                notifyRegisterFail();
                console.error('Registration failed:', error);
            }
        }
    };

    const registerUser = async (fullName, password, phoneNumber) => {
        const url = 'https://kidpro-production.somee.com/api/v1/authenticate/register';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName,
                    password,
                    phoneNumber
                }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error('API Error:', errorDetails);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log("success");

            return await response.json();
        } catch (error) {
            throw error; // Re-throw the error to be handled in the calling function
        }
    };

    const loginUser = async (phoneNumber, password) => {
        const url = `https://kidpro-production.somee.com/api/v1/authenticate/login?phonenumber=${phoneNumber}&password=${password}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber,
                    password
                }),
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                console.error('API Error:', errorDetails);
                throw new Error(`HTTP error! Status: ${response.status}`);
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
                            {/* Conditional Rendering of Forms */}
                            {activeTab === 'register' && (
                                <form onSubmit={handleRegisterSubmit}>
                                    <input className="form-control" type="text" name="name" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                    {registerUsernameError && <div className="error-message">{registerUsernameError}</div>}
                                    {/* ... other inputs ... */}
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="phone"
                                        placeholder="Phone number"
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                    {registerPhoneError && <div className="error-message" style={{ color: 'red' }}>{registerPhoneError}</div>}
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
                                    <input className="form-control" type="number" placeholder="Phone number" required value={loginPhone} onChange={(e) => setLoginPhone(e.target.value)} />
                                    {loginPhoneError && <div className="error-message">{loginPhoneError}</div>}
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