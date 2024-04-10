import React from "react";
import Carousel from "../components/carouselA.jsx"
import AdminPage from "../components/AdminPage.jsx";
import BannerUploadPage from "../components/BannerUpload.jsx";
import UpdateFiles from "../components/Update.jsx";


const Admin = () => {
    const Slide1 = () => 
    <div><AdminPage/></div>;
    const Slide2 = () => 
    <div><BannerUploadPage/></div>;
    const Slide3 = () =>
    <div><UpdateFiles/></div>
    const slides = [<Slide1 />, <Slide2 />, <Slide3/>];
    return (
        <div className="app">
            <Carousel slides={slides} />
        </div>
    )
}
export default Admin;