import React, { useState } from 'react';
import Header from '../Layout/Header'
import PageTitle from '../Layout/PageTitle'
import Footer from '../Layout/Footer'
import background from './../../images/background/accountBackground.jpg';
import shield from './../../images/icon/shieldLock.jpg'

const EmailVerification = ({ onBack }) => {
    return (
        <div className='verification-email'>
            <div className="d-flex justify-content-center">
                <img src={shield} alt="" />
            </div>
            <p className="text-center">
                We will send the code to your Email
            </p>
            <div className='d-flex dis justify-content-center'>
                <div className="d-flex justify-content-start">
                    <i class="fa-regular fa-envelope"></i>
                    <p>long88ka@gmail.com</p>
                </div>
            </div>
            <div className="code d-flex justify-content-center">
                <div className="d-flex justify-content-between">
                    <input type="number" placeholder='6 numbers' />
                    <button>Send code</button>
                </div>
            </div>
            <div className="d-flex justify-content-center">

                <button onClick={onBack}>Verify code</button>
            </div>
            <div className="d-flex justify-content-center">

                <button className='another' onClick={onBack}>Verify via another way</button>
            </div>
        </div>
    );
};

const PhoneVerification = ({ onBack }) => {
    return (
        <div>
            <div className='verification-email'>
                <div className="d-flex justify-content-center">
                    <img src={shield} alt="" />
                </div>
                <p className="text-center">
                    We will send the code to your phone number
                </p>
                <div className='d-flex dis2 justify-content-center'>
                    <div className="d-flex justify-content-start">
                    
                        <i className="fa-solid fa-mobile-alt"></i>
                        <p>09123123123</p>
                    </div>
                </div>
                <div className="code d-flex justify-content-center">
                    <div className="d-flex justify-content-between">
                        <input type="number" placeholder='6 numbers' />
                        <button>Send code</button>
                    </div>
                </div>
                <div className="d-flex justify-content-center">

                    <button onClick={onBack}>Verify code</button>
                </div>
                <div className="d-flex justify-content-center">

                    <button className='another' onClick={onBack}>Verify via another way</button>
                </div>
            </div>
        </div>
    );
};

export default function Verification() {

    const [verificationMethod, setVerificationMethod] = useState('initial');

    const handleBack = () => {
        setVerificationMethod('initial');
    };

    return (
        <div>
            <Header />
            <PageTitle />
            <div style={{
                backgroundImage: `url(${background})`, minHeight: '800px', backgroundPosition: 'center center', // Center the background image
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="container">
                    <h3>Security Verification</h3>
                    <div className="verification">
                        {verificationMethod === 'initial' && (
                            <>
                                <div className="d-flex justify-content-center">
                                    <img src={shield} alt="" />
                                </div>
                                <p className="text-center">
                                    To protect your account, we need to verify your identity.
                                </p>
                                <p className="text-center">
                                    Please choose verification method:
                                </p>
                                <div className="d-flex justify-content-center">
                                    <button onClick={() => setVerificationMethod('email')}><i className="fa-regular fa-envelope"></i>Verify via Email</button>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button onClick={() => setVerificationMethod('phone')}><i class="fa-solid fa-mobile-screen-button"></i>Verify via SMS</button>
                                </div>
                            </>
                        )}
                        {verificationMethod === 'email' && <EmailVerification onBack={handleBack} />}
                        {verificationMethod === 'phone' && <PhoneVerification onBack={handleBack} />}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
