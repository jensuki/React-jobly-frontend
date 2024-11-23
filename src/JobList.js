import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JoblyApi from './api';

function JobList() {
    // state to store job data, search term, loading
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // effect to fetch jobs when component first renders
    useEffect(() => {
        async function fetchJobs() {
            setIsLoading(true);
            const jobsResult = await JoblyApi.request("jobs");
            setJobs(jobsResult.jobs); // store jobs in state
            setIsLoading(false);
        }
        fetchJobs();
    }, []) // empty dependency array to ensure this runs only once on mount

    // handle form submission for job search
    async function handleSearch(e) {
        e.preventDefault();
        setIsLoading(true);
        const jobsResult = await JoblyApi.request("jobs", { title: searchTerm });
        setJobs(jobsResult.jobs); // update jobs list in state
        setIsLoading(false);
    }

    return (
        <div className="JobList">
            <h1>Jobs</h1>
            {/* search form */}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {isLoading ? (
                <p>Loading jobs...</p>
            ) : (
                <div className="JobList-container">
                    {jobs.length === 0 ? (
                        <p>No jobs found</p>
                    ) : (
                        jobs.map((job) => (
                            <JobCard
                                id={job.id} // add id for applied reference
                                key={job.id}
                                title={job.title}
                                salary={job.salary}
                                equity={job.equity}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default JobList;