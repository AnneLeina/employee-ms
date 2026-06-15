import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        axios.post(' https://false-unshaved-lilac.ngrok-free.dev/auth/forgot-password', { email })
            .then(res => {
                if(res.data.Status) {
                    setMessage(res.data.Result);
                } else {
                    setError(res.data.Error);
                }
            })
            .catch(err => {
                setError("An error occurred. Please try again later.");
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm text-white bg-dark' style={{opacity: 0.9}}>
                {error && <div className='text-danger text-center mb-2'>{error}</div>}
                {message && <div className='text-success text-center mb-2'>{message}</div>}
                <h2 className='text-center mb-4'>Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input 
                            type="email" 
                            name='email' 
                            placeholder='Enter your email address'
                            onChange={(e) => setEmail(e.target.value)} 
                            className='form-control rounded-0' 
                            required
                        />
                    </div>
                    <button className='btn btn-primary w-100 rounded-0 mb-2'>Submit</button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/')} 
                        className='btn btn-link text-white text-decoration-none w-100 text-center'
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
