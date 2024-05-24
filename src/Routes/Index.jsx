import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoPlayers from "../components/VideoTesting";
import ImageGallery from "../components/ImageTesting";
import AudioGallery from "../components/AudioTesting";
import PDFViewer from "../components/DocuTesting";
import Login from "../components/Login";
import { AuthContextProvider } from "../AuthProvider"; // Import AuthProvider
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import UpdateFiles from "../components/Update";
import NewPage from '../layout/NewPage'
import Admin from "../layout/admin";
import OtherSelection from "../components/otherselection";

const AppRouter = () => {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                    {/* <Route path="/video" element={<VideoPlayers />} />
                    <Route path="/image" element={<ImageGallery />} />
                    <Route path="/audio" element={<AudioGallery />} />
                    <Route path="/document" element={<PDFViewer />} /> */}
                    <Route path="/login" element={<Login />} />

                    <Route path="/update" element={<UpdateFiles />} />
                    <Route path="/" element={<NewPage />} />
                    <Route path="/other" element={<OtherSelection />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <Admin/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="bounce"
            />
        </AuthContextProvider>
    );
};
export default AppRouter;
