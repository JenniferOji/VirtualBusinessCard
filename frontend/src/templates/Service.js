import React from 'react';
import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Service.css';
import QrCodeGenerator from '../components/QrCodeGenerator';
import imageCompression from 'browser-image-compression';

const Service = () => {
    const {id} = useParams();

    //qr code pop up 
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(false);
    };

    // default states if the user does not have a professional profile created yet
    const[type] = useState("service");

    const navigate = useNavigate();

    // variables fro the user to enter when filling in the form 
    const [title, setTitle] = useState("");
    const [slogan, setSlogan] = useState("");
    const [image, setImage] = useState("");
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
    

    // displaying the users profile when the page is loaded based on their user id 
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/templates/service/${id}`)
            .then((response) => {
                setTitle(response.data.service.title || "Enter business name");
                setSlogan(response.data.service.slogan || "Enter slogan");
                setImage(response.data.service.image || "");
                setDescription(response.data.service.description || "Enter description");
                
                setService1(response.data.service.service1 || "Enter service 1");
                setService2(response.data.service.service2 || "Enter service 2");
                setService3(response.data.service.service3 || "Enter service 3");
                setService4(response.data.service.service4 || "Enter service 4");
    
                setFeature1(response.data.service.feature1 || "Enter feature 1");
                setFeature2(response.data.service.feature2 || "Enter feature 2");
                setFeature3(response.data.service.feature3 || "Enter feature 3");
                
                setTestimonialQuote1(response.data.service.testimonialQuote1 || "Enter testimonial 1 quote");
                setTestimonialName1(response.data.service.testimonialName1 || "Enter testimonial 1 name");
                setTestimonialQuote2(response.data.service.testimonialQuote2 || "Enter testimonial 2 quote");
                setTestimonialName2(response.data.service.testimonialName2 || "Enter testimonial 2 name");
                
                setContact1(response.data.service.contact1 || "Enter email");
                setContact2(response.data.service.contact2 || "Enter phone");
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, [id]);
    

    // updating the users profile on submit
    const handleSave = async (e) => {
        e.preventDefault(); 
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/templates/service/profile/${id}` , { service: { title, slogan, image, 
            description, service1, service2, service3, service4, feature1, feature2, feature3, testimonialQuote1, testimonialName1, testimonialQuote2, testimonialName2, contact1, contact2

        }}) // sending the data in the profile object   
        .then((response) => {
            // alert('Saved successfully');  
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to save profile');
        });
    };

    // converting the image to base64 - https://stackoverflow.com/questions/71748138/how-do-i-convert-image-file-to-base64
    const handleImageUpload = async (event) => {
        const file = event.target.files[0]; // accessing the file selected 
        if (!file) return;
      
        const adjustments = {
          maxSizeMB: 5, // file size
          maxWidthOrHeight: 300, // compressing the image dimensions
        };
        // comprasing the image to be able to store it in the database - https://stackoverflow.com/questions/47956281/best-way-to-compress-an-image-javascript-react-web-app
        const compressedFile = await imageCompression(file, adjustments);
        const reader = new FileReader();
         // reading the file image and converting it to base64
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    // updating the users profile on submit
    const handldeFormSubmit = async (e) => {
        e.preventDefault(); 
        // incase the user forgets to save - sending the users data to the database
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/templates/service/profile/${id}` , { service: { title, slogan, image,
             description, service1, service2, service3, service4, feature1, feature2, feature3, testimonialQuote1, testimonialName1, testimonialQuote2, testimonialName2, contact1, contact2

        }}) // sending the data in the profile object   
        .then((response) => {
            // navigate(`/${type}/portfolio/qrCode/${id}`);
            setIsOpen(true);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to save profile');
        });
    };

    const loadPreview = async (e) => {
        navigate('/service/portfolio/preview/' + id);
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
                    <h1 className='header'> Service Portfolio </h1>
                    <br /><hr /><br />
                    <div className='form'>
                        <h4>Business | Service Name</h4>
                        <input 
                            type="text" 
                            value={title}
                            // updating the value of email on input
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                    </div>
                    <br />
                    <div className='form'>
                        <h4>Enter slogan</h4>
                        <input 
                            type="text" 
                            value={slogan}
                            // updating the value of email on input
                            onChange={(e) => setSlogan(e.target.value)} 
                        />
                    </div>
                    <br />
                    <div className='form'>
                        <h4 for="fileInput">Upload hero image here</h4>
                        <div className='displayed-images'>
                            {/* {imageBase64 && <img src={imageBase64} alt="Uploaded Preview" className='uploaded-image' />} */}
                            {image && <img src={image} alt="Uploaded Preview" className='uploaded-image' />}

                        </div>
                            <input type="file" id="fileInput" accept="image/*" onChange={handleImageUpload}></input>
                    </div>       
                    <br /> 
                    <div className='form'>
                        <h4> The service description</h4>
                        <textarea 
                            rows="4" 
                            type="text" 
                            value={description}
                            // updating the value of description on input
                            onChange={(e) => setDescription(e.target.value)} 
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
                        >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={service4}
                            // updating the value of description on input
                            onChange={(e) => setService4(e.target.value)} 
                        >  
                        </textarea>
                    </div>
                    <br />
                    <div className='form'>
                        <h4>Why Choose Us  </h4>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={feature1}
                            // updating the value of description on input
                            onChange={(e) => setFeature1(e.target.value)} 
                        >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={feature2}
                            // updating the value of description on input
                            onChange={(e) => setFeature2(e.target.value)} 
                        >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={feature3}
                            // updating the value of description on input
                            onChange={(e) => setFeature3(e.target.value)} 
                        >  
                        </textarea>
                    </div>
                    <br />
                    <div className='form'>
                        <h4>Testimonials</h4>
                        <h5>Testimonial 1</h5>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={testimonialQuote1}
                            // updating the value of description on input
                            onChange={(e) => setTestimonialQuote1(e.target.value)} 
                        >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={testimonialName1}
                            // updating the value of description on input
                            onChange={(e) => setTestimonialName1(e.target.value)} 
                            >  
                        </textarea>
                    </div>
                    <br />
                    <div className='form'>
                        <h5>Testimonial 2</h5>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={testimonialQuote2}
                            // updating the value of description on input
                            onChange={(e) => setTestimonialQuote2(e.target.value)} 
                        >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={testimonialName2}
                            // updating the value of description on input
                            onChange={(e) => setTestimonialName2(e.target.value)} 
                            >  
                        </textarea>
                    </div>
                    <div className='form'>
                        <h4>Enter your contacts</h4>
                        <textarea 
                            rows="2" 
                            type="text" 
                            value={contact1}
                            // updating the value of description on input
                            onChange={(e) => setContact1(e.target.value)} 
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

export default Service;
