import React, { useState, useEffect } from 'react';
import JoblyApi from './api';
import CompanyCard from './CompanyCard';
import './CompanyList.css';

function CompanyList() {
    // state for storing list of companies + search term
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // effect to fetch companies when componebt is first rendered
    useEffect(() => {
        async function getCompanies() {
            setIsLoading(true);
            // fetch all companies from backend using API helper
            let companies = await JoblyApi.request("companies");
            setCompanies(companies.companies); // save list of companies to state
            setIsLoading(false);
        }
        getCompanies() // call the function
    }, []) // empty dependency array to ensure it only runs once on mount

    // handle search form submission
    async function handleSearch(e) {
        e.preventDefault();
        // fetch companies matching the search term
        let companies = await JoblyApi.request("companies", { name: searchTerm })
        setCompanies(companies.companies) // update company list in state
    }
    return (
        <div className="CompanyList">
            <h1>Companies</h1>

            {/* Company search form */}
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update state when input changes
                />
                <button type="submit">Search</button>
            </form>

            {/* handle loading state */}
            {isLoading ? (
                <p>Loading companies...</p>
            ) : (
                <div className="CompanyList-all">
                    {/* handle "No Results Found" */}
                    {companies.length === 0 ? (
                        <p>No companies found</p>
                    ) : (
                        /* display list of companies */
                        companies.map((company) => (
                            <CompanyCard
                                key={company.handle}
                                handle={company.handle}
                                name={company.name}
                                description={company.description}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
export default CompanyList;