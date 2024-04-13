import React from 'react'
import background from './../../images/background/loginBackground.webp';
import gmail from './../../images/icon/gmail.jpg';
import { useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login");
    }
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
            <div className="verify">
                <h3 className='text-center' style={{ color: '#FF8A00' }}>Verify your email address</h3>

                <div className="d-flex justify-content-center">
                    <img style={{ height: '200px', width: '200px' }} className='img-responsive' src={gmail} alt="" />
                </div>
                <p>To complete your profile and start taking business rides with KidsPro, please check your email to verify your account. </p>
                <div className="d-flex justify-content-center">
                    <button onClick={navigateToLogin}>LOGIN NOW</button>
                </div>
            </div>
        </div>
    )
}
