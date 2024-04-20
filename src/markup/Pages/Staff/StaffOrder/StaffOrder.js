import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../../helper/utils/NumberUtil";
import { getOrderList } from "../../../../helper/apis/order/order";
import { ToastContainer, toast } from "react-toastify";
import "./StaffOrder.css";
import { Tab, Tabs } from "@mui/material";

export default function StaffOrder() {
  const [orders, setOrders] = useState([]);
  const [ordersTotal, setOrdersTotal] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Success");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleViewDetail = (orderId) => {
    navigate(`/staff/staff-order-detail/${orderId}`);
  };

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

  const notifyApiSucess = (message) =>
    toast.success(message, {
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "#1A9CB7";
      case "Pending":
        return "#FF8A00";
      case "Refunded":
        return "#2C44D8";
      case "RequestRefund":
        return "#F11616";
      default:
        return "#6c757d";
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        const data = await getOrderList({ status: selectedStatus });
        setOrders(data.order);
        setOrdersTotal(data.orderTotal);
      } catch (error) {
        let message = "";
        if (error.response) {
          console.log(`Error response: ${error.response?.data?.message}`);
          message = error.response?.data?.message || "Undefined.";
        } else {
          console.log(`Error message abc: ${error.message}`);
          message = error.message || "Undefined.";
        }
        notifyApiFail(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [selectedStatus]);
  return (
    <div className="staff-order-container" style={{ borderRadius: "15px" }}>
      {/* <div className="d-flex justify-content between">
        <div className="staff-order-menu d-flex justify-content-start">
          <div
            className={selectedStatus === "Success" ? "active" : ""}
            onClick={() => setSelectedStatus("Success")}
          >
            <p
              style={{ fontSize: "18px", fontWeight: "bold" }}
              className="mb-1"
            >
              Success
            </p>
            <hr className="mt-0" />
          </div>
          <div
            style={{ marginLeft: "25px" }}
            className={selectedStatus === "Pending" ? "active" : ""}
            onClick={() => setSelectedStatus("Pending")}
          >
            <p
              className="mb-1"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Pending
            </p>
            <hr className="mt-0" />
          </div>
          <div
            style={{ marginLeft: "25px" }}
            className={selectedStatus === "Refunded" ? "active" : ""}
            onClick={() => setSelectedStatus("Refunded")}
          >
            <p
              className="mb-1"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Refunded
            </p>
            <hr className="mt-0" />
          </div>
          <div
            style={{ marginLeft: "25px" }}
            className={selectedStatus === "RequestRefund" ? "active" : ""}
            onClick={() => setSelectedStatus("RequestRefund")}
          >
            <p
              className="mb-1"
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >
              Request Refund
            </p>
            <hr className="mt-0" />
          </div>
        </div>
      </div> */}
      <Tabs
        value={selectedStatus}
        onChange={(event, newValue) => setSelectedStatus(newValue)}
        aria-label="Order status"
        className="mb-4"
      >
        <Tab value={"Success"} label="Success" sx={{ fontSize: "1rem" }} />
        <Tab value={"Pending"} label="Pending" sx={{ fontSize: "1rem" }} />
        <Tab value={"Refunded"} label="Refunded" sx={{ fontSize: "1rem" }} />
        <Tab
          value={"RequestRefund"}
          label="Request Refund"
          sx={{ fontSize: "1rem" }}
        />
      </Tabs>

      <ToastContainer />
      <div className="staff-order-content">
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start">
            <div
              className="pt-1"
              style={{
                fontWeight: "bold",
                backgroundColor: "#FFA63D",
                borderRadius: "5px",
                color: "white",
                height: "30px",
                width: "150px",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              Enter order code
            </div>
            <input
              style={{
                outline: "none",
                borderRadius: "8px",
                border: "1px solid #FFA63D",
                width: "400px",
              }}
              className="ms-3"
              type="text"
            />
          </div>
          <div
            className="text-center pt-1"
            style={{
              border: "1px solid #F25B58",
              borderRadius: "8px",
              color: "#F25B58",
              width: "120px",
              fontWeight: "bold",
            }}
          >
            {ordersTotal} Orders
          </div>
        </div>
        <div class="table-responsive mt-3 staff-order-content-table">
          <table class="table table-bordered staff-order-table mt-0 ">
            <thead className="staff-order-table-th">
              <tr style={{ backgroundColor: "#1A9CB7" }}>
                <th className="staff-order-table-th">Information</th>
                <th className="staff-order-table-th">Total</th>
                <th className="staff-order-table-th">Status</th>
                <th className="staff-order-table-th">Operation</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <React.Fragment key={order.orderId}>
                    {/* Row for parentName and orderCode */}
                    <tr>
                      <td style={{ width: "50%" }}>
                        <div>
                          <p className="mb-1"><span className="blue fw-bold">Parent:</span> {order.parentName}</p>
                          <p className="mb-1"><span className="blue fw-bold">Course:</span> {order.courseName}</p>
                          <p className="mb-1"><span className="blue fw-bold">Quantity:</span> {order.quantity}</p>
                        </div>
                      </td>
                      <td className="text-center mt-2" style={{ width: "10%" }}>
                        <p className="mt-2 mb-0">
                          {formatPrice(order.totalPrice)}
                        </p>
                      </td>
                      <td className="text-center mt-2" style={{ width: "15%" }}>
                        <p
                          style={{
                            color: getStatusColor(order.orderStatus),
                            fontWeight: "bold",
                          }}
                          className="mt-2 mb-0"
                        >
                          {order.orderStatus}
                        </p>
                      </td>
                      <td className="text-center" style={{ width: "25%" }}>
                        <p className="mb-1">Order code: {order.orderCode}</p>
                        <button
                          onClick={() => handleViewDetail(order.orderId)}
                          className="mt-2"
                          style={{
                            backgroundColor: "#FFA63D",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                          }}
                        >
                          View detail
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
