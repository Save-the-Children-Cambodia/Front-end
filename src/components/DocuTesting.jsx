import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from '../firebaseConfig';
import '../assets/style/ViewPDFPage.css';

function ViewPDFPage() {
  const [pdfs, setPdfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let q = collection(db, 'pdfs');

        if (searchQuery) {
          const searchQueryLower = searchQuery.toLowerCase();
          q = query(q, orderBy('title'), 
                      where('titleLower', '>=', searchQueryLower),
                      where('titleLower', '<=', searchQueryLower + '\uf8ff'));
        } else {
          q = query(q, orderBy('Date', sortOption === 'newest' ? 'desc' : 'asc'));
        }

        const querySnapshot = await getDocs(q);
        const pdfList = querySnapshot.docs.map(doc => doc.data());
        setPdfs(pdfList);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    };

    fetchData();
  }, [searchQuery, sortOption]);

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = event => {
    setSortOption(event.target.value);
  };

  return (
    <div className="view-pdf-container video-players-container">
      <div className="input-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
          placeholder="ស្វែងរកឯកសារតាមរយះចំណងជើង..."
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
      <div className="pdf-list">
        {pdfs.map((pdf, index) => (
          <div key={index} className="pdf-item pdf-item-more">
            <div>
              <img src={pdf.imageURL} alt={pdf.title} />
              <h2 className="pdf-title">{pdf.title}</h2>
              <p className="pdf-date">កាលបរិច្ឆេទ: {pdf.Date}</p>
              <p className="pdf-description">{pdf.description}</p>
            </div>
            <div className='nest-pdf-link'>
                <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="pdf-link">
                  {/* <span>{pdf.filename}</span> */}
                  <p>View PDF</p>
                </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPDFPage;