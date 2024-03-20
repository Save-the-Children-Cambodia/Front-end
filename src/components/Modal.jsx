import React from 'react';
import"../assets/style/Modal.css"


function Modal({ image, onClose }) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button onClick={onClose}>Close</button>
          <div className="modal-content">
            <div className="image-container">
              <img src={image.url} alt={image.title} />
            </div>
            <div className="image-details">
              <h2>{image.title}</h2>
              <p>{image.description}</p>
              <p className="publication-date">
                Published on: {new Date(image.publishDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Modal;