import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import './SignupForm.css';

function SignupForm() {
    const { signup } = useContext(UserContext); // access signup func from context
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    });
    const [error, setError] = useState(null);

    // handle form input changes
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((fData) => ({
            ...fData,
            [name]: value, // update corresponding field in state
        }))
    }

    // handle signup form submission
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        try {
            await signup(formData) // call signup func from context
            navigate('/') // redirect to home
        }
        catch (err) {
            setError(err.message || 'Signup Failed. Please try again')
        }
    }

    return (
        <div className="SignupForm">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>

                {/* username input */}
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                        autoComplete='username'
                    />
                </div>

                {/* password input */}
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        autoComplete='new-password'
                    />
                </div>

                {/* first name input */}
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                        autoComplete='given-name'
                    />
                </div>

                {/* last name input */}
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                        autoComplete='family-name'
                    />
                </div>

                {/* email input */}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <button type="submit" className="signup-btn">Signup</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}
export default SignupForm;