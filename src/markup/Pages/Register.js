import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import background from './../../images/background/loginBackground.webp';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const [email, setEmail] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');

    const navigate = useNavigate();

    const navigateToLogin = () => navigate('/login');

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
        navigate('/verify')
        return data;
    };

    return (
        <div style={{
            backgroundImage: `url(${background})`,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>

            <div className="register-container">
                <h2 className='text-center' style={{ color: '#FF8A00' }}>Registration form</h2>
                <ToastContainer />
                <form onSubmit={handleRegisterSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        {usernameError && <div className="error text-center">{usernameError}</div>}
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {emailError && <div className="error text-center">{emailError}</div>}
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {passwordError && <div className="error text-center">{passwordError}</div>}
                    </div>
                    <div className="form-group">
                        <input type="password"
                            className="form-control"
                            id="reEnterPassword"
                            placeholder="Re-enter password"
                            value={reEnteredPassword}
                            onChange={(e) => setReEnteredPassword(e.target.value)}
                        />
                        {rePasswordError && <div className="error text-center">{rePasswordError}</div>}
                    </div>

                    <div className="d-flex justify-content-center">

                        <button type="submit">REGISTER</button>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <div className='d-flex'>
                            <p className='mb-0'>Already have an acount ?     </p>
                            <span onClick={navigateToLogin} className='ms-2' style={{ color: '#FF8A00', cursor: 'pointer' }}>     Login</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}