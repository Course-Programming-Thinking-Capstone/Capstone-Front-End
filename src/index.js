import React from 'react';
import ReactDOM from 'react-dom/client';
import i18n from './markup/Element/Bilingual';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
