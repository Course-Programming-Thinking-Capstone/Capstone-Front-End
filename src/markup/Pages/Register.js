import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const [email, setEmail] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');

    const notifyRegisterSuccess = () => toast.success('Registration successful!', {
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

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        if (!isFormValid()) return;
        try {
            const response = await registerUser(username, password, email, reEnteredPassword);
            notifyRegisterSuccess();
        } catch (error) {
            notifyRegisterFail(error.message || "Registration failed. Please try again.");
        }
    };

    const isFormValid = () => {
        let isValid = true;
        setUsernameError('');
        setPasswordError('');
        setEmailError('');
        setRePasswordError('');

        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        }
        if (username.length < 3) {
            setUsernameError('Username must be at least 3 characters long.');
            isValid = false;
        }
        if (password.length < 4) {
            setPasswordError('Password must be at least 4 characters long.');
            isValid = false;
        }
        if (password !== reEnteredPassword) {
            setRePasswordError('Passwords do not match.');
            isValid = false;
        }
        return isValid;
    };

    const registerUser = async (username, password, email, rePassword) => {
        const url = 'https://www.kidpro-production.somee.com/api/v1/authentication/register/email';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                fullName: username,
                password,
                rePassword
            }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Could not register user.');
        }
        return data;
    };

    return (
        <div className="register-container">
            <ToastContainer />
            <form onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    {usernameError && <div className="error">{usernameError}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {emailError && <div className="error">{emailError}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {passwordError && <div className="error">{passwordError}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="reEnterPassword">Re-enter Password</label>
                    <input type="password"
                        className="form-control"
                        id="reEnterPassword"
                        placeholder="Re-enter Password"
                        value={reEnteredPassword}
                        onChange={(e) => setReEnteredPassword(e.target.value)}
                    />
                    {rePasswordError && <div className="error">{rePasswordError}</div>}
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}