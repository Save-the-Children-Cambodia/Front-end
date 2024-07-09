import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import "../assets/style/AddingData.css"
import OtherSelection from './otherselection.jsx';
import { UserAuth } from '../AuthProvider.js';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@jeremyling/react-material-ui-rich-text-editor';

function AdminPage() {
  const [urlUpload, setUrlUpload] = useState('');
  const { user, logout } = UserAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [imageURL, setUrlImage] = useState('');
  const [date, setDate] = useState('');
  const [filename, setFilename] = useState('');
  const [format, setFormat] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log("User logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const uploadFile = async () => {
    try {
      if (!urlUpload) return;

      handleSubmit({ url: urlUpload });

      setUrlUpload('');

      setSuccessMessage('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Error uploading file. Please try again.');
    }
  };

  const handleSubmit = async (fileData) => {
    try {
      let collectionName = '';
      if (type === 'video') {
        collectionName = 'Videos';
      } else if (type === 'image') {
        collectionName = 'Image';
      } else if (type === 'audio') {
        collectionName = 'Audio';
      } else if (type === 'file') {
        collectionName = 'pdfs';
      }

      await addDoc(collection(db, collectionName), {
        title,
        description,
        Date: date,
        filename,
        format,
        topic,
        type,
        url: fileData.url,
        imageURL,
        tags: selectedTags, // Store selected tags
      });

      setSuccessMessage("File added successfully!");
      setTitle('');
      setDescription('<p></p>');
      setUrl('');
      setUrlImage('');
      setDate('');
      setFilename('');
      setFormat('');
      setTopic('');
      setType('');
      setSelectedTags([]);
    } catch (error) {
      console.error('Error adding file:', error);
      setErrorMessage('Error adding file. Please try again.');
    }
  };

  return (
    <div className="admin-container">
      <h1 className='head'>Add File</h1>
      <div className="user-container">
          <p>User Email: {user && user.email}</p>
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      
      
      <form onSubmit={(e) => { e.preventDefault(); uploadFile(); }} className="admin-form">
        <div className="form-group">
          <label>Type:</label>
          <select className='selection' value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select type</option>
            <option value="video">Video</option>
            <option value="image">Image</option>
            <option value="audio">Audio</option>
            <option value="pdfs">Document</option>
          </select>
        </div>
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Tags:</label>
          <OtherSelection onTagsChange={setSelectedTags} />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <Editor className="textarea" html={description} updateHtml={(html)=>setDescription(html)} required />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input type="url" value={urlUpload} onChange={(e) => setUrlUpload(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>UrlImage:</label>
          <input type="text" value={imageURL} onChange={(e) => setUrlImage(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Filename:</label>
          <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Format:</label>
          <input type="text" value={format} onChange={(e) => setFormat(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Topic:</label>
          <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required />
        </div>
        <button type="submit" className="btn-submit">Add File</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default AdminPage;