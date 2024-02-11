import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useLocalStorage } from "../auth/useLocalStorage";
import './styles/VideoPlayer.css';

import Button from '@mui/material/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const VideoMenu = () => {
  const { authLogout } = useAuth();
  const [user] = useLocalStorage("user", null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authLogout();
    setAnchorEl(null);
  };

  return (
    <div className="VideoMenu">
      <div className="position-absolute top-0 end-0 m-3 d-flex flex-column">
        <Button
          edge="end"
          aria-label="account of current user"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          <AccountCircleIcon fontSize="large"/>
        </Button>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem style={{cursor: 'default'}}>{user}</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default VideoMenu;