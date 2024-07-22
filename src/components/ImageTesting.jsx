import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';
import '../assets/style/ImageGallery.css';
import Modal from './Modal';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayedImages, setDisplayedImages] = useState(8);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesCollection = collection(db, 'Image');
        let queryRef = imagesCollection;

        if (searchQuery) {
          queryRef = query(imagesCollection, where('title', '>=', searchQuery), where('title', '<=', searchQuery + '\uf8ff'));
        }

        const snapshot = await getDocs(queryRef);
        const imagesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setImages(imagesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery]);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth < 524) {
      setDisplayedImages(3); // For small screens
    } else if (screenWidth <= 1174) {
      setDisplayedImages(4); // For medium screens
    } else if (screenWidth <= 1574) {
      setDisplayedImages(6); // For large screens
    } else if (screenWidth <= 2287) {
      setDisplayedImages(8); // For extra large screens
    } else if (screenWidth >= 2288) {
      setDisplayedImages(10); // For extra extra large screens
    }
  }, [screenWidth]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleShowMoreImages = () => {
    const incrementBy = screenWidth < 524 ? 3 : screenWidth <= 1174 ? 4 : screenWidth <= 1574 ? 6 : screenWidth <= 2287 ? 8 : 10;
    setDisplayedImages(prev => prev + incrementBy);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredImages = images.filter(image =>
    image.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedImages = [...filteredImages].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  return (
    <div className="image-gallery-container video-players-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="ស្វែងរករូបភាពតាមរយះចំណងជើង..."
          value={searchQuery}
          onChange={handleSearchChange}
          className='search-input'
        />
        <div>
          <label htmlFor="sorts">Sort by:</label>
          <select name="sorts" id="sorts" onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
          </select>
        </div>
      </div>
      <div className="image-grid">
        {loading ? (
          <p>Loading images...</p>
        ) : (
          sortedImages.slice(0, displayedImages).map(image => (
            <div className='okkbrook' key={image.id}>
              <div className="image" onClick={() => handleImageClick(image)}>
                <h2>{image.title}</h2>
                <img src={image.url} alt={image.title} />
              </div>
            </div>
          ))
        )}
      </div>
      {images.length > displayedImages && (
        <center>
          <button onClick={handleShowMoreImages} className='more-button'>LOAD MORE</button>
        </center>
      )}
      {selectedImage && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default ImageGallery;
