import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from '../components/Home';
import Hi from '../components/Hi';



const AppRouter = () => {
  return (
    
        <BrowserRouter>       
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/Hi" element={<Hi />}/>
            </Routes>
        </BrowserRouter>
  );
};

export default AppRouter;
