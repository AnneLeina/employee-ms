import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const EmployeeLogin = () => {
  const [values, setValues] = useState({ email: '', password: '' })
  const navigate = useNavigate()

const handleSubmit = (e) => {
  e.preventDefault()
  axios.post(' https://false-unshaved-lilac.ngrok-free.dev/employee/employee_login', values, { withCredentials: true })
    .then(result => {
      console.log(result.data)
      alert(JSON.stringify(result.data)) // ← add this
      if (result.data.loginStatus) {
        navigate('/employee-dashboard')
      } else {
        alert(result.data.Error)
      }
    })
    .catch(err => {
      alert('Error: ' + err.message) // ← and this
      console.log(err)
    })
}


  return (
    <div className="d-flex justify-content-end align-items-center vh-100 loginPage">
      <div className="p-4 rounded text-center" style={{
        width: '350px',
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(2px)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <h4 className="text-black fw-bold mb-1">Employee Login</h4>
        <p style={{ color: '#012b4d', fontSize: '0.85rem' }} className="mb-4">
          Enter your credentials to continue
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="text-white mb-1">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={e => setValues({ ...values, email: e.target.value })}
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff' }}
            />
          </div>
          <div className="mb-4 text-start">
            <label className="text-white mb-1">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={e => setValues({ ...values, password: e.target.value })}
              style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff' }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ borderRadius: '20px', fontWeight: '600' }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmployeeLogin
