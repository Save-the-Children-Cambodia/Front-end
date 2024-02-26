import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import "../assets/css/Admin.css"

function AdminPageAudio() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [date, setDate] = useState('');
  const [filename, setFilename] = useState('');
  const [format, setFormat] = useState('');
  const [topic, setTopic] = useState('');
  const [type, setType] = useState('');
  const [user, setUser] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDoc(collection(db, 'Audio'), {
        title,
        description,
        date,
        filename,
        format,
        topic,
        type,
        url,
        user
      });

      setSuccessMessage("Audio added successfully!");
      setTitle('');
      setDescription('');
      setUrl('');
      setDate('');
      setFilename('');
      setFormat('');
      setTopic('');
      setType('');
      setUser('');
    } catch (error) {
      console.error('Error adding audio:', error);
      setErrorMessage('Error adding audio. Please try again.');
    }
  };

  return (
    <div className="admin-container">
      <h1 class='head1'>Add Audio</h1>
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
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>User:</label>
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
        </div>
        <button type="submit" className="btn-submit">Add Audio</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default AdminPageAudio;
