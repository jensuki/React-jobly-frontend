import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import './Homepage.css';

function Homepage() {
    const { currentUser, loading } = useContext(UserContext); // access from context

    if (loading) return <h1>Loading...</h1>
    return (
        <div className="Homepage">
            {currentUser ? (
                <h1> Welcome back, {currentUser.user.firstName || currentUser.user.username}!</h1>
            ) : (
                <>
                    <h1>Welcome to Jobly</h1>
                    <p>All the jobs in one, convenient place.</p>
                    <div className="Home-links">
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                </>
            )}
        </div>
    )
}

export default Homepage;