// Layout.js
import React from 'react';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ marginTop: '100px', marginBottom: '50px' }}> {/* Added space to avoid overlap with Header/Footer */}
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
