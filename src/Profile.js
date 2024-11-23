import React, { useState, useContext } from 'react';
import UserContext from './UserContext';
import JoblyApi from './api';
import './Profile.css';

function Profile() {
    const { currentUser, setCurrentUser } = useContext(UserContext); // Access user context

    // State to manage form input data
    const [formData, setFormData] = useState({
        username: currentUser.user.username, // Username is read-only
        firstName: currentUser.user.firstName || '', // Prepopulate first name
        lastName: currentUser.user.lastName || '', // Prepopulate last name
        email: currentUser.user.email || '', // Prepopulate email
        password: '' // Leave password empty initially
    });

    const [error, setError] = useState(null); // Error message state
    const [success, setSuccess] = useState(false); // Success message state

    // Handle form input changes
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((fData) => ({
            ...fData, // Copy existing form data
            [name]: value // Update specific field
        }));
        setError(null); // Clear error on input change
        setSuccess(false); // Clear success on input change
    }

    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null); // Clear any existing error
        setSuccess(false); // Clear success state
        try {
            // Exclude username from the payload as it cannot be updated
            const { username, ...updateData } = formData;

            // API call to update user profile
            const updatedUser = await JoblyApi.request(
                `users/${currentUser.user.username}`, // Use username in the URL
                updateData, // Payload without username
                'patch'
            );

            setCurrentUser((u) => ({
                ...u,
                user: {
                    ...u.user,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    email: updatedUser.email,
                },
            }));

            setSuccess(true); // Indicate successful update
        } catch (err) {
            console.log('UPDATE FAILED:', err)
            setError(err.message || 'Profile update failed'); // Handle error
        }
    }

    return (
        <div className="Profile">
            <h1>Profile</h1>
            <form onSubmit={handleSubmit}>
                {/* Username (Read-Only) */}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        readOnly
                    />
                </div>

                {/* First Name */}
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        required
                    />
                </div>

                {/* Last Name */}
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        required
                    />
                </div>

                {/* Email */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </div>

                {/* Password */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password to confirm changes"
                        required
                    />
                </div>

                <button type="submit" className="profile-btn">Save Changes</button>
            </form>

            {/* Error and Success Messages */}
            {error && <p className="error">{error}</p>} {/* Display error if present */}
            {success && <p className="success">Profile updated successfully!</p>} {/* Display success message */}
        </div>
    );
}

export default Profile;
