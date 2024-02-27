import React from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import background from './../../images/background/orderBackground.jpg';
import momo from './../../images/icon/momo.png';
import PageTitle from '../Layout/PageTitle';

export default function OrderDetail() {
    return (
        <div>
            <Header />
            <PageTitle motherMenu="Order Detail" activeMenu="Order Detail" />
            <div style={{
                backgroundImage: `url(${background})`, minHeight: '800px', backgroundPosition: 'center center', // Center the background image
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>

                <div className="container">
                    <div className='order-item'>
                        <div className="header d-flex">
                            <p><i class="fa-solid fa-user"></i>   Teacher: </p>
                            <p>Nguyễn Ngọc Lâm</p>
                            <span>Sucess</span>
                        </div>
                        <div className="content d-flex">
                            <img src="" alt="" />
                            <p>What is programming?</p>
                            <p>Age: 7+</p>
                            <p>100.000 đ</p>
                        </div>
                    </div>
                    <div className="order-id row">
                        <div className='col-lg-6 col-md-6 col-sm-6'>
                            <p>Order ID: 123456</p>
                            <p>Order Date: 18/02/2024 20:05</p>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 d-flex'>
                            <img src={momo} alt="" style={{ height: '50px', width: '50px' }} />
                            <p>Pay with momo e-wallet</p>
                        </div>
                    </div>
                    <div className="order-info row">
                        <div className="order-select col-lg-6">
                            <div className='order-select-content'>

                                <div className='d-flex'>
                                    <p>Number of children selected:</p>
                                    <span>2</span>
                                </div>
                                <div>
                                    <p>Ronaldo</p>
                                    <p>Messi</p>
                                </div>
                                <p>Child's account will send to:</p>
                                <div className='d-flex'>
                                    <i class="fa-regular fa-envelope"></i>
                                    <p>anvip321@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-info-content col-lg-6 col-md-12 col-sm-12">
                            <div>
                                <h5>Order information</h5>
                                <div className='d-flex justify-content-between'>
                                    <p>Course</p>
                                    <p>What is programming?</p>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <p>Price</p>
                                    <p>100.000 đ</p>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <p>Discount</p>
                                    <p>0 đ</p>
                                </div>
                                <hr />
                                <div className='d-flex justify-content-between'>
                                    <p>Total</p>
                                    <p>100.000 đ</p>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button>REPURCHASE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
