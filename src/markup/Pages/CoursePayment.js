import React, { useState, useEffect, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import PageTitle from "../Layout/PageTitle";
import background from "./../../images/background/paymentBackground.jpg";
import demo from "./../../images/gallery/simp.jpg";
import momo from "./../../images/icon/momo.png";
import zalopay from "./../../images/icon/zalopay.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import instance from "../../helper/apis/baseApi/baseApi";

export default function CoursePayment() {
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [newChildName, setNewChildName] = useState("");
  const [newChildDOB, setNewChildDOB] = useState("");
  const [newChildGender, setNewChildGender] = useState("");
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null);
  const [parentEmail, setParentEmail] = useState(null);
  const location = useLocation();
  const { courseId, classId } = location.state || {};
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);

  const formatPrice = (price) => {
    if (typeof price !== "number") {
      return "N/A";
    }
    return price.toLocaleString("vi-VN") + " đ";
  };

  const fetchChildrenData = async () => {
    setLoading(true);
    try {
      if (!classId) {

        return;
      }

      // const data = await response.json();
      const response = await instance.get(`api/v1/students?classId=${classId}`);
      const data = response.data;
      setChildren(
        data.map((child) => ({
          id: child.id,
          name: child.fullName,
          dateOfBirth: child.dateOfBirth,
          gender: child.gender,
        }))
      );
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChildrenData();
  }, [classId]);

  useEffect(() => {
    const fetchCurrentCourse = async () => {
      if (!courseId || !classId) {

        return;
      }

      setLoading(true);
      try {
        const response = await instance.get(
          `api/v1/courses/payment?courseId=${courseId}&classId=${classId}`
        );
        const data = response.data;

        setCourseDetails(data);
      } catch (error) {

      } finally {
        setLoading(false);
      }
    };

    fetchCurrentCourse();
  }, [courseId, classId]); // Add courseId and classId as dependencies to re-fetch if they change

  useEffect(() => {
    const fetchCurrentEmail = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`api/v1/parents/contact`);

        const data = response.data;

        setParentEmail(data.email);
      } catch (error) {

      } finally {
        setLoading(false);
      }
    };

    fetchCurrentEmail();
  }, [courseId, classId]);

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
      const response = await instance.post(
        `api/v1/parents/student`,
        newChildData
      );
      const responseData = response.data;

      setChildren((prevChildren) => [...prevChildren, responseData]);
      setNewChildName("");
      setNewChildDOB("");
      setNewChildGender("");
      handleClose();
      await fetchChildrenData();
    } catch (error) {

    }
  };

  const toggleChildSelection = (childId) => {
    if (selectedChildren.includes(childId)) {
      setSelectedChildren(selectedChildren.filter((id) => id !== childId));
    } else {
      setSelectedChildren([...selectedChildren, childId]);
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

  const [selectedPayment, setSelectedPayment] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const BuyCourse = async () => {
    setIsOrderProcessing(true);
    const orderDetails = {
      studentId: selectedChildren,
      courseId: courseDetails ? courseDetails.courseId : null,
      classId: classId,
      voucherId: 0,
      paymentType: 2,
      quantity: selectedChildren.length,
    };

    try {

      let response = await instance.post(`api/v1/orders`, orderDetails);

      let responseData = response.data;

      response = await instance.post(`api/v1/payment/momo/${responseData.orderId}`, {});
      responseData = response.data;


      window.location.href = responseData.payUrl;
    } catch (error) {
      setIsOrderProcessing(false);
    }
  };
  const [isInputFocused, setInputFocused] = useState(false);
  const [isInputFocused1, setInputFocused1] = useState(false);

  return (
    <div>
      <Header />
      <PageTitle motherMenu="Payment" activeMenu="Payment" />
      <div
        style={{
          backgroundImage: `url(${background})`,
          minHeight: "900px",
          backgroundPosition: "center center", // Center the background image
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <Modal
            show={show}
            onHide={handleClose}
            style={{ marginTop: "100px" }}
          >
            <h5
              className="text-center"
              style={{ marginTop: "20px", color: "#FF8A00", fontSize: "24px" }}
            >
              Add new child information
            </h5>
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
              <Button variant="secondary" onClick={handleClose}>
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
          <div className="row">
            <div className="col-lg-6">
              <div
                className="d-flex justify-content-between"
                style={{
                  backgroundColor: "#e6e3e3",
                  borderRadius: "10px 10px 0 0",
                  padding: "10px 20px 0 20px",
                }}
              >
                <h5>Select children to receive the course</h5>
                <button
                  onClick={handleShow}
                  style={{
                    color: "white",
                    height: "25px",
                    backgroundColor: "#1A9CB7",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Add
                </button>
              </div>
              <div className="payment">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {loading ? (
                    <div className="d-flex justify-content-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    children.map((child, index) => (
                      <div
                        key={child.id || index}
                        className="children radio-wrapper"
                        style={{
                          border: selectedChildren.includes(child.id)
                            ? "2px solid #1A9CB7"
                            : "2px solid transparent",
                          cursor: "pointer",
                          padding: "5px 15px",
                          marginTop: "15px",
                          width: "30%",
                          marginRight: 7,
                        }}
                        onClick={() => toggleChildSelection(child.id)}
                      >
                        <div className="d-flex justify-content-start">
                          <i
                            className={
                              selectedChildren.includes(child.id)
                                ? "fa-solid fa-square-check"
                                : "fa-regular fa-square"
                            }
                            style={{
                              color: selectedChildren.includes(child.id)
                                ? "#1A9CB7"
                                : undefined,
                              fontSize: "22px",
                            }}
                          ></i>
                          <p
                            style={{ marginBottom: "5px", marginLeft: "15px" }}
                          >
                            {child.name}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <p className="mb" style={{ marginTop: "15px" }}>
                  Number of children selected:{" "}
                  <span style={{ color: "#FF8A00" }}>
                    {selectedChildren.length}
                  </span>
                </p>
              </div>

              <div>
                <div style={{ backgroundColor: '#e6e3e3', borderRadius: '10px 10px 0 0', padding: '10px 20px 10px 20px' }}>
                  <h5 className='mb-0'>Course information</h5>
                </div>
                <div className='payment'>
                  <p style={{ paddingTop: 15 }}>Send the account via:</p>
                  <div className="d-flex justify-content-center">
                    <div className='d-flex radio-wrapper justify-content-center' style={{ border: '2px solid #1A9CB7', cursor: 'pointer', padding: '5px 20px', width: '45%' }}>
                      <div className='text-center'>
                        <p className='mb'>Email</p>
                        <p className='mb-0' style={{ color: '#FF8A00' }}>{parentEmail}</p>
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
                        <div style={{
                          borderWidth: 2, borderColor: '#FF8A00', borderStyle: 'solid', paddingLeft: 20, paddingRight: 10, alignItems: 'center', borderRadius: 10, display: 'flex', flexDirection: 'row',

                        }}>
                          <div>
                            {/* <div className="d-flex justify-content-center">
                              <img className='img-responsive mt-2' style={{ width: '80px', height: '80px', borderRadius: 10 }} src={courseDetails.picture || demo} alt="" />
                            </div> */}
                            <div>
                              <p className='mt-2'>Course's name: {courseDetails.courseName}</p>
                              <div className='d-flex'>
                                <p style={{ fontWeight: 'inherit' }}>Class: </p>
                                <p style={{ color: '#E53E5C' }}> {courseDetails.classCode}</p>
                              </div>
                            </div>
                            <div >
                              <div>
                                <p className='mt-2' style={{ fontWeight: 'inherit' }}>Teacher: {courseDetails.teacherName}</p>
                              </div>
                              <p style={{ color: '#FF8A00', fontWeight: 'bold' }}>Price: {formatPrice(courseDetails.price)}</p>
                            </div>
                          </div>

                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

            </div>
            <div className='col-lg-6'>

              <div className="payment">
                <div style={{ padding: '10px 35px' }}>
                  <div className='d-flex radio-wrapper justify-content-between' onClick={() => setSelectedPayment('momo')} style={{ border: selectedPayment === 'momo' ? '2px solid #1A9CB7' : '2px solid #c9c9c9', padding: '10px 35px', cursor: 'pointer', borderRadius: '10px' }}>
                    <div>
                      <div className='d-flex'>
                        <img style={{ height: '40px', width: '40px' }} src={momo} alt="" />
                        <p style={{ marginBottom: '12px' }}>Momo E-Wallet</p>
                      </div>
                    </div>
                  </div>

                </div>
                <div>
                  <h5>Voucher</h5>
                  <div className="d-flex justify-content-between" style={{ padding: '10px 35px' }}>
                    <input type="text" placeholder='Enter discount code' style={{ height: '48px', fontSize: '16px', width: '67%', paddingLeft: '15px', outline: 'none', borderRadius: 10, borderColor: 'rgb(201, 201, 201)', borderStyle: 'solid' }} />
                    <button style={{ height: '48px', color: 'white', backgroundColor: '#1A9CB7', border: 'none', borderRadius: '8px', width: '30%' }}>APPLY</button>
                  </div>
                </div>

                {courseDetails ? (
                  <div>
                    <h5>Order information</h5>
                    <div style={{ padding: "10px 35px" }}>
                      <div className="d-flex justify-content-between">
                        <p>Course</p>
                        <p>What is programming?</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Price</p>
                        <p>{formatPrice(courseDetails.price)}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Quantity</p>
                        <p>x {selectedChildren.length}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Discount</p>
                        <p>0 đ</p>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between">
                        <p>Total</p>
                        <p style={{ color: "#FF8A00" }}>
                          {(
                            courseDetails.price * selectedChildren.length
                          ).toLocaleString()}{" "}
                          đ
                        </p>
                      </div>
                      <div className="d-flex justify-content-center">
                        {selectedChildren.length === 0 ? (
                          <button
                            disabled
                            style={{
                              width: "100%",
                              backgroundColor: "gray",
                              borderRadius: "8px",
                              color: "white",
                              border: "none",
                              height: "48px",
                            }}
                          >
                            ORDER
                          </button>
                        ) : (
                          <button
                            onClick={BuyCourse}
                            disabled={isOrderProcessing}
                            style={{
                              width: "100%",
                              backgroundColor: "#FF8A00",
                              borderRadius: "8px",
                              color: "white",
                              border: "none",
                              height: "48px",
                            }}
                          >
                            {isOrderProcessing ? (
                              <div
                                className="spinner-border text-light"
                                role="status"
                              >
                                <span className="visually-hidden">
                                  Loading...
                                </span>
                              </div>
                            ) : (
                              "ORDER"
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>Loading course details...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}