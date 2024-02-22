import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app, db } from '../firebase.js';

function Player({ id, category}) {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      const docRef = doc(db, category, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setVideoUrl(data.url);
      } else {
        console.log('No such document!');
      }
    };

    fetchVideoData();
  }, [id]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', height:'500px'}}>
      {videoUrl ? (
        <ReactPlayer url={videoUrl} controls width='50vw' height='auto' />
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

export default Player;
