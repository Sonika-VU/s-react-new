// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegistration from './components/LoginRegistration';
import Home from './components/Home'; // Import your Home component
import './styles.css'; // Import your custom styles
import Cart from './components/Cart/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]); // State to track cart items

  return (
    <Router>
      <div className="App">
        <Routes>

          <Route path="/" element={<LoginRegistration />} />
          <Route path="/home" element={<Home setCartItems={setCartItems} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
