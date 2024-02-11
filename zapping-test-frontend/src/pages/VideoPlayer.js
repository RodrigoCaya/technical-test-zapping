import React from 'react';

import { useLocalStorage } from "../auth/useLocalStorage";
import './styles/VideoPlayer.css';

import ReactHlsPlayer from 'react-hls-player';

const VideoPlayer = () => {
  const [token] = useLocalStorage("token", null);

  return (
    <div className="video-wrapper">
      <ReactHlsPlayer
        src={process.env.REACT_APP_VIDEO_URL + '/segment.m3u8'}
        autoPlay={true}
        controls={true}
        muted={true}
        width="50%"
        height="auto"
        hlsConfig={{
          liveDurationInfinity: true,
          startPosition: 0,
          xhrSetup: function(xhr, _) {
            xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            xhr.setRequestHeader('Cache-Control', 'no-cache');
          }
        }}
      />
    </div>
  );
};

export default VideoPlayer;