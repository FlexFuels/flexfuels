import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        pinCode: '',
        city: '',
        state: '',
        gender: 'Male',
        email: '',
        password: '',
        
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/users', formData);
            console.log(response.data);
            alert('Registration successful!');
        } catch (error) {
            console.error(error);
            alert('Error during registration');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto', padding: '1rem', background: '#333', color: '#fff' }}>
            <div className="header">
            <h1>FlexFuels</h1>

            </div>
            <h2>Registration</h2>
            
            <div>
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div>
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            <div>
                <label>Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div>
                <label>Pin Code</label>
                <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} required />
            </div>
            <div>
                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div>
                <label>State</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} required />
            </div>
            <div>
                <label>Gender</label>
                <div>
                    <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} /> Male
                    <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} /> Female
                    <input type="radio" name="gender" value="Other" checked={formData.gender === 'Other'} onChange={handleChange} /> Other
                </div>
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>
            <p></p>
<p></p>
<div class="center-container">
    <button type="submit">Register</button>
</div>

        </form>
    );
};

export default Registration;
