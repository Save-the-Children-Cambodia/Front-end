import React, { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app, db } from '../firebase.js';

function VideoData({ id , category}) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      const docRef = doc(db, category, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setTitle(data.title);
        setDescription(data.description);
      } else {
        console.log('No such document!');
      }
    };

    fetchVideoData();
  }, [id]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      {title && <h2>{title}</h2>}
      {description && <p>{description}</p>}
    </div>
  );
}

export default VideoData;
