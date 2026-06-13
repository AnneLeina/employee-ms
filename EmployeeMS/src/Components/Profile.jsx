import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [admin, setAdmin] = useState({
        name: 'MissLenku', // Matching your dashboard welcome banner
        email: 'annelenku@gmail.com'
    });
    const [oldEmail, setOldEmail] = useState('annelenku@gmail.com');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleUpdate = (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        axios.put('http://localhost:5000/auth/admin-profile/update', {
            name: admin.name,
            email: admin.email,
            oldEmail: oldEmail
        })
        .then(res => {
            if(res.data.Status) {
                setMessage(res.data.Result);
                setOldEmail(admin.email);
                alert("profile updated successfully! Re-authenticating to apply changes...") 
                window.location.href="/adminlogin"
            } else {
                setError(res.data.Error);
            }
        })
        .catch(err => {
            setError("Server connection failure. Could not commit modifications.");
        });
    };

    return (
        <div className="p-4 w-50 mx-auto mt-5 border rounded shadow bg-light">
            <h3 className="text-center mb-4">Edit Administrator Profile</h3>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleUpdate}>
                <div className="mb-3">
                    <label className="form-label"><strong>Display Name:</strong></label>
                    <input 
                        type="text" 
                        className="form-control"
                        value={admin.name}
                        onChange={(e) => setAdmin({...admin, name: e.target.value})}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label"><strong>Email Account:</strong></label>
                    <input 
                        type="email" 
                        className="form-control"
                        value={admin.email}
                        onChange={(e) => setAdmin({...admin, email: e.target.value})}
                        required
                    />
                </div>
                <button className="btn btn-dark w-100">Commit Profile Changes</button>
            </form>
        </div>
    );
};

export default Profile;

