import React, { useState } from 'react'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import PageTitle from '../Layout/PageTitle'
import background from './../../images/background/paymentBackground.jpg';
import momo from './../../images/icon/momo.png';
import zalopay from './../../images/icon/zalopay.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CoursePayment() {

    const [selectedFirstChild, setSelectedFirstChild] = useState('');
    const [selectedSecondChild, setSelectedSecondChild] = useState('');
    const [selectedThirdChild, setSelectedThirdChild] = useState('');
    const [selectedFourthChild, setSelectedFourthChild] = useState('');
    const [selectedFifthChild, setSelectedFifthChild] = useState('');

    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedAccount, setSelectedAccount] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [startDate, setStartDate] = useState(new Date());

    return (
        <div>

            <Header />
            <PageTitle motherMenu="Payment" activeMenu="Payment"/>
            <div style={{
                backgroundImage: `url(${background})`, minHeight: '900px', backgroundPosition: 'center center', // Center the background image
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="container">
                    <Modal show={show} onHide={handleClose} style={{ marginTop: '100px' }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add new child information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div style={{ padding: '10px 30px' }}>

                                <p style={{ marginBottom: '0px', width: '100%' }}>First and last name</p>
                                <input style={{ width: '100%', height: '50px' }} type="text" placeholder='First and last name' />
                                <p style={{ marginBottom: '0px', width: '100%', marginTop: '20px' }}>Date of birth</p>
                                <DatePicker wrapperClassName="datePicker" selected={startDate} onChange={(date) => setStartDate(date)} />
                                <p style={{ marginBottom: '0px', width: '100%', marginTop: '20px' }}>Gender</p>
                                <select style={{ width: '100%', height: '50px' }} name="" id="">
                                    <option value="">Male</option>
                                    <option value="">Female</option>
                                    <option value="">Other</option>
                                </select>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <div className="row">
                        <div className='col-lg-6'>
                            <div className="d-flex" style={{ backgroundColor: '#e6e3e3', borderRadius: '10px 10px 0 0', padding: '10px 20px 0 20px' }}>
                                <h5>Select children to receive the course</h5>
                                <button onClick={handleShow} style={{ color: '#1A9CB7', height: '25px', backgroundColor: 'white', border: 'none' }}>Add</button>
                            </div>
                            <div className='payment'>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div className='children radio-wrapper' onClick={() => setSelectedFirstChild(selectedFirstChild === 'firstChild' ? '' : 'firstChild')} style={{ border: selectedFirstChild === 'firstChild' ? '2px solid #1A9CB7' : '2px solid transparent', cursor: 'pointer' }}>
                                        <div className="d-flex">

                                            {selectedFirstChild === 'firstChild' ?
                                                <i class="fa-solid fa-square-check" style={{ color: '#1A9CB7', fontSize: '22px' }}></i> :
                                                <i class="fa-regular fa-square" style={{ fontSize: '22px' }}></i>}
                                            <p style={{ marginBottom: '5px' }}>Ronaldo</p><br />
                                        </div>

                                    </div>
                                    <div className='children radio-wrapper' onClick={() => setSelectedSecondChild(selectedSecondChild === 'secondChild' ? '' : 'secondChild')} style={{ border: selectedSecondChild === 'secondChild' ? '2px solid #1A9CB7' : '2px solid transparent', cursor: 'pointer', marginTop: '10px' }}>
                                        <div className="d-flex">

                                            {selectedSecondChild === 'secondChild' ?
                                                <i class="fa-solid fa-square-check" style={{ color: '#1A9CB7', fontSize: '22px' }}></i> :
                                                <i class="fa-regular fa-square" style={{ fontSize: '22px' }}></i>}
                                            <p style={{ marginBottom: '5px' }}>Messi</p><br />
                                        </div>
                                    </div>
                                </div>
                                <p style={{ marginBottom: 0 }}>Number of children selected: <span style={{ color: '#FF8A00' }}>2</span></p>
                            </div>


                            <div>
                                <div style={{ backgroundColor: '#e6e3e3', borderRadius: '10px 10px 0 0', padding: '10px 20px 10px 20px' }}>
                                    <h5 style={{ marginBottom: 0 }}>Course information</h5>
                                </div>
                                <div className='payment'>
                                    <p>Send the account via:</p>
                                    <div className='d-flex'>
                                        <div className='d-flex radio-wrapper' onClick={() => setSelectedAccount('email')} style={{ border: selectedAccount === 'email' ? '2px solid #1A9CB7' : '2px solid #c9c9c9', cursor: 'pointer', width: '45%', padding: '5px 20px' }}>
                                            {selectedAccount === 'email' ?
                                                <i className="fa-solid fa-circle" style={{ color: '#1A9CB7' }}></i> :
                                                <i className="fa-regular fa-circle"></i>}
                                            <div>
                                                <p style={{ marginBottom: 0 }}>Email</p>
                                                <p style={{ marginBottom: '0', color: '#FF8A00' }}>anvip321@gmail.com</p>
                                            </div>
                                        </div>

                                        <div className='d-flex radio-wrapper' onClick={() => setSelectedAccount('zalo')} style={{ border: selectedAccount === 'zalo' ? '2px solid #1A9CB7' : '2px solid #c9c9c9', cursor: 'pointer', width: '45%', padding: '5px 20px' }}>
                                            {selectedAccount === 'zalo' ?
                                                <i className="fa-solid fa-circle" style={{ color: '#1A9CB7' }}></i> :
                                                <i className="fa-regular fa-circle"></i>}
                                            <div>
                                                <p style={{ marginBottom: 0 }}>Zalo</p>
                                                <p style={{ marginBottom: '0', color: '#FF8A00' }}>anvip321@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex' style={{ marginTop: '20px' }}>
                                        <img style={{ width: '60px', height: '60px' }} src="" alt="" />
                                        <div>
                                            <p style={{ marginBottom: 10 }}>What is programming?</p>
                                            <p>Age: 7+</p>
                                        </div>
                                        <div>
                                            <p style={{ marginBottom: 10 }}>Teacher</p>
                                            <p>LamNN</p>
                                        </div>
                                        <div>
                                            <p style={{ marginBottom: 10 }}>Price</p>
                                            <p style={{ color: '#FF8A00' }}>100.000 đ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className='col-lg-6'>
                            <div style={{ backgroundColor: '#e6e3e3', borderRadius: '10px 10px 0 0', padding: '10px 20px 10px 20px' }}>
                                <h5 style={{ marginBottom: 0 }}>Select a payment method</h5>
                            </div>
                            <div className="payment">
                                <div style={{ padding: '10px 35px' }}>
                                    <div className='d-flex radio-wrapper' onClick={() => setSelectedPayment('momo')} style={{ border: selectedPayment === 'momo' ? '2px solid #1A9CB7' : '2px solid #c9c9c9', padding: '10px 35px', cursor: 'pointer' }}>
                                        <div>
                                            <div className='d-flex'>
                                                <img style={{ height: '40px', width: '40px' }} src={momo} alt="" />
                                                <p style={{ marginBottom: '12px' }}>09123123123</p>
                                            </div>
                                            <p style={{ marginBottom: '0' }}>Momo E-Wallet</p>
                                        </div>
                                        {selectedPayment === 'momo' ?
                                            <i className="fa-solid fa-circle" style={{ color: '#1A9CB7' }}></i> :
                                            <i className="fa-regular fa-circle"></i>}
                                    </div>
                                    <div className='d-flex radio-wrapper' onClick={() => setSelectedPayment('zalopay')} style={{ border: selectedPayment === 'zalopay' ? '2px solid #1A9CB7' : '2px solid #c9c9c9', padding: '10px 35px', cursor: 'pointer', marginTop: '20px' }}>
                                        <div>
                                            <div className='d-flex'>
                                                <img style={{ height: '40px', width: '40px' }} src={zalopay} alt="" />
                                                <p style={{ marginBottom: '12px' }}>09123123123</p>
                                            </div>
                                            <p style={{ marginBottom: '0' }}>Momo E-Wallet</p>
                                        </div>
                                        {selectedPayment === 'zalopay' ?
                                            <i className="fa-solid fa-circle" style={{ color: '#1A9CB7' }}></i> :
                                            <i className="fa-regular fa-circle"></i>}
                                    </div>
                                </div>
                                <div>
                                    <h5>Voucher</h5>
                                    <div className="d-flex" style={{ padding: '10px 35px' }}>
                                        <input type="text" placeholder='Enter discount code' style={{ height: '48px', fontSize: '16px', width: '67%', paddingLeft: '15px' }} />
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
                                            <p>2</p>
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
                                            <button style={{ width: '100%', backgroundColor: '#FF8A00', borderRadius: '8px', color: 'white', border: 'none', height: '48px' }}>ORDER</button>
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
