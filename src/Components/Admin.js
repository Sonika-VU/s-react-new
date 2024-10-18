import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';

const Admin = ({ products, setProducts }) => {
  const [shopName, setShopName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (shopName.trim()) {
      setIsSubmitted(true);
    } else {
      alert('Please enter a valid shop name.');
    }
  };

  const addProduct = () => {
    const newProduct = { id: products.length + 1, name: 'New Product', price: 100, shop: shopName };
    setProducts([...products, newProduct]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <TextField
            label="Shop Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      ) : (
        <div>
          <Typography variant="h5" gutterBottom>
            Products in {shopName}
          </Typography>
          <Button variant="contained" color="secondary" onClick={addProduct}>
            Add New Product
          </Button>
          <Grid container spacing={3} style={{ marginTop: '20px' }}>
            {products.filter(product => product.shop === shopName).map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{product.name}</Typography>
                    <Typography variant="body2">${product.price.toFixed(2)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default Admin;
