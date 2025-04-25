import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ServicePortfolio.css';

const ServicePortfolio = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [slogan, setSlogan] = useState("");
    const [image, setImage] = useState("/images/Logo-rm.png"); 
    const [description, setDescription] = useState("");
    const [service1, setService1] = useState("");
    const [service2, setService2] = useState("");
    const [service3, setService3] = useState("");
    const [service4, setService4] = useState("");
    const [feature1, setFeature1] = useState("");
    const [feature2, setFeature2] = useState("");
    const [feature3, setFeature3] = useState("");
    const [testimonialQuote1, setTestimonialQuote1] = useState("");
    const [testimonialName1, setTestimonialName1] = useState("");
    const [testimonialQuote2, setTestimonialQuote2] = useState("");
    const [testimonialName2, setTestimonialName2] = useState("");
    const [contact1, setContact1] = useState("");
    const [contact2, setContact2] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/templates/service/${id}`)
            .then((response) => {
                setTitle(response.data.service.title);
                setSlogan(response.data.service.slogan);
                setImage(response.data.service.image);
                setDescription(response.data.service.description);
                
                setService1(response.data.service.service1);
                setService2(response.data.service.service2);
                setService3(response.data.service.service3);
                setService4(response.data.service.service3);

                setFeature1(response.data.service.feature1);
                setFeature2(response.data.service.feature2);
                setFeature3(response.data.service.feature3);
                
                setTestimonialQuote1(response.data.service.testimonialQuote1);
                setTestimonialName1(response.data.service.testimonialName1);
                setTestimonialQuote2(response.data.service.testimonialQuote2);
                setTestimonialName2(response.data.service.testimonialName2);
                
                setContact1(response.data.service.contact1);
                setContact2(response.data.service.contact2);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, [id]);

    return (
        <div className="display">
            <h2>{title}</h2>
            <p>{slogan}</p>
            <hr />
            <div className='image'>
                <img src={image} className='product-image'></img>
            </div>
            <br />
            <p>{description}</p>
            <hr />
            <h3>Key Features</h3>
            <ul>
                <li>{feature1}</li>
                <li>{feature2}</li>
                <li>{feature3}</li>
            </ul>
            <h3>Services</h3>
            <ul>
                <li>{service1}</li>
                <li>{service2}</li>
                <li>{service3}</li>
                <li>{service4}</li>
            </ul>
            <h3>Testimonials</h3>
            <div>
                <p>"{testimonialQuote1}" - <strong>{testimonialName1}:</strong> </p>
                <p> "{testimonialQuote2} - <strong>{testimonialName2}:</strong>"</p>
            </div>
            <h3>Contact</h3>
            <ul>
                <li>{contact1}</li>
                <li>{contact2}</li>
            </ul>
        </div>
    );
}

export default ServicePortfolio;