import React, { useState } from 'react';
import '../assets/style/NewPage.css'
import CarouselRun from '../components/carouselrun.jsx'
import Header from '../components/Header.jsx';
import Banner from '../components/Banner.jsx';
import Feedback from '../components/Feedback.jsx';
import Aboutus from '../components/aboutus.jsx'

const NewPage = () =>{
    return (
        <div>
            <Header />
            <Banner />
            <CarouselRun/>
            <Feedback />
        </div>
    );
}
export default NewPage
