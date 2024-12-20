import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Profile from "./Profile";
import PrivateRoute from "./PrivateRoute";

function AppRoutes({ loading }) {
    return (
        <Routes>
            {/* public routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />

            {/* private routes */}
            <Route
                path="/companies"
                element={<PrivateRoute><CompanyList /></PrivateRoute>}
            />
            <Route
                path="/companies/:handle"
                element={<PrivateRoute><CompanyDetail /></PrivateRoute>}
            />
            <Route
                path="/jobs"
                element={<PrivateRoute><JobList /></PrivateRoute>}
            />
            <Route
                path="/profile"
                element={<PrivateRoute><Profile /></PrivateRoute>}
            />

            {/* catch-all route */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default AppRoutes;
