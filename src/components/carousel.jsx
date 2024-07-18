import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faFileAlt, faMusic, faImage } from '@fortawesome/free-solid-svg-icons';
import "../assets/style/carousel.css";

const CustomCarousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getSlideIndicatorContent = (index) => {
    switch (index) {
      case 0:
        return { icon: faVideo, text: "វីដេអូ" };
      case 1:
        return { icon: faFileAlt, text: "ឯកសារ" };
      case 2:
        return { icon: faMusic, text: "សម្លេង" };
      case 3: 
        return { icon: faImage, text: "រូបភាព" };
      default:
        return { icon: null, text: "" };
    }
  };

  return (
    <div className="carousel-container">
      <div className="indicators">
        {slides.map((_, index) => {
          const { icon, text } = getSlideIndicatorContent(index);
          return (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={index === currentIndex ? 'indicator active' : 'indicator'}
              id='slide'
              style={index === currentIndex ? 
                { backgroundColor: '#DA291C'} : 
                {background: "#D9D9D9"}}
            >
              <div className="icon" style={index === currentIndex ? {color: "#fff"} : { color: "#8D8D8D"}}>
                {icon && <FontAwesomeIcon icon={icon} />}
              </div>
              <span style={index === currentIndex ? {color: "#fff"} : { color: "#8D8D8D"}}>{text}</span>
            </div>
          );
        })}
      </div>
      <div className="carousel">
        {slides[currentIndex]}
      </div>
      
    </div>
  );
};

export default CustomCarousel;
