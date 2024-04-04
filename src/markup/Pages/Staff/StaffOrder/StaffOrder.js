import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../../../../images/background/adminStaffBackground.jpg';

export default function StaffOrder() {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Success');
    const accessToken = localStorage.getItem('accessToken');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleViewDetail = (orderId) => {
        navigate(`/staff/staff-order-detail/${orderId}`);
    };

    useEffect(() => {
        setLoading(true);
        const fetchOrders = async () => {
            try {
                const response = await fetch(`https://www.kidpro-production.somee.com/api/v1/orders?status=${selectedStatus}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }

                const data = await response.json();
                console.log('data: ', data);
                setOrders(data);
            } catch (error) {
                console.error('There was an error fetching the orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [selectedStatus, accessToken]);
    return (
        <div className='staff-order mx-5'>
            <div className="d-flex justify-content between">
                <div className="staff-order-menu d-flex justify-content-start">
                    <div className={selectedStatus === 'Success' ? 'active' : ''} onClick={() => setSelectedStatus('Success')}>
                        <p className='mb-1'>Success</p>
                        <hr className='mt-0' />
                    </div>
                    <div style={{ marginLeft: '15px' }} className={selectedStatus === 'Pending' ? 'active' : ''} onClick={() => setSelectedStatus('Pending')}>
                        <p className='mb-1'>Pending</p>
                        <hr className='mt-0' />
                    </div>
                    <div style={{ marginLeft: '15px' }} className={selectedStatus === 'Refunded' ? 'active' : ''} onClick={() => setSelectedStatus('Refunded')}>
                        <p className='mb-1'>Refunded</p>
                        <hr className='mt-0' />
                    </div>
                    <div style={{ marginLeft: '15px' }} className={selectedStatus === 'RequestRefund' ? 'active' : ''} onClick={() => setSelectedStatus('RequestRefund')}>
                        <p className='mb-1'>Request Refund</p>
                        <hr className='mt-0' />
                    </div>
                </div>
            </div>
            <div className="staff-order-content">
                <input type="text" placeholder='Enter order id' />
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr style={{ backgroundColor: '#1A9CB7' }}>
                                <th>Course-Quantity</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <React.Fragment key={order.orderId} >
                                        {/* Row for parentName and orderCode */}
                                        <tr>
                                            <td >
                                                <div>
                                                    <p className='mb-1'>{order.parentName}</p>
                                                    <p className='mb-1'>{order.courseName}</p>
                                                    <p className='mb-1'>x {order.quantity}</p>
                                                </div>
                                            </td>
                                            <td className='text-center mt-2'>
                                                <p className='mt-2 mb-0'>{order.totalPrice}</p>
                                            </td>
                                            <td className='text-center mt-2'>
                                                <p className='mt-2 mb-0'>{order.orderStatus}</p>
                                            </td>
                                            <td className='text-center'>
                                                <p className='mb-1'>Order code: {order.orderCode}</p>
                                                <button onClick={() => handleViewDetail(order.orderId)} className='mt-2' style={{ backgroundColor: '#FFA63D', color: 'white', border: 'none', borderRadius: '8px' }}>View detail</button>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div >
        </div >
    )
}
