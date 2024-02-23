import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app, db } from '../firebase.js';

function VideoData({ id , category}) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [upload, setUpload] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      const docRef = doc(db, category, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setDescription(data.description);

        // Convert Firebase Timestamp to JavaScript Date object
        const uploadDate = data.Date.toDate();

        // Format the date to a string and remove the time
        const formattedDate = uploadDate.toLocaleDateString();

        setUpload(formattedDate);
      } else {
        console.log('No such document!');
      }
    };

    fetchVideoData();
  }, [id]);

  return (
    <div style={{ height: '100%', flexDirection: 'column', margin:"0vw 10vw"}}>
      {title && <h2 style={{fontSize:'32px'}}>{title}</h2>}
      <hr style={{width:'100%', margin:'3vh auto'}}/>
      {upload && <p style={{fontSize:'16px', fontWeight:'bold'}}>Uploaded on: {upload}</p>}
      <h3 style={{fontSize:'16px'}}>Description:</h3>
      {description && <p style={{fontSize:'16px'}}>{description}</p>}
    </div>
  );
}

export default VideoData;
