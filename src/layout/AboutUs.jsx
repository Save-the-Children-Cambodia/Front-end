import React from "react";
import "../assets/style/AboutUs.css";
import About from "../assets/img/oggy.jpg";

const AboutUs = () => {
    return (
        <div className="about">
            <div className="about-container">
                <div className="left-side">
                    <h1>About<br />Us</h1>
                </div>
                <div className="hr-straight"></div>
                <div className="right-side">
                    <img src={About} className="img-about-us" alt="" />
                    <p className="text-about-us">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Except
                    eur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </div>
    );
}
export default AboutUs;