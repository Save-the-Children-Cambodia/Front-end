import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import "../assets/style/AddingData.css"
import { UserAuth } from '../AuthProvider.js';


function BannerUploadPage() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { user, logout } = UserAuth();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleUrlUpload = async () => {
    try {
      if (!title || !imageUrl) {
        setErrorMessage('Please enter both title and URL.');
        return;
      }

      await addDoc(collection(db, 'Banner'), {
        title,
        url: imageUrl
      });

      setSuccessMessage('Banner uploaded successfully!');
      setTitle('');
      setImageUrl('');
    } catch (error) {
      console.error('Error uploading banner:', error);
      setErrorMessage('Error uploading banner. Please try again.');
    }
  };

  return (
    <div className="admin-container">
      <h1 className='head'>Upload Banner</h1>
      <div className="admin-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <button className='btn-submit' onClick={handleUrlUpload}>Upload Banner</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default BannerUploadPage;
