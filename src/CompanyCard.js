import React from 'react';
import { Link } from 'react-router-dom';
import './CompanyCard.css';


function CompanyCard({ handle, name, description }) {
    return (
        <div className="CompanyCard">
            <Link to={`/companies/${handle}`} className="CompanyCard-each">
                <h3>{name}</h3>
                <p>{description}</p>
            </Link>
        </div>
    )
}

export default CompanyCard;