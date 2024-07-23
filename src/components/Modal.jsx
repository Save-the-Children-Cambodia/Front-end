import React from 'react';
import"../assets/style/Modal.css"

function Modal({ image, onClose }) {

  const formatDate = (timestamp) => {
    if (timestamp instanceof Date) {
      return timestamp.toDateString();
    } else {
      const dateObject = new Date(timestamp?.seconds * 1000);
      return dateObject.toDateString();
    }
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        {/* <button onClick={onClose}>Close</button> */}
        <div className="modal-content">
          <div className="image-container">
            <img src={image.url} alt={image.title} />
          </div>
          <div className='Hellobro'>
            <div className="image-details">
              <h2 className='image-title'>{image.title}</h2>
              <p className="image-description" dangerouslySetInnerHTML={{__html: (image.description)}}></p>
            </div>
            <div>
              <p className="publication-date">
                  កាលបរិច្ឆេទ: {formatDate(image.Date)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;