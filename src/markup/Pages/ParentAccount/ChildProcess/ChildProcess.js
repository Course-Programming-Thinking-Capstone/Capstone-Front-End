import React, { useState, useEffect, forwardRef, useRef } from 'react';
import demo from '../../../../images/gallery/demo.jpg';
import instance from '../../../../helper/apis/baseApi/baseApi';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ChildProcess() {
  const [children, setChildren] = useState([]);
  const [childrenList, setChildrenList] = useState([]);
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [newChildName, setNewChildName] = useState("");
  const [newChildDOB, setNewChildDOB] = useState("");
  const [newChildGender, setNewChildGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);
  const [isInputFocused1, setInputFocused1] = useState(false);

  const fetchChildList = async () => {
    setLoading(true);
    try {
      const response = await instance.get(`api/v1/students`);
      const data = response.data;


      setChildrenList(data);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {

    fetchChildList();
  }, []);

  const formatPrice = (price) => {
    if (typeof price !== "number") {
      return "N/A";
    }
    return price.toLocaleString("vi-VN") + " đ";
  };

  const handleSave = async () => {
    const formatBirthday = (date) => {
      const d = new Date(date);
      let month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    };

    const genderToInt = (gender) => {
      return gender === "Male" ? 1 : gender === "Female" ? 2 : 0;
    };

    const newChildData = {
      fullName: newChildName,
      birthday: formatBirthday(newChildDOB),
      gender: genderToInt(newChildGender),
    };

    try {
      const response = await instance.post(`api/v1/parents/student`, newChildData);
      setChildrenList((prevChildrenList) => [...prevChildrenList, response.data]);
      setNewChildName("");
      setNewChildDOB("");
      setNewChildGender("");
      setModalShow(false);  // Close the modal upon successful save
      fetchChildList();  // Refetch the children list
    } catch (error) {

      // Optionally, handle the error state/UI here if needed
    }
  };


  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div
      className="date-picker-custom-input d-flex justify-content-between p-1"
      onClick={onClick}
      ref={ref}
      style={{
        border: "1px solid black",
        width: "367px",
        height: "50px",
        borderRadius: 8,
        alignItems: "center",
        borderStyle: "solid",
        borderColor: "rgb(201, 201, 201)",
        borderWidth: 2,
      }}
    >
      <div>{value}</div>
      <div>
        <i
          className="fa-regular fa-calendar-days"
          style={{ paddingRight: 5 }}
        />
      </div>
    </div>
  ));

  const dateFiveYearsAgo = new Date();
  dateFiveYearsAgo.setFullYear(dateFiveYearsAgo.getFullYear() - 5);

  const handleEditClick = (childId) => {
    navigate(`/account/child-process-detail/${childId}`);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  return (
    <div className='account-child'>
      <h5>My Child</h5>

      <div>
        {childrenList && childrenList.map((child, index) => (
          <div className="item d-flex justify-content-between" key={index}>
            <div className='d-flex' style={{ width: '40%' }}>
              <i style={{ fontSize: '30px' }} class="fa-solid fa-user-graduate ms-2"></i>
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
                  <i style={{ fontSize: '17px', cursor: 'pointer' }} class="fa-regular fa-pen-to-square" onClick={() => handleEditClick(child.id)}></i>
                </p>
              </div>
            </div>
          </div>
        ))}

      </div>

      <div className='d-flex justify-content-center'>
        <button onClick={() => setModalShow(true)}>ADD NEW CHILDREN</button>
      </div>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow} // Controlling the visibility with modalShow state
        onHide={handleCloseModal}
      >
        <Modal.Body>
          <div style={{ padding: "10px 40px" }}>
            <p
              className="blue mb-0"
              style={{ width: "100%", paddingBottom: "10px" }}
            >
              First and last name
            </p>
            <div
              style={{
                width: "100%",
                height: "50px",
                borderRadius: 8,
                border: isInputFocused
                  ? "2px solid orange"
                  : "2px solid rgb(201, 201, 201)",
              }}
            >
              <input
                style={{
                  width: "100%",
                  height: "100%",
                  paddingLeft: "15px",
                  borderRadius: 8,
                  border: "none",
                  outline: "none",
                }}
                type="text"
                placeholder="First and last name"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />
            </div>
            <p
              className="blue mb-0"
              style={{
                width: "90%",
                marginTop: "20px",
                paddingBottom: "10px",
              }}
            >
              Date of birth
            </p>
            <div>
              <DatePicker
                selected={newChildDOB}
                onChange={(date) => setNewChildDOB(date)}
                maxDate={dateFiveYearsAgo}
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                customInput={<CustomInput />}
              />
            </div>

            <p
              className="blue mb-0"
              style={{
                width: "100%",
                marginTop: "20px",
                paddingBottom: "10px",
              }}
            >
              Gender
            </p>
            <div
              style={{
                width: "100%",
                height: "50px",
                borderRadius: 8,
                border: isInputFocused1
                  ? "2px solid orange"
                  : "2px solid rgb(201, 201, 201)",
              }}
            >
              <select
                style={{
                  width: "100%",
                  height: "100%",
                  paddingLeft: "15px",
                  borderRadius: 8,
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                }}
                value={newChildGender}
                onChange={(e) => setNewChildGender(e.target.value)}
                onFocus={() => setInputFocused1(true)}
                onBlur={() => setInputFocused1(false)}
              >
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#FF8A00", borderRadius: 8 }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
