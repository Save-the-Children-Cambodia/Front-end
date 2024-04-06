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
        <img src="https://i.pinimg.com/736x/d3/93/4c/d3934c4a108118c33d94263cecb9a746.jpg" alt="" />
      </div>
      <div className="bn-banner-img">
        <img src="https://pbs.twimg.com/media/E6SV3cPVcAMG4mK?format=jpg&name=4096x4096" alt="" />
      </div>
      <div className="bn-banner-img">
        <img src="https://i.pinimg.com/originals/65/c1/66/65c16665f39cbb90161dcf140c6cfce7.png" alt="" />
      </div>
      <div className="bn-banner-img">
        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/8918b1120170073.60aca64d5b749.png" alt="" />
      </div>
      <div className="bn-banner-img">
        <img src="https://wallpapercave.com/wp/wp11268570.jpg" alt="" />
      </div>
      <div className="bn-banner-img">
        <img src="https://images3.alphacoders.com/132/1328547.png" alt="" />
      </div>
    </Slider>
    </div>
  );
}


