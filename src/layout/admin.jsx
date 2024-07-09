import React from "react";
import Carousel from "../components/carouselA.jsx"
import AdminPage from "../components/AdminPage.jsx";
import BannerUploadPage from "../components/BannerUpload.jsx";
import UpdateFiles from "../components/Update.jsx";
import Campaign from "../components/campaign.jsx";
import Quiz from "../components/quiz.jsx";


const Admin = () => {
    const Slide1 = () => 
    <div><AdminPage/></div>;
    const Slide2 = () => 
    <div><BannerUploadPage/></div>;
    const Slide3 = () =>
    <div><UpdateFiles/></div>
    const Slide4 = () =>
    <div><Campaign/></div>
    const Slide5 = () =>
    <div><Quiz/></div>
    const slides = [<Slide1 />, <Slide2 />, <Slide3/>, <Slide4/>, <Slide5/>];
    return (
        <div className="app">
            <Carousel slides={slides} />
        </div>
    )
}
export default Admin;