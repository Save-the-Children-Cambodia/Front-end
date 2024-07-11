import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';
import Button from '@mui/material/Button';
import "../assets/style/audio.css"

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
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
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
    if (!timestamp) return ''; // Handle undefined timestamp
    if (timestamp instanceof Date) {
      return timestamp.toDateString();
    } else {
      const dateObject = new Date(timestamp.seconds * 1000);
      return dateObject.toDateString();
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

  // Function to load more audios
  const loadMoreAudios = () => {
    setDisplayCount(prevCount => prevCount + 3);
  };
  const AudioComponent = ({ audio, currentAudio, setCurrentAudio, playAudio }) => {
    useEffect(() => {
      if (currentAudio && currentAudio.id === audio.id) {
        const audioElement = document.getElementById(`audio-${audio.id}`);
        if (audioElement) {
          audioElement.play();
        }
      }
    }, [currentAudio, audio]);
  }  

  return (
    <div className='audio-container video-players-container'>
      <input
          type="text"
          value={searchQuery}
          className='search-input'
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ស្វែងរកសារសម្លេងតាមរយះចំណងជើង..."
      />
      <div className="sort-container">
        <label htmlFor="sorts">Sort by:</label>
        <select name="sorts" id="sorts">
          <option value="newest" onClick={() => setSortBy('newest')}>Newest to Oldest</option>
          <option value="oldest" onClick={() => setSortBy('oldest')}>Oldest to Newest</option>
        </select>
      </div>
      
      
      {loading ? (
        <p>Loading audios...</p>
      ) : (
        <div className='audio-card-container'>
          {sortedAudios.slice(0, displayCount).map(audio => (
            <Card key={audio.id} variant="outlined"
                sx={{
                p: 2,
                width: { xs: '100%', sm: 'auto' },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <div className="make-ctimg">
                <CardMedia
                className='audio-image'
                component="img"
                width="100"
                height="100"
                alt={audio.title}
                src={audio.imageURL}
                sx={{
                  width: { xs: '100%', sm: 100 },
                }}
              />
              </div>
              
              <Stack direction="column" alignItems="center" spacing={1} useFlexGap style={{paddingLeft: "10px"}}>
                <div className='audio-detail'>
                  <h3 className='audio-title'>{audio.title}</h3>
                  <p className='audio-description'>{formatDate(audio.date)}</p>
                  <p className="audio-description">{limitDescription(audio.description)}</p>
                </div>
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
                
              </Stack>
            </Card>
          ))}
        </div>
      )}
      {filteredAudios.length > displayCount && (
            <Button className='audio-load-more' onClick={loadMoreAudios}><span className='audio-load-more'>Load More</span></Button>
      )}
    </div>
  );
}

export default AudioGallery;