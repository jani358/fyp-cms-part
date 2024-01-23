// src/components/Home.js
import React from 'react';
import './Home.css'; // Import the CSS file for styling
import cmsImage from '../images/cms.jpg'; // Import the image

const Home = () => {
  return (
    <div className="home-container">
      <h2 className="welcome-text">Welcome to our CMS system</h2>
      <div className="content-container">
        <img
          src={cmsImage} // Use the imported image
          alt="Home Image"
          className="home-image"
        />
        <p className="content-text">
        This is our content management system for our Flutter mobile application.
        </p>
      </div>
    </div>
  );
};

export default Home;
