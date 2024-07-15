import React from 'react';
import"../assets/style/Modal.css"


function Modal({ image, onClose }) {
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
                <p className="image-description">{image.description}</p>
              </div>
              <div>
                <p className="publication-date">
                    Published on: {new Date(image.Date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Modal;