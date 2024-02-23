import React from 'react';

import VideoData from './data.jsx';
import Player from './player.jsx';
import Navbar from '../layout/Navbar'

import BackToHome from './backToHome.js';

function VideoPlayer() {


  return (
    <div>
      <Navbar />
      <BackToHome />
      <Player id="1" category="Videos"/>
      <VideoData id="1" category="Videos"/>
    </div>
  );
}

export default VideoPlayer;
