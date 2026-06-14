import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Dashboard = () => {
    const [adminName, setAdminName] = useState('Admin');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http:// https://false-unshaved-lilac.ngrok-free.dev/auth/dashboard-stats')
            .then(res => {
                if (res.data.Status) {
                    const stats = res.data.Result;
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleLogout = () => {
        axios.get('http:// https://false-unshaved-lilac.ngrok-free.dev/auth/logout')
            .then(res => {
                if (res.data.Status) {
                    localStorage.removeItem("valid");
                    navigate('/adminlogin');
                }
            })
    };

    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0" style={{backgroundColor: "#151f32"}}>
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link to="/dashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">

                            <span className="fs-5 d-none d-sm-inline fw-semibold">{adminName}</span>
                        </Link>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100" id="menu">
                            <li className="w-100">
                                <Link to="/dashboard" className="nav-link text-white text-decoration-none px-3 py-2 align-middle">
                                    <i className="fs-5 bi-speedometer2 me-2"></i>
                                    <span className="d-none d-sm-inline">Dashboard</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to="/dashboard/employee" className="nav-link text-white text-decoration-none px-3 py-2 align-middle">
                                    <i className="fs-5 bi-people me-2"></i>
                                    <span className="d-none d-sm-inline">Manage Employees</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to="/dashboard/category" className="nav-link text-white text-decoration-none px-3 py-2 align-middle">
                                    <i className="fs-5 bi-columns-gap me-2"></i>
                                    <span className="d-none d-sm-inline">Category</span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to="/dashboard/profile" className="nav-link text-white text-decoration-none px-3 py-2 align-middle">
                                    <i className="fs-5 bi-person me-2"></i>
                                    <span className="d-none d-sm-inline">Profile</span>
                                </Link>
                            </li>
                            <li className="w-100" onClick={handleLogout}>
                                <Link className="nav-link text-white text-decoration-none px-3 py-2 align-middle">
                                    <i className="fs-5 bi-power me-2"></i>
                                    <span className="d-none d-sm-inline">Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className="p-2 d-flex justify-content-center shadow">
                        <h4>Employee Management System</h4>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
