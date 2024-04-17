import React, { useState } from 'react';
import Header from '../../Layout/Header'
import Footer from '../../Layout/Footer'
import PageTitle from '../../Layout/PageTitle'
import background from '../../../images/background/accountBackground.jpg';
import demo from '../../../images/gallery/demo.jpg';
import momo from '../../../images/icon/momo.png';
import zalopay from '../../../images/icon/zalopay.png';
import { Outlet, Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Account() {
    const [activeContent, setActiveContent] = useState('accountDetails');
    const navigate = useNavigate();
    const location = useLocation();

    const handleButtonClick = (contentKey) => {
        setActiveContent(contentKey);
    };


    const handleMenuItemClick = (path) => {
        navigate(`/account/${path.toLowerCase()}`); // Adjust path as needed
    };

    const getItemClass = (itemName) => {
        const currentPath = location.pathname.split('/')[2];
        return `item ${currentPath === itemName.toLowerCase() ? "active" : ""}`;
    };

    const EditInfo = () => {
        return (
            <div className='account-details'>
                <div className="d-flex">
                    <div>
                        <span>First and last name</span>
                        <input type="text" placeholder='Kim Jennie' />
                    </div>
                    <div>
                        <span>Birthday</span>
                        <input type="text" placeholder='03-01-1996' />
                    </div>
                    <div>
                        <span>Gender</span>
                        <select name="" id="">
                            <option value="">Male</option>
                            <option value="">Female</option>
                            <option value="">Other</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex">
                    <div>
                        <span>Email Address | <a href="">Edit</a></span>
                        <input type="text" placeholder='anvip321@gmail.com' />
                    </div>
                    <div>
                        <span>Phone number</span>
                        <input type="number" placeholder='09123123123' />
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <button>SAVE CHANGE</button><br />
                </div>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeContent) {
            case 'accountDetails':
                return <div className='account-details'>
                    <div className="d-flex">
                        <div>
                            <span>First and last name</span>
                            <p>Kim Yoo Jung</p>
                        </div>
                        <div>
                            <span>Birthday</span>
                            <p>1996-03-01</p>
                        </div>
                        <div>
                            <span>Gender</span>
                            <p>Female</p>
                        </div>
                    </div>
                    <div className="d-flex">
                        <div>
                            <span>Email Address | <a href="">Edit</a></span>
                            <p>anvip321@gmail.com</p>
                        </div>
                        <div>
                            <span>Phone number</span>
                            <p>09123123123</p>
                        </div>
                    </div>
                    <div className='account-details-button'>
                        <div className="d-flex justify-content-center">
                            <button>EDIT INFORMATION</button><br />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button>CHANGE PASSWORD</button>
                        </div>
                    </div>

                </div>;
            case 'paymentMethods':
                return <div className='account-payment'>
                    <h5>E-wallet</h5>
                    <div className="item">
                        <div className='d-flex'>
                            <div className='d-flex'>
                                <img src={momo} alt="" />
                                <p>09123123123</p>
                            </div>
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                    <div className="item">
                        <div className='d-flex'>
                            <div className='d-flex'>
                                <img src={zalopay} alt="" />
                                <p>09123123123</p>
                            </div>
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button>ADD PAYMENT METHOD</button>
                    </div>
                </div>;
            case 'childProcess':
                return <div className='account-child'>
                    <h5>My Child</h5>
                    <div className="item d-flex">
                        <div className='d-flex'>
                            <img src={demo} alt="" />
                            <p style={{ marginLeft: '10px' }}>Kim Jennie</p>
                        </div>
                        <p>6 years old</p>
                        <i class="fa-regular fa-pen-to-square"></i>
                    </div>
                    <div className="item d-flex">
                        <div className='d-flex'>
                            <img src={demo} alt="" />
                            <p style={{ marginLeft: '10px' }}>Kim Jennie</p>
                        </div>
                        <p>6 years old</p>
                        <i class="fa-regular fa-pen-to-square"></i>
                    </div>
                    <div className="item d-flex">
                        <div className='d-flex'>
                            <img src={demo} alt="" />
                            <p style={{ marginLeft: '10px' }}>Kim Jennie</p>
                        </div>
                        <p>6 years old</p>
                        <i class="fa-regular fa-pen-to-square"></i>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button>ADD NEW CHILDREN</button>
                    </div>
                </div>;
            default:
                return <div>Select an option</div>;
        }
    };

    const isActive = (contentKey) => {
        return activeContent === contentKey ? { color: 'white', backgroundColor: '#FD8569' } : {}; // Change 'color: blue' to your preferred style
    };


    return (
        <div>
            <Header />
            <PageTitle />
            <div style={{
                backgroundImage: `url(${background})`, minHeight: '800px', backgroundPosition: 'center center', // Center the background image
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="container">
                    <div className="account row">
                        <div className="col-lg-5 col-md-12 col-sm-12">
                            <div className="avatar d-flex">
                                <div style={{ width: '40%' }}>

                                    <img src={demo} alt="" />
                                </div>
                                <div style={{ width: '60%', paddingLeft: 20, fontSize: 24, fontWeight: 500 }}>
                                    <p>Kim Jennie</p>
                                    <p style={{ color: '#FF8A00' }}>Logout</p>
                                </div>
                            </div>
                            <div className='account-menu'>
                                <Link to="account-details"><button style={isActive('accountDetails')} onClick={() => handleButtonClick('accountDetails')}><i class="fa-solid fa-user"></i> Account Details</button></Link><hr />
                                <Link to="payment-methods"><button style={isActive('paymentMethods')} onClick={() => handleButtonClick('paymentMethods')}><i class="fa-regular fa-credit-card"></i> Payment Methods</button></Link><hr />
                                <Link to="child-process"><button style={isActive('childProcess')} onClick={() => handleButtonClick('childProcess')}><i class="fa-solid fa-arrows-spin"></i> My child's process</button></Link><hr />
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-12 col-sm-12">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
