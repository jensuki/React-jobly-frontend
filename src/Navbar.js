import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from './UserContext';
import './Navbar.css';

function NavBar() {
    const { currentUser, logout } = useContext(UserContext); // access context values
    return (
        <nav className="Navbar">

            {currentUser ? (
                <>
                    <NavLink to="/companies">Companies</NavLink>
                    <NavLink to="/jobs">Jobs</NavLink>
                    <NavLink to="/profile">Profile</NavLink>
                    <button onClick={logout} className="logout-btn">
                        Logout {currentUser.user.username}
                    </button>
                </>
            ) : (
                <>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/signup">Signup</NavLink>
                </>
            )}
        </nav>
    );
}

export default NavBar;
