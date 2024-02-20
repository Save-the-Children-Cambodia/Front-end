import React from 'react';
import Navbar from '../layout/Navbar'
import Banner from '../layout/Banner';
import Menu from '../layout/Menu';
import Card from '../layout/Card';

const Home =() => {
  return (
    <div>
      <Navbar />
      <Banner />
      <Menu />
      <Card />
    </div>
  );
}

export default Home;
