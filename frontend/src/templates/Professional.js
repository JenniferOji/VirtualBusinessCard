import React from 'react';
import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';
import axios from 'axios';
import './Professional.css';


const Professional = () => {
    const {id} = useParams();
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

    const navigate = useNavigate();

    // displaying the users profile when the page is loaded based on their user id 
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
            console.log("Error", error);
            });
    }, [id]);

    // updating the users profile on submit
    const handleSave = async (e) => {
        e.preventDefault(); 
        await axios.post(`${BASE_URL}/templates/professional/profile/${id}` , { profile: { title, slogan,
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
        await axios.post(`${BASE_URL}/templates/professional/profile/${id}` , { profile: { title,  slogan,
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

    const loadPreview = async (e) => {
        navigate('/professional/portfolio/' + id);
    }

    return (
        <div className="containerForm">
            <form onSubmit={handleSave}>
            <h2>Make sure to preview before submitting !</h2>

                <h3>Buisness Name</h3>
                <input 
                    type="text" 
                    value={title}
                    // updating the value of email on input
                    onChange={(e) => setTitle(e.target.value)} 
                    required // making the field required so that the use cannot coniune without filling the field in
                /><br/><br/>
                <h3>Enter slogan</h3>
                <input 
                    type="text" 
                    value={slogan}
                    // updating the value of email on input
                    onChange={(e) => setSlogan(e.target.value)} 
                    required // making the field required so that the use cannot coniune without filling the field in
                /><br/><br/>
                <h3>Enter product name</h3>
                <input 
                    type="text" 
                    value={product}
                    // updating the value of email on input
                    onChange={(e) => setProduct(e.target.value)} 
                    required // making the field required so that the use cannot coniune without filling the field in
                /><br/><br/>
                <h3>Upload image here</h3>
                <img src="/images/template1.png" alt="Profile" style={{ width: "100px" }} />
                <h3> The product description</h3>
                <textarea 
                    rows="4" 
                    cols="50"
                    type="text" 
                    value={description}
                    // updating the value of description on input
                    onChange={(e) => setDescription(e.target.value)} 
                    required // mak
                >  
                </textarea>
                <br />
                <h3>Enter products features </h3>
                <textarea 
                    rows="2" 
                    cols="50"
                    type="text" 
                    value={feature1}
                    // updating the value of description on input
                    onChange={(e) => setFeature1(e.target.value)} 
                    required // mak
                >  
                </textarea>
                <br />
                <textarea 
                    rows="2" 
                    cols="50"
                    type="text" 
                    value={feature2}
                    // updating the value of description on input
                    onChange={(e) => setFeature2(e.target.value)} 
                    required // mak
                >  
                </textarea>
                <br />
                <textarea 
                    rows="2" 
                    cols="50"
                    type="text" 
                    value={feature3}
                    // updating the value of description on input
                    onChange={(e) => setFeature3(e.target.value)} 
                    required // mak
                >  
                </textarea>
                <br />
                <h3>Enter your contacts</h3>
                <textarea 
                    rows="2" 
                    cols="50"
                    type="text" 
                    value={contact1}
                    // updating the value of description on input
                    onChange={(e) => setContact1(e.target.value)} 
                    required // mak
                >  
                </textarea>
                <br />
                <textarea 
                    rows="2" 
                    cols="50"
                    type="text" 
                    value={contact2}
                    // updating the value of description on input
                    onChange={(e) => setContact2(e.target.value)} 
                    required // mak
                >  
                </textarea>
                <br />
                <input className="submit" type="submit" value="Save" />
                <button onClick={loadPreview}>Preview </button>
                <button onClick={handldeFormSubmit}>Submit </button>
            </form>
            {/* <img src="/images/template1.png" alt="Profile" style={{ width: "100px" }} /> */}
        </div>
    );
}

export default Professional;
