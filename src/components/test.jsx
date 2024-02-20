import React, { useRef, useState } from 'react';
import { app, storage } from '../firebase.js';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

function UploadVideoPage() {
  const fileInput = useRef();
  const [dragging, setDragging] = useState(false);

  const uploadVideo = async (file) => {
    const storageRef = ref(storage, 'videos/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        console.error(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      }
    );
  };

  const onFileChange = (event) => {
    const file = event.target.files[0];
    uploadVideo(file);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => {
    setDragging(false);
  };

  const onDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    uploadVideo(file);
    setDragging(false);
  };

  return (
    <div 
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      style={{border: dragging ? '1px solid blue' : '1px solid transparent'}}
    >
      <h1>Hello, World!</h1>
      <input type="file" accept="video/*" ref={fileInput} onChange={onFileChange} />
      <button onClick={() => uploadVideo(fileInput.current.files[0])}>Upload</button>
    </div>
  );
}

export default UploadVideoPage;
