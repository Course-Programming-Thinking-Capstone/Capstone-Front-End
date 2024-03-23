import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import PageTitle from '../Layout/PageTitle'
import background from './../../images/background/paymentBackground.jpg';
import demo from './../../images/gallery/simp.jpg';
import momo from './../../images/icon/momo.png';
import zalopay from './../../images/icon/zalopay.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CoursePayment() {

    const [selectedChildren, setSelectedChildren] = useState([]);

    const [newChildName, setNewChildName] = useState('');
    const [newChildDOB, setNewChildDOB] = useState('');
    const [newChildGender, setNewChildGender] = useState('');

    const accessToken = localStorage.getItem('accessToken');

    const [children, setChildren] = useState([]);

    const [loading, setLoading] = useState(false);
    const [courseDetails, setCourseDetails] = useState(null);

    const fetchChildrenData = async () => {
        setLoading(true);
        const accessToken = localStorage.getItem('accessToken'); // Assuming the access token is stored in localStorage
        try {
            const response = await fetch('https://www.kidpro-production.somee.com/api/v1/students', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // Assuming Bearer token authentication
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            setChildren(data.map(child => ({
                id: child.id,
                name: child.fullName,
                dateOfBirth: child.dateOfBirth,
                gender: child.gender
            })));
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchChildrenData();
    }, []);

    useEffect(() => {
        console.log(children);
    }, [children]);

    useEffect(() => {
        const fetchCurrentCourse = async () => {
            setLoading(true);
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await fetch('https://www.kidpro-production.somee.com/api/v1/courses/payment/15', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCourseDetails(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentCourse();
    }, []);

    const handleSave = async () => {
        const formatBirthday = (date) => {
            const d = new Date(date);
            let month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        };

        const genderToInt = (gender) => {
            return gender === "Male" ? 1 : gender === "Female" ? 2 : 0;
        };

        console.log(newChildDOB);

        const newChildData = {
            fullName: newChildName,
            birthday: formatBirthday(newChildDOB),
            gender: genderToInt(newChildGender),
        };

        try {
            const response = await fetch('https://www.kidpro-production.somee.com/api/v1/parents/student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newChildData),
            });

            const responseData = await response.json();

            if (!response.ok) {
                // Handle response errors
                throw new Error(responseData.message || 'Failed to add new child');
            }

            setChildren(prevChildren => [...prevChildren, responseData]);
            setNewChildName('');
            setNewChildDOB('');
            setNewChildGender('');
            handleClose();
            await fetchChildrenData();
        } catch (error) {
            console.error('There was a problem with adding a new child:', error.message);
        }
    };

    const toggleChildSelection = (childId) => {
        if (selectedChildren.includes(childId)) {
            setSelectedChildren(selectedChildren.filter(id => id !== childId));
        } else {
            setSelectedChildren([...selectedChildren, childId]);
        }
    };

    const [selectedPayment, setSelectedPayment] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const BuyCourse = async () => {
        const orderDetails = {
            studentId: selectedChildren,
            courseId: courseDetails ? courseDetails.courseId : null,
            voucherId: 0,
            paymentType: 2,
            quantity: selectedChildren.length
        };

        try {
            // Initiating the order
            let response = await fetch('https://www.kidpro-production.somee.com/api/v1/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(orderDetails),
            });

            let responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to place order');
            }

            console.log('Order placed successfully', responseData);

            // Since orderId is now part of the URL, you don't necessarily need to send it again in the body
            // unless it's specifically required by your API endpoint.
            const paymentInitiationUrl = `https://www.kidpro-production.somee.com/api/v1/payment/momo/${responseData.orderId}`;

            response = await fetch(paymentInitiationUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                // This assumes your API does not require the orderId in the body since it's already in the URL
                body: JSON.stringify({}),
            });

            responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to initiate payment');
            }

            console.log('Payment initiated successfully', responseData);

            // Redirect to MoMo payment URL
            window.location.href = responseData.payUrl;

        } catch (error) {
            console.error('There was a problem with the process:', error.message);
        }
    };

    return (
        <div>

            <Header />
            <PageTitle motherMenu="Payment" activeMenu="Payment" />
            <div style={{
                backgroundImage: `url(${background})`, minHeight: '900px', backgroundPosition: 'center center', // Center the background image
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="container">
                    <Modal show={show} onHide={handleClose} style={{ marginTop: '100px' }}>

                        <h5 className='text-center' style={{ marginTop: '20px', color: '#FF8A00', fontSize: '24px' }}>Add new child information</h5>
                        <Modal.Body>
                            <div style={{ padding: '10px 40px' }}>

                                <p className='mb-0' style={{ width: '100%' }}>First and last name</p>
                                <input style={{ width: '100%', height: '50px', paddingLeft: '15px' }} type="text" placeholder='First and last name' value={newChildName}
                                    onChange={(e) => setNewChildName(e.target.value)} />

                                <p className='mb-0' style={{ width: '90%', marginTop: '20px' }}>Date of birth</p>
                                <div className="d-flex">
                                    <DatePicker wrapperClassName="datePicker" selected={newChildDOB} onChange={(date) => setNewChildDOB(date)} />
                                    <div style={{ width: '15%', textAlign: 'center', border: '1px solid #21212180', borderLeft: 'none', height: '50px' }}>
                                        <i style={{ marginTop: '15px' }} class="fa-solid fa-calendar-days"></i>
                                    </div>
                                </div>

                                <p className='mb-0' style={{ width: '100%', marginTop: '20px' }}>Gender</p>
                                <select style={{ width: '100%', height: '50px', paddingLeft: '15px' }} name="" id="" value={newChildGender}
                                    onChange={(e) => setNewChildGender(e.target.value)}>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                </select>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button style={{ backgroundColor: '#FF8A00' }} onClick={handleSave} >
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="row">
                        <div className='col-lg-6'>
                            <div className="d-flex justify-content-between" style={{ backgroundColor: '#e6e3e3', borderRadius: '10px 10px 0 0', padding: '10px 20px 0 20px' }}>
                                <h5>Select children to receive the course</h5>
                                <button onClick={handleShow} style={{ color: 'white', height: '25px', backgroundColor: '#1A9CB7', border: 'none', borderRadius: '5px' }}>Add</button>
                            </div>
                            <div className='payment'>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    {loading ? (
                                        <div className="d-flex justify-content-center">
                                            <div className="spinner-border text-primary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        children.map((child, index) => (
                                            <div key={child.id || index} className='children radio-wrapper'
                                                style={{
                                                    border: selectedChildren.includes(child.id) ? '2px solid #1A9CB7' : '2px solid transparent',
                                                    cursor: 'pointer', padding: '5px 15px', marginTop: '15px'
                                                }}
                                                onClick={() => toggleChildSelection(child.id)}>
                                                <div className="d-flex justify-content-start">
                                                    <i className={selectedChildren.includes(child.id) ? "fa-solid fa-square-check" : "fa-regular fa-square"}
                                                        style={{ color: selectedChildren.includes(child.id) ? '#1A9CB7' : undefined, fontSize: '22px' }}></i>
                                                    <p style={{ marginBottom: '5px', marginLeft: '15px' }}>{child.name}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <p className='mb' style={{ marginTop: '15px' }}>Number of children selected: <span style={{ color: '#FF8A00' }}>{selectedChildren.length}</span></p>
                            </div>


                            <div>
                                <div style={{ backgroundColor: '#e6e3e3', borderRadius: '10px 10px 0 0', padding: '10px 20px 10px 20px' }}>
                                    <h5 className='mb-0'>Course information</h5>
                                </div>
                                <div className='payment'>
                                    <p>Send the account via:</p>
                                    <div className='d-flex justify-content-between'>
                                        <div className='d-flex radio-wrapper justify-content-center' style={{ border: '2px solid #1A9CB7', cursor: 'pointer', padding: '5px 20px', width: '45%' }}>
                                            <div className='text-center'>
                                                <p className='mb'>Email</p>
                                                <p className='mb-0' style={{ color: '#FF8A00' }}>anvip321@gmail.com</p>
                                            </div>
                                        </div>

                                        <div className='d-flex radio-wrapper justify-content-center' style={{ border: '2px solid #1A9CB7', cursor: 'pointer', padding: '5px 20px', width: '45%' }}>
                                            <div className='text-center'>
                                                <p className='mb'>Zalo</p>
                                                <p className='mb-0' style={{ color: '#FF8A00' }}>09123123123</p>
                                            </div>
                                        </div>

                                    </div>
                                    <div style={{ marginTop: '20px' }}>
                                        {loading ? (
                                            <div className="d-flex justify-content-center">
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            courseDetails && (
                                                <div className='d-flex justify-content-between'>
                                                    <img className='img-responsive' style={{ width: '80px', height: '80px' }} src={courseDetails.picture || demo} alt="" />
                                                    <div>
                                                        <p style={{ marginBottom: 10, marginTop: 10 }}>Course's name</p>
                                                        <p style={{ marginBottom: 10, marginTop: 10 }}>{courseDetails.courseName}</p>
                                                    </div>
                                                    <div>
                                                        <p style={{ marginBottom: 10, marginTop: 10 }}>Teacher</p>
                                                        <p>{courseDetails.teacherName}</p>
                                                    </div>
                                                    <div>
                                                        <p style={{ marginBottom: 10, marginTop: 10 }}>Price</p>
                                                        <p style={{ color: '#FF8A00' }}>{courseDetails.price.toLocaleString()} đ</p>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className='col-lg-6'>
                            <div style={{ backgroundColor: '#e6e3e3', borderRadius: '10px 10px 0 0', padding: '10px 20px 10px 20px' }}>
                                <h5 className='mb-0'>Select a payment method</h5>
                            </div>
                            <div className="payment">
                                <div style={{ padding: '10px 35px' }}>
                                    <div className='d-flex radio-wrapper justify-content-between' onClick={() => setSelectedPayment('momo')} style={{ border: selectedPayment === 'momo' ? '2px solid #1A9CB7' : '2px solid #c9c9c9', padding: '10px 35px', cursor: 'pointer', borderRadius: '10px' }}>
                                        <div>
                                            <div className='d-flex'>
                                                <img style={{ height: '40px', width: '40px' }} src={momo} alt="" />
                                                <p style={{ marginBottom: '12px' }}>09123123123</p>
                                            </div>
                                            <p className='mb-0'>Momo E-Wallet</p>
                                        </div>
                                        {selectedPayment === 'momo' ?
                                            <i className="fa-solid fa-circle" style={{ color: '#1A9CB7' }}></i> :
                                            <i className="fa-regular fa-circle"></i>}
                                    </div>
                                    <div className='d-flex radio-wrapper justify-content-between' onClick={() => setSelectedPayment('zalopay')} style={{ border: selectedPayment === 'zalopay' ? '2px solid #1A9CB7' : '2px solid #c9c9c9', padding: '10px 35px', cursor: 'pointer', marginTop: '20px', borderRadius: '10px' }}>
                                        <div>
                                            <div className='d-flex'>
                                                <img style={{ height: '40px', width: '40px' }} src={zalopay} alt="" />
                                                <p style={{ marginBottom: '12px' }}>09123123123</p>
                                            </div>
                                            <p className='mb-0'>Momo E-Wallet</p>
                                        </div>
                                        {selectedPayment === 'zalopay' ?
                                            <i className="fa-solid fa-circle" style={{ color: '#1A9CB7' }}></i> :
                                            <i className="fa-regular fa-circle"></i>}
                                    </div>
                                </div>
                                <div>
                                    <h5>Voucher</h5>
                                    <div className="d-flex justify-content-between" style={{ padding: '10px 35px' }}>
                                        <input type="text" placeholder='Enter discount code' style={{ height: '48px', fontSize: '16px', width: '67%', paddingLeft: '15px', outline: 'none' }} />
                                        <button style={{ height: '48px', color: 'white', backgroundColor: '#1A9CB7', border: 'none', borderRadius: '8px', width: '30%' }}>APPLY</button>
                                    </div>
                                </div>

                                <div>
                                    <h5>Order information</h5>
                                    <div style={{ padding: '10px 35px' }}>

                                        <div className='d-flex justify-content-between'>
                                            <p>Course</p>
                                            <p>What is programming?</p>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <p>Price</p>
                                            <p>100.000 đ</p>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <p>Quantity</p>
                                            <p>{selectedChildren.length}</p>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <p>Discount</p>
                                            <p>0 đ</p>
                                        </div>
                                        <hr />
                                        <div className='d-flex justify-content-between'>
                                            <p>Total</p>
                                            <p style={{ color: '#FF8A00' }}>100.000 đ</p>
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <button disabled={selectedChildren.length === 0} onClick={BuyCourse} style={{ width: '100%', backgroundColor: '#FF8A00', borderRadius: '8px', color: 'white', border: 'none', height: '48px' }}>ORDER</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
