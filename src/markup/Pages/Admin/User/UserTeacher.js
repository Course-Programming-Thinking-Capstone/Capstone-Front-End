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
import arrowLeft from "../../../../images/icon/arrow-left.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'react-bootstrap';

export default function UserTeacher() {
    const [parents, setParents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const pageSize = 6;
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [newTeacher, setNewTeacher] = useState({
        email: "",
        fullName: "",
        dateOfBirth: new Date(),
        gender: "Male",
        phoneNumber: "",
        role: "Teacher"  // Set the role specifically for teachers
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewTeacher(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    console.log('newTeacher: ', newTeacher);

    const formatDateForAPI = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);  // getMonth() is zero-based
        let day = '' + d.getDate();
        const year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    };
    

    const handleDateChange = (date) => {
        setNewTeacher(prevState => ({
            ...prevState,
            dateOfBirth: date
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Include validation here if necessary
        setLoading(true);

        const formattedDate = formatDateForAPI(newTeacher.dateOfBirth);
        try {
            const response = await instance.post('api/v1/users/admin/account', newTeacher);
            if (response.status === 201) {
                toast.success('New teacher created successfully!');
                setShowModal(false);
                fetchParents(); // Refresh the list of teachers
            } else {
                throw new Error('Failed to create teacher');
            }
        } catch (error) {
            toast.error('Failed to create teacher!');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const goBack = () => {
        navigate(-1); // This will take you back to the previous page. Alternatively, you can specify the path.
    };

    useEffect(() => {
        fetchParents();
    }, [currentPage]);

    const fetchParents = async () => {
        setLoading(true);
        try {
            const response = await instance.get(`api/v1/users/admin/account?role=Teacher&page=${currentPage}&size=${pageSize}`);
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

    return (
        <div className='admin-user-container admin-user'>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="header">
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                        <div>
                            <h5>Teachers</h5>
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
                    <Modal.Title>Add New Teacher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <input style={{borderRadius:10}} type="email" className="form-control" name="email" required value={newTeacher.email} onChange={handleInputChange} />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input style={{borderRadius:10}} type="text" className="form-control" name="fullName" required value={newTeacher.fullName} onChange={handleInputChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label" style={{marginRight:'10px'}}>Date of Birth</label>
                            <DatePicker selected={newTeacher.dateOfBirth}
                                onChange={handleDateChange}
                                className="form-control"
                                dateFormat="yyyy-MM-dd"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                style={{borderRadius:10}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Gender</label>
                            <select style={{borderRadius:10}} className="form-control" name="gender" value={newTeacher.gender} onChange={handleInputChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="mb-3" >
                            <label className="form-label">Phone Number</label>
                            <input style={{borderRadius:10}} type="text" className="form-control" name="phoneNumber" value={newTeacher.phoneNumber} onChange={handleInputChange} />
                        </div>
                        <Button style={{borderRadius:10}} type="submit" className="btn btn-primary">Create</Button>
                    </form>
                </Modal.Body>
            </Modal>
            <button onClick={handleOpenModal} style={{borderRadius:10,marginTop:'15px',height:40,border:'1px solid blue',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}><i class="fa-solid fa-circle-plus" style={{color:'orange',marginRight:5}}></i> Add Teacher</button>
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
