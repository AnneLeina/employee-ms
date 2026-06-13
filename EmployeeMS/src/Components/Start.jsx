import React from 'react'
import { useNavigate } from 'react-router-dom'

const Start = () => {
  const navigate = useNavigate()

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage" style={{paddingLeft:"50%"}}>
      <div className="p-4 rounded border loginForm text-center" style={{
        width: '320px',
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(2px)',
        border: '1px solid rgba(255,255,255,0.15)'
      }}>
        <div className="mb-3">
          <span style={{ fontSize: '2.5rem' }}>👥</span>
        </div>
        <h4 className="text-white fw-bold mb-1">Welcome Back</h4>
        <p style={{ color: '#90caf9', fontSize: '0.85rem' }} className="mb-4">
          Employee Management System
        </p>
        <h6 className="text-white mb-3">Login As</h6>
        <div className="d-flex justify-content-center gap-3">
          <button
            type="button"
            className="btn btn-primary px-4"
            style={{ borderRadius: '20px', fontWeight: '600' }}
            onClick={() => navigate('/employeelogin')}
          >
            Employee
          </button>
          <button
            type="button"
            className="btn btn-success px-4"
            style={{ borderRadius: '20px', fontWeight: '600' }}
            onClick={() => navigate('/adminlogin')}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  )
}

export default Start
