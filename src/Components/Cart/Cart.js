import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const Cart = ({ cartItems }) => { // Removed setCartItems and isLoggedIn
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <Grid container spacing={3}>
        {cartItems.length === 0 ? (
          <Typography variant="h6">Your cart is empty!</Typography>
        ) : (
          cartItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h5">{item.name}</Typography>
                  <Typography variant="body2">${item.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      {cartItems.length > 0 && ( // Only display total if there are items in the cart
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
          Total Price: ${totalPrice.toFixed(2)}
        </Typography>
      )}
    </Container>
  );
};

export default Cart;
