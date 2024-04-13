import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import background from './../../images/background/orderBackground.jpg';
import momo from './../../images/icon/momo.png';
import demo from './../../images/gallery/simp.jpg';
import PageTitle from '../Layout/PageTitle';

export default function OrderDetail() {
    const { orderId } = useParams();
    console.log('orderId: ', orderId);

    const [orderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');

    const PendingOrder = () => {
        const OrderCancel = () => {
            navigate(`/order-cancel/${orderId}`);
        };
        return (
            <div className="container">
                <div className='order-item'>
                    <div className="header d-flex justify-content-between">
                        <div className="d-flex justify-content-start">
                            <p>Order code: </p>
                            <p>{orderDetails.orderCode}</p>
                        </div>
                        <span style={{ backgroundColor: '#FF8A00', color: 'white' }}>Pending</span>
                    </div>
                    <div className="content d-flex">
                        <img src={demo} alt="" />
                        <p>{orderDetails.courseName}</p>
                        <p style={{ color: '#FF8A00' }}>Price: {orderDetails.price} đ</p>
                        <p>Quantity purchased: {orderDetails.quantityPurchased}</p>
                        <span className='text-center p-1' style={{ backgroundColor: '#1A9CB7', color: 'white', borderRadius: '5px', width: '200px' }}>creating a course account</span>
                    </div>
                </div>
                <div className="order-id row">
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <p>Transaction Code: {orderDetails.transactionCode}</p>
                        <p>Order Date: {orderDetails.orderDate}</p>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6 d-flex'>
                        <img src={momo} alt="" style={{ height: '50px', width: '50px' }} />
                <p className='ms-3 mt-2'>Pay with momo e-wallet</p>
                    </div>
                </div>
                <div className="order-info row">
                    <div className="order-select col-lg-6">
                        <div className='order-select-content'>

                            <div className='d-flex justify-content-start'>
                                <p>Number of children selected:</p>
                                <p> {orderDetails.numberChildren}</p>
                            </div>

                            {orderDetails.students && orderDetails.students.map((student, index) => (
                                <div className="d-flex justify-content-center">
                                    <div key={index} className='item text-center' style={index > 0 ? { marginTop: '10px' } : {}}>
                                        <p className='mb'>{student.studentName}</p>
                                    </div>
                                </div>
                            ))}

                            <p className='mt-2 mb-3'>Child's account will send to:</p>
                            <div className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{ width: '60%', border: '1px solid #1A9CB7', borderRadius: '5px', padding: '5px 0', }}>
                                    <i style={{ color: '#FF8A00', fontSize: '20px' }} class="fa-regular fa-envelope"></i>
                                    <p style={{ marginLeft: '5px' }} className='mb'>{orderDetails.parentEmail}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-info-content col-lg-6 col-md-12 col-sm-12">
                        <div>
                            <h5>Order information</h5>
                            <div className='d-flex justify-content-between'>
                                <p>Course</p>
                                <p>{orderDetails.courseName}</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p>Price</p>
                                <p>{orderDetails.price} đ</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p>Discount</p>
                                <p>0 đ</p>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between'>
                                <p>Total</p>
                                <p>{orderDetails.totalPrice} đ</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button onClick={OrderCancel}>CANCEL ORDER</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const SuccessOrder = () => {
        const Repurchase = () => {
            navigate(`/courses`);
        };

        return (
            <div className="container">
                <div className='order-item'>
                    <div className="header d-flex justify-content-between">
                        <div className="d-flex justify-content-start">
                            <p>Order code: </p>
                            <p>{orderDetails.orderCode}</p>
                        </div>
                        <span style={{ backgroundColor: '#6DCE63', color: 'white' }}>Success</span>
                    </div>
                    <div className="content d-flex">
                        <img src={demo} alt="" />
                        <p>{orderDetails.courseName}</p>
                        <p style={{ color: '#FF8A00' }}>Price: {orderDetails.price} đ</p>
                        <p>Quantity purchased: {orderDetails.quantityPurchased}</p>
                    </div>
                </div>
                <div className="order-id row">
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <p>Transaction Code: {orderDetails.transactionCode}</p>
                        <p>Order Date: {orderDetails.orderDate}</p>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6 d-flex'>
                        <img src={momo} alt="" style={{ height: '50px', width: '50px' }} />
                        <p className='ms-3 mt-2'>Pay with momo e-wallet</p>
                    </div>
                </div>
                <div className="order-info row">
                    <div className="order-select col-lg-6">
                        <div className='order-select-content'>

                            <div className='d-flex justify-content-start'>
                                <p>Number of children selected:</p>
                                <p> {orderDetails.numberChildren}</p>
                            </div>

                            {orderDetails.students && orderDetails.students.map((student, index) => (
                                <div className="d-flex justify-content-center">
                                    <div key={index} className='item text-center' style={index > 0 ? { marginTop: '10px' } : {}}>
                                        <p className='mb'>{student.studentName}</p>
                                    </div>
                                </div>
                            ))}

                            <p>Child's account will send to:</p>
                            <div className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{ width: '60%', border: '1px solid #1A9CB7', borderRadius: '5px', padding: '5px 0', }}>
                                    <i style={{ color: '#FF8A00', fontSize: '20px' }} class="fa-regular fa-envelope"></i>
                                    <p style={{ marginLeft: '5px' }} className='mb'>{orderDetails.parentEmail}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-info-content col-lg-6 col-md-12 col-sm-12">
                        <div>
                            <h5>Order information</h5>
                            <div className='d-flex justify-content-between'>
                                <p>Course</p>
                                <p>{orderDetails.courseName}</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p>Price</p>
                                <p>{orderDetails.price} đ</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p>Discount</p>
                                <p>0 đ</p>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between'>
                                <p>Total</p>
                                <p>{orderDetails.totalPrice} đ</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button style={{ backgroundColor: '#FF8A00' }} onClick={Repurchase}>REPURCHASE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const RequestRefundOrder = () => {
        return (
            <div className="container">
                <div className='order-item'>
                    <div className="header d-flex justify-content-between">
                        <div className="d-flex justify-content-start">
                            <p>Order code: </p>
                            <p>{orderDetails.orderCode}</p>
                        </div>
                        <span style={{ backgroundColor: '#F11616', color: 'white' }}>RequestRefund</span>
                    </div>
                    <div className="content d-flex">
                        <img src={demo} alt="" />
                        <p>{orderDetails.courseName}</p>
                        <p style={{ color: '#FF8A00' }}>Price: {orderDetails.price} đ</p>
                        <p>Quantity purchased: {orderDetails.quantityPurchased}</p>
                        <span className='text-center' style={{ backgroundColor: '#1A9CB7', color: 'white', borderRadius: '5px', width: '200px', height: '30px' }}>Approving the cancellation request</span>
                    </div>
                </div>
                <div className="order-id row">
                    <div className='col-lg-6 col-md-6 col-sm-6'>
                        <p>Transaction Code: {orderDetails.transactionCode}</p>
                        <p>Order Date: {orderDetails.orderDate}</p>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6 d-flex'>
                        <img src={momo} alt="" style={{ height: '50px', width: '50px' }} />
                        <p>Pay with momo e-wallet</p>
                    </div>
                </div>
                <div className="order-info row">
                    <div className="order-select col-lg-6">
                        <div className='order-select-content'>

                            <div className='d-flex justify-content-start'>
                                <p>Number of children selected:</p>
                                <p> {orderDetails.numberChildren}</p>
                            </div>

                            {orderDetails.students && orderDetails.students.map((student, index) => (
                                <div className="d-flex justify-content-center">
                                    <div key={index} className='item text-center' style={index > 0 ? { marginTop: '10px' } : {}}>
                                        <p className='mb'>{student.studentName}</p>
                                    </div>
                                </div>
                            ))}

                            <p>Child's account will send to:</p>
                            <div className='d-flex justify-content-center'>
                                <div className='d-flex justify-content-center' style={{ width: '60%', border: '1px solid #1A9CB7', borderRadius: '5px', padding: '5px 0', }}>
                                    <i style={{ color: '#FF8A00', fontSize: '20px' }} class="fa-regular fa-envelope"></i>
                                    <p style={{ marginLeft: '5px' }} className='mb'>{orderDetails.parentEmail}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-info-content col-lg-6 col-md-12 col-sm-12">
                        <div>
                            <h5>Order information</h5>
                            <div className='d-flex justify-content-between'>
                                <p>Course</p>
                                <p>{orderDetails.courseName}</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p>Price</p>
                                <p>{orderDetails.price} đ</p>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p>Discount</p>
                                <p>0 đ</p>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between'>
                                <p>Total</p>
                                <p>{orderDetails.totalPrice} đ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const RefundedOrder = () => {
        return (
            <div>

            </div>
        )
    }

    const renderOrderDetail = () => {
        switch (orderDetails?.status) {
            case 'Pending':
                return <PendingOrder orderDetails={orderDetails} />;
            case 'Success':
                return <SuccessOrder orderDetails={orderDetails} />;
            case 'RequestRefund':
                return <RequestRefundOrder orderDetails={orderDetails} />;
            case 'Refunded':
                return <RefundedOrder orderDetails={orderDetails} />;
            default:
                return <div>Status not recognized</div>;
        }
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            const url = `https://www.kidpro-production.somee.com/api/v1/orders/detail/${orderId}`;

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }

                const data = await response.json();

                setOrderDetails(data);
                console.log('data: ', data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    return (
        <div>
            <Header />
            <PageTitle motherMenu="Order Detail" activeMenu="Order Detail" />
            <div style={{
                backgroundImage: `url(${background})`, minHeight: '800px', backgroundPosition: 'center center', // Center the background image
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>

                {orderDetails ? renderOrderDetail() :
                    <div className='d-flex justify-content-center'>
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>

                }
            </div>

            <Footer />
        </div>
    )
}
