import React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ArticleIcon from '@mui/icons-material/Article';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import '../assets/style/Menu.css'

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <div className='big-menu-container'>
      <div className='menu-container'>
          <Box sx={{ width: 400 }}>
          <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
              setValue(newValue);
              }}
          >

              <BottomNavigationAction href = "/video" label="Videos" icon={<OndemandVideoIcon />} />
              <BottomNavigationAction href='#' label="Documents" icon={<ArticleIcon />} />
              <BottomNavigationAction href='#' label="Audios" icon={<AudioFileIcon />} />
              <BottomNavigationAction href='#' label="Images" icon={<BrokenImageIcon />} />

          </BottomNavigation>
          </Box>
      </div>
    </div>
  );
}
