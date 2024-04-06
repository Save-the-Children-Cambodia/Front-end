import React from "react";
import '../assets/style/Header.css';
import logo_sci from '../assets/img/logo_sci.svg'

const Header = () => {
    return (
        <div className="header-container">
            <img src={logo_sci} alt="Logo_Save_the_Children" />
            <div className="header-container-text">
                <h6>Save the Children</h6>
                <p>Positive Parenting</p>
            </div>
        </div>
    );
}

export default Header;