// Cart.js
import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

const Cart = ({ cartItems }) => {
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
    </Container>
  );
};

export default Cart;
