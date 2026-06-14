import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LeaveManagement = ({ employeeId }) => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    leave_type: 'annual',
    start_date: '',
    end_date: '',
    reason: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchLeaves();
  }, [employeeId]);

  const fetchLeaves = () => {
    setLoading(true);
    axios
      .get(`http:// https://false-unshaved-lilac.ngrok-free.dev/api/leaves/employee/${employeeId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setLeaves(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching leaves:', err);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(
        'http:// https://false-unshaved-lilac.ngrok-free.dev/api/leaves/apply',
        {
          employee_id: employeeId,
          leave_type: formData.leave_type,
          start_date: formData.start_date,
          end_date: formData.end_date,
          reason: formData.reason,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setMessage('Leave applied successfully!');
        setFormData({
          leave_type: 'annual',
          start_date: '',
          end_date: '',
          reason: '',
        });
        setShowForm(false);
        fetchLeaves();
        setTimeout(() => setMessage(''), 3000);
      })
      .catch((err) => {
        setMessage('Error applying for leave. Please try again.');
        console.error('Error applying leave:', err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={s.leaveContainer}>
      <div style={s.leaveHeader}>
        <h2 style={s.leaveTitle}>Leave Management</h2>
        <button
          style={s.applyBtn}
          onClick={() => setShowForm(!showForm)}
          onMouseEnter={(e) => (e.target.style.background = s.applyBtnHover.background)}
          onMouseLeave={(e) => (e.target.style.background = s.applyBtn.background)}
        >
          {showForm ? 'Cancel' : '+ Apply for Leave'}
        </button>
      </div>

      {message && <div style={s.message}>{message}</div>}

      {showForm && (
        <div style={s.formContainer}>
          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.formGroup}>
              <label style={s.label}>Leave Type</label>
              <select
                name="leave_type"
                value={formData.leave_type}
                onChange={handleInputChange}
                style={s.select}
              >
                <option value="annual">Annual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="unpaid">Unpaid Leave</option>
                <option value="maternity">Maternity Leave</option>
                <option value="personal">Personal Leave</option>
              </select>
            </div>

            <div style={s.formRow}>
              <div style={s.formGroup}>
                <label style={s.label}>Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  required
                  style={s.input}
                />
              </div>

              <div style={s.formGroup}>
                <label style={s.label}>End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  required
                  style={s.input}
                />
              </div>
            </div>

            <div style={s.formGroup}>
              <label style={s.label}>Reason (Optional)</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Provide a reason for your leave..."
                style={s.textarea}
                rows="4"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                ...s.submitBtn,
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      )}

      <div style={s.leaveHistoryContainer}>
        <h3 style={s.historyTitle}>Your Leave History</h3>

        {loading && !leaves.length ? (
          <div style={s.loadingText}>Loading...</div>
        ) : leaves.length === 0 ? (
          <div style={s.emptyText}>No leave applications yet</div>
        ) : (
          <div style={s.leaveTable}>
            <div style={s.tableHeader}>
              <div style={s.tableCell}>Type</div>
              <div style={s.tableCell}>Start Date</div>
              <div style={s.tableCell}>End Date</div>
              <div style={s.tableCell}>Status</div>
              <div style={s.tableCell}>Reason</div>
            </div>

            {leaves.map((leave) => (
              <div key={leave.id} style={s.tableRow}>
                <div style={s.tableCell}>
                  <span style={s.leaveType(leave.leave_type)}>
                    {leave.leave_type.charAt(0).toUpperCase() + leave.leave_type.slice(1)}
                  </span>
                </div>
                <div style={s.tableCell}>
                  {new Date(leave.start_date).toLocaleDateString()}
                </div>
                <div style={s.tableCell}>
                  {new Date(leave.end_date).toLocaleDateString()}
                </div>
                <div style={s.tableCell}>
                  <span style={s.statusBadge(leave.status)}>
                    {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                  </span>
                </div>
                <div style={s.tableCell}>{leave.reason || '-'}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const s = {
  leaveContainer: {
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    marginTop: '20px',
  },
  leaveHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  leaveTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: "#1a1a2e",
    margin: 0,
  },
  applyBtn: {
    background: '#0066cc',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
  applyBtnHover: {
    background: '#0052a3',
  },
  message: {
    padding: '12px 16px',
    background: 'rgba(76, 175, 80, 0.2)',
    border: '1px solid #4caf50',
    borderRadius: '6px',
    color: '#4caf50',
    marginBottom: '15px',
    fontSize: '13px',
  },
  formContainer: {
    background: 'rgba(255, 255, 255, 0.08)',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: "#1a1a2e",
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '10px 12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius:"8px",
    color:"#1a1a2e",
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  select: {
    padding: '10px 12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    color: "#1a1a2e",
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
  },
  textarea: {
    padding: '10px 12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '6px',
    color: "#1a1a2e",
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    resize: 'vertical',
  },
  submitBtn: {
    padding: '12px 16px',
    background: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  leaveHistoryContainer: {
    marginTop: '20px',
  },
  historyTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: "#1a1a2e",
    marginBottom: '15px',
  },
  loadingText: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.5)',
    padding: '20px',
    fontSize: '13px',
  },
  emptyText: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.4)',
    padding: '20px',
    fontSize: '13px',
  },
  leaveTable: {
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr',
    gap: '0',
    background: 'rgba(255, 255, 255, 0.08)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '0',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 2fr',
    gap: '0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '0',
    transition: 'background 0.2s ease',
  },
  tableCell: {
    padding: '12px 16px',
    color: "#1a1a2e",
    fontSize: '12px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  leaveType: (type) => ({
    padding: '4px 8px',
    background: getLeaveTypeColor(type).bg,
    color: getLeaveTypeColor(type).text,
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    display: 'inline-block',
  }),
  statusBadge: (status) => ({
    padding: '4px 8px',
    background: getStatusColor(status).bg,
    color: getStatusColor(status).text,
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    display: 'inline-block',
  }),
};

const getLeaveTypeColor = (type) => {
  const colors = {
    annual: { bg: 'rgba(52, 152, 219, 0.2)', text: '#3498db' },
    sick: { bg: 'rgba(231, 76, 60, 0.2)', text: '#e74c3c' },
    unpaid: { bg: 'rgba(149, 165, 166, 0.2)', text: '#95a5a6' },
    maternity: { bg: 'rgba(241, 196, 15, 0.2)', text: '#f1c40f' },
    personal: { bg: 'rgba(155, 89, 182, 0.2)', text: '#9b59b6' },
  };
  return colors[type] || colors.annual;
};

const getStatusColor = (status) => {
  const colors = {
    pending: { bg: 'rgba(241, 196, 15, 0.2)', text: '#f1c40f' },
    approved: { bg: 'rgba(46, 204, 113, 0.2)', text: '#2ecc71' },
    rejected: { bg: 'rgba(231, 76, 60, 0.2)', text: '#e74c3c' },
  };
  return colors[status] || colors.pending;
};

export default LeaveManagement;

