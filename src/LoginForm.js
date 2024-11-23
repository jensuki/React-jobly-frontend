import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import './LoginForm.css';

/*
props: 'login' function to call in parent to log in as a user
-> update to use useContext to eliminate need for passing down as a prop

state: formData: object containing {username, password}
error: string for handing login errors
*/
function LoginForm() {
    const { login } = useContext(UserContext); // access login func from context
    const navigate = useNavigate(); // to navigate programmatically
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(null);

    // handle input change in the form
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }))
    }

    // handle form submission
    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        try {
            // call 'login' function passed as a prop
            await login(formData); // call login from context
            navigate('/') // redirect to home
        }
        catch (err) {
            // handle login errors
            setError(err.message || 'Login failed. Please try again.')
        }
    }

    return (
        <div className="LoginForm">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>

                {/* username input */}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                        autoComplete="username"
                    />
                </div>

                {/* password input */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        autoComplete="current-password"
                    />
                </div>
                <button className="login-btn" type="submit">Login</button>
            </form>

            {/* error msg */}
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default LoginForm;