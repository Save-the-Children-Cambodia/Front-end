import React, { useState } from 'react';
import { Timestamp, collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../firebaseConfig.js';
import "../assets/style/AddingData.css"
import OtherSelection from './otherselection.jsx';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UserAuth } from '../AuthProvider.js';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@jeremyling/react-material-ui-rich-text-editor';

// New code: Import ReactHtmlParser
import ReactHtmlParser from 'react-html-parser'; // <-- New code

function AdminPage() {
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
  const [file, setFile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUrl(''); // Clear URL input when a file is selected
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setFile(null); // Clear file input when a URL is entered
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url && !file) {
      alert("A URL or file is required");
      return;
    }

    try {
      let fileURL = url;

      if (file) {
        // Upload file to Firebase Storage
        const storageRef = ref(storage, `files/${file.name}`);
        await uploadBytes(storageRef, file);
        fileURL = await getDownloadURL(storageRef);
      }

      // Convert date string to Firestore Timestamp
      const timestamp = Timestamp.fromDate(new Date(date));

      // Submit form with the file URL and timestamp
      await submitToFirestore({ url: fileURL, timestamp });

      alert('Upload successful!');
    } catch (error) {
      console.error('Error uploading file and saving URL:', error);
      alert('Error uploading file and saving URL');
    }
  };

  const submitToFirestore = async (fileData) => {
    try {
      let collectionName = '';
      if (type === 'video') {
        collectionName = 'Videos';
      } else if (type === 'image') {
        collectionName = 'Image';
      } else if (type === 'audio') {
        collectionName = 'Audio';
      } else if (type === 'pdfs') {
        collectionName = 'pdfs';
      }

      await addDoc(collection(db, collectionName), {
        title,
        description,
        Date: fileData.timestamp,
        filename,
        format,
        topic,
        type,
        url: fileData.url,
        imageURL,
        tags: selectedTags,
      });

      alert("File added successfully!");
      resetForm();
    } catch (error) {
      console.error('Error adding file:', error);
      alert('Error adding file. Please try again.');
    }
  };

  const resetForm = () => {
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
    setFile(null);
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
      <form onSubmit={handleSubmit} className="admin-form">
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
          <Editor className="textarea" html={description} updateHtml={(html) => setDescription(html)} required />
          {/* New code: Use ReactHtmlParser to parse the HTML string */}
          <div className="textarea">{ReactHtmlParser(description)}</div> {/* <-- New code */}
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            disabled={file !== null}
            required={!file}
          />
          <label>File:</label>
          <input
            type="file"
            onChange={handleFileChange}
            disabled={url !== ''}
            required={!url}
          />
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
    </div>
  );
}

export default AdminPage;
