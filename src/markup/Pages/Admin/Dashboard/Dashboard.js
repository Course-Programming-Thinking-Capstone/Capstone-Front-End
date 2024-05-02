import React from 'react'
import instance from '../../../../helper/apis/baseApi/baseApi';
import { useEffect } from 'react';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import "./Dashboard.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title }) => {
    // Filter out entries with empty 'status'
    const validData = data.filter(item => item.status.trim() !== "");

    // Calculate the total for the title
    const total = validData.reduce((acc, curr) => acc + curr.total, 0);
    const chartTitle = `${title} (Total: ${total.toLocaleString()})`;

    const chartData = {
        labels: validData.map(item => item.status),
        datasets: [
            {
                data: validData.map(item => item.total),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0'],
                borderColor: ['#FFFFFF'],
                borderWidth: 1,
            }
        ]
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' },
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    let label = data.labels[tooltipItem.index] || '';
                    if (label) {
                        label += ': ';
                    }
                    label += (tooltipItem.yLabel).toLocaleString();
                    return label;
                }
            }
        },
    };

    return (
        <div>
            <h5 className="text-center">{chartTitle}</h5>
            <div style={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center' }}>
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
    const [monthlyEarning, setMonthlyEarning] = useState([]);
    const [incomeByMonth, setIncomeByMonth] = useState([]);

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
                setIncomeByMonth(data.incomeByMonth);

            } catch (error) {

            }
        };
        fetchDashboard(currentMonth);
    }, []);

    const renderAccountInfo = (accounts) => {
        // Filter out the 'AllAccount' status before rendering
        const filteredAccounts = accounts.filter(account => account.status !== "All Accounts");

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
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    backgroundColor: '#FFA63D',
                    color: 'white',
                    padding: '10px',
                    fontSize: '1rem',
                    lineHeight: '35px',
                    textAlign: 'center'
                }}>
                    {user.total}
                </span>
            </p>
        ));
    };

    const getTotalAccounts = (accounts) => {
        const allAccount = accounts.find(account => account.status === "All Accounts");
        return allAccount ? allAccount.total : 0;
    };

    const renderMonthlyEarnings = (earnings) => {
        if (!Array.isArray(earnings) || earnings.length === 0) return null;

        const thisMonth = earnings.find(e => e.status === "ThisMonth");
        const lastMonth = earnings.find(e => e.status === "LastMonth");
        const change = earnings.find(e => e.status === "Increase" || e.status === "Decrease");

        const changeLabel = change ? (change.status === "Increase" ? "Increase" : "Decrease") : "Change";
        const changeValue = change ? Math.abs(change.total).toLocaleString() : "0";

        return (
            <div>
                <p>This month: <span style={{ fontWeight: 'bold' }}>{thisMonth ? thisMonth.total.toLocaleString() : '0'} VND</span></p>
                <p>Last month: <span style={{ fontWeight: 'bold' }}>{lastMonth ? lastMonth.total.toLocaleString() : '0'} VND</span></p>
                <p>{changeLabel} from previous period: <span style={{ fontWeight: 'bold', color: changeLabel === "Decrease" ? '#FF6347' : '#32CD32' }}>
                    {changeValue}{changeLabel === "Increase" || changeLabel === "Decrease" ? '%' : ''}
                </span></p>
            </div>
        );
    };


    const totalAccounts = getTotalAccounts(accountsData);

    const XAxisLabelFormatter = (month) => month.substring(0, 3);

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
                    <div className='col-lg-3 col-md-12 col-sm-12'>
                        <h5>MONTHLY EARNING</h5>
                        <div>
                            {renderMonthlyEarnings(monthlyEarning)}
                        </div>
                    </div>
                    <div className='col-lg-9 col-md-12 col-sm-12'>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={incomeByMonth.map(item => ({ ...item, total: Number(item.total), status: XAxisLabelFormatter(item.status) }))} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <Line type="monotone" dataKey="total" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="status" />
                                <YAxis tickFormatter={value => new Intl.NumberFormat('en', { notation: 'compact' }).format(value)} />
                                <Tooltip formatter={value => new Intl.NumberFormat('en').format(value)} />
                            </LineChart>
                        </ResponsiveContainer>

                    </div>
                </div>
            </div>
        </div>
    )
}
