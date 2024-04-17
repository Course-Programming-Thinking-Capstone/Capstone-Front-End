import React from 'react'
import momo from '../../../../images/icon/momo.png';
import zalopay from '../../../../images/icon/zalopay.png';

export default function PaymentMethods() {
  return (
    <div className='account-payment'>
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
    </div>
  )
}
