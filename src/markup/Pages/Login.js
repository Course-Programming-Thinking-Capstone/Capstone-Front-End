import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const notifyLoginSuccess = () => toast.success('Login successful!', {
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
        if (!isFormValid()) return;
        try {
            const response = await loginUser(email, password);
            notifyLoginSuccess();
            console.log('Login response:', response);
            // Here you can handle redirection or local storage updates based on login success
        } catch (error) {
            notifyLoginFail(error.message || "Login failed. Please try again.");
        }
    };

    const isFormValid = () => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');

        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        }
        if (password.length < 4) {
            setPasswordError('Password must be at least 4 characters long.');
            isValid = false;
        }
        return isValid;
    };

    const loginUser = async (email, password) => {
        const url = 'https://www.kidpro-production.somee.com/api/v1/authentication/login/email';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Could not log in.');
        }

        return await response.json();
    };

    return (
        <div className="login-container">
            <ToastContainer />
            <form onSubmit={handleLoginSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <div className="error">{emailError}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
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
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
