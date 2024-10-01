import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegistration from './Components/LoginRegistration';
import Home from './Components/Home'; 
import Cart from './Components/Cart/Cart';
import Layout from './Components/Layout'; 
import './styles.css'; 

function App() {
  const [cartItems, setCartItems] = useState([]); // State to track cart items
  const [role, setRole] = useState(''); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = () => {
    if (role === 'customer') {
      setIsLoggedIn(true); 
      setCartItems([]); // Clear the cart on login
      return true; 
    }
    return false; 
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<LoginRegistration setRole={setRole} handleLogin={handleLogin} />} 
          />
          <Route 
            path="/home" 
            element={
              role === 'customer' && isLoggedIn ? (
                <Layout>
                  <Home setCartItems={setCartItems} cartItems={cartItems} />
                </Layout>
              ) : (
                <p>Unauthorized Access</p>
              )
            } 
          />
          <Route 
            path="/cart" 
            element={
              <Layout>
                <Cart cartItems={cartItems} />
              </Layout>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
