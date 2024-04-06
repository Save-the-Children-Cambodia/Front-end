import React from "react";
import '../assets/style/NewPage.css'
import Header from '../components/Header.jsx';
import Banner from '../components/Banner.jsx';
import Feedback from '../components/Feedback.jsx';
import Aboutus from '../components/aboutus.jsx'

const NewPage = () =>{
    return (
        <div>
            <Header />
            <Banner />
            <Feedback />
            <Aboutus />
        </div>
    );
}
export default NewPage