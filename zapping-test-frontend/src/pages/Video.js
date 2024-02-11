import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import './styles/VideoPlayer.css';

import VideoPlayer from './VideoPlayer.js';
import VideoMenu from './VideoMenu.js';

const Video = () => {
  return (
    <HelmetProvider>
      <div className="VideoPlayer">
        <Helmet>
          <title>Video Player</title>
        </Helmet>
        <VideoMenu />
        <div className="video-info">
          <h2>Conejo Zapping</h2>
        </div>
        <VideoPlayer />
      </div>
    </HelmetProvider>
  );
};

export default Video;