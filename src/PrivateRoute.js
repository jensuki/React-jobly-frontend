import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from './UserContext';

/* protects routes by checking if user is logged in */
function PrivateRoute({ children }) {
    const { currentUser, loading } = useContext(UserContext);

    // Show nothing or a loading spinner while fetching user data
    if (loading) return null;

    console.log("loading:", loading, "currentUser:", currentUser);

    // Redirect to login if no currentUser
    return currentUser ? children : <Navigate to="/login" />;

}
export default PrivateRoute;
