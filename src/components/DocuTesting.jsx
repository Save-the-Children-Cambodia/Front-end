import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore'; // Import necessary Firestore functions
import { db } from '../firebaseConfig';
import '../assets/style/ViewPDFPage.css';
import Loading from './loading';
import Empty from "../assets/img/box.svg";

function ViewPDFPage() {
  const [pdfs, setPdfs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
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
          <label htmlFor="sortOption">តម្រៀប តាម: </label>
          <select id="sortOption" value={sortOption} onChange={handleSortChange}>
            <option value="newest">ថ្មី មក ចាស់</option>
            <option value="oldest">ចាស់ មក ថ្មី</option>
          </select>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="pdf-list">
          {pdfs.length === 0 ? (
            <div className="empty-component">
              <img src={Empty} style={{height: "256px" }} alt="PDF និងមានក្នុងពេលឆាប់ៗនេះ" />
              <p style={{textAlign: "center", color: "#ccc"}}>ឯកសារPDF និងមានក្នុងពេលឆាប់ៗនេះ</p>
            </div>
          ) : (
            pdfs.map((pdf, index) => (
              <div key={index} className="pdf-item pdf-item-more">
                <div>
                  <img src={pdf.imageURL} alt={pdf.title} />
                  <h2 className="pdf-title">{pdf.title}</h2>
                  <p className="pdf-date">កាលបរិច្ឆេទ: {pdf.Date}</p>
                  <p className="pdf-description" dangerouslySetInnerHTML={{ __html: (pdf.description) }}></p>
                </div>
                <div className='nest-pdf-link'>
                  <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="pdf-link">
                    {/* <span>{pdf.filename}</span> */}
                    <p>អាន PDF</p>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ViewPDFPage;
