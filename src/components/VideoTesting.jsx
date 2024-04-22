import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import { useNavigate } from 'react-router-dom';
import "../assets/style/player.css";

function VideoPlayers() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [displayCount, setDisplayCount] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosCollection = collection(db, 'Videos');
        let q;

        if (searchQuery) {
          const searchQueryLower = searchQuery.toLowerCase();
          q = query(videosCollection, orderBy('title'),
                    where('topicLower', '>=', searchQueryLower),
                    where('topicLower', '<=', searchQueryLower + '\uf8ff'));
        } else {
          q = query(videosCollection, orderBy('Date', sortOption === 'newest' ? 'desc' : 'asc'));
        }

        const snapshot = await getDocs(q); // Get all documents in the collection

        const videosData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setVideos(videosData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [searchQuery, sortOption]);

  const limitDescription = (description) => {
    if (!description) return '';
    const words = description.split(' ');
    if (words.length > 70) {
      return words.slice(0, 70).join(' ') + '...';
    }
    return description;
  };

  const formatDate = (timestamp) => {
    if (timestamp instanceof Date) {
      return timestamp.toDateString();
    } else {
      const dateObject = new Date(timestamp.seconds * 1000);
      return dateObject.toDateString();
    }
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleLoadMore = () => {
    setDisplayCount(prevCount => prevCount + 4);
  };

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedVideos = filteredVideos.sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.Date) - new Date(a.Date);
    } else {
      return new Date(a.Date) - new Date(b.Date);
    }
  });

  return (
    <div className="video-players-container">
      <div className="filter-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="Search video titles..."
          className="search-input"
        />
        <div className='sort-select'>
          <label htmlFor="sortOption">Sort by:</label>
          <select id="sortOption" value={sortOption} onChange={handleSortChange}>
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
          </select>
        </div>
      </div>
      {loading ? (
        <p className="loading-text">Loading videos...</p>
      ) : (
        <div className="video-container">
          {sortedVideos.slice(0, displayCount).map(video => (
            <div className="video-item" key={video.id}>
              <div className="video-player-wrapper">
                <ReactPlayer
                  className="react-player"
                  url={video.url}
                  controls
                  width="120%"
                />
              </div>
              
              <div className="video-details-container">
                <h2 className="video-title">{video.title}</h2>
                <p className="upload-date">Uploaded on: {formatDate(video.Date)}</p>
                <h3 className="description-heading">Description:</h3>
                <p className="description">{limitDescription(video.description)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="more-back">
        {sortedVideos.length > displayCount && (
          <div className='button-container'>
            <button onClick={handleLoadMore} className="moreButton">More</button>
          </div>
        )}
        <div className='button-container'>
          <button onClick={() => navigate('/')} className="backButton"> Back </button>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayers;
