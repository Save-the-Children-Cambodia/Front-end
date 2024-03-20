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
  const [displayCount, setDisplayCount] = useState(4);
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
    setDisplayCount(prevCount => prevCount + 4);
  };

  return (
    <div>
      <h1>Audio Gallery</h1>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title..."
        />
        <Button onClick={() => setSortBy('newest')}>Sort by Newest</Button>
        <Button onClick={() => setSortBy('oldest')}>Sort by Oldest</Button>
      </div>
      {loading ? (
        <p>Loading audios...</p>
      ) : (
        <div>
          {sortedAudios.slice(0, displayCount).map(audio => (
            <Card
              key={audio.id}
              variant="outlined"
              sx={{
                p: 2,
                width: { xs: '100%', sm: 'auto' },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                gap: 2,
              }}
            >
              <CardMedia
                component="img"
                width="100"
                height="100"
                alt={audio.title}
                src={audio.imageURL}
                sx={{
                  width: { xs: '100%', sm: 100 },
                }}
              />
              <Stack direction="column" alignItems="center" spacing={1} useFlexGap>
                <div>
                  <Typography color="text.primary" fontWeight="semiBold">
                    {audio.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight="medium"
                    textAlign="center"
                    sx={{ width: '100%' }}
                  >
                    {audio.description}
                  </Typography>
                </div>
                <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
                  <IconButton
                    aria-label={currentAudio && currentAudio.id === audio.id ? 'Pause music' : 'Play music'}
                    onClick={() => playAudio(audio)}
                    sx={{ mx: 1 }}
                  >
                    {currentAudio && currentAudio.id === audio.id ? (
                      <PauseRounded />
                    ) : (
                      <PlayArrowRounded />
                    )}
                  </IconButton>
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
                        height="166"
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
              </Stack>
            </Card>
          ))}
          {filteredAudios.length > displayCount && (
            <Button onClick={loadMoreAudios}>Load More</Button>
          )}
        </div>
      )}
    </div>
  );
}

export default AudioGallery;
