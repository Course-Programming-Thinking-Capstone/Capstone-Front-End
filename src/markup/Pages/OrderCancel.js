import React, { useState } from 'react';
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import background from './../../images/background/orderBackground.jpg';
import momo from './../../images/icon/momo.png';
import PageTitle from '../Layout/PageTitle';

export default function OrderCancel() {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const [policyChecked, setPolicyChecked] = useState('false');

    const togglePolicyChecked = () => {
        setPolicyChecked(!policyChecked); // This will toggle the state between true and false
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
                    <div className="order-cancel">
                        <div className="d-flex justify-content-between">
                            <div className="header d-flex justify-content-start">
                                <i className="fa-solid fa-user" aria-hidden="true"></i>
                                <p style={{ marginBottomBottom: '6px', marginLeft: '20px', paddingTop: '15px' }}>Teacher: <span>Nguyễn Ngọc Lâm</span></p>
                            </div>
                            <select name="reason" id="reason-select">
                                <option value="">Select the reason</option>
                            </select>
                        </div>
                        <div className="content d-flex" style={{ paddingLeft: 40 }}>
                            <img style={{ marginTop: 20 }} src="" alt="" className="content-image" />
                            <div className="info">
                                <p style={{ marginTop: 33 }}>What is programming?</p>
                                <p>Age: 7+</p>
                            </div>
                            <p className="price">200.000 đ</p>
                            <div className="payment-method d-flex">
                                <img style={{ width: '50px', height: '50px', marginBottom: 40 }} src={momo} alt="momo" className="payment-logo" />
                                <p style={{ marginBottom: 30 }}>Pay with momo e-wallet</p>
                            </div>
                        </div>
                    </div>


                    <div className="order-cancel-policy row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className='order-cancel-info'>
                                <div className='d-flex justify-content-start'>

                                    <h5 className='mb'>More information</h5>
                                    <span>(Optional)</span>
                                </div>
                                <textarea
                                    placeholder="Write the reason for order cancel"
                                    value={inputValue}
                                    onChange={handleChange}
                                    maxLength="256"
                                    className="form-control w-100"
                                    style={{ minHeight: '300px' }}
                                ></textarea>

                                <div className='d-flex justify-content-end'>
                                    {inputValue.length}/256
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="order-policy-content">
                                <h5 className='mb'>Order cancellation policy</h5>
                                <div className="order-policy-stripe">
                                    <p>1. Chúng tôi sẽ không thể khôi phục lại đơn hàng đã hủy.</p>
                                    <p>2. Yêu cầu hủy đơn sẽ được quản lý xét duyệt trong vòng 30 phút.</p>
                                    <p>3. Kết quả xét duyệt sẽ được gửi về thông báo trong hộp thư.</p>
                                    <p>4. Nếu đơn hàng được xác nhận hủy thành công, tiền sẽ hoàng về ví điện tử mà khách hàng đã thanh toán trong khoảng 3-5 ngày.</p>
                                    <p>5. Mỗi khách hàng chỉ được phép hủy đơn hàng 3 lần/tháng.</p>
                                </div>
                                <div className="d-flex justify-content-start checked">

                                    {policyChecked ?
                                        <i className="fa-solid fa-square-check" style={{ color: '#FF8A00', fontSize: '30px' }} onClick={togglePolicyChecked}></i> :
                                        <i className="fa-regular fa-square" style={{ fontSize: '30px' }} onClick={togglePolicyChecked}></i>
                                    }
                                    <p className='mb'>Tôi đã hiểu và đồng ý với chính sách hủy của KidsPro</p>
                                </div>
                                <div className="d-flex justify-content-end">

                                    <button className={policyChecked ? 'button-enabled' : 'button-disabled'}>
                                        CANCEL ORDER
                                    </button>
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
