import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import axios from 'axios';
import './ProfessionalPortfolio.css';

const ProfessionalPortfolio = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [slogan, setSlogan] = useState('');
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');
    const [feature1, setFeature1] = useState('');
    const [feature2, setFeature2] = useState('');
    const [feature3, setFeature3] = useState('');
    const [contact1, setContact1] = useState('');
    const [contact2, setContact2] = useState('');  
    
    // getting the portfolio data when the page loads 
    useEffect(() => {
        axios.get(`${BASE_URL}/templates/professional/${id}`)
            .then((response) => {
                setTitle(response.data.profile.title);
                setSlogan(response.data.profile.slogan);
                setProduct(response.data.profile.product);
                setDescription(response.data.profile.description);
                setFeature1(response.data.profile.feature1);
                setFeature2(response.data.profile.feature2);
                setFeature3(response.data.profile.feature3);
                setContact1(response.data.profile.contact1);
                setContact2(response.data.profile.contact2);
            })
            .catch((error) => {
                console.error("Error getting profile:", error);
            });
    }, [id]);

    return (
        <div className="display">
            <h2>{title}</h2>
            <p>{slogan}</p>
            <hr />
            <div className='image'>
                <img src="/images/template1.png"></img>
            </div>
            <hr />
            <h2>Introducing {product}</h2>
            <p>{description}</p>
            <h3>Key Features </h3>
            <ul> 
                <li>{feature1}</li>
                <li>{feature2}</li>
                <li>{feature3}</li>
            </ul>
            <h3>Get in Touch</h3>
            <ul> 
                <li>{contact1}</li>
                <li>{contact2}</li>
            </ul>
        </div>
    );
}

export default ProfessionalPortfolio;