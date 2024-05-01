import React, { useEffect, useState } from 'react';
import instance from '../../../../helper/apis/baseApi/baseApi';
import {
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
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import arrowLeft from "../../../../images/icon/arrow-left.png";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";

export default function UserStaff() {
    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const pageSize = 6;
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // This will take you back to the previous page. Alternatively, you can specify the path.
    };

    useEffect(() => {
        fetchParents();
    }, [currentPage]);

    const fetchParents = async () => {
        setLoading(true);
        try {
            const response = await instance.get(`api/v1/users/admin/account?role=Staff&page=${currentPage}&size=${pageSize}`);
            setParents(response.data.results);
            console.log(parents);
            setPageCount(Math.ceil(response.data.totalRecords / pageSize));
        } catch (error) {
            console.error('Failed to fetch parent details:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (userId, newStatus) => {
        try {
            const response = await instance.patch(`api/v1/users/account/status/${userId}?status=${newStatus}`);
            if (response.status === 200) { // Check if the HTTP status code is 200 OK
                toast.success('Status updated successfully!');
                fetchParents(); // Refresh the list of parents
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            toast.error('Failed to update status!');
            console.error('Error updating status:', error);
        }
    };

    const handleStatusChange = (userId, event) => {
        const newStatus = event.target.value;
        if (newStatus !== "NotActivated") { // Prevent switching from "NotActivated"
            updateStatus(userId, newStatus);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const month = date.getMonth() + 1; // getMonth() is zero-based
        const year = date.getFullYear();

        // Pad the day and month with zeros if they are less than 10
        const paddedHours = hours < 10 ? `0${hours}` : hours;
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const paddedDay = day < 10 ? `0${day}` : day;
        const paddedMonth = month < 10 ? `0${month}` : month;

        return `${paddedHours}:${paddedMinutes} ${paddedDay}/${paddedMonth}/${year}`;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return '#c8e6c9'; // light green
            case 'Inactive':
                return '#ffcdd2'; // light red
            case 'NotActivated':
                return '#bbdefb'; // light blue
            default:
                return 'transparent';
        }
    };

    const handlePageClick = (event, value) => {
        setCurrentPage(value);
    };

    const [showModal, setShowModal] = useState(false);
    const [newStaff, setNewStaff] = useState({
        email: "",
        fullName: "",
        dateOfBirth: new Date(),
        gender: "Male",
        phoneNumber: "",
        role: "Staff"
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewStaff(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (date) => {
        setNewStaff(prevState => ({
            ...prevState,
            dateOfBirth: date
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Validate Date of Birth for age greater than 12
        const currentDate = new Date();
        const selectedDate = new Date(newStaff.dateOfBirth);
        let age = currentDate.getFullYear() - selectedDate.getFullYear();
        const m = currentDate.getMonth() - selectedDate.getMonth();
        if (m < 0 || (m === 0 && currentDate.getDate() < selectedDate.getDate())) {
            age--;
        }
        if (age < 12) {
            toast.error("Staff must be older than 12 years.");
            return;
        }
    
        // Validate Phone Number length between 10 and 15 digits
        const phoneNumberLength = newStaff.phoneNumber.replace(/\D/g, '').length; // Remove non-digits and check length
        if (phoneNumberLength < 10 || phoneNumberLength > 15) {
            toast.error("Phone number must be between 10 and 15 digits.");
            return;
        }
    
        setLoading(true);
        try {
            const response = await instance.post('api/v1/users/admin/account', newStaff);
            if (response.status === 201 || response.status === 200) { // Check for '201 Created' or '200 OK' if your API configuration differs
                toast.success('New staff member created successfully!');
                setShowModal(false); // Close modal
                fetchParents(); // Refresh the staff list
            } else {
                throw new Error('Failed to create staff member');
            }
        } catch (error) {
            toast.error('Failed to create staff member!');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <div className='admin-user-container admin-user'>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="header">
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                        <div>
                            <h5>Staff</h5>
                            <hr />
                        </div>
                        <i className="fa-solid fa-user-group"></i>
                    </div>
                    <div>
                        <button
                            onClick={goBack}
                            className="admin-back"
                        >
                            <div className="d-flex jutify-content-between align-items-center">
                                <img src={arrowLeft} alt="Arrow Left Icon" />
                                <p className="mb-0 mx-2">Back</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Staff Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input type="email" className="form-control" name="email" required value={newStaff.email} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-control" name="fullName" required value={newStaff.fullName} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Date of Birth</label>
                            <DatePicker selected={newStaff.dateOfBirth}
                                onChange={handleDateChange}
                                className="form-control"
                                dateFormat="yyyy-MM-dd"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gender</label>
                            <select className="form-control" name="gender" value={newStaff.gender} onChange={handleInputChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone Number</label>
                            <input type="text" className="form-control" name="phoneNumber" value={newStaff.phoneNumber} onChange={handleInputChange} />
                        </div>
                        <Button type="submit" className="btn btn-primary">Create</Button>
                    </form>
                </Modal.Body>
            </Modal>
            <button onClick={handleOpenModal}>Create</button>
            <div className="table-responsive" style={{ height: '400px' }}>
                <table className="table table-bordered">
                    <thead>
                        <tr className='text-center' style={{ backgroundColor: '#1A9CB7 !important' }}>
                            <th>INDEX</th>
                            <th>IMAGE</th>
                            <th>FULL NAME</th>
                            <th>EMAIL</th>
                            <th>REGISTRATION DAY</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="6">Loading...</td></tr>
                        ) : parents.map((parent, index) => (
                            <tr key={index} className='text-center'>
                                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                                <td>{/* Image here if available */}</td>
                                <td>{parent.fullName}</td>
                                <td>{parent.email}</td>
                                <td>{formatDate(parent.createdDate)}</td>
                                <td >
                                    {parent.status === "NotActivated" ? (
                                        <span style={{
                                            display: 'inline-block',
                                            backgroundColor: getStatusColor(parent.status),
                                            borderRadius: '8px',
                                            border: '1px solid #ccc', // Add a border
                                            padding: '3px 5px',
                                            minWidth: '80px', // You might need to adjust this
                                            textAlign: 'center'
                                        }}>
                                            Not Activated
                                        </span>
                                    ) : (
                                        <select style={{
                                            backgroundColor: getStatusColor(parent.status),
                                            borderRadius: '8px',
                                            border: '1px solid #ccc', // Ensure this matches the NotActivated border
                                            outline: 'none',
                                            padding: '3px 5px'
                                        }} value={parent.status} onChange={(e) => handleStatusChange(parent.id, e)}>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {parents.length > 0 && (
                <div className="pagination-container d-flex justify-content-center">
                    <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" my={2}>
                        <Pagination
                            count={pageCount}
                            color="primary"
                            page={currentPage}
                            onChange={handlePageClick}
                            renderItem={(item) => (
                                <PaginationItem
                                    components={{ previous: ArrowBack, next: ArrowForward }}
                                    {...item}
                                />
                            )}
                        />
                    </Stack>
                </div>
            )}
        </div>
    );
}
