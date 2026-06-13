import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API,{isDemoMode} from '../api/axiosInstance'
import LeaveManagement from './LeaveManagement'

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (iDemoMode) {
    setEmployee({ 
    id:101, 
    name:"Joy Nash",
    email:"joy.nash@company.com",
    salary:130000,
    address:"Nairobi",
    category:"Development"
    });
    return;
    }

    API.get('/employee/detail')
      .then(result => {
        if (result.data.loginStatus === false) {
          navigate('/employeelogin')
        } else {
          setEmployee(result.data)
        }
      })
      .catch(err => console.log(err))
  }, [])

  const handleLogout = () => {
    axios.get('http://localhost:5000/employee/logout', { withCredentials: true })
      .then(() => navigate('/start'))
  }

  const getInitials = (name) =>
    name ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?'

  if (!employee) return (
    <div style={s.portal}>
      <div style={s.loading}>Loading...</div>
    </div>
  )

  return (
    <div style={s.portal}>
      <div style={{ ...s.circle, width: 340, height: 340, top: -90, right: -70, background: '#38bdf8' }} />
      <div style={{ ...s.circle, width: 220, height: 220, bottom: -50, left: -50, background: '#6366f1' }} />
      <div style={{ ...s.circle, width: 130, height: 130, top: 220, left: 70, background: '#34d399' }} />

      <nav style={s.navbar}>
        <span style={s.brandText}>👤 Employee Portal</span>
        <button
          style={s.logoutBtn}
          onClick={handleLogout}
          onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.22)'}
          onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.12)'}
        >
          Logout
        </button>
      </nav>

      <div style={s.content}>
        <div style={s.card}>

       <LeaveManagement employeeId={employee.id}/>

          <div style={s.avatarWrap}>
            {employee.image && false? (
              <img
                src={`http://localhost:5000/Public/Images/${employee.image}`}
                alt="Profile"
                style={s.avatarImg}
              />
            ) : (
              <div style={s.avatarInitials}>
                {getInitials(employee.name)}
              </div>
            )}
          </div>

          <h4 style={s.name}>{employee.name}</h4>
          <p style={s.email}>{employee.email}</p>

          <div style={s.divider} />

          <div style={s.fields}>
            <Field icon label="Salary"
              value={`KES ${employee.salary?.toLocaleString()}`}
              valueColor="#059669" />
            <Field icon label="Address"
              value={employee.address} />
            <Field icon label="Department ID"
              value={employee.category_id} />
          </div>

        </div>
      </div>
    </div>
  )
}

const Field = ({ icon, iconBg, label, value, valueColor = '#0f172a' }) => (
  <div style={s.field}>
    <div style={s.fieldLeft}>
      <div style={{ ...s.fieldIcon, background: iconBg }}>{icon}</div>
      <span style={s.fieldLabel}>{label}</span>
    </div>
    <span style={{ ...s.fieldValue, color: valueColor }}>{value}</span>
  </div>
)

const s = {
  portal: {
    minHeight: '100vh',
    background:  "#0f172a",
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    borderRadius: '50%',
    opacity: 0.08,
    pointerEvents: 'none',
    zIndex: 0,
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 28px',
    position: 'relative',
    zIndex: 2,
  },
  brandText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: '0.3px',
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.12)',
    border: '0.5px solid rgba(255,255,255,0.25)',
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    padding: '7px 18px',
    borderRadius: 8,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background 0.2s',
  },
  content: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    position: 'relative',
    zIndex: 2,
  },
  card: {
    background: 'rgba(255,255,255,0.97)',
    borderRadius: 20,
    width: 560,
    padding: '44px 48px 40px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
  },
  avatarWrap: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarImg: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid white',
    boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
  },
  avatarInitials: {
    width: 90,
    height: 90,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #6366f1, #38bdf8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
    fontWeight: 600,
    color: 'white',
    border: '3px solid white',
    boxShadow: '0 4px 16px rgba(99,102,241,0.4)',
  },
  name: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 600,
    color: '#0f172a',
    marginBottom: 4,
  },
  email: {
    textAlign: 'center',
    fontSize: 13,
    color: '#64748b',
    marginBottom: 24,
  },
  divider: {
    height: 1,
    background: '#f1f5f9',
    marginBottom: 20,
  },
  fields: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '18px 20px',
    background: '#f8fafc',
    borderRadius: 12,
    border: '0.5px solid #e2e8f0',
  },
  fieldLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },
  fieldIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  },
  fieldLabel: {
    fontSize: 15,
    color: '#64748b',
    fontWeight: 500,
  },
  fieldValue: {
    fontSize: 15,
    fontWeight: 600,
  },
  loading: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: '45vh',
    fontSize: 16,
  },
}

export default EmployeeDashboard
