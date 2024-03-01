import React from 'react';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import VideoPlayers from '../components/VideoTesting';
import ImageGallery from '../components/ImageTesting';
import AudioGallery from '../components/AudioTesting';
import Login from '../components/Login';
import SignUp from '../components/signup';
import AdminPage from '../components/AdminPage';
import AuthProvider, { AuthContextProvider } from '../AuthProvider'; // Import AuthProvider
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (      
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/video" element={<VideoPlayers />}/>
          <Route path='/image' element={<ImageGallery />}/>
          <Route path='/audio' element={<AudioGallery />}/>
          <Route path= "/login" element={<Login />}/>
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }/>
          <Route path= "/signup" element={<SignUp />}/>
        </Routes>
        </BrowserRouter>
      </AuthContextProvider>
  );
};

export default AppRouter;
