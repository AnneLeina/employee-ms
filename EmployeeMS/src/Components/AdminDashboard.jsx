import React, { useEffect, useState } from 'react';
import API, {isDemoMode} from '../api/axiosInstance';
import LeaveApproval from './LeaveApproval';

const AdminDashboard = () => {
  const [stats, setStats]= useState({
    totalEmployees: 0,
    totalCategories: 0,
    totalSalary: 0,
    pendingLeaves: 0
  }) 
  

  useEffect(() => {
    API.get('auth/dashboard-stats')
      .then(res => {
        if (res.data.Status) {
          setStats(res.data.Result);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={s.adminDashboard}>
      <div style={s.header}>
        <h1 style={s.title}>Admin Dashboard</h1>
        <p style={s.subtitle}>Manage employees and approve leave requests</p>
      </div>

      <div style={s.statsRow}>
        <div style={s.statCard}>
          <p style={s.statLabel}>Total Employees</p>
          <h2 style={s.statValue}>{stats?.totalEmployees || 0}</h2>
        </div>
        <div style={s.statCard}>
          <p style={s.statLabel}>Categories</p>
          <h2 style={s.statValue}>{stats?.totalCategories || 0}</h2>
        </div>
        <div style={s.statCard}>
          <p style={s.statLabel}>Total Salary</p>
          <h2 style={s.statValue}>KES {Number(stats?.totalSalary || 0).toLocaleString()}</h2>
        </div>
        <div style={s.statCard}>
          <p style={s.statLabel}>Pending Leave Requests</p>
          <h2 style={s.statValue}>{stats?.pendingLeaves || 0}</h2>
        </div>
      </div>

      <div style={s.section}>
        <LeaveApproval />
      </div>
    </div>
  );
};

const s = {
  adminDashboard: {
    minHeight: '100vh',
    background: '#0a0e27',
    padding: '20px',
  },
  header: {
    marginBottom: '30px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.95)',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0,
  },
  statsRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '30px',
  },
  statCard: {
    flex: '1 1 200px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '20px',
  },
  statLabel: {
    fontSize: '13px',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: '0 0 8px 0',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.95)',
    margin: 0,
  },
  section: {
    marginBottom: '30px',
  },
};

export default AdminDashboard;
