import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginRegistration from './Components/LoginRegistration';
import Home from './Components/Home';
import Cart from './Components/Cart/Cart';
import Admin from './Components/Admin';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './styles.css';

const initialProducts = [
  { id: 1, name: 'Watch', price: 50, image: '/img2/watch.jpg', shop: 'Zudio', category: 'Accessories' },
  { id: 2, name: 'Sunglasses', price: 20, image: '/img2/sunglasses.jpeg', shop: 'Trends', category: 'Accessories' },
  { id: 3, name: 'T-Shirt', price: 15, image: './images/tshirt.jpg', shop: 'Zudio', category: 'Clothing' },
  { id: 4, name: 'Jeans', price: 40, image: './images/jeans.jpg', shop: 'Reliance', category: 'Clothing' },
  { id: 5, name: 'Necklace', price: 30, image: './images/necklace.jpg', shop: 'Trends', category: 'Jewelry' },
  { id: 6, name: 'Bracelet', price: 25, image: './images/bracelet.jpg', shop: 'Zudio', category: 'Jewelry' },
  { id: 7, name: 'Lipstick', price: 10, image: './images/lipstick.jpg', shop: 'Reliance', category: 'Beauty' },
  { id: 8, name: 'Perfume', price: 60, image: './images/perfume.jpg', shop: 'Trends', category: 'Beauty' },
];

function App() {
  const [products, setProducts] = useState(initialProducts); // Centralized products state
  const [cartItems, setCartItems] = useState([]);
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (role === 'customer') {
      setIsLoggedIn(true);
      setCartItems([]);
      return true;
    } else if (role === 'admin') {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginRegistration setRole={setRole} handleLogin={handleLogin} />} />
          <Route
            path="*"
            element={
              <>
                <Header />
                <div style={{ paddingTop: '80px', paddingBottom: '60px' }}>
                  <Routes>
                    <Route
                      path="/home"
                      element={
                        role === 'customer' && isLoggedIn ? (
                          <Home products={products} setCartItems={setCartItems} cartItems={cartItems} />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/admin"
                      element={
                        role === 'admin' && isLoggedIn ? (
                          <Admin products={products} setProducts={setProducts} />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route path="/cart" element={<Cart cartItems={cartItems} />} />
                  </Routes>
                </div>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
