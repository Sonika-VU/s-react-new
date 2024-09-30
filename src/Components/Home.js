// Home.js
import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// Sample data for products and categories
const categories = ['Accessories', 'Clothing', 'Jewelry', 'Beauty'];
const shops = ['Shop A', 'Shop B', 'Shop C'];
const products = [
  { id: 1, name: 'Watch', price: 50, image: './images/watch.jpg', shop: 'Shop A', category: 'Accessories' },
  { id: 2, name: 'Sunglasses', price: 20, image: './images/sunglasses.jpg', shop: 'Shop B', category: 'Accessories' },
  { id: 3, name: 'T-Shirt', price: 15, image: './images/tshirt.jpg', shop: 'Shop A', category: 'Clothing' },
  { id: 4, name: 'Jeans', price: 40, image: './images/jeans.jpg', shop: 'Shop C', category: 'Clothing' },
  { id: 5, name: 'Necklace', price: 30, image: './images/necklace.jpg', shop: 'Shop B', category: 'Jewelry' },
  { id: 6, name: 'Bracelet', price: 25, image: './images/bracelet.jpg', shop: 'Shop A', category: 'Jewelry' },
  { id: 7, name: 'Lipstick', price: 10, image: './images/lipstick.jpg', shop: 'Shop C', category: 'Beauty' },
  { id: 8, name: 'Perfume', price: 60, image: './images/perfume.jpg', shop: 'Shop B', category: 'Beauty' },
];

const Home = ({ setCartItems }) => {
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedShop, setSelectedShop] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);

  // Filter products based on selected criteria
  const filteredProducts = products.filter(product => {
    const shopMatch = selectedShop ? product.shop === selectedShop : true;
    const priceMatch = priceFilter ? product.price <= priceFilter : true;
    const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory.length ? selectedCategory.includes(product.category) : true;

    return shopMatch && priceMatch && nameMatch && categoryMatch;
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const applyFilters = () => {
    handleClose(); // Close the menu after applying filters
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]); // Add product to cart
  };

  // New function to handle cart button click
  const goToCart = () => {
    // Navigate to Cart page
    navigate('/cart'); // Navigate without passing cart items as state
  };

  return (
    <Container>
      {/* Header */}
      <header style={{ width: '100%', textAlign: 'center', padding: '5px', backgroundColor: '#FFA500', position: 'fixed', top: 0, zIndex: 1000 }}>
        <Typography variant="h4" gutterBottom style={{ color: 'white', fontSize: '24px' }}>
          ONLINE RETAIL SHOP
        </Typography>
      </header>

      {/* Cart Button */}
      <div style={{ position: 'fixed', top: '70px', right: '20px', zIndex: 1000 }}>
        <Button variant="contained" color="secondary" onClick={goToCart}>
          Cart {/* No count here, since cartItems is not defined in this component */}
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div style={{ textAlign: 'center', marginTop: '80px', marginBottom: '20px', padding: '20px', backgroundColor: '#f8f8f8' }}>
        <TextField 
          label="Search Products" 
          variant="outlined" 
          style={{ marginRight: '10px', width: '250px' }} 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />
        <Button variant="contained" color="primary" onClick={handleClick}>
          Filter
        </Button>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <div style={{ padding: '10px' }}>
            <FormControl variant="outlined" style={{ marginBottom: '10px', minWidth: '120px' }}>
              <InputLabel id="shop-label">Shop</InputLabel>
              <Select 
                labelId="shop-label" 
                value={selectedShop} 
                onChange={(e) => setSelectedShop(e.target.value)}
              >
                <MenuItem value=""><em>All Shops</em></MenuItem>
                {shops.map((shop, index) => (
                  <MenuItem key={index} value={shop}>{shop}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ marginBottom: '10px', minWidth: '120px' }}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select 
                labelId="category-label" 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value=""><em>All Categories</em></MenuItem>
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" style={{ minWidth: '120px' }}>
              <InputLabel id="price-label">Max Price</InputLabel>
              <Select 
                labelId="price-label" 
                value={priceFilter} 
                onChange={(e) => setPriceFilter(e.target.value)}
              >
                <MenuItem value=""><em>All Prices</em></MenuItem>
                <MenuItem value={20}>$20</MenuItem>
                <MenuItem value={40}>$40</MenuItem>
                <MenuItem value={60}>$60</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={applyFilters} style={{ marginTop: '10px' }}>
              Apply Filters
            </Button>
          </div>
        </Menu>
      </div>

      {/* Available Categories */}
      <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Available Categories
      </Typography>

      <Grid container spacing={3} justifyContent="center" style={{ marginBottom: '40px' }}>
        {categories.map((category, index) => (
          <Grid item key={index}>
            <Button 
              variant="contained" 
              style={{ backgroundColor: '#FFA500', color: 'white', margin: '5px' }}
              onClick={() => setSelectedCategory([category])}
            >
              {category}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Product Cards */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                height="140"
                image={product.image}
              />
              <CardContent>
                <Typography variant="h5" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ${product.price}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => addToCart(product)} // Add product to cart on click
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
