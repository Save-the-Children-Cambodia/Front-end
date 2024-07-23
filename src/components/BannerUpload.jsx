import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebaseConfig.js';
import "../assets/style/AddingData.css";
import { UserAuth } from '../AuthProvider.js';

function BannerUploadPage() {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const { user, logout } = UserAuth();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const storage = getStorage();

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!title || (!imageUrl && !imageFile)) {
        setErrorMessage('Please enter a title and either a URL or upload a file.');
        return;
      }

      let finalImageUrl = imageUrl;

      if (imageFile) {
        const storageRef = ref(storage, `banners/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'Banner'), {
        title,
        url: finalImageUrl
      });

      setSuccessMessage('Banner uploaded successfully!');
      setTitle('');
      setImageUrl('');
      setImageFile(null);
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
          <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <div className="form-group">
          <label>File:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button className='btn-submit' onClick={handleUpload}>Upload Banner</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default BannerUploadPage;
