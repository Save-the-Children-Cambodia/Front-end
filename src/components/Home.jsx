import React from 'react';
import Navbar from '../layout/Navbar'
import Banner from '../layout/Banner';
import Menu from '../layout/Menu';
import Card from '../layout/Card';
import AboutUs from '../layout/AboutUs';
import Feedback from '../layout/Feedback';

const Home =() => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Menu />
      <Card />
      <Feedback />
      <AboutUs />
    </div>
  );
}

export default Home;
