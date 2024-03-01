import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import "../assets/css/AddingData.css"
import { UserAuth } from '../AuthProvider.js';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const {user, logout} = UserAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');
  const [filename, setFilename] = useState('');
  const [format, setFormat] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
        await logout()
        navigate('/')
        console.log("User logged out");
    } catch(e){
      console.log(e.message)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let collectionName = '';
      if (type === 'video') {
        collectionName = 'Videos';
      } else if (type === 'image') {
        collectionName = 'Image';
      } else if (type === 'audio') {
        collectionName = 'Audio';
      }

      await addDoc(collection(db, collectionName), {
        title,
        description,
        Date: date,
        filename,
        format,
        topic,
        type,
        url,
      });

      setSuccessMessage("File added successfully!");
      setTitle('');
      setDescription('');
      setUrl('');
      setDate('');
      setFilename('');
      setFormat('');
      setTopic('');
      setType('');
    } catch (error) {
      console.error('Error adding file:', error);
      setErrorMessage('Error adding file. Please try again.');
    }
  };

  return (
    <div className="admin-container">
      <h1 className='head'>Add File</h1>
      <p>User Email: {user && user.email}</p>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
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
        <div className="form-group">
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select type</option>
            <option value="video">Video</option>
            <option value="image">Image</option>
            <option value="audio">Audio</option>
          </select>
        </div>
        <button type="submit" className="btn-submit">Add File</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div>
        <br></br>
        <center><button onClick={handleLogout}>
          Logout
        </button></center>
      </div>
    </div>
    
  );
}

export default AdminPage;
