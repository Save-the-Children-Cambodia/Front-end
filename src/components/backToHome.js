import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackToHome.css'; // import the CSS file

function BackToHome() {
    const navigate = useNavigate();
  
    const goBack = () => {
      navigate('/'); // navigate to home page
    };

    return(
        <button className="back-button" onClick={goBack}>&lt; Back to Home</button>
    );
}

export default BackToHome;
