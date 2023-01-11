import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import DataProvider from './core/Context/DataContext';
import ModalProvider from './core/Context/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ModalProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </ModalProvider>
  </BrowserRouter>
);

