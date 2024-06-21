import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faFileAlt, faMusic, faImage } from '@fortawesome/free-solid-svg-icons';
import { text } from '@fortawesome/fontawesome-svg-core';


const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getSlideIndicatorContent = (index) => {
    switch (index) {
      case 0:
        return { text: "Upload Contents" };
      case 1:
        return { text: "Upload Banners" };
      case 2: 
        return { text: "Edit/Delete Files"}
      case 3:
        return { text: "Campaign"}
      default:
        return { icon: null, text: "" };
    }
  };

  return (
    <div className="carousel-container" style={{"margin" : "50px 0"}}>
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
                { backgroundColor: '#DA291C', borderRadius: "20px"} : 
                {background: "#D9D9D9", borderRadius: "20px"}}
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

export default Carousel;
