import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import "../assets/style/audio.css"
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import "../assets/style/audiov2.css"
import Loading from './loading';
import Empty from "../assets/img/box.svg";

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenWidth;
};

const limitDescription = (description, screenWidth) => {
  if (!description) return '';
  const words = description.split(' ');
  let limit;

  if (screenWidth < 200) {
    limit = 10; // Small screens
  } else if (screenWidth < 358) {
    limit = 20; // Small screens
  } else if (screenWidth < 504) {
    limit = 25; // Small screens
  } else if (screenWidth < 617) {
    limit = 35; // Small screens
  } else if (screenWidth < 703) {
    limit = 45; // Medium screens
  } else if (screenWidth < 823) {
    limit = 55; // Medium screens
  } else if (screenWidth < 910) {
    limit = 65; // Medium screens
  } else if (screenWidth < 1023) {
    limit = 75; // Medium screens
  } else if (screenWidth < 1125) {
    limit = 50; // Small screens
  } else if (screenWidth < 1200) {
    limit = 60; // Medium screens
  }  else if (screenWidth < 1300) {
    limit = 70; // Medium screens
  } else if (screenWidth < 1460) {
    limit = 80; // Large screens
  } else if (screenWidth < 2300) {
    limit = 95; // Extra large screens
  } else {
    limit = 120; // Extra extra large screens or larger
  }

  if (words.length > limit) {
    return words.slice(0, limit).join(' ') + '...';
  }
  return description;
};

function AudioGallery() {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(3);
  const [sortBy, setSortBy] = useState('newest');
  const screenWidth = useScreenWidth();

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
        <label htmlFor="sorts">តម្រៀប តាម:</label>
        <select
          style={{fontSize: "20px", background: "none", marginTop: "-6px", padding: "5px"}}
          name="sorts"
          id="sorts"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">ថ្មីៗ</option>
          <option value="oldest">ចាស់ៗ</option>
        </select>
      </div>
      {loading ? (
        <div className="loading-class">
          <Loading/>
        </div>
      ) : (
        <div className='audio-card-container'>
          {sortedAudios.length === 0 ? (
            <div className="empty-component" style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
              <img src={Empty} style={{height: "256px" }} alt="No videos available" />
              <p style={{textAlign: "center", color: "#ccc"}}>ឯកសារសម្លេងនឹងមានក្នុងពេលឆាប់ៗនេះ</p>
            </div>
          ) : (
            sortedAudios.slice(0, displayCount).map(audio => (
              <div key={audio.id} className="audio-card">
                <img
                  className='audio-image'
                  alt={audio.title}
                  src={audio.imageURL}
                />
                <div className='audio-detail'>
                  <h3 className='audio-title'>{audio.title}</h3>
                  <p className='audio-date'>កាលបរិច្ឆេទ: {formatDate(audio.Date)}</p>
                  <p className="audio-description" dangerouslySetInnerHTML={{ __html: limitDescription(audio.description, screenWidth) }}></p>
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
            ))
          )}
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
