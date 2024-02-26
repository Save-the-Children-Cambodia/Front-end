import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';

function DocumentGallery() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const documentCollection = collection(db, 'Document');
        const snapshot = await getDocs(documentCollection);
        const documentData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDocuments(documentData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h1>Document Gallery</h1>
      {loading ? (
        <p>Loading Documents...</p>
      ) : (
        <div>
          {documents.map(document => (
            <div key={document.id}>
              <h2>{document.title}</h2>
              <p>{document.description}</p>
              <embed src={document.url} type="application/pdf" width="100%" height="500px" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocumentGallery;
