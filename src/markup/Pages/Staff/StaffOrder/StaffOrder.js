import React, { useState, useEffect } from 'react';
import background from '../../../../images/background/adminStaffBackground.jpg';

export default function StaffOrder() {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Success');
    const accessToken = localStorage.getItem('accessToken');
    const [loading, setLoading] = useState(false);

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
                setLoading(false); // Set loading to false when the API call completes
            }
        };

        fetchOrders();
    }, [selectedStatus, accessToken]);
    return (
        <div className='staff-order mx-5'>
            <div className="staff-order-menu d-flex justify-content-start">
                <div className={selectedStatus === 'Success' ? 'active' : ''} onClick={() => setSelectedStatus('Success')}>
                    <p className='mb-1'>Success</p>
                    <hr />
                </div>
                <div style={{ marginLeft: '15px' }} className={selectedStatus === 'Pending' ? 'active' : ''} onClick={() => setSelectedStatus('Pending')}>
                    <p className='mb-1'>Pending</p>
                    <hr />
                </div>
                <div style={{ marginLeft: '15px' }} className={selectedStatus === 'Refunded' ? 'active' : ''} onClick={() => setSelectedStatus('Refunded')}>
                    <p className='mb-1'>Refunded</p>
                    <hr />
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
                                                    <p>{order.parentName}</p>
                                                    <p>{order.courseName}</p>
                                                    <p>x {order.quantity}</p>
                                                </div>
                                            </td>
                                            <td className='text-center'>{order.totalPrice}</td>
                                            <td className='text-center'>{order.orderStatus}</td>
                                            <td className='text-center'>
                                                <p>Order code: {order.orderCode}</p>
                                                <button style={{ backgroundColor: '#FFA63D', color: 'white', border: 'none', borderRadius: '8px' }}>View detail</button>
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
