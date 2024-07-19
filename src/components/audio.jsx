import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import "../assets/style/audio.css"
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import "../assets/style/audiov2.css"

function AudioGallery() {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(3);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchAudios = async () => {
      try {
        const audiosCollection = collection(db, 'Audio');
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

  const playAudio = (audio) => {
    if (currentAudio && currentAudio.id === audio.id) {
      setCurrentAudio(null);
    } else {
      setCurrentAudio(audio);
    }
  };

  const limitDescription = (description) => {
    if (!description) return '';
    const words = description.split(' ');
    if (words.length > 75) {
      return words.slice(0, 75).join(' ') + '...';
    }
    return description;
  };

  const isYouTubeLink = (url) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const isSoundCloudLink = (url) => {
    return url.includes('soundcloud.com');
  };

  const extractYouTubeVideoId = (url) => {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
  };

  const formatDate = (timestamp) => {
    if (timestamp instanceof Date) {
      return timestamp.toDateString();
    } else if (timestamp && timestamp.seconds) {
      const dateObject = new Date(timestamp.seconds * 1000);
      return dateObject.toDateString();
    } else {
      return "Invalid Date";
    }
  };

  const filteredAudios = audios.filter(audio =>
    audio.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedAudios = [...filteredAudios].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  const loadMoreAudios = () => {
    setDisplayCount(prevCount => prevCount + 3);
  };

  return (
    <div className='audiov2-container video-players-container'>
      <input
        type="text"
        value={searchQuery}
        className='search-input'
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="ស្វែងរកសារសម្លេងតាមរយះចំណងជើង..."
      />
      <div className="sort-container">
        <label htmlFor="sorts">Sort by:</label>
        <select
          name="sorts"
          id="sorts"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
      </div>
      {loading ? (
        <p>Loading audios...</p>
      ) : (
        <div className='audio-card-container'>
          {sortedAudios.slice(0, displayCount).map(audio => (
            <div key={audio.id} className="audio-card">
              <img
                className='audio-image'
                alt={audio.title}
                src={audio.imageURL}
              />
              <div className='audio-detail'>
                <h3 className='audio-title'>{audio.title}</h3>
                <p className='audio-date'>កាលបរិច្ឆេទ: {formatDate(audio.Date)}</p>
                <p className="audio-description" dangerouslySetInnerHTML={{ __html: limitDescription(audio.description) }}></p>
                <div className="audio-display">
                  <Stack className='play-container' spacing={1} useFlexGap>
                  <div className='audio-card-container'>
                    <IconButton
                      className='play-button'
                      aria-label='Play music'
                      onClick={() => playAudio(audio)}
                      sx={{ mx: 1 }}
                    >
                      <PlayArrowRounded />
                    </IconButton>
                    <audio id={`audio-${audio.id}`} controls>
                      <source src={audio.url} type='audio/mpeg' />
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                </Stack>
                {currentAudio && currentAudio.id === audio.id && (
                  <div>
                    {isYouTubeLink(audio.url) ? (
                      <iframe
                        title="YouTube video player"
                        width="100%"
                        height="100"
                        src={`https://www.youtube.com/embed/${extractYouTubeVideoId(audio.url)}`}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    ) : isSoundCloudLink(audio.url) ? (
                      <iframe
                        title="SoundCloud audio player"
                        width="100%"
                        height="100%"
                        scrolling="no"
                        frameborder="no"
                        allow="autoplay"
                        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(audio.url)}`}
                      ></iframe>
                    ) : (
                      <audio controls autoPlay>
                        <source src={audio.url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </div>
                )}
                </div>
              </div>
              
            </div>
          ))}
        </div>
      )}
      {filteredAudios.length > displayCount && (
        <button className='audio-load-more' onClick={loadMoreAudios}>
          Load More
        </button>
      )}
    </div>
  );
}

export default AudioGallery;
