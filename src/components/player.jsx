import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app, db } from '../firebase.js';
import './player.css'; // import the CSS file

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
    <div className="player-container">
      <div className="video-container">
        {videoUrl ? (
          <ReactPlayer 
            url={videoUrl} 
            controls 
            style={{
              position: 'absolute',
              top: 0,
              left: 0
            }}
            width='100%'
            height='100%'
          />
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    </div>
  );
}

export default Player;
