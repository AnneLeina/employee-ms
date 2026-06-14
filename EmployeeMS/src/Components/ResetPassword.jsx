import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        axios.post(`http:// https://false-unshaved-lilac.ngrok-free.dev/auth/reset-password/${token}`, { password })
            .then(res => {
                if(res.data.Status) {
                    alert("Password updated successfully! Redirecting to login...");
                    navigate('/');
                } else {
                    setError(res.data.Error);
                }
            })
            .catch(err => {
                setError("Failed to reset password. Link may be invalid or expired.");
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm text-white bg-dark' style={{opacity: 0.9}}>
                {error && <div className='text-danger text-center mb-2'>{error}</div>}
                <h2 className='text-center mb-4'>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>New Password:</strong></label>
                        <input 
                            type="password" 
                            name='password' 
                            placeholder='Enter new password'
                            onChange={(e) => setPassword(e.target.value)} 
                            className='form-control rounded-0' 
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="confirmPassword"><strong>Confirm Password:</strong></label>
                        <input 
                            type="password" 
                            name='confirmPassword' 
                            placeholder='Confirm new password'
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            className='form-control rounded-0' 
                            required
                        />
                    </div>
                    <button className='btn btn-success w-100 rounded-0'>Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
