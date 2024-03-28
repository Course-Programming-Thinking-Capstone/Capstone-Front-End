import React from 'react'
import background from './../../images/background/loginBackground.webp';

export default function VerifyEmailConfirm() {

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
                <h3 className='text-center' style={{ color: '#FF8A00' }}>We are verifying your email address</h3>

                <div className="d-flex justify-content-center">
                    <div class="spinner-border text-warning" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div className="text-center mt-3">

                    <p>You are one step away from enjoy our service </p>
                </div>
            </div>
        </div>
    )
}
