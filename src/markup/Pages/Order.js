import React, { useState } from 'react';
import Header from '../Layout/Header'
import PageTitle from '../Layout/PageTitle'
import Footer from '../Layout/Footer'
import background from './../../images/background/orderBackground.jpg';

export default function Order() {
    const [activeItem, setActiveItem] = useState('');

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };

    const isActive = (itemName) => {
        return activeItem === itemName ? 'active-item' : '';
    };

    const OrderItem = () => {
        return (
            <div className='order-item'>
                <div className="header d-flex">
                    <p><i class="fa-solid fa-user"></i>   Teacher: </p>
                    <p>Nguyễn Ngọc Lâm</p>
                    <span>Sucess</span>
                </div>
                <div className="content d-flex">
                    <img src="" alt="" />
                    <p>What is programming?</p>
                    <p>Age: 7+</p>
                    <p>100.000 đ</p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header />
            <PageTitle motherMenu="Order" activeMenu="Order" />
            <div style={{
                backgroundImage: `url(${background})`, minHeight: '800px', backgroundPosition: 'center center', // Center the background image
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
                <div className="container">
                    <div className="order-menu row">
                        {['All', 'Pending', 'Success', 'Cancelled'].map((item, index) => (
                            <div key={index} className={`order-menu-item col-lg-2 col-md-2 col-sm-2 ${isActive(item)}`} onClick={() => handleItemClick(item)}>
                                <p className='text-center'>{item}</p>
                                <hr />
                            </div>
                        ))}
                        <div className='order-menu-sub col-lg-4 d-md-none d-lg-block d-sm-none d-md-block'>
                            <p></p>
                            <hr />
                        </div>
                    </div>
                    <div className="order-content">
                        <OrderItem />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

