import React from "react";
import '../assets/style/Navbar.css';
import Logo from '../assets/img/Logo.png'


function Navbar (){
    return (
        <header>
            <div className="class-img-logo">
                <img src={Logo} alt="Save The Children Cambodia" />
            </div>
        </header>
    );
}

export default Navbar