import React, { useState } from 'react';

const SignUp = () => {
    // managing the input values given
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
 
    return (
        <div>
            <h2>Sign Up</h2>
            <form>
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
