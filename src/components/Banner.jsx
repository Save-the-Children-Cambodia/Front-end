import React from "react";
import '../assets/style/Banner1.css';
import Slider from "react-slick";

export default function Banner() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear"

  };
  return (
    <div className="slider-container">
    <Slider {...settings}>
      <div className="bn-banner-img">
        <img src="https://www.unicef.org/cambodia/sites/unicef.org.cambodia/files/styles/hero_tablet/public/nicksells.com%20HR_12252.jpg.webp?itok=CjVSYpKC" alt="" />
      </div>
      <div className="bn-banner-img">
        <img src="https://www.worldbank.org/content/dam/photos/780x439/2020/jan/cambodia-parent-program.jpg" alt="" />
      </div>
      <div className="bn-banner-img">
        <img src="https://justbluedutch.files.wordpress.com/2016/01/filipino-children.jpg?w=640" alt="" />
      </div>
      <div className="bn-banner-img">
        <img src="https://static.wixstatic.com/media/90f9f5_d9dc8c4b36434f5aaa484cad43f7f3be~mv2.jpg/v1/fill/w_640,h_410,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/90f9f5_d9dc8c4b36434f5aaa484cad43f7f3be~mv2.jpg" alt="" />
      </div>
    </Slider>
    </div>
  );
}


