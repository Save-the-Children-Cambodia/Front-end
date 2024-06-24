import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import "../assets/style/updatefile.css";

function UpdateFiles() {
  const [files, setFiles] = useState([]);
  const [selectedFileType, setSelectedFileType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const deleteFile = async (fileType, docId) => {
    try {
      await deleteDoc(doc(db, fileType, docId));
      setSuccessMessage('File deleted successfully');
      setFiles(files.filter(file => file.id !== docId)); // Update state after deletion
    } catch (error) {
      console.error(`Error deleting ${fileType} file:`, error);
      setErrorMessage(`Error deleting ${fileType} file. Please try again.`);
    }
  };

  const updateFile = async (fileType, docId, newData) => {
    try {
      await updateDoc(doc(db, fileType, docId), newData);
      setSuccessMessage('File updated successfully');
    } catch (error) {
      console.error(`Error updating ${fileType} file:`, error);
      setErrorMessage(`Error updating ${fileType} file. Please try again.`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, selectedFileType));
        const filesData = [];
        querySnapshot.forEach(doc => {
          filesData.push({ id: doc.id, data: doc.data() });
        });
        setFiles(filesData);
      } catch (error) {
        console.error(`Error fetching ${selectedFileType} files:`, error);
        setErrorMessage(`Error fetching ${selectedFileType} files. Please try again.`);
      }
    };

    if (selectedFileType) {
      fetchData();
    }
  }, [selectedFileType]);

  const handleFileSelect = (event) => {
    const fileType = event.target.value;
    setSelectedFileType(fileType);
    setSelectedFile(null);
    setEditedFields({});
  };

  const handleSave = () => {
    updateFile(selectedFileType, selectedFile.id, { ...selectedFile.data, ...editedFields });
    setEditedFields({});
  };

  const handleFieldChange = (field, value) => {
    setEditedFields(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleDelete = (docId) => {
    deleteFile(selectedFileType, docId);
  };

  return (
    <div className="edit-delete-files-container">
      <h1 className='edit-delete-files-heading'>Edit/Delete Files</h1>
      <div className="select-file">
        <label htmlFor="file-select">Select File Type: </label>
        <select id="file-select" value={selectedFileType} onChange={handleFileSelect} className="select-file-dropdown">
          <option value="">Select a file type</option>
          <option value="Videos">Videos</option>
          <option value="Image">Image</option>
          <option value="Audio">Audio</option>
          <option value="pdfs">PDFs</option> {/* Add PDF option */}
          <option value="Banner">Banner</option>
        </select>
      </div>
      {selectedFileType && (
        <>
          <div className="select-file">
            <label htmlFor="file-select">Select {selectedFileType}: </label>
            <select id="file-select" value={selectedFile ? selectedFile.id : ''} onChange={(e) => setSelectedFile(files.find(file => file.id === e.target.value))} className="select-file-dropdown">
              <option value="">Select a {selectedFileType.toLowerCase()}</option>
              {files.map(file => (
                <option key={file.id} value={file.id}>{file.data.title}</option>
              ))}
            </select>
          </div>
          {selectedFile && (
            <div className="file-details">
              <h2 className="file-details-heading">{selectedFileType} File Details:</h2>
              {Object.entries(selectedFile.data).map(([field, value]) => (
                <div key={field} className="file-field">
                  <label htmlFor={`edit-${field}`} className="edit-label">{field}: </label>
                  <input
                    type="text"
                    id={`edit-${field}`}
                    value={editedFields[field] || value}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    className="edit-input"
                  />
                </div>
              ))}
              <div className="file-actions">
                <button onClick={handleSave} className="save-button">Save</button>
                <button onClick={() => handleDelete(selectedFile.id)} className="delete-button">Delete</button>
              </div>
            </div>
          )}
        </>
      )}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default UpdateFiles;
