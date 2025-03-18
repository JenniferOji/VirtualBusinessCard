import React from 'react';
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Professional = () => {
    const {id} = useParams();
    // Default states if the user does not have a professional profile created yet
    const [title, setTitle] = useState("Please Enter title");
    const [description, setDescription] = useState("Please Enter description");
    const navigate = useNavigate();

     // displaying the users profile when the page is loaded based on their user id 
     useEffect(() => {
        axios.get(`${BASE_URL}/templates/professional/${id}`)
            .then((response) => {
                setTitle(response.data.profile.title);
                setDescription(response.data.profile.description);
            })
            .catch((error) => {
            console.log("Error", error);
            });
    }, [id]);

    // updating the users profile on submit
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        await axios.post(`${BASE_URL}/templates/professional/profile/${id}` , { profile: { title, description }}) // sending the data in the profile object   
        .then((response) => {
            alert('Saved successfully');  
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
        <div>
            <form onSubmit={handleSubmit}>
                <p><label>Title</label></p>
                <input 
                    type="text" 
                    value={title}
                    // updating the value of email on input
                    onChange={(e) => setTitle(e.target.value)} 
                    required // making the field required so that the use cannot coniune without filling the field in
                /><br/><br/>
                <p><label>Description</label></p>
                <textarea 
                    rows="6" 
                    cols="100"
                    type="text" 
                    value={description}
                    // updating the value of description on input
                    onChange={(e) => setDescription(e.target.value)} 
                    required // mak
                >
                    
                </textarea>
                <br />
                <input type="submit" value="Submit" />
            </form>
            <button onClick={loadPreview}>View preview </button>
            {/* <img src="/images/template1.png" alt="Profile" style={{ width: "100px" }} /> */}
        </div>
    );
}

export default Professional;
