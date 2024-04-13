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
        <div className='staff-order-detail mt-3 mx-5 py-3 px-5' style={{ backgroundColor: 'white', height: '690px', overflow: 'scroll' }}>
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
                    <p className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>Order code </p>
                    <span className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>{orderDetail.orderCode}</span>
                </div>
                <hr className='my-1' />
                <div className='d-flex' style={{ fontSize: '16px' }}>
                    <img className='ms-3' src={orderDetail.pictureUrl} style={{ height: "80px", width: '80px' }} />
                    <div className='ms-4'>
                        <p className='mb-2'>{orderDetail.courseName}</p>
                        <p className='mb-0'>Class: <span style={{ fontWeight: 'bold', color: '#E53E5C' }}>{orderDetail.classCode}</span></p>
                    </div>
                    <p style={{ marginLeft: '130px' }}>Quantity: <span>{orderDetail.quantityPurchased}</span></p>
                    <p className='orange' style={{ marginLeft: '130px', fontWeight: 'bold' }}>{orderDetail.totalPrice} đ</p>
                </div>
            </div>
            <div className='d-flex mt-3 py-2 px-3' style={{ backgroundColor: '#eceace', borderRadius: '8px' }}>
                <div style={{ width: "60%" }}>
                    <p className='mb-1'>Transaction code: <span>{orderDetail.transactionCode}</span></p>
                    <p className='mb-1'>Order date: <span>{orderDetail.orderDate}</span></p>
                </div>
                <div className='d-flex' style={{ width: "40%" }}>
                    <img style={{ height: '55px', width: '55px' }} src={momo} />
                    <p className='mt-3 ms-2'>Pay with momo e-wallet</p>
                </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <div style={{ width: '45%' }} className='py-2 px-3'>
                    <p style={{ backgroundColor: '#ff8a00', color: 'white', fontSize: '17px', borderRadius: '8px 8px 0px 0px' }} className='mb-0 ps-3 py-1'>Number of students selected: <span></span></p>
                    <div className=' px-4'>
                        {orderDetail.students.map((student) => (
                            <div key={student.studentId} className='d-flex justify-content-center'>
                                <div className='text-center py-1 mt-3' style={{ width: '50%', borderRadius: '8px', border: '1px solid #ff8a00' }}>{student.studentName}</div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-4'>
                        <p style={{ backgroundColor: '#ff8a00', color: 'white', fontSize: '17px', borderRadius: '8px 8px 0px 0px' }} className='mb-0 ps-3 py-1'>Student account will send to</p>
                        <div className='d-flex justify-content-center'>
                            <div className='text-center py-1 mt-3 px-2' style={{ borderRadius: '8px', border: '1px solid #ff8a00' }}>{orderDetail.parentEmail}</div>
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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const accessToken = localStorage.getItem('accessToken');
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [accountCreationResponse, setAccountCreationResponse] = useState(null);
    const [note, setNote] = useState('');

    const [creatingAccountLoading, setCreatingAccountLoading] = useState(false);
    const [requestingEmailLoading, setRequestingEmailLoading] = useState(false);
    const [sendingEmailLoading, setSendingEmailLoading] = useState(false);
    const [confirmingOrderLoading, setConfirmingOrderLoading] = useState(false);


    const handleBackClick = () => {
        navigate(-1);
    };

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

    const handleClose = () => {
        setShow(false);
        setShowSecondModal(false);
        setCurrentStudentId(null);
    };

    const handleShow = (studentId) => {
        setShow(true);
        setCurrentStudentId(studentId);
    };

    const requestEmailForStudent = async (parentId, studentName) => {
        setRequestingEmailLoading(true);
        const url = `https://www.kidpro-production.somee.com/api/v1/staffs/parent/request-email?parentId=${parentId}&studentName=${encodeURIComponent(studentName)}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain',
                },
            });

            if (!response.ok) {
                throw new Error('Request failed with status: ' + response.status);
            }

            // Since the response is plain text, use response.text() instead of response.data
            const message = await response.text();
            console.log(message); // Log the plain text message

            // Display success message
            toast.success(message, { // Use the message from the response for the toast
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
            toast.error('Error requesting email creation: ' + error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setRequestingEmailLoading(false); // End loading
        }
    };

    const createStudentAccount = async () => {
        if (!username || !password) {
            toast.warn('Please fill in username and password', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return; // Stop the function execution here
        }

        setCreatingAccountLoading(true);

        const url = `https://www.kidpro-production.somee.com/api/v1/staffs/student`;
        const payload = {
            studendId: currentStudentId,
            userName: username,
            password: password,
            orderId: orderDetail.orderId,
            classId: orderDetail.classId
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Account creation failed with status: ' + response.status);
            }

            setUsername('');
            setPassword('');

            const accountData = await response.json();
            console.log('Account created: ', accountData);

            // Store the account creation response data
            setAccountCreationResponse(accountData);

            setShow(false);

            // Open the second modal
            setShowSecondModal(true);

            toast.success('Account created successfully', {
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
            toast.error('Error creating account: ' + error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setCreatingAccountLoading(false); // End loading
        }
    };

    const handleSendEmail = async () => {
        setSendingEmailLoading(true)
        const url = `https://www.kidpro-production.somee.com/api/v1/staffs/parent/send-email`;
        const payload = {
            studentName: accountCreationResponse.studentName,
            birthday: accountCreationResponse.birthday,
            account: accountCreationResponse.account,
            password: accountCreationResponse.password,
            note: note,
            email: accountCreationResponse.email,
            parentId: orderDetail.parentId,
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Email sending failed with status: ' + response.status);
            }
            setShowSecondModal(false);
            setAccountCreationResponse(null);

            window.location.reload();

        } catch (error) {
            console.error('Error:', error);
            toast.error('Error sending email: ' + error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setSendingEmailLoading(false);
        }
    };

    const handleOrderConfirmation = async () => {
        setConfirmingOrderLoading(true);
        const url = `https://www.kidpro-production.somee.com/api/v1/orders/confirm/${orderDetail.orderId}`;

        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Order confirmation failed with status: ${response.status}`);
            }

            window.location.reload();

        } catch (error) {
            console.error('Error confirming order:', error);
            toast.error(`Error confirming order: ${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } finally {
            setConfirmingOrderLoading(false);
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
                    console.log('StudentData: ', studentData);
                    setCurrentStudentDetail(studentData);
                } catch (error) {
                    console.error("Error fetching student details:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchStudentDetails();
    }, [currentStudentId]);

    const buttonStyle = isChecked ? { backgroundColor: '#F15C58', color: 'white', borderRadius: '8px', border: 'none', height: '40px', width: '200px' } : { backgroundColor: 'gray', color: 'white', borderRadius: '8px', border: 'none', height: '40px', width: '200px' };

    return (
        <div className='staff-order-detail mt-3 mx-5 py-3 px-5' style={{ backgroundColor: 'white', height: '690px', overflow: 'scroll' }}>
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
                    <p className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>Order code </p>
                    <span className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>{orderDetail.orderCode}</span>
                </div>
                <hr className='my-1' />
                <div className='d-flex' style={{ fontSize: '16px' }}>
                    <img className='ms-3' src={orderDetail.pictureUrl} style={{ height: "80px", width: '80px' }} />
                    <div className='ms-4'>
                        <p className='mb-2'>{orderDetail.courseName}</p>
                        <p className='mb-0'>Class: <span style={{ fontWeight: 'bold', color: '#E53E5C' }}>{orderDetail.classCode}</span></p>
                    </div>
                    <p style={{ marginLeft: '130px' }}>Quantity: <span>{orderDetail.quantityPurchased}</span></p>
                    <p className='orange' style={{ marginLeft: '130px', fontWeight: 'bold' }}>{orderDetail.totalPrice} đ</p>
                </div>
            </div>
            <div className='d-flex mt-3 py-2 px-3' style={{ backgroundColor: '#eceace', borderRadius: '8px' }}>
                <div style={{ width: "60%" }}>
                    <p className='mb-1'>Transaction code: <span>{orderDetail.transactionCode}</span></p>
                    <p className='mb-1'>Order date: <span>{orderDetail.orderDate}</span></p>
                </div>
                <div className='d-flex' style={{ width: "40%" }}>
                    <img style={{ height: '55px', width: '55px' }} src={momo} />
                    <p className='mt-3 ms-2'>Pay with momo e-wallet</p>
                </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <div style={{ width: '45%' }} className='py-2 px-3'>
                    <p style={{ backgroundColor: '#ff8a00', color: 'white', fontSize: '17px', borderRadius: '8px 8px 0px 0px' }} className='mb-0 ps-3 py-1'>Number of students selected: <span></span></p>
                    <div className='px-4'>
                        {orderDetail.students.map((student) => (
                            <div key={student.studentId} className='d-flex justify-content-center align-items-center mt-3'>
                                <div className='text-center py-1' style={{ width: '50%', borderRadius: '8px', border: '1px solid #ff8a00' }}>
                                    {student.studentName}
                                </div>
                                {student.userName === null && (
                                    <div className='ms-2'>
                                        <i onClick={() => handleShow(student.studentId)} style={{ fontSize: '18px', color: '#1A9CB7', cursor: 'pointer' }} className="fa-solid fa-pen-to-square"></i>
                                    </div>
                                )}
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
                                            <div className='ps-2 py-2' style={{ backgroundColor: '#D4D4D4', borderRadius: '8px' }}>{currentStudentDetail.fullName}</div>
                                            <p className='mb-1 blue'>Date of birth</p>
                                            <div className='ps-2 py-2' style={{ backgroundColor: '#D4D4D4', borderRadius: '8px' }}>{currentStudentDetail.dateOfBirth}</div>
                                            <p className='mb-1 blue'>Email</p>
                                            <div>{currentStudentDetail.email ?
                                                (
                                                    <div style={{ backgroundColor: '#D4D4D4' }}>{currentStudentDetail.email}</div>
                                                ) : (
                                                    <button onClick={() => requestEmailForStudent(orderDetail.parentId, currentStudentDetail.fullName)} style={{ backgroundColor: '#FF8A00', border: 'none', borderRadius: '8px', color: 'white', height: '35px', width: '200px' }}>
                                                        {requestingEmailLoading ? (
                                                            <div className="spinner-border text-light" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        ) : (
                                                            "Request to create email"
                                                        )}
                                                    </button>
                                                )
                                            }</div>
                                        </div>

                                        <h4 className='orange mb-1 mt-2'>Create account</h4>
                                        <div className='px-3'>
                                            <p className='mb-1 blue'>Username</p>
                                            <input className='ps-1 py-1' style={{ outline: 'none', border: '1px solid #FF8A00', borderRadius: '8px' }} type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                                            <p className='mb-1 blue'>Password</p>
                                            <input className='ps-1 py-1' style={{ outline: 'none', border: '1px solid #FF8A00', borderRadius: '8px' }} type="text" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <button className='me-3' style={{ backgroundColor: 'white', color: '#F15C58', border: 'none', borderRadius: '8px', height: '30px', width: '100px' }} onClick={handleClose}>Cancel</button>

                                            <button style={{ backgroundColor: '#F15C58', color: 'white', border: 'none', borderRadius: '8px', height: '30px', width: '100px' }} onClick={createStudentAccount}>
                                                {creatingAccountLoading ? (
                                                    <div className="spinner-border text-light" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                ) : (
                                                    "Create"
                                                )}
                                            </button>

                                        </div>
                                    </div>
                                )}
                            </Modal.Body>
                        </Modal>
                        <Modal backdrop="static" show={showSecondModal} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                            <Modal.Body>
                                {loading && <div>Loading...</div>}
                                {accountCreationResponse && (
                                    <div>
                                        <p className='mb-1 blue'>Student information</p>
                                        <div className='ps-3'>
                                            <div className="d-flex justify-content-start">
                                                <p>Student's name: </p>
                                                <p className='ms-3'>{accountCreationResponse.studentName}</p>
                                            </div>
                                            <div className="d-flex justify-content-start">
                                                <p>Date of birth: </p>
                                                <p className='ms-3'>{accountCreationResponse.birthday}</p>
                                            </div>
                                            <div className="d-flex justify-content-start">
                                                <p>Username: </p>
                                                <p className='ms-3' style={{ color: '#E53E5C' }}>{accountCreationResponse.account}</p>
                                            </div>
                                            <div className="d-flex justify-content-start">
                                                <p>Password: </p>
                                                <p className='ms-3' style={{ color: '#E53E5C' }}>{accountCreationResponse.password}</p>
                                            </div>
                                            <div>
                                                <p>Note: </p>
                                                <textarea
                                                    value={note}
                                                    onChange={(e) => setNote(e.target.value)}
                                                    rows="3"
                                                    style={{ width: '100%', outline: 'none', border: '1px solid #FF8A00' }}></textarea>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <p className='mb-1 blue'>Send to email account: </p>
                                            <span className='ms-3 px-2 py-2' style={{ color: '#FF8A00', border: '1px solid #FF8A00', borderRadius: '8px' }}>{accountCreationResponse.email}</span>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <button className='mt-3' onClick={handleSendEmail} style={{ backgroundColor: '#F15C58', color: 'white', border: 'none', borderRadius: '8px', height: '30px', width: '100px' }}>
                                                {sendingEmailLoading ? (
                                                    <div className="spinner-border text-light" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                ) : (
                                                    "Send"
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Modal.Body>
                        </Modal>
                    </div>

                    <div className='mt-4'>
                        <p style={{ backgroundColor: '#ff8a00', color: 'white', fontSize: '17px', borderRadius: '8px 8px 0px 0px' }} className='mb-0 ps-3 py-1'>Student account will send to</p>
                        <div className='d-flex justify-content-center'>
                            <div className='text-center py-1 mt-3 px-2' style={{ borderRadius: '8px', border: '1px solid #ff8a00' }} v>{orderDetail.parentEmail}</div>
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
                    onClick={handleOrderConfirmation}
                >
                    {confirmingOrderLoading ? (
                        <div className="spinner-border text-light" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        "Order confirmation"
                    )}
                </button>
            </div>
        </div >
    );
}

const RefundedOrder = ({ orderDetail }) => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className='staff-order-detail mt-3 mx-5 py-3 px-5' style={{ backgroundColor: 'white', height: '690px', overflow: 'scroll' }}>
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
                    <div className='pt-1' style={{ backgroundColor: '#2C44D8', borderRadius: '8px', color: 'white', width: '90px', height: '30px' }}>Refunded</div>
                </div>
            </div>
            <div className='mt-3 py-2 px-3' style={{ backgroundColor: '#eceace', borderRadius: '8px' }}>
                <div className="d-flex justify-content-start">
                    <p className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>Order code </p>
                    <span className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>{orderDetail.orderCode}</span>
                </div>
                <hr className='my-1' />
                <div className='d-flex' style={{ fontSize: '16px' }}>
                    <img className='ms-3' src={orderDetail.pictureUrl} style={{ height: "80px", width: '80px' }} />
                    <div className='ms-4'>
                        <p className='mb-2'>{orderDetail.courseName}</p>
                        <p className='mb-0'>Class: <span style={{ fontWeight: 'bold', color: '#E53E5C' }}>{orderDetail.classCode}</span></p>
                    </div>
                    <p style={{ marginLeft: '130px' }}>Quantity: <span>{orderDetail.quantityPurchased}</span></p>
                    <p className='orange' style={{ marginLeft: '130px', fontWeight: 'bold' }}>{orderDetail.totalPrice} đ</p>
                </div>
            </div>
            <div className='d-flex mt-3 py-2 px-3' style={{ backgroundColor: '#eceace', borderRadius: '8px' }}>
                <div style={{ width: "60%" }}>
                    <p className='mb-1'>Transaction code: <span>{orderDetail.transactionCode}</span></p>
                    <p className='mb-1'>Order date: <span>{orderDetail.orderDate}</span></p>
                </div>
                <div className='d-flex' style={{ width: "40%" }}>
                    <img style={{ height: '55px', width: '55px' }} src={momo} />
                    <p className='mt-3 ms-2'>Pay with momo e-wallet</p>
                </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <div style={{ width: '45%' }} className='py-2 px-3'>
                    <p style={{ backgroundColor: '#ff8a00', color: 'white', fontSize: '17px', borderRadius: '8px 8px 0px 0px' }} className='mb-0 ps-3 py-1'>Number of students selected: <span></span></p>
                    <div className=' px-4'>
                        {orderDetail.students.map((student) => (
                            <div key={student.studentId} className='d-flex justify-content-center'>
                                <div className='text-center py-1 mt-3' style={{ width: '50%', borderRadius: '8px', border: '1px solid #ff8a00' }}>{student.studentName}</div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-4'>
                        <p style={{ backgroundColor: '#ff8a00', color: 'white', fontSize: '17px', borderRadius: '8px 8px 0px 0px' }} className='mb-0 ps-3 py-1'>Student account will send to</p>
                        <div className='d-flex justify-content-center'>
                            <div className='text-center py-1 mt-3 px-2' style={{ borderRadius: '8px', border: '1px solid #ff8a00' }} v>{orderDetail.parentEmail}</div>
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

const RequestOrder = ({ orderDetail }) => {
    const navigate = useNavigate();
    const [cancellationReason, setCancellationReason] = useState('');
    const accessToken = localStorage.getItem('accessToken');

    const handleBackClick = () => {
        navigate(-1);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [refusalReason, setRefusalReason] = useState('');

    const handleRefusal = async () => {
        const url = `https://www.kidpro-production.somee.com/api/v1/orders/handle-cancel?status=Refuse`;
        const payload = {
            parentId: orderDetail.parentId,
            orderId: orderDetail.orderId,
            reasonRefuse: refusalReason
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Refusal failed with status: ${response.status}`);
            }
            console.log('Refusal sent successfully');
            handleClose();
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleApproval = async () => {
        const url = `https://www.kidpro-production.somee.com/api/v1/orders/handle-cancel?status=Approve`;
        const payload = {
            parentId: orderDetail.parentId,
            orderId: orderDetail.orderId,
            reasonRefuse: "string"
        };
        console.log('payload: ', payload);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Approval failed with status: ${response.status}`);
            }
            console.log('Approval sent successfully');
            handleClose(); // Close the modal
            window.location.reload(); // Optionally, refresh the page or update state to reflect changes
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const viewCancellationReason = async () => {
        const url = `https://www.kidpro-production.somee.com/api/v1/staffs/order/view-reason/${orderDetail.orderId}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch cancellation reason: ${response.status}`);
            }
            const reasondata = await response.json();
            console.log('reasondata: ', reasondata);
            setCancellationReason(reasondata);
            handleShow();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='staff-order-detail mt-3 mx-5 py-3 px-5' style={{ backgroundColor: 'white', height: '690px', overflow: 'scroll' }}>
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
                <div className='text-center' style={{ width: '150px', height: '35px' }}>
                    <div className='pt-1' style={{ backgroundColor: '#F11616', borderRadius: '8px', color: 'white', width: '150px', height: '30px' }}>Request refunded</div>
                </div>
            </div>
            <div className='mt-3 py-2 px-3' style={{ backgroundColor: '#eceace', borderRadius: '8px' }}>
                <div className="d-flex justify-content-start">
                    <p className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>Order code </p>
                    <span className="mb-0 ms-3 mt-2" style={{ fontSize: '18px' }}>{orderDetail.orderCode}</span>
                </div>
                <hr className='my-1' />
                <div className='d-flex' style={{ fontSize: '16px' }}>
                    <img className='ms-3' src={orderDetail.pictureUrl} style={{ height: "80px", width: '80px' }} />
                    <div className='ms-4'>
                        <p className='mb-2'>{orderDetail.courseName}</p>
                        <p className='mb-0'>Class: <span style={{ fontWeight: 'bold', color: '#E53E5C' }}>{orderDetail.classCode}</span></p>
                    </div>
                    <p style={{ marginLeft: '130px' }}>Quantity: <span>{orderDetail.quantityPurchased}</span></p>
                    <p className='orange' style={{ marginLeft: '130px', fontWeight: 'bold' }}>{orderDetail.totalPrice} đ</p>
                </div>
            </div>
            <div className='d-flex mt-3 py-2 px-3' style={{ backgroundColor: '#eceace', borderRadius: '8px' }}>
                <div style={{ width: "60%" }}>
                    <p className='mb-1'>Transaction code: <span>{orderDetail.transactionCode}</span></p>
                    <p className='mb-1'>Order date: <span>{orderDetail.orderDate}</span></p>
                </div>
                <div className='d-flex' style={{ width: "40%" }}>
                    <img style={{ height: '55px', width: '55px' }} src={momo} />
                    <p className='mt-3 ms-2'>Pay with momo e-wallet</p>
                </div>
            </div>
            <div className="d-flex justify-content-between mt-3">
                <div style={{ width: '45%' }} className='py-2 px-3'>
                    <p style={{ backgroundColor: '#ff8a00', color: 'white', fontSize: '17px', borderRadius: '8px 8px 0px 0px' }} className='mb-0 ps-3 py-1'>Number of students selected: <span></span></p>
                    <div className=' px-4'>
                        {orderDetail.students.map((student) => (
                            <div key={student.studentId} className='d-flex justify-content-center'>
                                <div className='text-center py-1 mt-3' style={{ width: '50%', borderRadius: '8px', border: '1px solid #ff8a00' }}>{student.studentName}</div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-4'>
                        <p style={{ backgroundColor: '#ff8a00', color: 'white', fontSize: '17px', borderRadius: '8px 8px 0px 0px' }} className='mb-0 ps-3 py-1'>Student account will send to</p>
                        <div className='d-flex justify-content-center'>
                            <div className='text-center py-1 mt-3 px-2' style={{ borderRadius: '8px', border: '1px solid #ff8a00' }} v>{orderDetail.parentEmail}</div>
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
            <div className='d-flex justify-content-end'>
                <button style={{ backgroundColor: '#F15C58', color: 'white', border: 'none', borderRadius: '8px', height: '35px', width: '300px', fontSize: '16px' }} onClick={viewCancellationReason}>VIEW REASON FOR CANCELLATION</button>
            </div>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <p className='mb-1 blue' style={{ fontSize: '18px', fontWeight: 'bold' }}>Reason cancel</p>
                    <div className='py-1 px-2' style={{ border: '1px solid #D4D4D4', borderRadius: '8px' }}>
                        <p className='mb-0'>{cancellationReason.reason}</p>
                    </div>

                    <p className='mb-1 mt-3' style={{ color: '#F11616', fontSize: '18px', fontWeight: 'bold' }}>Reason for refuse the request</p>
                    <div>

                        <input value={refusalReason}
                            onChange={(e) => setRefusalReason(e.target.value)}
                            style={{ border: '1px solid #F11616', outline: 'none', borderRadius: '8px', color: '#F11616', width: '100%', paddingLeft: '15px' }} type="text" />
                    </div>

                    <div className='d-flex justify-content-end mt-3'>
                        <button onClick={handleClose} className='me-2' style={{ color: '#F15C58', backgroundColor: 'white', border: '1px solid #D4D4D4', borderRadius: '8px', height: '30px' }}>Cancel</button>
                        <button onClick={handleRefusal} className='me-2' style={{ color: 'white', backgroundColor: '#7F7C7C', border: 'none', borderRadius: '8px', height: '30px' }}>Refuse</button>
                        <button onClick={handleApproval} style={{ backgroundColor: '#F15C58', color: 'white', border: 'none', borderRadius: '8px', height: '30px' }}>Approve</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div >
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
                console.log('Classdata: ', data);
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
            {orderDetail.status === 'RequestRefund' && <RequestOrder orderDetail={orderDetail} />}
        </div>
    )
}
