import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from '../components/Home';
import Video from '../components/Video';
import Document from '../components/Document';
import VideoPlayer from '../components/videoPlayer';



const AppRouter = () => {
  return (
    
        <BrowserRouter>       
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/Video" element={<Video />}/>
                <Route path="/Document" element={<Document />}/>
                <Route path="/player" element={<VideoPlayer />}/>
            </Routes>
        </BrowserRouter>
  );
};

export default AppRouter;
