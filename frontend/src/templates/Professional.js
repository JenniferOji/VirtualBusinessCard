import React from 'react';
import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Professional.css';
import QrCodeGenerator from '../components/QrCodeGenerator';


const Professional = () => {
    const {id} = useParams();

    //qr code pop up 
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(false);
    };

    // default states if the user does not have a professional profile created yet
    const [title, setTitle] = useState("Enter business name");
    const [slogan, setSlogan] = useState("Enter slogan");
    const [product, setProduct] = useState("Enter product name");
    const [description, setDescription] = useState("Enter description");
    const [feature1, setFeature1] = useState("Enter feature");
    const [feature2, setFeature2] = useState("Enter feature");
    const [feature3, setFeature3] = useState("Enter feature");
    const [contact1, setContact1] = useState("Enter contact");
    const [contact2, setContact2] = useState("Enter contact");

    const[type] = useState("professional");

    const navigate = useNavigate();

    // displaying the users profile when the page is loaded based on their user id 
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/templates/professional/${id}`)
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
            console.log("Error", error);
            });
    }, [id]);

    // loading uploaded images to the screen 
    useEffect(() => {
        document.getElementById('fileInput').addEventListener('change', function(event) {
            var files = event.target.files;
            var displayImage = document.getElementById('displayImage');
            
            // clearing any previous html content 
            displayImage.innerHTML = '';
        
            // looping through all the selected files 
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
        
              // only using image files - png, jpeg etc
              if (!file.type.match('image.*')) {
                continue;
              }
        
              var imgContainer = document.createElement('div');
              imgContainer.style.marginBottom = '20px'; 
        
              var img = document.createElement('img');
              img.src = URL.createObjectURL(file);
              img.style.height = '150px';
              img.style.display = 'block'; // displayinng the image on a block to put it in a new line 
              img.style.marginBottom = '10px';
                
              // appending the image and file info to the container
              imgContainer.appendChild(img);        
              displayImage.appendChild(imgContainer);
            }
          });
    })

    // updating the users profile on submit
    const handleSave = async (e) => {
        e.preventDefault(); 
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/templates/professional/profile/${id}` , { profile: { title, slogan,
            product,
            description,  
            feature1,   
            feature2,    
            feature3,    
            contact1, 
            contact2 }}) // sending the data in the profile object   
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
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/templates/professional/profile/${id}` , { profile: { title,  slogan,
            product,
            description,  
            feature1,   
            feature2,    
            feature3,    
            contact1, 
            contact2 }}) // sending the data in the profile object   
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
        navigate('/professional/portfolio/preview/' + id);
    }

    return (
        <div className="containerForm">
            <form onSubmit={handleSave}>
                <h1 className='header'> Product Portfolio </h1>
                <br /><hr /><br />
                <div className='form'>
                    <h4>Buisness Name</h4>
                    <input 
                        type="text" 
                        value={title}
                        // updating the value of email on input
                        onChange={(e) => setTitle(e.target.value)} 
                        required // making the field required so that the use cannot coniune without filling the field in
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
                        required // making the field required so that the use cannot coniune without filling the field in
                    />
                </div>
                <br />
                <div className='form'>
                    <h4>Enter product name</h4>
                    <input 
                        type="text" 
                        value={product}
                        // updating the value of email on input
                        onChange={(e) => setProduct(e.target.value)} 
                        required // making the field required so that the use cannot coniune without filling the field in
                    />
                </div>
                <br />
                <div className='form'>
                    <h4 for="fileInput">Upload image here</h4>
                    <div className='displayed-images'>
                        <div id="displayImage"></div>
                    </div>
                    <input type="file" id="fileInput" accept="image/*" multiple></input>
                    </div>   
                <br /> 
                <div className='form'>
                    <h3> The product description</h3>
                    <textarea 
                        rows="4" 
                        type="text" 
                        value={description}
                        // updating the value of description on input
                        onChange={(e) => setDescription(e.target.value)} 
                        required // mak
                    >  
                    </textarea>
                </div>
                <br />
                <div className='form'>

                    <h4>Enter products features </h4>
                    <textarea 
                        rows="2" 
                        type="text" 
                        value={feature1}
                        // updating the value of description on input
                        onChange={(e) => setFeature1(e.target.value)} 
                        required // mak
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
                        required // mak
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
                        required // mak
                    >  
                    </textarea>
                </div>
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
                            <button onClick={togglePopup} className='pop-button'>Close</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default Professional;
