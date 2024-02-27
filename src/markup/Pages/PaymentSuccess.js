import React from 'react'
import Header from '../Layout/Header'
import PageTitle from '../Layout/PageTitle'
import Footer from '../Layout/Footer'
import background from './../../images/background/paymentSuccess.jpg';

export default function PaymentSuccess() {
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
                    <div className="thanks text-center">
                        <p style={{ fontSize: '32px', color: '#ff8a00' }}><i class="fa-solid fa-circle-check"></i>   Thank you for your purchase</p>
                        <p style={{ fontSize: '20px', fontWeight: '700' }}>đ 200.000</p>
                        <p style={{ fontSize: '20px', fontWeight: '400' }}>Your order code: <span>123123123</span></p>
                    </div>

                    <div className="thanks-info">
                        <div className="thanks-info-content">
                            <div className='d-flex'>
                                <img src="" alt="" />
                                <div>
                                    <p>What is programming?</p>
                                    <p>Quantity: <span style={{color: '#FF8A00'}}>2</span></p>
                                </div>
                                <div>
                                    <p>Teacher</p>
                                    <p>LamNN</p>
                                </div>
                                <div>
                                    <p>Price</p>
                                    <p>200.000 đ</p>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex">
                                <p style={{marginBottom: '6px'}}>For more details about your order, please visit <span>Order</span> on the menu</p>
                                <button style={{border: '1px solid #1A9CB7', color: '#1A9CB7', height: '27px', width: '127px'}}>View order</button>
                            </div>
                        </div>

                        <div className="thanks-info-contact d-flex justify-content-start">
                            <i class="fa-regular fa-envelope"></i>
                            <p>Child’s account will send to email <span>Long88ka@gmail.com</span></p>
                        </div>

                    </div>

                    <div className="d-flex justify-content-center">
                        <button style={{height: '48px', backgroundColor: '#FF8A00', color: 'white', border: 'none', borderRadius: '10px', width: '35%', marginTop: '30px'}}>Continue purchasing the course</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
