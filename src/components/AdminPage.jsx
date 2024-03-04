import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import "../assets/css/AddingData.css"
import { UserAuth } from '../AuthProvider.js';
import { useNavigate } from 'react-router-dom';

function AdminPage() {

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
  const {user, logout} = UserAuth();
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    url: '',
    date: '',
    filename: '',
    format: '',
    topic: '',
    type: '',
  });
  const navigate = useNavigate()
  const [selectedDataset, setSelectedDataset] = useState('Videos');
  const [modalIsOpen, setModalIsOpen] = useState(false);







  useEffect(() => {
    const fetchItems = async () => {
      const itemCollection = collection(db, selectedDataset);
      const itemSnapshot = await getDocs(itemCollection);
      const itemList = itemSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setItems(itemList);
    };

    fetchItems();
  }, [selectedDataset]);

  const handleLogout = async () => {
    try {
        await logout()
        navigate('/')
        console.log("User logged out");
    } catch(e){
      console.log(e.message)
    }
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, selectedDataset, id));
    setItems(items.filter(item => item.id !== id));
  };


  const handleEdit = (id) => {
    const item = items.find(item => item.id === id);
    setEditingId(id);
    setTitle(item.title);
    setDescription(item.description);
    setUrl(item.url);
    setDate(item.Date);
    setFilename(item.filename);
    setFormat(item.format);
    setTopic(item.topic);
    setType(item.type);
    setModalIsOpen(true);
  };
  


  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await updateDoc(doc(db, selectedDataset, editingId), {
        title,
        description,
        Date: date,
        filename,
        format,
        topic,
        type,
        url,
      });
  
      setSuccessMessage("File updated successfully!");
      setModalIsOpen(false);
    } catch (error) {
      console.error('Error updating file:', error);
      setErrorMessage('Error updating file. Please try again.');
    }
  };

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

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setUrl('');
    setDate('');
    setFilename('');
    setFormat('');
    setTopic('');
    setType('');
    setEditingId(null);
  };
  const handleChange = (event) => {
    setEditForm({ ...editForm, [event.target.name]: event.target.value });
  };

  return (
    <div className="admin-container">
      
      <h1 className='head'>{editingId ? 'Edit File' : 'Add File'}</h1>
      <p>User Email: {user && user.email}</p>
      <form onSubmit={editingId ? handleUpdate : handleSubmit} className="admin-form">
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
        <button type="submit" className="btn-submit">{editingId ? 'Update File' : 'Add File'}</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div>
      <div>
        <label>Select Dataset:</label>
        <select value={selectedDataset} onChange={(e) => setSelectedDataset(e.target.value)}>
  <option value="Videos">Videos</option>
  <option value="Audio">Audio</option>
  <option value="Image">Image</option>
  <option value="Document">Document</option>
</select>
      </div>
        <h2>{selectedDataset}</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>URL</th>
              <th>Date</th>
              <th>Filename</th>
              <th>Format</th>
              <th>Topic</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((items, index) => (
              <tr key={index}>
                {editingId === items.id ? (
                  <>
                    <td><input name="title" value={editForm.title} onChange={handleChange} /></td>
                    <td><input name="description" value={editForm.description} onChange={handleChange} /></td>
                    <td><input name="url" value={editForm.url} onChange={handleChange} /></td>
                    <td><input name="date" value={editForm.date} onChange={handleChange} /></td>
                    <td><input name="filename" value={editForm.filename} onChange={handleChange} /></td>
                    <td><input name="format" value={editForm.format} onChange={handleChange} /></td>
                    <td><input name="topic" value={editForm.topic} onChange={handleChange} /></td>
                    <td><input name="type" value={editForm.type} onChange={handleChange} /></td>
                    <td>
                      <button onClick={handleUpdate}>Confirm</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{items.title}</td>
                    <td>{items.description}</td>
                    <td>{items.url}</td>
                    <td>{items.date ? new Date(items.date.seconds * 1000).toLocaleDateString() : 'N/A'}</td>
                    <td>{items.filename}</td>
                    <td>{items.format}</td>
                    <td>{items.topic}</td>
                    <td>{items.type}</td>
                    <td>
                      <button onClick={() => handleEdit(items.id)}>Edit</button>
                      <button onClick={() => handleDelete(items.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
