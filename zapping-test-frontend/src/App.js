import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import Video from './pages/Video';
import NoPage from './pages/NoPage';
import { ProtectedRoute } from './auth/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/account" element={<CreateAccount />} />
      <Route
          path="/video"
          element={
            <ProtectedRoute>
              <Video />
            </ProtectedRoute>
          }
        />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

export default App;