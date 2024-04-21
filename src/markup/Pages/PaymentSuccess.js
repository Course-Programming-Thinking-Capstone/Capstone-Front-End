import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Layout/Header";
import PageTitle from "../Layout/PageTitle";
import Footer from "../Layout/Footer";
import background from "./../../images/background/paymentSuccess.jpg";
import demo from "./../../images/gallery/simp.jpg";
import momo from "./../../images/icon/momo.png";
import instance from '../../helper/apis/baseApi/baseApi';

export default function PaymentSuccess() {
    const [orderDetails, setOrderDetails] = useState(null);
    const { orderId } = useParams();

    const navigate = useNavigate();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            maximumFractionDigits: 0,  // Adjust this if you need decimal places
        }).format(price);
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await instance.get(`api/v1/orders/detail/${orderId}`);
                const data = response.data;

                console.log('data: ', data);
                setOrderDetails(data);
            } catch (error) {
                console.error('There was an error fetching the order details:', error);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    const GoBack = () => {
        navigate("/classes");
    };

    const ViewOrder = () => {
        navigate("/order");
    };

    return (
        <div>
            <Header />
            <PageTitle motherMenu="Payment success" activeMenu="Payment success" />
            <div style={{
                backgroundImage: `url(${background})`, minHeight: '800px', backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                {orderDetails ? (
                    <div className="container">
                        <div className="thanks text-center">
                            <p style={{ fontSize: '32px', color: '#ff8a00' }}><i class="fa-solid fa-circle-check"></i> Thank you for your purchase</p>
                            <p style={{ fontSize: '20px', fontWeight: '700' }}>{formatPrice(orderDetails.totalPrice)} đ</p>
                            <p style={{ fontSize: '20px', fontWeight: '400' }}>Your order code <span>{orderDetails.orderCode}</span></p>
                        </div>
    
                        <div className="thanks-info">
                            <div className="thanks-info-content">
                                <div className='d-flex justify-content-between'>
                                    <img className='img-responsive' style={{ height: '100px', width: '100px' }} src={orderDetails.pictureUrl} alt="" />
                                    <div>
                                        <p>{orderDetails.courseName}</p>
                                        <p>Quantity purchased: <span style={{ color: '#FF8A00' }}>{orderDetails.quantityPurchased}</span></p>
                                    </div>
                                    <div>
                                        <p>Course's price</p>
                                        <p>{formatPrice(orderDetails.totalPrice)} đ</p>
                                    </div>
                                    <div>
                                        <p>Payment</p>
                                        <div className="d-flex justify-content-center">
                                            <img style={{ height: '50px', width: '50px' }} src={momo} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <p style={{ marginBottom: '6px' }}>For more details about your order, please visit <span>Order</span> on the menu</p>
                                    <button onClick={ViewOrder} style={{ border: '1px solid #1A9CB7', color: '#1A9CB7', height: '27px', width: '127px' }}>View order</button>
                                </div>
                            </div>
    
                            <div className="thanks-info-contact d-flex justify-content-start">
                                <i class="fa-regular fa-envelope"></i>
                                <p>Child’s account will send to email <span>{orderDetails.parentEmail}</span></p>
                            </div>
                        </div>
    
                        <div className="d-flex justify-content-center">
                            <button onClick={GoBack} style={{ height: '48px', backgroundColor: '#FF8A00', color: 'white', border: 'none', borderRadius: '10px', width: '35%', marginTop: '30px' }}>Continue purchasing the course</button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
    
}
