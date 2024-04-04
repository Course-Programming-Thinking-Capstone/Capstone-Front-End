import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import momo from "../../../../images/icon/momo.png"
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                    <div className=' px-4'>
                        {orderDetail.students.map((student) => (
                            <div key={student.studentId} className='d-flex justify-content-center'>
                                <div className='text-center py-1 my-1' style={{ width: '50%', borderRadius: '8px', border: '1px solid #ff8a00' }}>{student.studentName}</div>
                            </div>
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

const PendingOrder = ({ orderDetail }) => {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [show, setShow] = useState(false);
    const [currentStudentId, setCurrentStudentId] = useState(null);
    const [currentStudentDetail, setCurrentStudentDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    const handleBackClick = () => {
        navigate(-1);
    };

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

    const handleClose = () => {
        setShow(false);
        setCurrentStudentId(null);
    };
    const handleShow = (studentId) => {
        setShow(true);
        setCurrentStudentId(studentId);
    };

    const requestEmailForStudent = async (parentId, studentName) => {
        const url = `https://www.kidpro-production.somee.com/api/v1/staffs/parent/request-email?parentId=${parentId}&studentName=${encodeURIComponent(studentName)}`;
        try {
            const response = await fetch(url, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                // If your API does require a body, make sure it's correctly stringified
                // body: JSON.stringify({ parentId, studentName }),
            });

            // First, check if the response status is OK; if not, throw an error before attempting to parse JSON
            if (!response.ok) {
                // You might get more detailed error info in the body, attempt to parse it
                let errorMessage = 'Request failed with status: ' + response.status;
                try {
                    const errorResponse = await response.json(); // Attempt to parse error response
                    errorMessage += '. Message: ' + errorResponse.message; // Customize with actual error message field
                } catch (parseError) {
                    // If parsing fails, stick with the original error message
                }
                throw new Error(errorMessage);
            }

            // Now, safely assume the response is JSON (but you could double-check with response headers)
            const data = await response.json();
            console.log(data); // Debugging: Log the response data

            // Display success message
            toast.success('Request create email successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.error('Error:', error);
            // Handle/display error message with toast
            toast.error(error.message || 'Error requesting email creation', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };



    useEffect(() => {
        const fetchStudentDetails = async () => {
            if (currentStudentId) {
                setLoading(true);
                try {
                    const response = await fetch(`https://www.kidpro-production.somee.com/api/v1/students/detail/${currentStudentId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Could not fetch student details');
                    }
                    const studentData = await response.json();
                    console.log('data: ', studentData);
                    setCurrentStudentDetail(studentData);
                } catch (error) {
                    console.error("Error fetching student details:", error);
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchStudentDetails();
    }, [currentStudentId]);

    const buttonStyle = isChecked ? { backgroundColor: '#F15C58', color: 'white', borderRadius: '8px', border: 'none', height: '40px', width: '200px' } : { backgroundColor: 'gray', color: 'white', borderRadius: '8px', border: 'none', height: '40px', width: '200px' };

    return (
        <div className='staff-order-detail mt-3 mx-5 py-3 px-5' style={{ backgroundColor: 'white' }}>
            <div className="d-flex justify-content-between">
                <h2 className='orange mb-1'>Order detail</h2>
                <div>
                    <button onClick={handleBackClick} style={{ backgroundColor: '#7F7C7C', color: 'white', border: 'none', borderRadius: '5px' }}>Back</button>
                </div>
            </div>
            <div className='d-flex justify-content-between py-2 px-3' style={{ backgroundColor: '#eceace', borderRadius: '8px', height: '50px' }}>
                <div className="d-flex justify-content-start">
                    <i style={{ fontSize: '22px' }} class="fa-solid fa-user orange mt-2"></i>
                    <p className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>Parent: </p>
                    <span className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>{orderDetail.parentName}</span>
                </div>
                <div className='text-center' style={{ width: '100px', height: '35px' }}>
                    <div className='pt-1' style={{ backgroundColor: '#FF8A00', borderRadius: '8px', color: 'white', width: '90px', height: '30px' }}>Pending</div>
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
                    <div className='px-4'>
                        {orderDetail.students.map((student) => (
                            <div key={student.studentId} className='d-flex justify-content-center'>
                                <div className='text-center py-1 my-1' style={{ width: '50%', borderRadius: '8px', border: '1px solid #ff8a00' }}>{student.studentName}</div>
                                <div className='ms-2 ps-1 pt-2'>
                                    <i onClick={() => handleShow(student.studentId)} style={{ fontSize: '18px', color: '#1A9CB7', cursor: 'pointer' }} class="fa-solid fa-pen-to-square"></i>
                                </div>
                            </div>
                        ))}
                        <ToastContainer />
                        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                            <Modal.Body>
                                {loading && <div>Loading...</div>}
                                {currentStudentDetail && (
                                    <div>
                                        <h4 className='orange mb-1'>Student's information</h4>
                                        <div className='px-3'>
                                            <p className='mb-1 blue'>Student's name</p>
                                            <div style={{ backgroundColor: '#D4D4D4' }}>{currentStudentDetail.fullName}</div>
                                            <p className='mb-1 blue'>Date of birth</p>
                                            <div style={{ backgroundColor: '#D4D4D4' }}>{currentStudentDetail.dateOfBirth}</div>
                                            <p className='mb-1 blue'>Email</p>
                                            <div>{currentStudentDetail.email ?
                                                (
                                                    <div style={{ backgroundColor: '#D4D4D4' }}>{currentStudentDetail.email}</div>
                                                ) : (
                                                    <button onClick={() => requestEmailForStudent(orderDetail.parentId, currentStudentDetail.fullName)} style={{ backgroundColor: '#FF8A00', border: 'none', borderRadius: '8px', color: 'white', height: '35px', width: '200px' }}>Request to create email</button>
                                                )
                                            }</div>
                                        </div>

                                        <h4 className='orange mb-1 mt-2'>Create account</h4>
                                        <div className='px-3'>
                                            <p className='mb-1 blue'>Username</p>
                                            <input type="text" placeholder='Username' />
                                            <p className='mb-1 blue'>Password</p>
                                            <input type="text" placeholder='Password' />
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <button onClick={handleClose}>Cancel</button>
                                            <button onClick={handleClose}>Create</button>
                                        </div>
                                    </div>
                                )}
                            </Modal.Body>
                        </Modal>
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
            <div className="d-flex justify-content-center">
                <div className="d-flex justify-content-start">
                    <i
                        className={isChecked ? "fa-solid fa-square-check mt-1" : "fa-regular fa-square mt-1"}
                        style={{ fontSize: '18px', cursor: 'pointer' }}
                        onClick={toggleCheck}
                    ></i>
                    <p className='mb-1 ms-2'>Đã tạo đủ tài khoản cho trẻ và gửi tài khoản đến cho phụ huynh thông qua phương thức đã chọn</p>
                </div>
            </div>
            <div className='d-flex justify-content-end'>
                <button
                    style={buttonStyle}
                    disabled={!isChecked}
                    onClick={() => { /* handle confirmation action here if needed */ }}
                >
                    Order confirmation
                </button>
            </div>
        </div >
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

    if (loading) return
    <div class="d-flex justify-content-center">
        <div class="spinner-border text-warning" role="status" style={{ width: '100px', height: "100px" }}>
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
        ;
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
