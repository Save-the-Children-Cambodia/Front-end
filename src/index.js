import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-DGJ6N690N9');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function TrackPageViews() {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, []);

  return null; // This component doesn't render anything
}

ReactDOM.render(<TrackPageViews />, document.getElementById('root'));

reportWebVitals();
