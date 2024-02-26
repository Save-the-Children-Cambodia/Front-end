import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js'; // Assuming you have initialized and exported your Firestore instance
 // Importing the CSS file

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

// Function to limit the description to 50 words
const limitDescription = (description) => {
  if (!description) return ''; // Check if description is undefined or null
  const words = description.split(' ');
  if (words.length > 50) {
    return words.slice(0, 50).join(' ') + '...';
  }
  return description;
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
              <p className="video-description">{limitDescription(video.description)}</p>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoPlayers;
