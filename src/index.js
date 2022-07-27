import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// project import
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';


// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);
