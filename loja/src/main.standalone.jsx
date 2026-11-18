import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource/kalam/latin-400.css';
import '@fontsource/kalam/latin-700.css';
import './styles.css';
import App from './App.jsx';
import { CartProvider } from './cart.jsx';
import { CatalogProvider } from './catalog.jsx';

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <CatalogProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </CatalogProvider>
  </HashRouter>,
);
