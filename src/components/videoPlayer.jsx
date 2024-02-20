import React, { useEffect, useState } from 'react';
import { app, storage } from '../firebase.js';
import { getDownloadURL, ref } from "firebase/storage";

function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      const videoRef = ref(storage, 'videos/How to Handle Violent Behavior  Child Psychology.mp4');
      const url = await getDownloadURL(videoRef);
      setVideoUrl(url);
    };

    fetchVideoUrl();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {videoUrl ? (
        <video controls style={{ maxWidth: '100%', width: '50vw' }}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

export default VideoPlayer;