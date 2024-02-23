import React from "react";
import "../assets/style/Card.css";
import hello from "../assets/img/oggy1.jpg"
const Video_Card = () => {
    return (
        <div className="card">
            <div className="card-container">
                <h1 className="most-recent">Most Recent</h1>
                <div className="block-of-card">
                    <div className="item-left">
                        <img src={hello} alt="hello" className="card-pf-img"/>
                    </div>
                    <div className="hr-row"></div>
                    <div className="item-right">
                        <h2 className="card-title">What is autism?</h2>
                        <p className="card-text">Gain insights into the influences of ASD, 
                        the range of symptoms, and current research and treatment strategies. A resource for those on the ASD journey with their child.</p>
                        <button className="watch-now">Watch Now</button>
                    </div>
                </div>
                <div className="block-of-card">
                    <div className="item-left">
                        <img src={hello} alt="hello" className="card-pf-img"/>
                    </div>
                    <div className="hr-row"></div>
                    <div className="item-right">
                        <h2 className="card-title">What is autism?</h2>
                        <p className="card-text">Gain insights into the influences of ASD, 
                        the range of symptoms, and current research and treatment strategies. A resource for those on the ASD journey with their child.</p>
                        <button className="watch-now">Watch Now</button>
                    </div>
                </div>
                <div className="block-of-card">
                    <div className="item-left">
                        <img src={hello} alt="hello" className="card-pf-img"/>
                    </div>
                    <div className="hr-row"></div>
                    <div className="item-right">
                        <h2 className="card-title">What is autism?</h2>
                        <p className="card-text">Gain insights into the influences of ASD, 
                        the range of symptoms, and current research and treatment strategies. A resource for those on the ASD journey with their child.</p>
                        <button className="watch-now">Watch Now</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Video_Card;