import React, { useState } from 'react';
import axios from 'axios'; // imported to handle api calls
import { BASE_URL } from '../config'; // getting the stored url
import { useNavigate } from 'react-router-dom'; // imported to navigate between routes

const SignUp = () => {
    // managing the input values given
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const create = "";
    const qrCode = "";
    const profile = "";
    const navigate = useNavigate(); 

    // handling the submission of the form 
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        await axios.post(`${BASE_URL}/register`, { username, email, password, create, qrCode, profile })   
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
        <div>
        <h2>Sign Up</h2>
        {/* when the form is submitted the handlesubmit function is triggered */}
        <form onSubmit={handleSubmit}>
            <label>Username:</label><br/>
            <input 
                type="text"
                value={username}
                // updating the value of username on input
                onChange={(e) => setUsername(e.target.value)} 
                required // making the field required so that the use cannot coniune without filling the field in
            /><br/><br/>

            <label>Email:</label><br/>
            <input 
                type="email" 
                value={email}
                // updating the value of email on input
                onChange={(e) => setEmail(e.target.value)} 
                required // making the field required so that the use cannot coniune without filling the field in
            /><br/><br/>

            <label>Password:</label><br/>
            <input 
                type="password" 
                value={password}
                // updating the value of the password on input
                onChange={(e) => setPassword(e.target.value)} 
                required // making the field required so that the use cannot coniune without filling the field in
            /><br/><br/>
            
            <button type="submit">Submit</button>
        </form>
        </div>
    );
}

export default SignUp;
