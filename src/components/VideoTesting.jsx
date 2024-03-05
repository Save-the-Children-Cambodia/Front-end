import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js'; 
import "../assets/css/player.css";

function VideoPlayers() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosCollection = collection(db, 'Videos'); // Reference to the 'Videos' collection
        const snapshot = await getDocs(videosCollection); // Get all documents in the collection

        const videosData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setVideos(videosData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false); // Make sure to set loading to false even in case of an error
      }
    };

    fetchVideos();
  }, []);

  const limitDescription = (description) => {
    if (!description) return ''; 
    const words = description.split(' ');
    if (words.length > 50) {
      return words.slice(0, 50).join(' ') + '...';
    }
    return description;
  };

  const formatDate = (timestamp) => {
    if (timestamp instanceof Date) {
      // If timestamp is already a Date object, return it
      return timestamp.toDateString(); // Example format: "Sat Jan 01 2022"
    } else {
      // If timestamp is not a Date object, assume it's a Firestore Timestamp
      const dateObject = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
      return dateObject.toDateString(); // Example format: "Sat Jan 01 2022"
    }
  };

  return (
    <div>
      <h1 className='c'>Videos</h1>
      {loading ? (
        <p className="loading-text">Loading videos...</p>
      ) : (
        <div className="video-container">
          {videos.map(video => (
            <div className="video-item" key={video.id}>
              <h2 className="video-title">{video.title}</h2>
              <ReactPlayer className="react-player" url={video.url} controls />
              <div style={{ height: '100%', flexDirection: 'column', margin:"0vw 10vw"}}>
                <hr style={{width:'100%', margin:'3vh auto'}}/>
                <p style={{fontSize:'16px', fontWeight:'bold'}}>Uploaded on: {formatDate(video.Date)}</p>
                <h3 style={{fontSize:'16px'}}>Description:</h3>
                <p style={{fontSize:'16px'}}>{limitDescription(video.description)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoPlayers;
