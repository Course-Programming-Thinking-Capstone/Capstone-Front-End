import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import momo from "../../../../images/icon/momo.png";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatPrice } from "../../../../helper/utils/NumberUtil";
import {
    convertUtcToLocalTimeV2, formatDateV1,
} from "../../../../helper/utils/DateUtil";
import instance from "../../../../helper/apis/baseApi/baseApi";
import { getOrderDetailById } from "../../../../helper/apis/order/order";
import { adminOrderPage, notFoundPage } from "../../../../helper/constants/pageConstant";
import defaultCoverImage from "../../../../images/course/default-cover-image.png";
import { Backdrop, Button, Chip, CircularProgress, Stack } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
import { LoadingSpinner } from "../../../Layout/Components/LoadingSpinner";

const SuccessOrder = ({ orderDetail }) => {
    return (<>
        <div
            className="d-flex justify-content-between align-items-center py-2 px-3"
            style={{
                backgroundColor: "#eceace", borderRadius: "8px", height: "50px", fontSize: "18px"
            }}
        >
            <div className="d-flex justify-content-start align-items-center">
                <i
                    style={{ fontSize: "22px" }}
                    class="fa-solid fa-user orange"
                ></i>
                <p className="mb-0 ms-3">
                    <span className="staff-order-detail-title">Parent: </span>{orderDetail.parentName}
                </p>
            </div>

            <Chip label="Success" color="primary" sx={{ backgroundColor: "#1A9CB7", fontSize: "14px" }} />
        </div>
        <div
            className="mt-3 p-2"
            style={{ backgroundColor: "#eceace", borderRadius: "8px" }}
        >
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"flex-start"}>
                <Stack direction={"row"} spacing={2} justifyContent={"flex-start"} alignItems={"center"}
                    sx={{ fontSize: "16px" }}>
                    <div >
                        <img
                            src={orderDetail?.pictureUrl ?? defaultCoverImage}
                            style={{ height: "80px", width: "80px", borderRadius: "5px" }}
                            alt={orderDetail.courseName}
                        />
                    </div>
                    <Stack direction={"column"} spacing={2} alignItems={"flex-start"} justifyContent={"space-between"} >
                        <p className="mb-2"><span className="staff-order-detail-title">Course name:{" "}</span>{orderDetail.courseName}</p>
                        <p className="mb-0">
                            <span className="staff-order-detail-title">Class:{" "}</span>
                            <span style={{ fontWeight: "bold", color: "#E53E5C" }}>
                                {orderDetail.classCode}
                            </span>
                        </p>
                    </Stack>
                    {/* <div className="col-md-2">
                        Quantity: <span>{orderDetail.quantityPurchased}</span>
                    </div>
                    <div className="col-md-2 orange fw-bold">
                        {formatPrice(orderDetail.totalPrice)}
                    </div> */}
                </Stack>
                <div >
                    <p className="mb-0" style={{ fontSize: "18px" }}>
                        <span className="staff-order-detail-title">Order code:</span>  {orderDetail.orderCode}
                    </p>
                </div>
            </Stack>

        </div>
        <div
            className="d-flex justify-content-between align-items-center mt-3 py-2 px-3"
            style={{ backgroundColor: "#eceace", borderRadius: "8px" }}
        >
            <div style={{ width: "60%" }}>
                <p className="mb-1">
                    <span className="staff-order-detail-title">Transaction code:</span> <span>{orderDetail.transactionCode}</span>
                </p>
                <p className="mb-1">
                    <span className="staff-order-detail-title">Order date:</span>
                    <span>
                        {" "}
                        {formatDateV1(convertUtcToLocalTimeV2(orderDetail.orderDate))}{" "}
                    </span>
                </p>
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{ width: "40%" }}>
                <img style={{ height: "55px", width: "55px" }} src={momo} alt="Momo" />
                <p className="ms-2 mb-0">Pay with momo e-wallet</p>
            </div>
        </div>
        <div className="d-flex justify-content-between align-items-start mt-2">
            <div style={{ width: "49%" }} className="py-2">
                <p
                    style={{
                        backgroundColor: "#ff8a00",
                        color: "white",
                        fontSize: "17px",
                        borderRadius: "8px 8px 0px 0px",
                    }}
                    className="mb-0 ps-3 py-1"
                >
                    Number of students selected: <span></span>
                </p>
                <div className="px-4 py-2" style={{ backgroundColor: '#eceace', borderRadius: '0px 0px 8px 8px' }}>
                    {orderDetail.students.map((student) => (<div
                        key={student.studentId}
                        className="d-flex justify-content-center align-items-center"
                    >
                        <div
                            className="text-center my-1 py-1"
                            style={{
                                width: "50%", borderRadius: "8px", border: "1px solid #ff8a00",
                            }}
                        >
                            {student.studentName}
                        </div>
                    </div>))}
                </div>

                <div className="mt-4">
                    <p
                        style={{
                            backgroundColor: "#ff8a00",
                            color: "white",
                            fontSize: "17px",
                            borderRadius: "8px 8px 0px 0px",
                        }}
                        className="mb-0 ps-3 py-1"
                    >
                        Student account sent to
                    </p>
                    <div className="d-flex justify-content-center align-items-center"
                        style={{ backgroundColor: '#eceace', borderRadius: '0px 0px 8px 8px' }}>
                        <div
                            className="text-center my-3 px-2 py-1"
                            style={{ borderRadius: "8px", border: "1px solid #ff8a00" }}
                        >
                            <i class="fa-regular fa-envelope"
                                style={{ color: "#ff8a00" }}></i> {orderDetail.parentEmail}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ width: "49%" }} className="py-2 ">
                <p
                    style={{
                        backgroundColor: "#ff8a00",
                        color: "white",
                        fontSize: "17px",
                        borderRadius: "8px 8px 0px 0px",
                    }}
                    className="mb-0 ps-3 py-1"
                >
                    Order information
                </p>
                <div className="px-4 py-2" style={{ backgroundColor: '#eceace', borderRadius: '0px 0px 8px 8px' }}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="me-3 staff-order-detail-title">Course</span>
                        <span>{orderDetail.courseName}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="staff-order-detail-title">Price</span>
                        <span>{formatPrice(orderDetail.price)}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="staff-order-detail-title">Quantity</span>
                        <span>{orderDetail.quantityPurchased}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <span className="staff-order-detail-title">Discount</span>
                        <span>0</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <span className="staff-order-detail-title">Total</span>
                        <span className="orange" style={{ fontWeight: 'bold' }}>
                            {formatPrice(orderDetail?.totalPrice)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </>

    );
};

const PendingOrder = ({ orderDetail }) => {
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);
    const [show, setShow] = useState(false);
    const [currentStudentId, setCurrentStudentId] = useState(null);
    const [currentStudentDetail, setCurrentStudentDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showSecondModal, setShowSecondModal] = useState(false);
    const [accountCreationResponse, setAccountCreationResponse] = useState(null);
    const [note, setNote] = useState("");

    const [creatingAccountLoading, setCreatingAccountLoading] = useState(false);
    const [requestingEmailLoading, setRequestingEmailLoading] = useState(false);
    const [sendingEmailLoading, setSendingEmailLoading] = useState(false);
    const [confirmingOrderLoading, setConfirmingOrderLoading] = useState(false);

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

    //notification
    const notifySuccess = (message) =>
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

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

    const handleClose = () => {
        setShow(false);
        setShowSecondModal(false);
        setCurrentStudentId(null);
    };

    const handleShow = (studentId) => {
        setShow(true);
        setCurrentStudentId(studentId);
    };

    const requestEmailForStudent = async (parentId, studentName) => {
        setRequestingEmailLoading(true);
        try {
            const response = await instance.post(`api/v1/staffs/parent/request-email?parentId=${parentId}&studentName=${encodeURIComponent(studentName)}`, {});
            const message = await response.data;

            notifySuccess(message);
        } catch (error) {
            let message;

            if (error.response) {
                message = error.response?.data?.message || "Something wrong.";
            } else {
                message = error.message || "Something wrong.";
            }

            notifyApiFail(message);
        } finally {
            setRequestingEmailLoading(false); // End loading
        }
    };

    const createStudentAccount = async () => {
        if (!username || !password) {
            toast.warn("Please fill in username and password", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return; // Stop the function execution here
        }

        setCreatingAccountLoading(true);

        const payload = {
            studendId: currentStudentId,
            userName: username,
            password: password,
            orderId: orderDetail.orderId,
            classId: orderDetail.classId,
        };

        try {
            setUsername("");
            setPassword("");

            const response = await instance.post(`api/v1/staffs/student`, payload);
            const accountData = response.data;

            // Store the account creation response data
            setAccountCreationResponse(accountData);

            setShow(false);

            // Open the second modal
            setShowSecondModal(true);

            notifySuccess("Account created successfully");
        } catch (error) {
            let message;

            if (error.response) {
                message = error.response?.data?.message || "Something wrong.";
            } else {
                message = error.message || "Something wrong.";
            }

            notifyApiFail(message);
        } finally {
            setCreatingAccountLoading(false); // End loading
        }
    };

    const handleSendEmail = async () => {
        try {
            setSendingEmailLoading(true);
            const payload = {
                studentName: accountCreationResponse.studentName,
                birthday: accountCreationResponse.birthday,
                account: accountCreationResponse.account,
                password: accountCreationResponse.password,
                note: note,
                email: accountCreationResponse.email,
                parentId: orderDetail.parentId,
            };
            await instance.post(`api/v1/staffs/parent/send-email`, payload);

            setShowSecondModal(false);
            setAccountCreationResponse(null);

            window.location.reload();
        } catch (error) {
            let message;

            if (error.response) {
                message = error.response?.data?.message || "Something wrong.";
            } else {
                message = error.message || "Something wrong.";
            }

            notifyApiFail(message);
        } finally {
            setSendingEmailLoading(false);
        }
    };

    const handleOrderConfirmation = async () => {
        setConfirmingOrderLoading(true);

        try {
            await instance.patch(`api/v1/orders/confirm/${orderDetail.orderId}`, {});

            // window.location.reload();
            navigate(adminOrderPage);
        } catch (error) {
            let message;

            if (error.response) {
                message = error.response?.data?.message || "Something wrong.";
            } else {
                message = error.message || "Something wrong.";
            }

            notifyApiFail(message);
        } finally {
            setConfirmingOrderLoading(false);
        }
    };

    useEffect(() => {
        const fetchStudentDetails = async () => {
            if (currentStudentId) {
                setLoading(true);
                try {
                    const response = await instance.get(`api/v1/students/detail/${currentStudentId}`);
                    const studentData = response.data;

                    setCurrentStudentDetail(studentData);
                } catch (error) {
                    console.error("Error fetching student details:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchStudentDetails();
    }, [currentStudentId]);

    const buttonStyle = isChecked ? {
        backgroundColor: "#F15C58", color: "white", borderRadius: "8px", border: "none", height: "40px", width: "200px",
    } : {
        backgroundColor: "gray", color: "white", borderRadius: "8px", border: "none", height: "40px", width: "200px",
    };

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={creatingAccountLoading || requestingEmailLoading || sendingEmailLoading || confirmingOrderLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div
                className="d-flex justify-content-between align-items-center py-2 px-3"
                style={{
                    backgroundColor: "#eceace", borderRadius: "8px", height: "50px", fontSize: "18px"
                }}
            >
                <div className="d-flex justify-content-start align-items-center">
                    <i
                        style={{ fontSize: "22px" }}
                        class="fa-solid fa-user orange"
                    ></i>
                    <p className="mb-0 ms-3">
                        <span className="staff-order-detail-title">Parent: </span>{orderDetail.parentName}
                    </p>
                </div>

                <Chip label="Pending" color="primary" sx={{ backgroundColor: "#FF8A00", fontSize: "14px" }} />
            </div>

            <div
                className="mt-3 p-2"
                style={{ backgroundColor: "#eceace", borderRadius: "8px" }}
            >
                <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"flex-start"}>
                    <Stack direction={"row"} spacing={2} justifyContent={"flex-start"} alignItems={"center"}
                        sx={{ fontSize: "16px" }}>
                        <div >
                            <img
                                src={orderDetail?.pictureUrl ?? defaultCoverImage}
                                style={{ height: "80px", width: "80px", borderRadius: "5px" }}
                                alt={orderDetail.courseName}
                            />
                        </div>
                        <Stack direction={"column"} spacing={2} alignItems={"flex-start"} justifyContent={"space-between"} >
                            <p className="mb-2"><span className="staff-order-detail-title">Course name:{" "}</span>{orderDetail.courseName}</p>
                            <p className="mb-0">
                                <span className="staff-order-detail-title">Class:{" "}</span>
                                <span style={{ fontWeight: "bold", color: "#E53E5C" }}>
                                    {orderDetail.classCode}
                                </span>
                            </p>
                        </Stack>
                        {/* <div className="col-md-2">
                        Quantity: <span>{orderDetail.quantityPurchased}</span>
                    </div>
                    <div className="col-md-2 orange fw-bold">
                        {formatPrice(orderDetail.totalPrice)}
                    </div> */}
                    </Stack>
                    <div >
                        <p className="mb-0" style={{ fontSize: "18px" }}>
                            <span className="staff-order-detail-title">Order code:</span>  {orderDetail.orderCode}
                        </p>
                    </div>
                </Stack>

            </div>
            <div
                className="d-flex justify-content-between align-items-center mt-3 py-2 px-3"
                style={{ backgroundColor: "#eceace", borderRadius: "8px" }}
            >
                <div style={{ width: "60%" }}>
                    <p className="mb-1">
                        <span className="staff-order-detail-title">Transaction code:</span> <span>{orderDetail.transactionCode}</span>
                    </p>
                    <p className="mb-1">
                        <span className="staff-order-detail-title">Order date:</span>
                        <span>
                            {" "}
                            {formatDateV1(convertUtcToLocalTimeV2(orderDetail.orderDate))}{" "}
                        </span>
                    </p>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ width: "40%" }}>
                    <img style={{ height: "55px", width: "55px" }} src={momo} alt="Momo" />
                    <p className="ms-2 mb-0">Pay with momo e-wallet</p>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-start">
                <div style={{ width: "49%" }} className="py-2">
                    <p
                        style={{
                            backgroundColor: "#ff8a00",
                            color: "white",
                            fontSize: "17px",
                            borderRadius: "8px 8px 0px 0px",
                        }}
                        className="mb-0 ps-3 py-1"
                    >
                        Number of students selected: <span></span>
                    </p>
                    <div className="px-4 py-2" style={{ backgroundColor: '#eceace', borderRadius: '0px 0px 8px 8px' }}>
                        {orderDetail.students.map((student) => (<div
                            key={student.studentId}
                            className="d-flex justify-content-center align-items-center pt-3 pb-2"
                        >
                            <div
                                className="text-center my-1 py-1"
                                style={{
                                    width: "50%", borderRadius: "8px", border: "1px solid #ff8a00",
                                }}
                            >
                                {student.studentName}
                            </div>
                            <div>
                                {student.userName === null && (<div className="ms-2">
                                    <i
                                        onClick={() => handleShow(student.studentId)}
                                        style={{
                                            fontSize: "18px", color: "#1A9CB7", cursor: "pointer",
                                        }}
                                        className="fa-solid fa-pen-to-square"
                                    ></i>
                                </div>)}
                            </div>
                        </div>))}

                        <ToastContainer />
                        <Modal
                            show={show}
                            onHide={handleClose}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Body>
                                {loading && <div>Loading...</div>}
                                {currentStudentDetail && (<div>
                                    <h4 className="orange mb-1">Student's information</h4>
                                    <div className="px-3">
                                        <p className="mb-1 blue">Student's name</p>
                                        <div
                                            className="ps-2 py-2"
                                            style={{
                                                backgroundColor: "#D4D4D4", borderRadius: "8px",
                                            }}
                                        >
                                            {currentStudentDetail.fullName}
                                        </div>
                                        <p className="mb-1 blue">Date of birth</p>
                                        <div
                                            className="ps-2 py-2"
                                            style={{
                                                backgroundColor: "#D4D4D4", borderRadius: "8px",
                                            }}
                                        >
                                            {currentStudentDetail.dateOfBirth}
                                        </div>
                                        <p className="mb-1 blue">Email</p>
                                        <div>
                                            {currentStudentDetail.email ? (
                                                <div style={{ backgroundColor: "#D4D4D4" }}>
                                                    {currentStudentDetail.email}
                                                </div>) : (<button
                                                    onClick={() => requestEmailForStudent(orderDetail.parentId, currentStudentDetail.fullName)}
                                                    style={{
                                                        backgroundColor: "#FF8A00",
                                                        border: "none",
                                                        borderRadius: "8px",
                                                        color: "white",
                                                        height: "35px",
                                                        width: "200px",
                                                    }}
                                                >
                                                    {requestingEmailLoading ? (<div
                                                        className="spinner-border text-light"
                                                        role="status"
                                                    >
                                                        <span className="visually-hidden">
                                                            Loading...
                                                        </span>
                                                    </div>) : ("Request to create email")}
                                                </button>)}
                                        </div>
                                    </div>

                                    <h4 className="orange mb-1 mt-2">Create account</h4>
                                    <div className="px-3">
                                        <p className="mb-1 blue">Username</p>
                                        <input
                                            className="ps-1 py-1"
                                            style={{
                                                outline: "none", border: "1px solid #FF8A00", borderRadius: "8px",
                                            }}
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                        <p className="mb-1 blue">Password</p>
                                        <input
                                            className="ps-1 py-1"
                                            style={{
                                                outline: "none", border: "1px solid #FF8A00", borderRadius: "8px",
                                            }}
                                            type="text"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    <div className="d-flex justify-content-end align-items-center">
                                        <button
                                            className="me-3"
                                            style={{
                                                backgroundColor: "white",
                                                color: "#F15C58",
                                                border: "none",
                                                borderRadius: "8px",
                                                height: "30px",
                                                width: "100px",
                                            }}
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            style={{
                                                backgroundColor: "#F15C58",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "8px",
                                                height: "30px",
                                                width: "100px",
                                            }}
                                            onClick={createStudentAccount}
                                        >
                                            {creatingAccountLoading ? (<div
                                                className="spinner-border text-light"
                                                role="status"
                                            >
                                                <span className="visually-hidden">Loading...</span>
                                            </div>) : ("Create")}
                                        </button>
                                    </div>
                                </div>)}
                            </Modal.Body>
                        </Modal>
                        <Modal
                            backdrop="static"
                            show={showSecondModal}
                            onHide={handleClose}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Body>
                                {loading && <div>Loading...</div>}
                                {accountCreationResponse && (<div>
                                    <p className="mb-1 blue">Student information</p>
                                    <div className="ps-3">
                                        <div className="d-flex justify-content-start align-items-center">
                                            <p>Student's name: </p>
                                            <p className="ms-3">
                                                {accountCreationResponse.studentName}
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <p>Date of birth: </p>
                                            <p className="ms-3">
                                                {accountCreationResponse.birthday}
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <p>Username: </p>
                                            <p className="ms-3" style={{ color: "#E53E5C" }}>
                                                {accountCreationResponse.account}
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-start align-items-center">
                                            <p>Password: </p>
                                            <p className="ms-3" style={{ color: "#E53E5C" }}>
                                                {accountCreationResponse.password}
                                            </p>
                                        </div>
                                        <div>
                                            <p>Note: </p>
                                            <textarea
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                                rows="3"
                                                style={{
                                                    width: "100%", outline: "none", border: "1px solid #FF8A00",
                                                }}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <p className="mb-1 blue">Send to email account: </p>
                                        <span
                                            className="ms-3 px-2 py-2"
                                            style={{
                                                color: "#FF8A00", border: "1px solid #FF8A00", borderRadius: "8px",
                                            }}
                                        >
                                            {accountCreationResponse.email}
                                        </span>
                                    </div>
                                    <div className="d-flex justify-content-end align-items-center">
                                        <button
                                            className="mt-3"
                                            onClick={handleSendEmail}
                                            style={{
                                                backgroundColor: "#F15C58",
                                                color: "white",
                                                border: "none",
                                                borderRadius: "8px",
                                                height: "30px",
                                                width: "100px",
                                            }}
                                        >
                                            {sendingEmailLoading ? (<div
                                                className="spinner-border text-light"
                                                role="status"
                                            >
                                                <span className="visually-hidden">Loading...</span>
                                            </div>) : ("Send")}
                                        </button>
                                    </div>
                                </div>)}
                            </Modal.Body>
                        </Modal>
                    </div>

                    <div className="mt-4">
                        <p
                            style={{
                                backgroundColor: "#ff8a00",
                                color: "white",
                                fontSize: "17px",
                                borderRadius: "8px 8px 0px 0px",
                            }}
                            className="mb-0 ps-3 py-1"
                        >
                            Student account will send to
                        </p>
                        <div className="d-flex justify-content-center align-items-center"
                            style={{ backgroundColor: '#eceace', borderRadius: '0px 0px 8px 8px' }}>
                            <div
                                className="text-center my-3 px-2 py-1"
                                style={{ borderRadius: "8px", border: "1px solid #ff8a00" }}
                            >
                                <i class="fa-regular fa-envelope"
                                    style={{ color: "#ff8a00" }}></i> {orderDetail.parentEmail}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: "49%" }} className="py-2">
                    <p
                        style={{
                            backgroundColor: "#ff8a00",
                            color: "white",
                            fontSize: "17px",
                            borderRadius: "8px 8px 0px 0px",
                        }}
                        className="mb-0 ps-3 py-1"
                    >
                        Order information
                    </p>
                    <div className="px-4 py-2" style={{ backgroundColor: '#eceace', borderRadius: '0px 0px 8px 8px' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="me-3 staff-order-detail-title">Course</span>
                            <span>{orderDetail.courseName}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="staff-order-detail-title">Price</span>
                            <span>{formatPrice(orderDetail.price)}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="staff-order-detail-title">Quantity</span>
                            <span>{orderDetail.quantityPurchased}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="staff-order-detail-title">Discount</span>
                            <span>0</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="staff-order-detail-title">Total</span>
                            <span className="orange" style={{ fontWeight: 'bold' }}>
                                {formatPrice(orderDetail?.totalPrice)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-start align-items-center my-2">
                <i
                    className={isChecked ? "fa-solid fa-square-check mt-1" : "fa-regular fa-square mt-1"}
                    style={{ fontSize: "18px", cursor: "pointer" }}
                    onClick={toggleCheck}
                ></i>
                <p className="mb-1 ms-2">
                    Have created enough accounts for children and sent accounts to parents via the selected method
                </p>
            </div>
            <div className="d-flex justify-content-end align-items-center pb-4">
                <button
                    style={buttonStyle}
                    disabled={!isChecked}
                    onClick={handleOrderConfirmation}
                >
                    {confirmingOrderLoading ? (<div className="spinner-border text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>) : ("Order confirmation")}
                </button>
            </div>
        </>);
};

const RefundedOrder = ({ orderDetail }) => {
    return (
        <>
            <div
                className="d-flex justify-content-between align-items-center py-2 px-3"
                style={{
                    backgroundColor: "#eceace", borderRadius: "8px", height: "50px", fontSize: "18px"
                }}
            >
                <div className="d-flex justify-content-start align-items-center">
                    <i
                        style={{ fontSize: "22px" }}
                        class="fa-solid fa-user orange"
                    ></i>
                    <p className="mb-0 ms-3">
                        <span className="staff-order-detail-title">Parent: </span>{orderDetail.parentName}
                    </p>
                </div>

                <Chip label="Refunded" color="primary" sx={{ backgroundColor: "#2C44D8", fontSize: "14px" }} />
            </div>

            <div
                className="mt-3 p-2"
                style={{ backgroundColor: "#eceace", borderRadius: "8px" }}
            >
                <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"flex-start"}>
                    <Stack direction={"row"} spacing={2} justifyContent={"flex-start"} alignItems={"center"}
                        sx={{ fontSize: "16px" }}>
                        <div >
                            <img
                                src={orderDetail?.pictureUrl ?? defaultCoverImage}
                                style={{ height: "80px", width: "80px", borderRadius: "5px" }}
                                alt={orderDetail.courseName}
                            />
                        </div>
                        <Stack direction={"column"} spacing={2} alignItems={"flex-start"} justifyContent={"space-between"} >
                            <p className="mb-2"><span className="staff-order-detail-title">Course name:{" "}</span>{orderDetail.courseName}</p>
                            <p className="mb-0">
                                <span className="staff-order-detail-title">Class:{" "}</span>
                                <span style={{ fontWeight: "bold", color: "#E53E5C" }}>
                                    {orderDetail.classCode}
                                </span>
                            </p>
                        </Stack>
                        {/* <div className="col-md-2">
                        Quantity: <span>{orderDetail.quantityPurchased}</span>
                    </div>
                    <div className="col-md-2 orange fw-bold">
                        {formatPrice(orderDetail.totalPrice)}
                    </div> */}
                    </Stack>
                    <div >
                        <p className="mb-0" style={{ fontSize: "18px" }}>
                            <span className="staff-order-detail-title">Order code:</span>  {orderDetail.orderCode}
                        </p>
                    </div>
                </Stack>

            </div>
            <div
                className="d-flex justify-content-between align-items-center mt-3 py-2 px-3"
                style={{ backgroundColor: "#eceace", borderRadius: "8px" }}
            >
                <div style={{ width: "60%" }}>
                    <p className="mb-1">
                        <span className="staff-order-detail-title">Transaction code:</span> <span>{orderDetail.transactionCode}</span>
                    </p>
                    <p className="mb-1">
                        <span className="staff-order-detail-title">Order date:</span>
                        <span>
                            {" "}
                            {formatDateV1(convertUtcToLocalTimeV2(orderDetail.orderDate))}{" "}
                        </span>
                    </p>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ width: "40%" }}>
                    <img style={{ height: "55px", width: "55px" }} src={momo} alt="Momo" />
                    <p className="ms-2 mb-0">Pay with momo e-wallet</p>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-start mt-2">
                <div style={{ width: "49%" }} className="py-2">
                    <p
                        style={{
                            backgroundColor: "#ff8a00",
                            color: "white",
                            fontSize: "17px",
                            borderRadius: "8px 8px 0px 0px",
                        }}
                        className="mb-0 ps-3 py-1"
                    >
                        Number of students selected: <span></span>
                    </p>
                    <div className="px-4 py-2" style={{ backgroundColor: '#eceace', borderRadius: '0px 0px 8px 8px' }}>
                        {orderDetail.students.map((student) => (<div
                            key={student.studentId}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <div
                                className="text-center my-1 py-1"
                                style={{
                                    width: "50%", borderRadius: "8px", border: "1px solid #ff8a00",
                                }}
                            >
                                {student.studentName}
                            </div>
                        </div>))}
                    </div>

                    <div className="mt-4">
                        <p
                            style={{
                                backgroundColor: "#ff8a00",
                                color: "white",
                                fontSize: "17px",
                                borderRadius: "8px 8px 0px 0px",
                            }}
                            className="mb-0 ps-3 py-1"
                        >
                            Student account will send to
                        </p>
                        <div className="d-flex justify-content-center align-items-center"
                            style={{ backgroundColor: '#eceace', borderRadius: '0px 0px 8px 8px' }}>
                            <div
                                className="text-center my-3 px-2 py-1"
                                style={{ borderRadius: "8px", border: "1px solid #ff8a00" }}
                            >
                                <i class="fa-regular fa-envelope"
                                    style={{ color: "#ff8a00" }}></i> {orderDetail.parentEmail}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: "49%" }} className="py-2 pb-2">
                    <p
                        style={{
                            backgroundColor: "#ff8a00",
                            color: "white",
                            fontSize: "17px",
                            borderRadius: "8px 8px 0px 0px",
                        }}
                        className="mb-0 ps-3 py-1"
                    >
                        Order information
                    </p>
                    <div className="px-4 py-2" style={{ backgroundColor: '#eceace', borderRadius: '0px 0px 8px 8px' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="me-3 staff-order-detail-title">Course</span>
                            <span>{orderDetail.courseName}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="staff-order-detail-title">Price</span>
                            <span>{formatPrice(orderDetail.price)}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="staff-order-detail-title">Quantity</span>
                            <span>{orderDetail.quantityPurchased}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="staff-order-detail-title">Discount</span>
                            <span>0</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="staff-order-detail-title">Total</span>
                            <span className="orange" style={{ fontWeight: 'bold' }}>
                                {formatPrice(orderDetail?.totalPrice)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </>);
};

const RequestOrder = ({ orderDetail }) => {
    const navigate = useNavigate();
    const [cancellationReason, setCancellationReason] = useState("");

    const [show, setShow] = useState(false);
    const [isRefuseLoading, setIsRefuseLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [refusalReason, setRefusalReason] = useState("");

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

    const handleRefusal = async () => {
        const payload = {
            parentId: orderDetail.parentId, orderId: orderDetail.orderId, reasonRefuse: refusalReason,
        };

        try {
            setIsRefuseLoading(true);
            await instance.post(`api/v1/orders/handle-cancel?status=Refuse`, payload);

            // window.location.reload();
            navigate(adminOrderPage)
        } catch (error) {
            let message;

            if (error.response) {
                message = error.response?.data?.message || "Something wrong.";
            } else {
                message = error.message || "Something wrong.";
            }

            notifyApiFail(message);
        } finally {
            handleClose();
            setIsRefuseLoading(false);
        }
    };

    const handleApproval = async () => {
        try {
            setIsRefuseLoading(true);
            const payload = {
                parentId: orderDetail.parentId, orderId: orderDetail.orderId, reasonRefuse: "string",
            };
            await instance.post(`api/v1/orders/handle-cancel?status=Approve`, payload);

            handleClose();
            // window.location.reload();
            navigate(adminOrderPage);
        } catch (error) {
            let message;

            if (error.response) {
                message = error.response?.data?.message || "Something wrong.";
            } else {
                message = error.message || "Something wrong.";
            }

            notifyApiFail(message);
        } finally {
            setIsRefuseLoading(false);
        }
    };

    // const viewCancellationReason = async () => {
    //     try {
    //         const response = await instance.get(`api/v1/staffs/order/view-reason/${orderDetail.orderId}`);
    //         const reasondata = response.data;

    //         setCancellationReason(reasondata);
    //         handleShow();
    //     } catch (error) {

    //         //log
    //         console.log(`Error: ${JSON.stringify(error, null, 2)}`)
    //         let message;

    //         if (error.response) {
    //             message = error.response?.data?.message || "Something wrong.";
    //         } else {
    //             message = error.message || "Something wrong.";
    //         }

    //         notifyApiFail(message);
    //     }
    // };

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isRefuseLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <div
                className="d-flex justify-content-between align-items-center py-2 px-3"
                style={{
                    backgroundColor: "#eceace", borderRadius: "8px", height: "50px", fontSize: "18px"
                }}
            >
                <div className="d-flex justify-content-start align-items-center">
                    <i
                        style={{ fontSize: "22px" }}
                        class="fa-solid fa-user orange"
                    ></i>
                    <p className="mb-0 ms-3">
                        <span className="staff-order-detail-title">Parent: </span>{orderDetail.parentName}
                    </p>
                </div>

                <Chip label="Request Refund" color="primary" sx={{ backgroundColor: "#F11616", fontSize: "14px" }} />
            </div>

            <ToastContainer />

            <div
                className="mt-3 p-2"
                style={{ backgroundColor: "#eceace", borderRadius: "8px" }}
            >
                <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"flex-start"}>
                    <Stack direction={"row"} spacing={2} justifyContent={"flex-start"} alignItems={"center"}
                        sx={{ fontSize: "16px" }}>
                        <div >
                            <img
                                src={orderDetail?.pictureUrl ?? defaultCoverImage}
                                style={{ height: "80px", width: "80px", borderRadius: "5px" }}
                                alt={orderDetail.courseName}
                            />
                        </div>
                        <Stack direction={"column"} spacing={2} alignItems={"flex-start"} justifyContent={"space-between"} >
                            <p className="mb-2"><span className="staff-order-detail-title">Course name:{" "}</span>{orderDetail.courseName}</p>
                            <p className="mb-0">
                                <span className="staff-order-detail-title">Class:{" "}</span>
                                <span style={{ fontWeight: "bold", color: "#E53E5C" }}>
                                    {orderDetail.classCode}
                                </span>
                            </p>
                        </Stack>
                        {/* <div className="col-md-2">
                        Quantity: <span>{orderDetail.quantityPurchased}</span>
                    </div>
                    <div className="col-md-2 orange fw-bold">
                        {formatPrice(orderDetail.totalPrice)}
                    </div> */}
                    </Stack>
                    <div >
                        <p className="mb-0" style={{ fontSize: "18px" }}>
                            <span className="staff-order-detail-title">Order code:</span>  {orderDetail.orderCode}
                        </p>
                    </div>
                </Stack>

            </div>
            <div
                className="d-flex justify-content-between align-items-center mt-3 py-2 px-3"
                style={{ backgroundColor: "#eceace", borderRadius: "8px" }}
            >
                <div style={{ width: "60%" }}>
                    <p className="mb-1">
                        <span className="staff-order-detail-title">Transaction code:</span> <span>{orderDetail.transactionCode}</span>
                    </p>
                    <p className="mb-1">
                        <span className="staff-order-detail-title">Order date:</span>
                        <span>
                            {" "}
                            {formatDateV1(convertUtcToLocalTimeV2(orderDetail.orderDate))}{" "}
                        </span>
                    </p>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ width: "40%" }}>
                    <img style={{ height: "55px", width: "55px" }} src={momo} alt="Momo" />
                    <p className="ms-2 mb-0">Pay with momo e-wallet</p>
                </div>
            </div>
            <div className="d-flex justify-content-between align-items-start mt-2">
                <div style={{ width: "49%" }} className="py-2">
                    <p
                        style={{
                            backgroundColor: "#ff8a00",
                            color: "white",
                            fontSize: "17px",
                            borderRadius: "8px 8px 0px 0px",
                        }}
                        className="mb-0 ps-3 py-1"
                    >
                        Number of students selected: <span></span>
                    </p>
                    <div className="px-4 py-2" style={{ backgroundColor: '#eceace', borderRadius: '0px 0px 8px 8px' }}>
                        {orderDetail.students.map((student) => (<div
                            key={student.studentId}
                            className="d-flex justify-content-center align-items-center"
                        >
                            <div
                                className="text-center my-1 py-1"
                                style={{
                                    width: "50%", borderRadius: "8px", border: "1px solid #ff8a00",
                                }}
                            >
                                {student.studentName}
                            </div>
                        </div>))}
                    </div>

                    <div className="mt-4">
                        <p
                            style={{
                                backgroundColor: "#ff8a00",
                                color: "white",
                                fontSize: "17px",
                                borderRadius: "8px 8px 0px 0px",
                            }}
                            className="mb-0 ps-3 py-1"
                        >
                            Student account will send to
                        </p>
                        <div className="d-flex justify-content-center align-items-center"
                            style={{ backgroundColor: '#eceace', borderRadius: '0px 0px 8px 8px' }}>
                            <div
                                className="text-center my-3 px-2 py-1"
                                style={{ borderRadius: "8px", border: "1px solid #ff8a00" }}
                            >
                                <i class="fa-regular fa-envelope"
                                    style={{ color: "#ff8a00" }}></i> {orderDetail.parentEmail}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ width: "49%" }} className="py-2">
                    <p
                        style={{
                            backgroundColor: "#ff8a00",
                            color: "white",
                            fontSize: "17px",
                            borderRadius: "8px 8px 0px 0px",
                        }}
                        className="mb-0 ps-3 py-1"
                    >
                        Order information
                    </p>
                    <div className="px-4 py-2" style={{ backgroundColor: '#eceace', borderRadius: '0px 0px 8px 8px' }}>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="me-3 staff-order-detail-title">Course</span>
                            <span>{orderDetail.courseName}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="staff-order-detail-title">Price</span>
                            <span>{formatPrice(orderDetail.price)}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="staff-order-detail-title">Quantity</span>
                            <span>{orderDetail.quantityPurchased}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="staff-order-detail-title">Discount</span>
                            <span>0</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="staff-order-detail-title">Total</span>
                            <span className="orange" style={{ fontWeight: 'bold' }}>
                                {formatPrice(orderDetail?.totalPrice)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="d-flex justify-content-end align-items-center my-3">
                <button
                    style={{
                        backgroundColor: "#F15C58",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        height: "35px",
                        width: "300px",
                        fontSize: "16px",
                    }}
                    onClick={viewCancellationReason}
                >
                    VIEW REASON FOR CANCELLATION
                </button>
            </div> */}
            {/* <Modal
                show={show}
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <p
                        className="mb-1 blue"
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                    >
                        Reason cancel
                    </p>
                    <div
                        className="py-1 px-2"
                        style={{ border: "1px solid #D4D4D4", borderRadius: "8px" }}
                    >
                        <p className="mb-0">{cancellationReason.reason}</p>
                    </div>

                    <p
                        className="mb-1 mt-3"
                        style={{ color: "#F11616", fontSize: "18px", fontWeight: "bold" }}
                    >
                        Reason for refuse the request
                    </p>
                    <div>
                        <input
                            value={refusalReason}
                            onChange={(e) => setRefusalReason(e.target.value)}
                            className="py-1 px-2"
                            style={{
                                border: "1px solid #F11616",
                                outline: "none",
                                borderRadius: "8px",
                                color: "#F11616",
                                width: "100%",
                                paddingLeft: "15px",
                            }}
                            type="text"
                        />
                    </div>

                    <div className="d-flex justify-content-end align-items-center mt-3">
                        <button
                            onClick={handleClose}
                            className="me-2"
                            style={{
                                backgroundColor: "#F15C58",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                height: "30px",
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleRefusal}
                            className="me-2"
                            style={{
                                color: "white",
                                backgroundColor: "#7F7C7C",
                                border: "none",
                                borderRadius: "8px",
                                height: "30px",
                            }}
                        >
                            Refuse
                        </button>
                        <button
                            onClick={handleApproval}
                            style={{
                                color: "white",
                                backgroundColor: "rgb(255, 166, 61)",
                                border: "none",
                                borderRadius: "8px",
                                height: "30px",
                            }}
                        >
                            Approve
                        </button>
                    </div>
                </Modal.Body>
            </Modal> */}

        </>);
};

export default function AdminOrderDetail() {
    const navigate = useNavigate();

    const { orderId } = useParams();

    if (!orderId) {
        navigate(notFoundPage);
    }

    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrderDetail = async () => {
            setLoading(true);
            setError("");
            try {
                const data = await getOrderDetailById(orderId);
                if (data) {
                    setOrderDetail(data);
                } else throw Error();
            } catch (err) {
                navigate(notFoundPage);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [orderId]);

    // if (error) return <div>Error: {error}</div>;
    // if (!orderDetail) return <div>No order details found</div>;

    return (
        <div>
            <div
                className="admin-order-detail py-3 px-5 mx-3"
            >
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="orange mb-1">Order detail</h2>
                    <div>
                        <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            aria-label="Back"
                            startIcon={<KeyboardBackspace />}
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                    </div>
                </div>

                {(loading && orderDetail === null) ? (<LoadingSpinner />) : (<>
                    {orderDetail.status === "Success" && (<SuccessOrder orderDetail={orderDetail} />)}
                    {orderDetail.status === "Pending" && (<PendingOrder orderDetail={orderDetail} />)}
                    {orderDetail.status === "Refunded" && (<RefundedOrder orderDetail={orderDetail} />)}
                    {orderDetail.status === "RequestRefund" && (<RequestOrder orderDetail={orderDetail} />)}
                </>)}
            </div>
        </div>);
}
