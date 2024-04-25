import React, { useState, useEffect, forwardRef, useRef } from 'react';
import demo from '../../../../images/gallery/demo.jpg';
import instance from '../../../../helper/apis/baseApi/baseApi';
import { useNavigate } from 'react-router-dom';

export default function ChildProcess() {
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await instance.get("api/v1/students");
        const data = response.data;

        setChildren(data);
        console.log("children:", children);
      } catch (error) {
        if (error.response) {
          console.log(`Error response: ${error.response?.data?.message}`);
          // setMessage(error.response?.data?.message || "Undefined.");
        } else {
          console.log(`Error message abc: ${error.message}`);
          // setMessage(error.message || "Undefined.");
        }
      }
    };

    fetchChildren();
  }, []);

  const handleEditClick = (childId) => {
    navigate(`/account/child-process-detail/${childId}`);
  };

  return (
    <div className='account-child'>
      <h5>My Child</h5>

      <div>
        {children && children.map((child, index) => (
          <div className="item d-flex justify-content-between" key={index}>
            <div className='d-flex' style={{ width: '40%' }}>
              <img src={demo} alt="" />
              <div className="d-flex align-items-center" >
                <p className='ms-2' style={{ fontSize: '17px' }}>{child.fullName}</p>
              </div>
            </div>
            <div className="d-flex align-items-center" style={{ width: '30%' }}>
              <div className="d-flex" >
                <p style={{ width: '25px', fontSize: '17px' }}>{child.age}</p>
                <p style={{ fontSize: '17px' }}>years old</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className='d-flex'>
                <p className='me-2'>
                  <i style={{ fontSize: '17px' }} class="fa-regular fa-pen-to-square" onClick={() => handleEditClick(child.id)}></i>
                </p>
                <p>
                  <i style={{ fontSize: '17px' }} class="fa-solid fa-trash-can"></i>
                </p>
              </div>
            </div>
          </div>
        ))}

      </div>

      <div className='d-flex justify-content-center'>
        <button>ADD NEW CHILDREN</button>
      </div>
    </div>
  )
}
