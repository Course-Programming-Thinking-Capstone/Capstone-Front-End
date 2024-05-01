import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import instance from '../../../../helper/apis/baseApi/baseApi';

export default function AccountDetails() {
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`api/v1/users/account`);
      const data = response.data;

      setUserInfo(data);
    } catch (error) {
      console.error('Failed to fetch userInfo:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    console.log(userInfo);
  }, []);
  return (
    <div className='account-details'>
      <div className="d-flex justify-content-around">
        <div>
          <span>First and last name</span>
          <p>{userInfo.fullName}</p>
        </div>
        <div>
          <span>Birthday</span>
          <p>{userInfo.dateOfBirth}</p>
        </div>
        <div>
          <span>Gender</span>
          <p>{userInfo.gender}</p>
        </div>
      </div>
      <div className="d-flex justify-content-around">
        <div>
          <span>Email Address</span>
          <p>{userInfo.email}</p>
        </div>
      </div>
      {/* <div className='account-details-button'>
        <div className="d-flex justify-content-center">
          <button>EDIT INFORMATION</button><br />
        </div>
        <div className="d-flex justify-content-center">
          <button>CHANGE PASSWORD</button>
        </div>
      </div> */}

    </div>
  )
}
