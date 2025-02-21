import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";


const Profile = () => {
  // getting the users id from the URL
  const { id } = useParams();
  const [profile, setProfile] = useState("");
  // referencing the div element and setting it to null
  const userProfile = useRef(null);

  // displaying the users profile when the page is loaded based on their user id 
  useEffect(() => {
    axios.get('http://localhost:4000/profile/' + id)
        .then((response) => {
          setProfile(response.data.profile);
        })
        .catch((error) => {
          console.log("Error", error);
        });
  }, [id]);


  const handleSave = () => {
    // retrieving the html content from the referenced div and saving it as a string 
    const html = userProfile.current.outerHTML;
    axios.post('http://localhost:4000/profile/' + id, { html })
          .then(() => {
            alert('Profile Saved!');
          })
          .catch((error) => {
            console.error('Error saving', error);
            alert('Failed to save');   
          });
  }

  return (
    <div>
      <h1>My Profile</h1>
      {/* displaying the users html from their profile*/}
      {/* https://legacy.reactjs.org/docs/dom-elements.html - must use dangerously set so react can monitor changes */}
      <div ref={userProfile} dangerouslySetInnerHTML={{ __html: profile }}></div> 
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Profile;