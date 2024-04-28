import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../../helper/utils/NumberUtil";
import { getOrderList } from "../../../../helper/apis/order/order";
import { ToastContainer, toast } from "react-toastify";
import "../../../../markup/Pages/Staff/StaffOrder/StaffOrder.css";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  Pagination,
  PaginationItem,
  Stack,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import { ArrowBack, ArrowForward, Visibility } from "@mui/icons-material";

export default function StaffOrder() {
  const [orders, setOrders] = useState([]);
  const [ordersTotal, setOrdersTotal] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Success");
  const [loading, setLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState(undefined)

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

  const getStatusElement = (status) => {
    let label;
    let color;

    switch (status) {
      case "Success":
        {
          label = "Success";
          color = "#1A9CB7";
          break;
        }
      case "Pending":
        {
          label = "Pending";
          color = "#FF8A00";
          break;
        }
      case "Refunded":
        {
          label = "Refunded";
          color = "#2C44D8";
          break;
        }
      case "RequestRefund":
        {
          label = "Request Refund";
          color = "#F11616";
          break;
        }
      default:
        {
          label = "";
          color = "#6c757d";
          break;
        }
    }

    return (
      <div className="d-flex justify-content-center align-items-center mt-2">
        <Chip label={`${label}`} sx={{ backgroundColor: `${color}`, color: "white", fontSize: "0.9rem" }} />
      </div>
    )
  }

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
      try {
        const data = await getOrderList({ pageNumber: currentPage, status: selectedStatus, pageSize: 3 });
        setOrders(data.order);
        setOrdersTotal(data.orderTotal);
        setPageCount(data.totalPage);
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
  }, [selectedStatus, currentPage]);
  return (
    <div className="staff-order-container" style={{ borderRadius: "15px" }}>
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
                      <td style={{ width: "45%" }}>
                        <div>
                          <p className="mb-1"><span className="blue fw-bold">Parent:</span> {order.parentName}</p>
                          <p className="mb-1"><span className="blue fw-bold">Course:</span> {order.courseName}</p>
                          <p className="mb-1"><span className="blue fw-bold">Quantity:</span> {order.quantity}</p>
                        </div>
                      </td>
                      <td className="text-center mt-2" style={{ width: "15%" }}>
                        <p className="mt-2 mb-0">
                          {formatPrice(order.totalPrice)}
                        </p>
                      </td>
                      <td className="text-center mt-2" style={{ width: "15%" }}>
                        {/* Get status element */}
                        {getStatusElement(order?.orderStatus)}
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
        <div className='d-flex justify-content-center mt-4'>
          {orders.length > 0 && (
            <div className="pagination-container">
              <Stack
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
                my={1}
              >
                <Pagination
                  count={pageCount <= 0 ? 1 : pageCount}
                  // count={10}
                  color="primary"
                  page={currentPage}
                  onChange={(event, value) => setCurrentPage(value)}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{
                        previous: ArrowBack,
                        next: ArrowForward,
                      }}
                      {...item}
                    />
                  )}
                />
              </Stack>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}