import React from 'react';
import CustomCarousel from './carousel.jsx';
import VideoTesting from './VideoTesting.jsx';
import PDFViewer from "./DocuTesting";
import AudioGallery from "./AudioTesting.jsx";
import ImageGallery from './ImageTesting.jsx';


const Slide1 = () => 
  <div><VideoTesting/></div>;
const Slide2 = () => 
  <div><PDFViewer/></div>;
const Slide3 = () => 
  <div><AudioGallery/></div>;
const Slide4 = () => 
  <div><ImageGallery/></div>;

const CarouselRun = () => {
  const slides = [<Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />];

  return (
    <div className="app">
      <CustomCarousel slides={slides} />
    </div>
  );
};

export default CarouselRun;