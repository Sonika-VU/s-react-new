import React, { useState, useEffect } from 'react';
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
  IconButton,
  Tooltip,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterListIcon from '@mui/icons-material/FilterList';

const categories = ['Accessories', 'Clothing', 'Jewelry', 'Beauty'];
const shops = ['Zudio', 'Trends', 'Max', 'Reliance'];
const priceRanges = [
  { label: 'Up to $20', value: 20 },
  { label: 'Up to $50', value: 50 },
  { label: 'Up to $100', value: 100 },
];

const products = [
  { id: 1, name: 'Watch', price: 50, image: '/img2/watch.jpg', shop: 'Zudio', category: 'Accessories' },
  { id: 2, name: 'Sunglasses', price: 20, image: '/img2/sunglasses.jpeg', shop: 'Trends', category: 'Accessories' },
  { id: 3, name: 'T-Shirt', price: 15, image: './images/tshirt.jpg', shop: 'Zudio', category: 'Clothing' },
  { id: 4, name: 'Jeans', price: 40, image: './images/jeans.jpg', shop: 'Reliance', category: 'Clothing' },
  { id: 5, name: 'Necklace', price: 30, image: './images/necklace.jpg', shop: 'Trends', category: 'Jewelry' },
  { id: 6, name: 'Bracelet', price: 25, image: './images/bracelet.jpg', shop: 'Zudio', category: 'Jewelry' },
  { id: 7, name: 'Lipstick', price: 10, image: './images/lipstick.jpg', shop: 'Reliance', category: 'Beauty' },
  { id: 8, name: 'Perfume', price: 60, image: './images/perfume.jpg', shop: 'Trends', category: 'Beauty' },
];

const Home = ({ setCartItems, cartItems = [] }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const [selectedShop, setSelectedShop] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUserInfo) {
      setUserData(storedUserInfo);
    }
  }, []);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserButtonClick = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserAnchorEl(null);
  };

  const handleShopCheckboxChange = (shop) => {
    setSelectedShop((prev) =>
      prev.includes(shop) ? prev.filter((s) => s !== shop) : [...prev, shop]
    );
  };

  const handlePriceCheckboxChange = (price) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
    if (!showAll) {
      setSelectedShop([]);
      setSelectedPriceRanges([]);
    }
  };

  const applyFilters = () => {
    setFiltersApplied(true);
    handleClose();
  };

  const filteredProducts = products.filter((product) => {
    if (showAll) return true;

    const shopMatch = selectedShop.length ? selectedShop.includes(product.shop) : true;
    const priceMatch = selectedPriceRanges.length ? selectedPriceRanges.some((price) => product.price <= price) : true;
    const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = selectedCategory.length ? selectedCategory.includes(product.category) : true;

    return shopMatch && priceMatch && nameMatch && categoryMatch;
  });

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <Container>
      {/* Header Section with User and Cart Icons */}
      <Grid container justifyContent="space-between" alignItems="center" style={{ marginTop: '20px' }}>
        <Grid item>
          <Button
            variant="outlined"
            onClick={handleUserButtonClick}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <AccountCircleIcon style={{ marginRight: '5px' }} />
            USER
          </Button>
          <Menu
            anchorEl={userAnchorEl}
            keepMounted
            open={Boolean(userAnchorEl)}
            onClose={handleUserClose}
          >
            <MenuItem>{`Username: ${userData.name}`}</MenuItem>
            <MenuItem>{`Email: ${userData.email}`}</MenuItem>
          </Menu>
        </Grid>

        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={goToCart}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
          >
            <ShoppingCartIcon style={{ marginRight: '5px' }} />
            Cart ({cartItems.length})
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilterClick}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <FilterListIcon style={{ marginRight: '5px' }} />
            Filter
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* Show All Checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={showAll}
                  onChange={toggleShowAll}
                />
              }
              label="Show All"
            />

            {/* Shop Filter Checkboxes */}
            <Typography variant="h6" style={{ padding: '10px' }}>Shops</Typography>
            {shops.map((shop) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedShop.includes(shop)}
                    onChange={() => handleShopCheckboxChange(shop)}
                  />
                }
                label={shop}
                key={shop}
              />
            ))}

            {/* Price Range Checkboxes */}
            <Typography variant="h6" style={{ padding: '10px' }}>Price Ranges</Typography>
            {priceRanges.map((priceRange) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedPriceRanges.includes(priceRange.value)}
                    onChange={() => handlePriceCheckboxChange(priceRange.value)}
                  />
                }
                label={priceRange.label}
                key={priceRange.value}
              />
            ))}

            <MenuItem>
              <Button onClick={applyFilters} variant="contained" color="primary">Apply Filters</Button>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>

      {/* User Info and Search Section Positioned Below Header */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h6" style={{ marginBottom: '10px' }}>
          {`Welcome, ${userData.name}`}
        </Typography>
        <TextField
          label="Search Products"
          variant="outlined"
          style={{ width: '250px', marginBottom: '20px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Available Categories */}
      <Typography variant="h5" align="center" gutterBottom style={{ fontWeight: 'bold', marginBottom: '20px' }}>
        Available Categories
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {categories.map((category) => (
          <Grid item key={category}>
            <Button
              variant="outlined"
              onClick={() => setSelectedCategory(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category])}
            >
              {category}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Product List */}
      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia component="img" height="140" image={product.image} alt={product.name} />
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2">${product.price}</Typography>
                <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
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
