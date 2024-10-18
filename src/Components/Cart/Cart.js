import React, { useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';

const Cart = ({ cartItems }) => {
  const [showReceipt, setShowReceipt] = useState(false); // State to manage receipt visibility

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  // Handle place order
  const handlePlaceOrder = () => {
    setShowReceipt(true); // Show the receipt when the button is clicked
  };

  return (
    <Container>
      {/* Place Order Button positioned at the top right */}
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </Box>

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

      {showReceipt && (
        <Box
          marginTop={4}
          padding={3}
          border={1}
          borderColor="grey.400"
          borderRadius="4px"
          bgcolor="white"
          boxShadow={3} // Adding shadow for depth
          maxWidth="400px" // Adjusted width for the receipt
          margin="0 auto"  // Center the receipt horizontally
        >
          {/* Receipt Header */}
          <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
            Online Retail Shop, Davangere
          </Typography>
          <Typography variant="h5" gutterBottom align="center" fontWeight="bold">
            Receipt
          </Typography>
          <Grid container spacing={1} marginBottom={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle1"><strong>Product</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle1"><strong>Price</strong></Typography>
            </Grid>
            {cartItems.map((item, index) => (
              <React.Fragment key={index}>
                <Grid item xs={6}>
                  <Typography>{item.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography>${item.price.toFixed(2)}</Typography>
                </Grid>
              </React.Fragment>
            ))}
            <Grid item xs={6}>
              <Typography variant="h6"><strong>Total Amount:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
            </Grid>
          </Grid>
          {/* Thank You Message */}
          <Typography variant="h6" align="center" marginTop={2} fontStyle="italic">
            Thank you for shopping with us!
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Cart;
