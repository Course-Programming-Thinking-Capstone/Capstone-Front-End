import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../../../../images/background/adminStaffBackground.jpg';

export default function StaffOrder() {
    const [orders, setOrders] = useState([]);
    const [ordersTotal, setOrdersTotal] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Success');
    const accessToken = localStorage.getItem('accessToken');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleViewDetail = (orderId) => {
        navigate(`/staff/staff-order-detail/${orderId}`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Success':
                return '#1A9CB7';
            case 'Pending':
                return '#FF8A00';
            case 'Refunded':
                return '#2C44D8';
            case 'RequestRefund':
                return '#F11616';
            default:
                return '#6c757d';
        }
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

                const data = await response.data;
                console.log('data: ', data);
                setOrders(data.order);
                setOrdersTotal(data.orderTotal)
            } catch (error) {
                console.error('There was an error fetching the orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [selectedStatus, accessToken]);
    return (
        <div className='staff-order mx-5' style={{ borderRadius: '15px' }}>
            <div className="d-flex justify-content between">
                <div className="staff-order-menu d-flex justify-content-start">
                    <div className={selectedStatus === 'Success' ? 'active' : ''} onClick={() => setSelectedStatus('Success')}>
                        <p style={{ fontSize: '18px', fontWeight: 'bold' }} className='mb-1'>Success</p>
                        <hr className='mt-0' />
                    </div>
                    <div style={{ marginLeft: '25px' }} className={selectedStatus === 'Pending' ? 'active' : ''} onClick={() => setSelectedStatus('Pending')}>
                        <p className='mb-1' style={{ fontSize: '18px', fontWeight: 'bold' }}>Pending</p>
                        <hr className='mt-0' />
                    </div>
                    <div style={{ marginLeft: '25px' }} className={selectedStatus === 'Refunded' ? 'active' : ''} onClick={() => setSelectedStatus('Refunded')}>
                        <p className='mb-1' style={{ fontSize: '18px', fontWeight: 'bold' }}>Refunded</p>
                        <hr className='mt-0' />
                    </div>
                    <div style={{ marginLeft: '25px' }} className={selectedStatus === 'RequestRefund' ? 'active' : ''} onClick={() => setSelectedStatus('RequestRefund')}>
                        <p className='mb-1' style={{ fontSize: '18px', fontWeight: 'bold' }}>Request Refund</p>
                        <hr className='mt-0' />
                    </div>
                </div>
            </div>
            <div className="staff-order-content">
                <div className="d-flex justify-content-between">
                    <div className='d-flex justify-content-start'>
                        <div className='pt-1' style={{ fontWeight: 'bold', backgroundColor: '#FFA63D', borderRadius: '5px', color: 'white', height: '30px', width: '150px', textAlign: 'center', fontSize: '16px' }}>Enter order code</div>
                        <input style={{ outline: 'none', borderRadius: '8px', border: '1px solid #FFA63D', width: '400px' }} className='ms-3' type="text" />
                    </div>
                    <div className='text-center pt-1' style={{ border: '1px solid #F25B58', borderRadius: '8px', color: '#F25B58', width: '120px', fontWeight: 'bold' }}>{ordersTotal} Orders</div>
                </div>
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
                                                <p style={{ color: getStatusColor(order.orderStatus), fontWeight: 'bold' }} className='mt-2 mb-0'>{order.orderStatus}</p>
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
