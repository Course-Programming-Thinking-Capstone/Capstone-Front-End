import React from 'react'

export default function AccountDetails() {
  return (
    <div className='account-details'>
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

    </div>
  )
}
