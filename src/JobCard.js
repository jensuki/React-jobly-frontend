import React, { useContext, useState } from 'react';
import UserContext from './UserContext';
import JoblyApi from './api';
import './JobCard.css';

function JobCard({ id, title, salary, equity }) {
    const { currentUser } = useContext(UserContext);
    const [applied, setApplied] = useState(currentUser.user.applications.includes(id));

    // handle applying
    async function handleApply() {
        try {
            await JoblyApi.request(`users/${currentUser.user.username}/jobs/${id}`, {}, 'post');
            setApplied(true); // update state to reflect the applied status
        } catch (err) {
            console.error("Failed to apply for job:", err);
        }
    }

    return (
        <div className="JobCard">
            <h4>{title}</h4>
            <p>Salary: {salary ? `$${salary}` : "N/A"}</p>
            <p>Equity: {equity || "N/A"}</p>
            {applied ? (
                <button className="applied-btn" disabled>
                    Applied
                </button>
            ) : (
                <button className="apply-btn" onClick={handleApply}>
                    Apply
                </button>
            )}
        </div>
    );
}

export default JobCard;
