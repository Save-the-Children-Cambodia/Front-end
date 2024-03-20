import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Assuming you have initialized Firestore
import '../assets/style/ViewPDFPage.css'; // Import CSS file for styling

function ViewPDFPage() {
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'pdfs'));
        const pdfList = [];
        querySnapshot.forEach((doc) => {
          pdfList.push(doc.data());
        });
        setPdfs(pdfList);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="view-pdf-container">
      <h1 className="view-pdf-heading">View PDFs</h1>
      <div className="pdf-list">
        {pdfs.map((pdf, index) => (
          <div key={index} className="pdf-item">
            <h2 className="pdf-title">{pdf.title}</h2>
            <img src={pdf.imageURL} alt={pdf.title} />
           <button className='button-a'>
            <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="pdf-link">{pdf.filename}</a>
           </button>
            <p className="pdf-description">{pdf.description}</p>
            <p className="pdf-date">Date: {pdf.Date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPDFPage;
