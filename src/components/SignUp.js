import React, { useState } from 'react';
import axios from 'axios'; // imported to handle api calls
import { useNavigate } from 'react-router-dom'; // imported to navigate between routes

const SignUp = () => {
  // managing the input values given
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  // handling the submission of the form 
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      // making a POST to the backend in order to save the account - passsing the email and password as part ofthe request 
      await axios.post('http://localhost:4000/register', { email, password });
      // sending a message to the user that the account has been created 
      alert('Account created successfully!');
      // redirecting the user to the profile page 
      navigate('/profile');
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Failed to create account');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
    </div>
  );
}

export default SignUp;
