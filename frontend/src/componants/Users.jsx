import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css';  // Import the CSS file

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/users')
            .then(response => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('There was an error fetching the users!');
                setLoading(false);
                console.error(error);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Account Status</th>
                        <th>Gender</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Pin Code</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.UserID}>
                            <td data-label="UserID">{user.UserID}</td>
                            <td data-label="Username">{user.Username}</td>
                            <td data-label="Email">{user.Email}</td>
                            <td data-label="First Name">{user.FirstName}</td>
                            <td data-label="Last Name">{user.LastName}</td>
                            <td data-label="Address">{user.Address}</td>
                            <td data-label="Phone">{user.Phone}</td>
                            <td data-label="Role">{user.Role}</td>
                            <td data-label="Account Status">{user.AccountStatus}</td>
                            <td data-label="Gender">{user.Gender}</td>
                            <td data-label="City">{user.City}</td>
                            <td data-label="State">{user.State}</td>
                            <td data-label="Pin Code">{user.PinCode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
