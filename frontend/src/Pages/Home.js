import React from 'react';
import './Home.css';  
import {FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa'

const Home = () => {
  return (
    <div>   
        <div className='app-logo'>
            <img src='/images/Logo-rm.png' alt="logo" className='logo'></img>
        </div> 
        <div>
            <div className='app-information'>
                {/* <div className='top'></div> */}
                <div className='app-welcome-text'>
                    <h1>Welcome</h1>
                </div>
                <br />
                <div className='app-welcome-text'>
                    <p>Virtual Business Cards lets you create and share digital portfolios with ease. With a sleek interface, you can showcase your product or service and contact info—all linked to a unique QR code for seamless networking. Ditch traditional business cards and make a lasting impression anytime, anywhere.</p>
                </div>
                <ul className='icons'>
                    <FaFacebook  className='app-icon'/>
                    <FaTwitter className='app-icon'/>
                    <FaInstagram className='app-icon'/>
                </ul>
            </div>
        </div>
    </div>
   );

}

export default Home;
