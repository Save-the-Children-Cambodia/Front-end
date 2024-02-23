import React from "react";
import '../assets/style/Feedback.css';

const Feedback = () => {
    return (
        <div className="feedback">
            <div className="feedback-container">
                <h1 className="feedback-title">Feedback</h1>
                <p className="feedback-text">we would love to hear from you</p>
                <div className="email-or-phone">
                    <input type="email" className="email-area" id="email-area" placeholder="email"/>
                    <p>or</p>
                    <input type="number" className="phone-area" id="phone-area" placeholder="phone number"/>
                </div>
                <textarea name="feedback" id="feedback-area" className="feedback-area" cols="30" rows="10" placeholder="enter your feedback..."></textarea>
                <button className="send-feedback">Send Feedback</button>
            </div>
        </div>
    );
}

export default Feedback;