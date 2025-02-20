import React, { useState } from 'react';
import axios from 'axios'; // imported to handle api calls
import { useNavigate } from 'react-router-dom'; // imported to navigate between routes

const LogIn = () => {
  // managing the input values given
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  // handling the submission of the form 
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    axios.post('http://localhost:4000/login', { email, password })
        .then((response) => {
          alert('Log in successfull!');
          // redirecting the user to the profile page after a successful login
          navigate('/profile');
        })
        .catch((error) => {
          console.error('Error logging in:', error);
          alert('Failed to log in');   
        });
    
  };

  return (
    <div>
      <h2>Log in</h2>
      {/* when the form is submitted the handlesubmit function is triggered */}
      <form onSubmit={handleSubmit}>
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
      <p>Dont have an account?<a href='SignUp'>Sign Up</a></p>
    </div>
  );
}

export default LogIn;
