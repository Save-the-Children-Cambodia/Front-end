import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import LoopRoundedIcon from '@mui/icons-material/LoopRounded';

function AudioGallery() {
  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState(null);

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

  return (
    <div>
      <h1>Audio Gallery</h1>
      {loading ? (
        <p>Loading audios...</p>
      ) : (
        <div>
          {audios.map(audio => (
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
                  <IconButton aria-label="Shuffle" disabled size="small">
                    <ShuffleRoundedIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="Fast rewind" disabled size="small">
                    <FastRewindRounded fontSize="small" />
                  </IconButton>
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
                  <IconButton aria-label="Fast forward" disabled size="small">
                    <FastForwardRounded fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="Loop music" disabled size="small">
                    <LoopRoundedIcon fontSize="small" />
                  </IconButton>
                </Stack>
                {currentAudio && currentAudio.id === audio.id && (
                  <audio controls autoPlay>
                    <source src={audio.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                )}
              </Stack>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default AudioGallery;
