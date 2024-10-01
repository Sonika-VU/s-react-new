// Header.js
import React from 'react';
import { Typography } from '@mui/material';

const Header = () => {
  return (
    <header style={{ width: '100%', textAlign: 'center', padding: '5px', backgroundColor: '#FFA500', position: 'fixed', top: 0, zIndex: 1000 }}>
      <Typography variant="h4" gutterBottom style={{ color: 'white', fontSize: '24px' }}>
        ONLINE RETAIL SHOP
      </Typography>
    </header>
  );
};

export default Header;
