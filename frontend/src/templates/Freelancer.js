import React from 'react';
import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Freelancer.css';
import QrCodeGenerator from '../components/QrCodeGenerator';
import imageCompression from 'browser-image-compression';

const Freelancer = () => {
    const {id} = useParams();

    //qr code pop up 
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(false);
    };

    const[type] = useState("freelance");

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
    

    //displaying the users profile when the page is loaded based on their user id 
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/templates/freelance/${id}`)
            .then((response) => {
                setName(response.data.freelance.name || "Enter your name");
                setBranding1(response.data.freelance.branding1 || "Enter your primary tag");
                setBranding2(response.data.freelance.branding2 || "Enter your secondary tag");
                setAboutMe(response.data.freelance.aboutMe || "Enter your bio");
                setSkill1(response.data.freelance.skill1 || "Enter skill 1");
                setSkill2(response.data.freelance.skill2 || "Enter skill 2");
                setSkill3(response.data.freelance.skill3 || "Enter skill 3");
                setService1(response.data.freelance.service1 || "Enter service 1");
                setService2(response.data.freelance.service2 || "Enter service 2");
                setService3(response.data.freelance.service3 || "Enter service 3");
                setProjectName1(response.data.freelance.projectName1 || "Enter project 1 name");
                setProjectDescription1(response.data.freelance.projectDescription1 || "Enter project 1 description");
                setProjectLink1(response.data.freelance.projectLink1 || "Enter project 1 link");
                setProjectName2(response.data.freelance.projectName2 || "Enter project 2 name");
                setProjectDescription2(response.data.freelance.projectDescription2 || "Enter project 2 description");
                setProjectLink2(response.data.freelance.projectLink2 || "Enter project 2 link");
                setContact1(response.data.freelance.contact1 || "Enter email");
                setContact2(response.data.freelance.contact2 || "Enter phone");
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, [id]);
    

    // updating the users profile on submit
    const handleSave = async (e) => {
        e.preventDefault(); 
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/templates/freelance/profile/${id}` , { freelance: { name, branding1, branding2, 
            aboutMe, skill1, skill2, skill3, service1, service2, service3, projectName1, projectDescription1,
            projectLink1, projectName2, projectDescription2, projectLink2, contact1, contact2

        }}) // sending the data in the profile object   
        .then((response) => {
            //alert('Saved successfully');  
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to save profile');
        });
    };

    // updating the users profile on submit
    const handldeFormSubmit = async (e) => {
        e.preventDefault(); 
        // incase the user forgets to save - sending the users data to the database
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/templates/freelance/profile/${id}` , { freelance: { name, branding1, branding2, 
            aboutMe, skill1, skill2, skill3, service1, service2, service3, projectName1, projectDescription1, projectLink1, projectName2,
            projectDescription2, projectLink2, contact1, contact2

        }}) // sending the data in the profile object   
        .then((response) => {
            setIsOpen(true);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to save profile');
        });
    };

    const loadPreview = async (e) => {
        navigate('/freelance/portfolio/preview/' + id);
    }

    const goToTemplates = async (e) => {
        navigate('/templates/' + id);
    }
    return (
        <div >
            <div className='template-button-holder'>
                <button className='template-button' onClick={goToTemplates}>Browse templates</button>
            </div>
            <div className="containerForm">
                <form onSubmit={handleSave}>
                    <h1 className='header'> Freelancer Portfolio </h1>
                    <br /><hr /><br />
                    <div className='form'>
                        <h4>Personal Name</h4>
                        <input 
                            type="text" 
                            value={name}
                            // updating the value of email on input
                            onChange={(e) => setName(e.target.value)} 
                            required // making the field required so that the use cannot coniune without filling the field in
                        />
                    </div>
                    <br />
                    <div className='form'>
                        <h4>Personal Brand</h4>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={branding1}
                            // updating the value of description on input
                            onChange={(e) => setBranding1(e.target.value)} 
                            required // mak
                        >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={branding2}
                            // updating the value of description on input
                            onChange={(e) => setBranding2(e.target.value)} 
                            required // mak
                        >  
                        </textarea>
                    </div> 
                    <br /> 
                    <div className='form'>
                        <h4>About Me</h4>
                        <textarea 
                            rows="4" 
                            type="text" 
                            value={aboutMe}
                            // updating the value of description on input
                            onChange={(e) => setAboutMe(e.target.value)} 
                            required // mak
                        >  
                        </textarea>
                    </div>
                    <br />
                    <div className='form'>
                        <h4>Skills and tools</h4>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={skill1}
                            // updating the value of description on input
                            onChange={(e) => setSkill1(e.target.value)} 
                            required // mak
                        >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={skill2}
                            // updating the value of description on input
                            onChange={(e) => setSkill2(e.target.value)} 
                            required // mak
                        >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={skill3}
                            // updating the value of description on input
                            onChange={(e) => setSkill3(e.target.value)} 
                            required // mak
                        >  
                        </textarea>
                    </div>
                    <br />
                    <div className='form'>
                        <h4>Services Offered </h4>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={service1}
                            // updating the value of description on input
                            onChange={(e) => setService1(e.target.value)} 
                            required // mak
                        >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={service2}
                            // updating the value of description on input
                            onChange={(e) => setService2(e.target.value)} 
                            required // mak
                        >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={service3}
                            // updating the value of description on input
                            onChange={(e) => setService3(e.target.value)} 
                            required // mak
                        >  
                        </textarea>
                    </div>
                    <br />
                    <div className='form'>
                        <h4>Featured projects</h4>
                        <h5>Project 1</h5>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={projectName1}
                            // updating the value of description on input
                            onChange={(e) => setProjectName1(e.target.value)} 
                            required // mak
                        >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={projectDescription1}
                            // updating the value of description on input
                            onChange={(e) => setProjectDescription1(e.target.value)} 
                            required // mak
                            >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={projectLink1}
                            // updating the value of description on input
                            onChange={(e) => setProjectLink1(e.target.value)} 
                            required // mak
                            >  
                        </textarea>
                    </div>
                    <br />
                    <div className='form'>
                        <h5>Project 2</h5>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={projectName2}
                            // updating the value of description on input
                            onChange={(e) => setProjectName2(e.target.value)} 
                            required // mak
                        >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={projectDescription2}
                            // updating the value of description on input
                            onChange={(e) => setProjectDescription2(e.target.value)} 
                            required // mak
                            >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={projectLink2}
                            // updating the value of description on input
                            onChange={(e) => setProjectLink2(e.target.value)} 
                            required // mak
                            >  
                        </textarea>
                    </div>
                    <br />
                    <br />
                    <div className='form'>
                        <h4>Enter your contacts</h4>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={contact1}
                            // updating the value of description on input
                            onChange={(e) => setContact1(e.target.value)} 
                            required // mak
                        >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={contact2}
                            // updating the value of description on input
                            onChange={(e) => setContact2(e.target.value)} 
                            required // mak
                        >  
                        </textarea>
                    </div>
                    <div className='form-buttons'>
                        <button className="save" type="submit">Save</button>
                        <button onClick={loadPreview} className='preview'>Preview </button>
                    </div>
                    <div className='submit-button'>
                        <button onClick={handldeFormSubmit} className='submit'>Submit </button>
                    </div>
                    {/* https://www.dhiwise.com/post/guide-to-creating-engaging-user-experiences-with-react-popups */}
                    {isOpen && (
                        <div className="popup">
                            <QrCodeGenerator type={type} id={id}></QrCodeGenerator>
                            <div className='pop-but-container'>
                                <button onClick={togglePopup} className='close-button'>Close</button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Freelancer;
