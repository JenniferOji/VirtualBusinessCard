import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProfessionalPreview.css';
import { useNavigate } from 'react-router-dom';

const FreelancePreview = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 
    
    const [name, setName] = useState(""); 
    const [branding1, setBranding1] = useState("");
    const [branding2, setBranding2] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [service1, setService1] = useState("");
    const [service2, setService2] = useState("");
    const [service3, setService3] = useState("");
    const [projectName1, setProjectName1] = useState("");
    const [projectDescription1, setProjectDescription1] = useState("");
    const [projectLink1, setProjectLink1] = useState("");
    const [projectName2, setProjectName2] = useState("");
    const [projectDescription2, setProjectDescription2] = useState("");
    const [projectLink2, setProjectLink2] = useState("");
    const [contact1, setContact1] = useState("");
    const [contact2, setContact2] = useState("");
    const [image, setImage] = useState("/images/Logo-rm.png"); 

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/templates/freelance/${id}`)
            .then((response) => {
                setName(response.data.freelance.name);
                setBranding1(response.data.freelance.branding1);
                setBranding2(response.data.freelance.branding2);
                setAboutMe(response.data.freelance.aboutMe);
                setSkill1(response.data.freelance.skill1);
                setSkill2(response.data.freelance.skill2);
                setSkill3(response.data.freelance.skill3);
                setService1(response.data.freelance.service1);
                setService2(response.data.freelance.service2);
                setService3(response.data.freelance.service3);
                setProjectName1(response.data.freelance.projectName1);
                setProjectDescription1(response.data.freelance.projectDescription1);
                setProjectLink1(response.data.freelance.projectLink1);
                setProjectName2(response.data.freelance.projectName2);
                setProjectDescription2(response.data.freelance.projectDescription2);
                setProjectLink2(response.data.freelance.projectLink2);
                setContact1(response.data.freelance.contact1);
                setContact2(response.data.freelance.contact2);
                setImage(response.data.freelance.image);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, [id]);

    // naviagting to the page of the dynamic template 
    const backToPort = async (e) => {
        e.preventDefault(); 
        navigate('/templates/freelancer/' + id);
    };

    return (
        <div>
            <div className="phoneContainer">
                <div className="phoneView">
                    <h2>{name}</h2>
                    <p>{branding1} | {branding2}</p>
                    <hr />
                    <h2>About Me</h2>
                    <p>{aboutMe}</p>
                    <h3>Key Skills</h3>
                    <ul>
                        <li>{skill1}</li>
                        <li>{skill2}</li>
                        <li>{skill3}</li>
                    </ul>
                    <h3>Services</h3>
                    <ul>
                        <li>{service1}</li>
                        <li>{service2}</li>
                        <li>{service3}</li>
                    </ul>
                    <h3>Projects</h3>
                    <ol>
                        <li>{projectName1}: {projectDescription1} </li>
                        <p><a href={projectLink1}>{projectLink1}</a></p>
                        <li>{projectName2}: {projectDescription2}</li>
                        <p><a href={projectLink2}>{projectLink2}</a></p>

                    </ol>
                    <h3>Contact</h3>
                    <ul>
                        <li>{contact1}</li>
                        <li>{contact2}</li>
                    </ul>
                </div>
            </div>
            <div className='portfolio-button'>
                <button className='button' onClick={backToPort}>Back to portfolio </button>
            </div>
        </div>
    );
}

export default FreelancePreview;
