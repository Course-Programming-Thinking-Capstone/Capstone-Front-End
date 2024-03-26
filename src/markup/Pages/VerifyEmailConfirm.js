import React from 'react'

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
                <img style={{ height: '200px', width: '200px' }} className='img-responsive' src={gmail} alt="" />
            </div>
            <p>To complete your profile and start taking business rides with KidsPro, you'll need to verify your email address. </p>
            <div className="d-flex justify-content-center">
                <button onClick={() => window.open("https://mail.google.com/mail/", "_blank")}>VERIFY</button>
            </div>
        </div>
    </div>
  )
}
