import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import axios from 'axios';
import './ProfessionalPortfolio.css';

const ProfessionalPortfolio = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // getting the portfolio data when the page loads 
    useEffect(() => {
        axios.get(`${BASE_URL}/templates/professional/${id}`)
            .then((response) => {
                setTitle(response.data.profile.title);
                setDescription(response.data.profile.description );
            })
            .catch((error) => {
                console.error("Error getting profile:", error);
            });
    }, [id]);

    return (
        <div className="phoneContainer">
            <div className="phoneView">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default ProfessionalPortfolio;
