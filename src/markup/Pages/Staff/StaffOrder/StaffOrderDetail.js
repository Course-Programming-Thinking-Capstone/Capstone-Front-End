import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import momo from "../../../../images/icon/momo.png"
import { useNavigate } from 'react-router-dom';

const SuccessOrder = ({ orderDetail }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };
    return (
        <div className='staff-order-detail mt-3 mx-5 py-3 px-5' style={{ backgroundColor: 'white' }}>
            <div className="d-flex justify-content-between">
                <h2 className='orange mb-1'>Order detail</h2>
                <div>
                    <button onClick={handleBackClick} style={{ backgroundColor: '#7F7C7C', color: 'white', border: 'none', marginRight: '10px', borderRadius: '5px' }}>Back</button>
                </div>
            </div>
            <div className='d-flex justify-content-between py-2 px-3' style={{ backgroundColor: '#eceace', borderRadius: '8px', height: '50px' }}>
                <div className="d-flex justify-content-start">
                    <i style={{ fontSize: '22px' }} class="fa-solid fa-user orange mt-2"></i>
                    <p className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>Parent: </p>
                    <span className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>{orderDetail.parentName}</span>
                </div>
                <div className='text-center' style={{ width: '100px', height: '35px' }}>
                    <div className='pt-1' style={{ backgroundColor: '#1A9CB7', borderRadius: '8px', color: 'white', width: '90px', height: '30px' }}>Success</div>
                </div>
            </div>
            <div className='mt-3 py-2 px-3' style={{ backgroundColor: '#eceace', borderRadius: '8px' }}>
                <div className="d-flex justify-content-start">
                    <i style={{ fontSize: '22px' }} class="fa-solid fa-user orange mt-2"></i>
                    <p className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>Teacher: </p>
                    <span className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>{orderDetail.parentName}</span>
                </div>
                <hr className='my-1' />
                <div className='d-flex justify-content-around' style={{ fontSize: '16px' }}>
                    <img src={orderDetail.pictureUrl} style={{ height: "80px", width: '80px' }} />
                    <p className='mb-0'>{orderDetail.courseName}</p>
                    <p>Quantity: <span>{orderDetail.quantityPurchased}</span></p>
                    <p className='orange'>{orderDetail.totalPrice} đ</p>
                </div>
            </div>
            <div className='d-flex mt-3 py-2 px-3' style={{ backgroundColor: '#eceace', borderRadius: '8px' }}>
                <div style={{ width: "60%" }}>
                    <p className='mb-1'>Order ID: <span>{orderDetail.orderId}</span></p>
                    <p className='mb-1'>Order date: <span>{orderDetail.orderDate}</span></p>
                </div>
                <div className='d-flex' style={{ width: "40%" }}>
                    <img style={{ height: '50px', width: '50px' }} src={momo} />
                    <p className='mt-2 ms-2'>Pay with momo e-wallet</p>
                </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <div style={{ width: '45%' }} className='py-2 px-3'>
                    <p style={{ backgroundColor: '#ff8a00', color: 'white', fontSize: '17px', borderRadius: '8px 8px 0px 0px' }} className='mb-0 ps-3 py-1'>Number of students selected: <span></span></p>
                    <div className='d-flex justify-content-center px-4'>
                        {orderDetail.students.map((student) => (
                            < div className='text-center py-1 my-1' style={{ width: '50%', borderRadius: '8px', border: '1px solid #ff8a00' }} key={student.studentId}>{student.studentName}</div>
                        ))}
                    </div>

                    <div className='mt-4'>
                        <p style={{ backgroundColor: '#ff8a00', color: 'white', fontSize: '17px', borderRadius: '8px 8px 0px 0px' }} className='mb-0 ps-3 py-1'>Student account will send to</p>
                        <div className='d-flex justify-content-center'>
                            <div className='text-center py-1 my-1 px-2' style={{ borderRadius: '8px', border: '1px solid #ff8a00' }} v>{orderDetail.parentEmail}</div>
                        </div>
                    </div>
                </div>
                <div style={{ width: '45%' }} className='py-2 px-3'>
                    <p style={{ backgroundColor: '#ff8a00', color: 'white', fontSize: '17px', borderRadius: '8px 8px 0px 0px' }} className='mb-1 ps-3 py-1'>Order information</p>
                    <div className='px-4'>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Course</span>
                            <span>{orderDetail.courseName}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Price</span>
                            <span>{orderDetail.price}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Quantity</span>
                            <span>{orderDetail.quantityPurchased}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Discount</span>
                            <span>0</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-2">
                            <span>Total</span>
                            <span className='orange'>{orderDetail.totalPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
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
            {orderDetail.status === 'Success' && <SuccessOrder orderDetail={orderDetail} />}
            {orderDetail.status === 'Pending' && <PendingOrder orderDetail={orderDetail} />}
            {orderDetail.status === 'Refunded' && <RefundedOrder orderDetail={orderDetail} />}
        </div>
    )
}
