import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DynamicPortfolio = () => {
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState('');
    const [style, setStyle] = useState('');

    // getting the users portfolio data when the page is loaded to display it 
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/dynamic/portfolio/${id}`)
            .then((response) => {
                setPortfolio(response.data.user.html); // setting the html from the response
                setStyle(response.data.user.css); // setting the css from the response 
            })
            .catch((error) => {
                console.error("Error setting profile:", error);
            });
    }, [id]);

    return (
        <div>
            {/* rendering the css from the users dynamic portfolio and applying the styles to the page */}
            <style>{style}</style>
            {/* rendering the html from the users dynamic portfolio */}
            <div dangerouslySetInnerHTML={{ __html: portfolio }}></div> 
        </div>
    );
}

export default DynamicPortfolio;
