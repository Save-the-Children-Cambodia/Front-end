// import React, { useEffect, useState } from 'react';
// import { app, storage } from '../firebase.js';
// import { getDownloadURL, ref } from "firebase/storage";

// function VideoPlayer() {
//   const [videoUrl, setVideoUrl] = useState(null);

//   useEffect(() => {
//     const fetchVideoUrl = async () => {
//       const videoRef = ref(storage, 'videos/How to Handle Violent Behavior  Child Psychology.mp4');
//       const url = await getDownloadURL(videoRef);
//       setVideoUrl(url);
//     };

//     fetchVideoUrl();
//   }, []);

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center' }}>
//       {videoUrl ? (
//         <video controls style={{ maxWidth: '100%', width: '50vw' }}>
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       ) : (
//         <p>Loading video...</p>
//       )}
//     </div>
//   );
// }

// export default VideoPlayer;
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app, db } from '../firebase.js';

function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {

      const docRef = doc(db, 'Videos', '1');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setVideoUrl(data.url);
        setTitle(data.title);
        setDescription(data.description);
      } else {
        console.log('No such document!');
      }
    };

    fetchVideoData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      {videoUrl ? (
        <>
          <ReactPlayer url={videoUrl} controls style={{ maxWidth: '100%', width: '50vw' }} />
          <h2>{title}</h2>
          <p>{description}</p>
        </>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

export default VideoPlayer;
