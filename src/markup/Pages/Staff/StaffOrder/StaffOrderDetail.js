import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SuccessOrder = () => {
    return (
        <div className='staff-order-detail'>
            <h3>Order detail</h3>
            <div className='d-flex justify-content-between'>
                <div className="d-flex justify-content-start">
                    <i class="fa-solid fa-user"></i>
                    <p className="mb-0 ms-1">Parent: </p>
                    <span className='ms-2'></span>
                </div>
                <div>
                    <span>Success</span>
                </div>
            </div>
            <div>
                <div className="d-flex justify-content-start">
                    <i class="fa-solid fa-user"></i>
                    <p className="mb-0 ms-1">Teacher: </p>
                    <span className='ms-2'></span>
                </div>
                <hr />
                <div className='d-flex justify-content-between'>
                    <img src="" alt="day la hinh anh lop hoc" />
                    <p className='mb-0'></p>
                    <p>Quantity: <span></span></p>
                    <p className='orange'></p>
                </div>
            </div>
            <div className='d-flex'>
                <div>
                    <p>Order ID: <span></span></p>
                    <p>Order date: <span></span></p>
                </div>
                <div className='d-flex'>
                    <img src="" alt="momo" />
                    <p>Pay with momo e-wallet</p>
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <div style={{ width: '45%' }}>
                    <p>Number of students selected: <span></span></p>
                    <div className='d-flex justify-content-center'>
                        <div style={{ width: '50%' }}></div>
                    </div>
                    <p>Student account will send to</p>
                    <div className='d-flex justify-content-center'>
                        <div></div>
                    </div>
                </div>
                <div style={{ width: '45%' }}>
                    <p>Order information</p>
                    <div>
                        <div className="d-flex justify-content-between">
                            <span>Course</span>
                            <span></span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Price</span>
                            <span></span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Quantity</span>
                            <span></span>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Discount</span>
                            <span></span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <span>Total</span>
                            <span className='orange'></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PendingOrder = () => {
    return (
        <div>

        </div>
    );
}

const RefundedOrder = () => {
    return (
        <div>

        </div>
    );
}

export default function StaffOrderDetail() {
    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchOrderDetail = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetch(`https://www.kidpro-production.somee.com/api/v1/orders/detail/${orderId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }

                const data = await response.json();
                console.log('data: ', data);
                setOrderDetail(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [orderId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!orderDetail) return <div>No order details found</div>;

    return (
        <div>
            {orderDetail.status === 'Success' && <SuccessOrder />}
            {orderDetail.status === 'Pending' && <div>Pending Order Details</div>}
            {orderDetail.status === 'Refunded' && <div>Refunded Order Details</div>}
        </div>
    )
}
