import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, } from 'firebase/firestore';
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

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleShowMoreImages = () => {
    setDisplayedImages(prev => prev + 8);
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
          <select name="sorts" id="sorts">
            <option value="newest" onClick={() => setSortBy('newest')}>Newest to Oldest</option>
            <option value="oldest" onClick={() => setSortBy('oldest')}>Oldest to Newest</option>
          </select>
        </div>
      </div>
      <div className="image-grid">
        {loading ? (
          <p>Loading images...</p>
        ) : (
          images.slice(0, displayedImages).map(image => (
            <div className='okkbrook'>
              <div className="image" key={image.id} onClick={() => handleImageClick(image)}>
                <h2>{image.title}</h2>
                <img src={image.url} alt={image.title} />
              </div>
            </div>
          ))
        )}
      </div>
      {images.length > displayedImages && (
        <center> <button onClick={handleShowMoreImages} className='more-button'>LOAD MORE</button> </center>
      )}{selectedImage && (
        <Modal image={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default ImageGallery;
