import React from 'react';
import './styles/NoPage.css';
import { Helmet, HelmetProvider } from "react-helmet-async";

const NoPage = () => {
  return (
    <HelmetProvider>
      <div className="no-page">
        <Helmet>
          <title>404</title>
        </Helmet>
        <div className="no-page-content">
          <h1>404</h1>
          <h2>Página no encontrada :(</h2>
          <p>Lo sentimos, pero la página que buscas no existe.</p>
          <a href="/">Volver al inicio</a>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default NoPage;