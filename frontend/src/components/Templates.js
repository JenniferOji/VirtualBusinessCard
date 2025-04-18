import React from 'react';
import './Templates.css';
import { useNavigate, useParams} from 'react-router-dom';

const Templates = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 

    // naviagting to the page of the professional emplate 
    const renderProfessionalTemplate = async (e) => {
        e.preventDefault(); 
        navigate('/templates/professional/' + id);
    };

    // naviagting to the page of the freelancer template 
    const renderFreelancerTemplate = async (e) => {
        e.preventDefault(); 
        navigate('/templates/freelancer/' + id);
    };

    // naviagting to the page of the freelancer template 
    const renderServiceTemplate = async (e) => {
        e.preventDefault(); 
        navigate('/templates/service/' + id);
    };

    // naviagting to the page of the dynamic template 
    const renderDynamicTemplate = async (e) => {
        e.preventDefault(); 
        navigate('/templates/dynamic/' + id);
    };

    return (
        <div className='templates'>
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-content">
                            <h3>Product</h3>
                            <p>Sleek and modern.</p>
                        </div>
                        <img src="/images/product2.png" alt="Template1" />
                        <button className="button" onClick={renderProfessionalTemplate}>Use this template</button> 
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-content">
                            <h3>Freelancer</h3>
                            <p>Bold and colorful.</p>
                        </div>
                        <img src="/images/freelance2.png" alt="Template1" />
                        <button className="button" onClick={renderFreelancerTemplate}>Use this template</button> 
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-content">
                            <h3>Service</h3>
                            <p>Clean and simple.</p>
                        </div>
                        <img src="/images/service.png" alt="Template1" />
                        <button className="button" onClick={renderServiceTemplate}>Use this template</button> 
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-content">
                            <h3>Dynamic</h3>
                            <p>Create your own</p>
                        </div>
                        <img src="/images/dynamic2.png" alt="Template1"/>
                        <button className="button" onClick={renderDynamicTemplate}>Use this template</button> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Templates;
