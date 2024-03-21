import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import background from './../../images/background/orderBackground.jpg';
import momo from './../../images/icon/momo.png';
import PageTitle from '../Layout/PageTitle';
import Modal from 'react-bootstrap/Modal';
import demo from './../../images/gallery/simp.jpg';
import Button from 'react-bootstrap/Button';

export default function OrderCancel() {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem('accessToken');
    const [selectedReason, setSelectedReason] = useState('');
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelectedReason(event.target.value);
    };

    const [policyChecked, setPolicyChecked] = useState('false');

    const togglePolicyChecked = () => {
        setPolicyChecked(!policyChecked); // This will toggle the state between true and false
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            setLoading(true);
            const url = `https://www.kidpro-production.somee.com/api/v1/orders/detail?orderId=${orderId}`;

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
                console.log('data: ', data);
                setOrderDetails(data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const cancelOrder = async () => {
        const fullReason = `${selectedReason} ${inputValue}`.trim(); // Combine the reasons

        try {
            const response = await fetch('https://www.kidpro-production.somee.com/api/v1/orders/cancel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // Ensure accessToken is valid
                },
                body: JSON.stringify({
                    orderId: Number(orderId), // Make sure orderId is a number
                    reason: fullReason, // Combined reason
                }),
            });

            const data = await response.json(); // Parse JSON response

            if (!response.ok) {
                // If response status code is not OK, log the message
                console.error(data.message);
                throw new Error(data.message || 'Failed to cancel order');
            }

            // Handle success scenario
            console.log(data); // You might want to show a success message or redirect the user
            handleClose(); // Close modal if open
            // Potentially navigate back or show a success message
        } catch (error) {
            console.error('Error cancelling order:', error);
            // Handle error (e.g., show an error message)
        }
    };


    return (
        <div>
            <Header />
            <PageTitle motherMenu="Cancel order" activeMenu="Cancel order" />
            <div style={{
                backgroundImage: `url(${background})`, minHeight: '800px', backgroundPosition: 'center center', // Center the background image
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                {loading ? (
                    <div className="d-flex justify-content-center">

                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : orderDetails ? (
                    <div className="container">
                        <div className="order-cancel">
                            <div className="d-flex justify-content-between">
                                <div className="header d-flex justify-content-start">
                                    <p style={{ marginBottomBottom: '6px', marginLeft: '20px', paddingTop: '15px' }}>Order code: {orderDetails.orderCode} </p>
                                </div>
                                <select name="reason" id="reason-select" value={selectedReason} onChange={handleSelectChange} style={{ height: '35px' }}>
                                    <option value="">Select the reason</option>
                                    <option value="Muốn thay đổi hình thức thanh toán">Muốn thay đổi hình thức thanh toán</option>
                                    <option value="Muốn thay đổi thông tin trẻ">Muốn thay đổi thông tin trẻ</option>
                                    <option value="Muốn mua khóa học khác">Muốn mua khóa học khác</option>
                                    <option value="Chưa áp dụng voucher giảm giá">Chưa áp dụng voucher giảm giá</option>
                                    <option value="Thay đổi ý, không mua nữa">Thay đổi ý, không mua nữa</option>
                                </select>
                            </div>
                            <div className="content d-flex justify-content-between" style={{ paddingLeft: 40 }}>
                                <img style={{ marginTop: 20, height: '75px', width: '75px', borderRadius: '10px' }} src={demo} alt="" className="content-image" />
                                <div className="info">
                                    <p className='mt-3'>{orderDetails.courseName}</p>
                                    <p>Quantity: {orderDetails.quantityPurchased}</p>
                                </div>
                                <p className="price mt-3">200.000 đ</p>
                                <div className="payment-method d-flex mt-3">
                                    <img style={{ width: '50px', height: '50px', marginBottom: 30 }} src={momo} alt="momo" className="payment-logo" />
                                    <p style={{ marginBottom: 20 }}>Pay with momo e-wallet</p>
                                </div>
                            </div>
                        </div>


                        <div className="order-cancel-policy row">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className='order-cancel-info'>
                                    <div className='d-flex justify-content-start'>

                                        <h5 className='mb'>More information</h5>
                                        <span>(Optional)</span>
                                    </div>
                                    <textarea
                                        placeholder="Write the reason for order cancel"
                                        value={inputValue}
                                        onChange={handleChange}
                                        maxLength="256"
                                        className="form-control w-100"
                                        style={{ minHeight: '300px' }}
                                    ></textarea>

                                    <div className='d-flex justify-content-end'>
                                        {inputValue.length}/256
                                    </div>
                                </div>

                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="order-policy-content">
                                    <h5 className='mb'>Order cancellation policy</h5>
                                    <div className="order-policy-stripe">
                                        <p>1. Chúng tôi sẽ không thể khôi phục lại đơn hàng đã hủy.</p>
                                        <p>2. Yêu cầu hủy đơn sẽ được quản lý xét duyệt trong vòng 30 phút.</p>
                                        <p>3. Kết quả xét duyệt sẽ được gửi về thông báo trong hộp thư.</p>
                                        <p>4. Nếu đơn hàng được xác nhận hủy thành công, tiền sẽ hoàng về ví điện tử mà khách hàng đã thanh toán trong khoảng 3-5 ngày.</p>
                                        <p>5. Mỗi khách hàng chỉ được phép hủy đơn hàng 3 lần/tháng.</p>
                                    </div>
                                    <div className="d-flex justify-content-start checked">

                                        {policyChecked ?
                                            <i className="fa-solid fa-square-check" style={{ color: '#FF8A00', fontSize: '30px' }} onClick={togglePolicyChecked}></i> :
                                            <i className="fa-regular fa-square" style={{ fontSize: '30px' }} onClick={togglePolicyChecked}></i>
                                        }
                                        <p className='mb'>Tôi đã hiểu và đồng ý với chính sách hủy của KidsPro</p>
                                    </div>
                                    <div className="d-flex justify-content-end">

                                        <button onClick={handleShow} className={policyChecked ? 'button-enabled' : 'button-disabled'}>
                                            CANCEL ORDER
                                        </button>
                                    </div>
                                    <Modal show={show} onHide={handleClose} >

                                        <h5 className='text-center' style={{ marginTop: '30px', fontSize: '20px' }}>Are you sure you want to cancel this order?</h5>

                                        <div className="d-flex justify-content-around" style={{ marginBottom: '30px', marginTop: '20px' }}>
                                            <Button variant="secondary" onClick={handleClose}>
                                                No
                                            </Button>
                                            <Button variant="danger" onClick={cancelOrder} >
                                                Yes
                                            </Button>
                                        </div>

                                    </Modal>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>No order details found.</div>
                )}
            </div>

            <Footer />
        </div>
    )
}
