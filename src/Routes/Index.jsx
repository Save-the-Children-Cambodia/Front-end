import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from '../components/Home';
import Video from '../components/Video';
import Document from '../components/Document';



const AppRouter = () => {
  return (
    
        <BrowserRouter>       
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/Video" element={<Video />}/>
                <Route path="/Document" element={<Document />}/>
            </Routes>
        </BrowserRouter>
  );
};

export default AppRouter;
