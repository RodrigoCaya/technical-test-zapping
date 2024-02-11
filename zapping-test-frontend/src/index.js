import React from 'react';

// react-router-dom
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router/*, Routes, Route*/ } from "react-router-dom";

// pages
import App from "./App";

// css files
import './index.css';

// context
import { AuthProvider } from './auth/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);