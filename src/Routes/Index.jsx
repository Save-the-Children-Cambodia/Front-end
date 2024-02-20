import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from '../components/Home';
import Hi from '../components/Hi';
import UploadVideoPage from '../components/test';
import VideoPlayer from '../components/videoPlayer';





const AppRouter = () => {
  return (
    
        <BrowserRouter>       
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/Hi" element={<Hi />}/>
                <Route path="/vidtest" element={<UploadVideoPage />}/>
                <Route path="/video" element={<VideoPlayer />}/>
            </Routes>
        </BrowserRouter>
  );
};



export default AppRouter;
