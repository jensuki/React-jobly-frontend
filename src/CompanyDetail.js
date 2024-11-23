import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // to access url parameters
import JoblyApi from './api';
import JobCard from './JobCard';
import './CompanyDetail.css';

function CompanyDetail() {
    const { handle } = useParams(); // get company :handle from url parameter
    const [company, setCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetch company details when components mounts / :handle changes
    useEffect(() => {
        async function fetchCompany() {
            setIsLoading(true);
            setError(null);
            try {
                // fetch company details from backend using API helper getCompany
                const companyData = await JoblyApi.getCompany(handle);
                setCompany(companyData);
            }
            catch (err) {
                console.error('Error fetching company data', err)
                setError('Failed to load company details. Please try again');
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchCompany();
    }, [handle]) // rerun effect whenever :handle changes

    return (
        <div className="CompanyDetail">
            <h1>Company Detail</h1>

            {/* handle loading state */}
            {isLoading && <p>Loading company details...</p>}

            {/* handle error state */}
            {error && <p className="error">{error}</p>}

            {!isLoading && !error && company && (
                <>
                    {/* display company information */}
                    <div className="CompanyDetail-info">
                        <h2>{company.name}</h2>
                        <p>{company.description}</p>
                    </div>

                    {/* display list of companys jobs */}
                    <div className="CompanyDetail-jobs">
                        <h3>Jobs at {company.name}</h3>
                        {company.jobs.length === 0 ? (
                            <p>No jobs available</p>
                        ) : (
                            company.jobs.map((job) => (
                                <JobCard
                                    key={job.id}
                                    id={job.id}
                                    title={job.title}
                                    salary={job.salary}
                                    equity={job.equity}
                                />
                            ))
                        )}
                    </div>
                </>
            )}
        </div >
    )
}
export default CompanyDetail;