import React from "react";
import '../assets/style/Banner.css';
import Slider from "react-slick";
import banner1 from '../assets/img/oggy.jpg';
import banner2 from '../assets/img/oggy1.jpg'




function Banner(){
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 1000,
    };
        
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div className="banner-img">
                    <img src={banner1} alt="#" />
                </div>
                <div className="banner-img">
                    <img src={banner2} alt="#" />
                </div>
            </Slider>
        </div>
    );
}

export default Banner