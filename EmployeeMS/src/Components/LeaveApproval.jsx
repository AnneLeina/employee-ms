import React, { useEffect, useState } from 'react';
import API, { isDemoMode } from '../api/axiosInstance';

const LeaveApproval = () => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        if (isDemoMode) {
            setLeaves([
                { id: 1, employeeName: 'John Doe', leaveType: 'Medical Leave', startDate: '2026-07-10', endDate: '2026-07-15', status: 'Pending' },
                { id: 2, employeeName: 'Jane Smith', leaveType: 'Annual Leave', startDate: '2026-08-01', endDate: '2026-08-14', status: 'Pending' },
                { id: 3, employeeName: 'Alex Kiprop', leaveType: 'Maternity/Paternity', startDate: '2026-09-05', endDate: '2026-09-12', status: 'Pending' }
            ]);
            return;
        }

        API.get('/auth/leave-requests')
            .then(res => {
                if (res.data.Status) {
                    setLeaves(res.data.Result);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleStatusUpdate = (id, newStatus) => {
        if (isDemoMode) {
            setLeaves(prevLeaves => 
                prevLeaves.map(leave => leave.id === id ? { ...leave, status: newStatus } : leave)
            );
            return;
        }

        API.put(`/auth/update-leave/${id}`, { status: newStatus })
            .then(res => {
                if (res.data.Status) {
                    setLeaves(prevLeaves => prevLeaves.filter(leave => leave.id !== id));
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3 className="text-white">Pending Leave Requests</h3>
            </div>
            <div className="mt-3">
                <table className="table table-striped table-bordered text-center align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Employee Name</th>
                            <th>Leave Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaves.length > 0 ? (
                            leaves.map(l => (
                                <tr key={l.id}>
                                    <td>{l.employeeName}</td>
                                    <td>{l.leaveType}</td>
                                    <td>{l.startDate}</td>
                                    <td>{l.endDate}</td>
                                    <td>
                                        <span className={`badge ${l.status === 'Pending' ? 'bg-warning' : l.status === 'Approved' ? 'bg-success' : 'bg-danger'}`}>
                                            {l.status}
                                        </span>
                                    </td>
                                    <td>
                                        {l.status === 'Pending' ? (
                                            <>
                                                <button className="btn btn-success btn-sm me-2" onClick={() => handleStatusUpdate(l.id, 'Approved')}>Approve</button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleStatusUpdate(l.id, 'Rejected')}>Reject</button>
                                            </>
                                        ) : (
                                            <span className="text-muted small">Action Taken</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No pending leave requests found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LeaveApproval;
