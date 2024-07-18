import React from "react";
import '../assets/style/Header.css';
import logo_sci from '../assets/img/logo_sci.svg'

const Header = () => {
    return (
        <div className="header-container">
            <img src={logo_sci} alt="Logo_Save_the_Children" />
            <div className="header-container-text">
                <h6>ParentingTips</h6>
                <p>គន្លឹះការចិញ្ចឹមកូន</p>
            </div>
        </div>
    );
}

export default Header;