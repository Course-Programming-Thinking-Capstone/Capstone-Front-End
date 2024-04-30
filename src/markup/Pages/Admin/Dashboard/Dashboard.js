import React from 'react'
import instance from '../../../../helper/apis/baseApi/baseApi';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import "./Dashboard.css";

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title }) => {
    const chartData = {
        labels: data.map(item => item.status),
        datasets: [
            {
                data: data.map(item => item.total),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0'],
                borderColor: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],
                borderWidth: 1,
            }
        ]
    };

    const options = {
        maintainAspectRatio: false, // Add this to maintain aspect ratio
        plugins: {
            legend: {
                position: 'bottom', // Place the legend at the bottom
            },
        },
        // This callback function allows us to modify the tooltip label
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var label = data.labels[tooltipItem.index] || '';
                    if (label) {
                        label += ': ';
                    }
                    label += Math.round(tooltipItem.yLabel * 100) / 100;
                    return label;
                }
            }
        },
    };

    return (
        <div>
            <h5 className="text-center">{title}</h5>
            <div className='d-flex justify-content-center' style={{ width: '100%', height: '300px' }}>
                {/* Wrap the Pie component in a div and set its width to 70% */}
                <div style={{ width: '90%' }}>
                    <Pie data={chartData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default function Dashboard() {
    const [ordersData, setOrdersData] = useState([]);
    const [coursesData, setCoursesData] = useState([]);
    const [accountsData, setAccountsData] = useState([]);
    const [newUsers, setNewUsers] = useState([]);
    const [monthlyEarning, setMonthlyEarning] = useState({});

    useEffect(() => {
        const currentMonth = "January";

        const fetchDashboard = async (month) => {
            try {
                const response = await instance.get(
                    `api/v1/dashboard?month=${month}`
                );
                const data = response.data;
                setOrdersData(data.orders);
                setCoursesData(data.courses);
                setAccountsData(data.account);
                setNewUsers(data.newUserThisMonth);
                setMonthlyEarning(data.monthlyEarning);

            } catch (error) {

            }
        };
        fetchDashboard(currentMonth);
    }, []);

    const renderAccountInfo = (accounts) => {
        // Filter out the 'AllAccount' status before rendering
        const filteredAccounts = accounts.filter(account => account.status !== "AllAccount");

        return filteredAccounts.map((account) => (
            <p key={account.status}>
                {account.status}: <span className='ms-1' style={{ color: '#FFA63D' }}>
                    {account.total}

                </span>
            </p>
        ));
    };

    const renderNewUsersThisMonth = (newUsers) => {
        return newUsers.map((user) => (
            <p key={user.status} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {user.status}:
                <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '35px', // Set a fixed width
                    height: '35px', // Set a fixed height to make it a circle
                    borderRadius: '50%', // This makes the span a circle
                    backgroundColor: '#FFA63D',
                    color: 'white',
                    padding: '10px',
                    fontSize: '1rem', // Adjust font size as needed
                    lineHeight: '35px', // Align the line height with the height to center the text vertically
                    textAlign: 'center' // Center the text horizontally
                }}>
                    {user.total}
                </span>
            </p>
        ));
    };

    const getTotalAccounts = (accounts) => {
        const allAccount = accounts.find(account => account.status === "AllAccount");
        return allAccount ? allAccount.total : 0;
    };

    const renderMonthlyEarnings = (earnings) => {
        // // Check if earnings have at least one entry
        // if (earnings.length === 0) return null;

        // // Access the data from the first entry of the earnings array
        // const thisMonth = earnings.find(e => e.status === "ThisMonth");
        // const lastMonth = earnings.find(e => e.status === "LastMonth");
        // const increase = earnings.find(e => e.status === "Increase");

        return (
            <div>
                {/* <p>This month: <span style={{ fontWeight: 'bold' }}>{thisMonth?.total}</span></p> */}
                {/* <p>Last month: <span style={{ fontWeight: 'bold' }}>{lastMonth?.total}</span></p> */}
                {/* <p>Change from previous period: <span style={{ fontWeight: 'bold' }}>{increase?.total}%</span></p> */}
            </div>
        );
    };

    const totalAccounts = getTotalAccounts(accountsData);

    return (
        <div>
            <div className='admin-dashboard admin-dashboard-container px-5 py-3' >
                <div className="header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-start align-items-center">
                            <div>
                                <h5 className="mb">Dashboard</h5>
                                <hr />
                            </div>
                            <i className="fa-solid fa-chart-line"></i>
                        </div>
                        <div>

                            <button
                                className="admin-back"
                            >
                                <div className="d-flex jutify-content-between align-items-center">
                                    <p className="mb-0 mx-2">Back</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <PieChart data={ordersData} title="Total Orders" />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <PieChart data={coursesData} title="Course Status" />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <h5>Account</h5>
                        <div className="d-flex justify-content-around">
                            <div className='d-flex align-items-center'>
                                <div >
                                    <p className='mb-0'>

                                        <i style={{ color: '#FD8569', fontSize: '70px' }} class="fa-solid fa-user"></i>
                                    </p>
                                    <p style={{ fontSize: '25px', color: '#FD8569' }} className='text-center mt-3'>{totalAccounts}</p>
                                </div>
                            </div>
                            <div>
                                {renderAccountInfo(accountsData)}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <h5>NEW USERS THIS MONTH</h5>
                        <div className='d-flex justify-content-center'>
                            <div>
                                {renderNewUsersThisMonth(newUsers)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <h5>MONTHLY EARNING</h5>
                        <div>
                            {renderMonthlyEarnings(monthlyEarning)}
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12'>

                    </div>
                </div>
            </div>
        </div>
    )
}
