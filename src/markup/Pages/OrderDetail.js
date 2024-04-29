import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import background from "./../../images/background/orderBackground.jpg";
import momo from "./../../images/icon/momo.png";
import demo from "./../../images/gallery/simp.jpg";
import PageTitle from "../Layout/PageTitle";
import { getOrderDetailById } from "../../helper/apis/order/order";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { notFoundPage } from "../../helper/constants/pageConstant";
import instance from "../../helper/apis/baseApi/baseApi";

export default function OrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  if (!orderId) {
    navigate(notFoundPage);
  }

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  //notification
  const notifyApiFail = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const ProcessOrder = () => {
    const [isOrderProcessing, setIsOrderProcessing] = useState(false);
    console.log(orderDetails);

    const BuyCourse = async () => {
      setIsOrderProcessing(true);

      try {

        const response = await instance.post(`api/v1/payment/momo/${orderDetails.orderId}`);


        let responseData = response.data;

        console.log("Payment initiated successfully", responseData);

        window.location.href = responseData.payUrl; 
      } catch (error) {
        console.error("There was a problem with the process:", error.message);
        setIsOrderProcessing(false);
      }
    };

    return (
      <div className="container">
        <ToastContainer />
        <div className="order-item">
          <div className="header d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center">
              <p>Order code: </p>
              <p>{orderDetails.orderCode}</p>
            </div>
            <span style={{ backgroundColor: "#1A9CB7", color: "white" }}>
              Process
            </span>
          </div>
          <div className="content d-flex align-items-center">
            <img src={demo} alt="" />
            <p>{orderDetails.courseName}</p>
            <p style={{ color: "#FF8A00" }}>Price: {orderDetails.price} VND</p>
            <p>Quantity purchased: {orderDetails.quantityPurchased}</p>
          </div>
        </div>
        <div className="order-id row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <p>Transaction Code: {orderDetails.transactionCode}</p>
            <p>Order Date: {orderDetails.orderDate}</p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 d-flex align-items-center">
            <img src={momo} alt="" style={{ height: "50px", width: "50px" }} />
            <p className="ms-3 mt-2">Pay with momo e-wallet</p>
          </div>
        </div>
        <div className="order-info row">
          <div className="order-select col-lg-6">
            <div className="order-select-content">
              <div className="d-flex justify-content-start align-items-center">
                <p>Number of children selected:</p>
                <p> {orderDetails.numberChildren}</p>
              </div>

              {orderDetails.students &&
                orderDetails.students.map((student, index) => (
                  <div className="d-flex justify-content-center align-items-center">
                    <div
                      key={index}
                      className="item text-center"
                      style={index > 0 ? { marginTop: "10px" } : {}}
                    >
                      <p className="mb">{student.studentName}</p>
                    </div>
                  </div>
                ))}

              <p className="mt-2 mb-3">Child's account will send to:</p>
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "60%",
                    border: "1px solid #1A9CB7",
                    borderRadius: "5px",
                    padding: "5px 0",
                  }}
                >
                  <i
                    style={{ color: "#FF8A00", fontSize: "20px" }}
                    class="fa-regular fa-envelope"
                  ></i>
                  <p style={{ marginLeft: "5px" }} className="mb">
                    {orderDetails.parentEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-info-content col-lg-6 col-md-12 col-sm-12">
            <div>
              <h5>Order information</h5>
              <div className="d-flex justify-content-between align-items-center">
                <p>Course</p>
                <p>{orderDetails.courseName}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>Price</p>
                <p>{orderDetails.price} VND</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>Discount</p>
                <p>0 VND</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <p>Total</p>
                <p>{orderDetails.totalPrice} VND</p>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button onClick={BuyCourse} style={{ backgroundColor: '#1A9CB7' }}>
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
                    "FINISH PAYMENT"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }

  const PendingOrder = () => {
    const OrderCancel = () => {
      navigate(`/order-cancel/${orderId}`);
    };
    return (
      <div className="container">
        <ToastContainer />
        <div className="order-item">
          <div className="header d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center">
              <p>Order code: </p>
              <p>{orderDetails.orderCode}</p>
            </div>
            <span style={{ backgroundColor: "#FF8A00", color: "white" }}>
              Pending
            </span>
          </div>
          <div className="content d-flex align-items-center">
            <img src={demo} alt="" />
            <p>{orderDetails.courseName}</p>
            <p style={{ color: "#FF8A00" }}>Price: {orderDetails.price} VND</p>
            <p>Quantity purchased: {orderDetails.quantityPurchased}</p>
            <span
              className="text-center p-1"
              style={{
                backgroundColor: "#1A9CB7",
                color: "white",
                borderRadius: "5px",
                width: "200px",
              }}
            >
              creating a course account
            </span>
          </div>
        </div>
        <div className="order-id row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <p>Transaction Code: {orderDetails.transactionCode}</p>
            <p>Order Date: {orderDetails.orderDate}</p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 d-flex align-items-center">
            <img src={momo} alt="" style={{ height: "50px", width: "50px" }} />
            <p className="ms-3 mt-2">Pay with momo e-wallet</p>
          </div>
        </div>
        <div className="order-info row">
          <div className="order-select col-lg-6">
            <div className="order-select-content">
              <div className="d-flex justify-content-start align-items-center">
                <p>Number of children selected:</p>
                <p> {orderDetails.numberChildren}</p>
              </div>

              {orderDetails.students &&
                orderDetails.students.map((student, index) => (
                  <div className="d-flex justify-content-center align-items-center">
                    <div
                      key={index}
                      className="item text-center"
                      style={index > 0 ? { marginTop: "10px" } : {}}
                    >
                      <p className="mb">{student.studentName}</p>
                    </div>
                  </div>
                ))}

              <p className="mt-2 mb-3">Child's account will send to:</p>
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "60%",
                    border: "1px solid #1A9CB7",
                    borderRadius: "5px",
                    padding: "5px 0",
                  }}
                >
                  <i
                    style={{ color: "#FF8A00", fontSize: "20px" }}
                    class="fa-regular fa-envelope"
                  ></i>
                  <p style={{ marginLeft: "5px" }} className="mb">
                    {orderDetails.parentEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-info-content col-lg-6 col-md-12 col-sm-12">
            <div>
              <h5>Order information</h5>
              <div className="d-flex justify-content-between align-items-center">
                <p>Course</p>
                <p>{orderDetails.courseName}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>Price</p>
                <p>{orderDetails.price} VND</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>Discount</p>
                <p>0 VND</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <p>Total</p>
                <p>{orderDetails.totalPrice} VND</p>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button onClick={OrderCancel}>CANCEL ORDER</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SuccessOrder = () => {
    const Repurchase = () => {
      navigate(`/courses`);
    };

    return (
      <div className="container">
        <div className="order-item">
          <div className="header d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center">
              <p>Order code: </p>
              <p>{orderDetails.orderCode}</p>
            </div>
            <span style={{ backgroundColor: "#6DCE63", color: "white" }}>
              Success
            </span>
          </div>
          <div className="content d-flex align-items-center">
            <img src={demo} alt="" />
            <p>{orderDetails.courseName}</p>
            <p style={{ color: "#FF8A00" }}>Price: {orderDetails.price} VND</p>
            <p>Quantity purchased: {orderDetails.quantityPurchased}</p>
          </div>
        </div>
        <div className="order-id row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <p>Transaction Code: {orderDetails.transactionCode}</p>
            <p>Order Date: {orderDetails.orderDate}</p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 d-flex">
            <img src={momo} alt="" style={{ height: "50px", width: "50px" }} />
            <p className="ms-3 mt-2">Pay with momo e-wallet</p>
          </div>
        </div>
        <div className="order-info row">
          <div className="order-select col-lg-6">
            <div className="order-select-content">
              <div className="d-flex justify-content-start align-items-center">
                <p>Number of children selected:</p>
                <p> {orderDetails.numberChildren}</p>
              </div>

              {orderDetails.students &&
                orderDetails.students.map((student, index) => (
                  <div className="d-flex justify-content-center align-items-center" >
                    <div
                      key={index}
                      className="item text-center"
                      style={index > 0 ? { marginTop: "10px" } : {}}
                    >
                      <p className="mb">{student.studentName}</p>
                    </div>
                  </div>
                ))}

              <p>Child's account will send to:</p>
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "60%",
                    border: "1px solid #1A9CB7",
                    borderRadius: "5px",
                    padding: "5px 0",
                  }}
                >
                  <i
                    style={{ color: "#FF8A00", fontSize: "20px" }}
                    class="fa-regular fa-envelope"
                  ></i>
                  <p style={{ marginLeft: "5px" }} className="mb">
                    {orderDetails.parentEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-info-content col-lg-6 col-md-12 col-sm-12">
            <div>
              <h5>Order information</h5>
              <div className="d-flex justify-content-between align-items-center">
                <p>Course</p>
                <p>{orderDetails.courseName}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>Price</p>
                <p>{orderDetails.price} VND</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>Discount</p>
                <p>0 VND</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <p>Total</p>
                <p>{orderDetails.totalPrice} VND</p>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button
                  style={{ backgroundColor: "#FF8A00" }}
                  onClick={Repurchase}
                >
                  REPURCHASE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RequestRefundOrder = () => {
    return (
      <div className="container">
        <div className="order-item">
          <div className="header d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-start align-items-center">
              <p>Order code: </p>
              <p>{orderDetails.orderCode}</p>
            </div>
            <span style={{ backgroundColor: "#F11616", color: "white" }}>
              RequestRefund
            </span>
          </div>
          <div className="content d-flex align-items-center">
            <img src={demo} alt="" />
            <p>{orderDetails.courseName}</p>
            <p style={{ color: "#FF8A00" }}>Price: {orderDetails.price} VND</p>
            <p>Quantity purchased: {orderDetails.quantityPurchased}</p>
            <span
              className="text-center"
              style={{
                backgroundColor: "#1A9CB7",
                color: "white",
                borderRadius: "5px",
                width: "200px",
                height: "30px",
              }}
            >
              Approving the cancellation request
            </span>
          </div>
        </div>
        <div className="order-id row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <p>Transaction Code: {orderDetails.transactionCode}</p>
            <p>Order Date: {orderDetails.orderDate}</p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 d-flex align-items-center">
            <img src={momo} alt="" style={{ height: "50px", width: "50px" }} />
            <p>Pay with momo e-wallet</p>
          </div>
        </div>
        <div className="order-info row">
          <div className="order-select col-lg-6">
            <div className="order-select-content">
              <div className="d-flex justify-content-start align-items-center">
                <p>Number of children selected:</p>
                <p> {orderDetails.numberChildren}</p>
              </div>

              {orderDetails.students &&
                orderDetails.students.map((student, index) => (
                  <div className="d-flex justify-content-center align-items-center">
                    <div
                      key={index}
                      className="item text-center"
                      style={index > 0 ? { marginTop: "10px" } : {}}
                    >
                      <p className="mb">{student.studentName}</p>
                    </div>
                  </div>
                ))}

              <p>Child's account will send to:</p>
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "60%",
                    border: "1px solid #1A9CB7",
                    borderRadius: "5px",
                    padding: "5px 0",
                  }}
                >
                  <i
                    style={{ color: "#FF8A00", fontSize: "20px" }}
                    class="fa-regular fa-envelope"
                  ></i>
                  <p style={{ marginLeft: "5px" }} className="mb">
                    {orderDetails.parentEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-info-content col-lg-6 col-md-12 col-sm-12">
            <div>
              <h5>Order information</h5>
              <div className="d-flex justify-content-between align-items-center">
                <p>Course</p>
                <p>{orderDetails.courseName}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>Price</p>
                <p>{orderDetails.price} VND</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>Discount</p>
                <p>0 VND</p>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <p>Total</p>
                <p>{orderDetails.totalPrice} VND</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RefundedOrder = () => {
    return <div></div>;
  };

  const renderOrderDetail = () => {
    switch (orderDetails?.status) {
      case "Process":
        return <ProcessOrder orderDetails={orderDetails} />;
      case "Pending":
        return <PendingOrder orderDetails={orderDetails} />;
      case "Success":
        return <SuccessOrder orderDetails={orderDetails} />;
      case "RequestRefund":
        return <RequestRefundOrder orderDetails={orderDetails} />;
      case "Refunded":
        return <RefundedOrder orderDetails={orderDetails} />;
      default:
        return <div>Status not recognized</div>;
    }
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);

      try {
        const data = await getOrderDetailById(orderId);
        if (!data)
          throw new Error("Order empty");

        setOrderDetails(data);
      } catch (error) {
        navigate(notFoundPage);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  return (
    <div>
      <Header />
      <PageTitle motherMenu="Order Detail" activeMenu="Order Detail" />
      <div
        style={{
          backgroundImage: `url(${background})`,
          minHeight: "800px",
          backgroundPosition: "center center", // Center the background image
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {loading && !orderDetails ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner
              animation="border"
              variant="success"
              className="custom-spinner"
            />
          </div>
        ) : (
          renderOrderDetail()
        )}
      </div>

      <Footer />
    </div>
  );
}
