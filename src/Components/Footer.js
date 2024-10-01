// Footer.js
import React from 'react';
import { Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer style={{ width: '100%', textAlign: 'center', padding: '10px', backgroundColor: '#f1f1f1', position: 'fixed', bottom: 0 }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} ONLINE RETAIL SHOP. All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
