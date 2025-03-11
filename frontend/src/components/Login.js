import React, { useState } from 'react';
import axios from 'axios'; // imported to handle api calls
import { useNavigate } from 'react-router-dom'; // imported to navigate between routes

const Login = () => {
    // managing the input values given
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            <h2>Log in</h2>
            <form >
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
                
                <button type="submit">Log in</button>
            </form>
            <p>Dont have an account?<a href='SignUp'>Sign Up</a></p>
        </div>
    );
}

export default Login;