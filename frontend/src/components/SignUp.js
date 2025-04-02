import React, { useState } from 'react';
import axios from 'axios'; // imported to handle api calls
import { useNavigate } from 'react-router-dom'; // imported to navigate between routes
import './SignUp.css'

const SignUp = () => {
    // managing the input values given
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const qrCode = "";
    const profile = { title: "", slogan: "",
                      product: "", image: "",
                      description: "",        
                      feature1: "", feature2: "",     
                      feature3: "", contact1: "", contact2: ""};
    const dynamic = { html: "", css: "" };    
    const navigate = useNavigate(); 

    // handling the submission of the form 
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, { username, email, password, qrCode, profile, dynamic })   
        .then((response) => {
            alert('Account created successfully!');
            // getting the users id from the resposne to direct them to their personal create page 
            const userId = response.data.id;
            navigate('/templates/' + userId);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to create account');
        });
    };

    return (
        <div className='container'>
            <div className='content'>
                <h2 className='container'>Sign Up</h2>
                <hr />
                {/* when the form is submitted the handlesubmit function is triggered */}
                <form onSubmit={handleSubmit}>
                    <h6>Username:</h6>
                    <input 
                        type="text"
                        value={username}
                        // updating the value of username on input
                        onChange={(e) => setUsername(e.target.value)} 
                        required // making the field required so that the use cannot coniune without filling the field in
                        className='input-box'
                    /><br/><br/>
                    
                    <h6>Email:</h6>
                    <input 
                        type="email" 
                        value={email}
                        // updating the value of email on input
                        onChange={(e) => setEmail(e.target.value)} 
                        required // making the field required so that the use cannot coniune without filling the field in
                        className='input-box'
                    /><br/><br/>
                    <h6>Password: </h6>
                    <input 
                        type="password" 
                        value={password}
                        // updating the value of the password on input
                        onChange={(e) => setPassword(e.target.value)} 
                        required // making the field required so that the use cannot coniune without filling the field in
                        className='input-box'
                   /><br/><br/>
                    
                    <button type="submit" className='custom-button'>Submit</button>
                </form>
                <br />
                <hr />
                <p className='container'>Already have an account?<a href='Login'>Login</a></p>
            </div>
        </div>
    );
}

export default SignUp;
