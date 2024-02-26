import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesCollection = collection(db, 'Image');
        const snapshot = await getDocs(imagesCollection);
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
  }, []);

  return (
    <div>
      <h1>Image Gallery</h1>
      {loading ? (
        <p>Loading images...</p>
      ) : (
        <div>
          {images.map(image => (
            <div key={image.id}>
              <h2>{image.title}</h2>
              <p>{image.description}</p>
              <img src={image.url} alt={image.title} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
