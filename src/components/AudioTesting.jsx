import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';

function AudioGallery() {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const audiosCollection = collection(db, 'Audio'); // Assuming your collection name is 'Audios'
        const snapshot = await getDocs(audiosCollection);
        const audiosData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAudios(audiosData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching audios:', error);
        setLoading(false);
      }
    };

    fetchAudios();
  }, []);

  return (
    <div>
      <h1>Audio Gallery</h1>
      {loading ? (
        <p>Loading audios...</p>
      ) : (
        <div>
          {audios.map(audio => (
            <div key={audio.id}>
              <h2>{audio.title}</h2>
              <p>{audio.description}</p>
              <audio controls>
                <source src={audio.url} type="audio/mp3" /> {/* Assuming audio URL is in mp3 format */}
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AudioGallery;
