import React from "react";
import '../assets/style/Feedbacks.css';
import linkedin from '../assets/img/linkedin.svg'
import facebook from '../assets/img/facebook.svg'
import youtube from '../assets/img/youtube.svg'
import x from '../assets/img/x-twitter.svg'


const Feedback = () => {
    return (
        <div className="fb-container">
            <div className="fb-aboutus-container1">
                <div className="fb-article">
                    <h6>About Us</h6>
                    <p>Our website provides ideas and advice 
                        to help users foster positive parenting 
                        skills and contribute to reducing violence 
                        in society. Empowering individuals with 
                        guidance for a harmonious and nurturing 
                        environment.
                    </p>
                </div>
                <div className="fb-break-line"></div>
                <div className="fb-contact">
                    <h6>Contact Us</h6>
                    <p>+855 123 456 908</p>
                    <div className="fb-contact-icon">
                        <a href=""><img src={linkedin} alt="" /></a>
                        <a href=""><img src={facebook} alt="" /></a>
                        <a href=""><img src={x} alt="" /></a>
                        <a href=""><img src={youtube} alt="" /></a>
                    </div>
                </div>
            </div>
            <div className="fb-feedback-container1">
                <div className="fb-container-text">
                    <input className="fb-input" type="text" placeholder="Gmail"/>
                    <p>or</p>
                    <input className="fb-input" type="text" placeholder="Phone Number"/>
                </div>
                <textarea className="fb-textarea" name="" id="" cols="30" rows="10" placeholder="បញ្ចេញមតិ"></textarea>
                <button className="fb-button">Send Feedback</button>
            </div>
        </div>
    );
}

export default Feedback