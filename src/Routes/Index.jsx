import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from '../components/Home';
import VideoPlayers from '../components/VideoTesting';
import ImageGallery from '../components/ImageTesting';
import AdminPage from '../components/AddingVideo';
import AdminPageImage from '../components/Addingimg';
import AudioGallery from '../components/AudioTesting';
import DocumentGallery from '../components/DocuTesting';
import Login from '../components/Login';
import Admin from '../components/Admin';
import AdminPageAudio from '../components/Addingaudio';
const AppRouter = () => {
  return (
    
        <BrowserRouter>       
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/video" element={<VideoPlayers />}/>
                <Route path='/image' element ={<ImageGallery />}/>
                <Route path='/audio'  element = {<AudioGallery />}/>
                <Route path='/adminvideo' element = {<AdminPage />}/> 
                <Route path='/adminimage' element = {<AdminPageImage />}/>
                <Route path='/adminaudio' element = {<AdminPageAudio />}/> 
                <Route path='/admindocument' element = {<DocumentGallery />}/>   
                <Route path='/login' element = {<Login />}/>
                <Route path='/admin' element = {<Admin />}/>
            </Routes>
        </BrowserRouter>
  );
};

export default AppRouter;
