import React, { useState } from 'react';
import { Button, TextField, Container, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../styles.css'; // Import your custom CSS file

function LoginRegistration() {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and registration forms
  const [role, setRole] = useState(''); // State to store selected role
  const navigate = useNavigate(); // Initialize the navigate function

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value); // Set selected role
  };

  const handleLogin = () => {
    // Simulate successful login
    // Add actual login logic here
    navigate('/home'); // Navigate to home page after login
  };

  return (
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      {/* Header */}
      <header style={{ width: '100%', textAlign: 'center', padding: '5px', backgroundColor: '#FFA500', position: 'fixed', top: 0, zIndex: 1000 }}>
        <Typography variant="h4" gutterBottom style={{ color: 'white', fontSize: '24px' }}>
          ONLINE RETAIL SHOP
        </Typography>
      </header>

      {/* Container for login/registration forms */}
      <Container 
        maxWidth="xs" // Set a maximum width for the container
        className="login-form" 
        style={{ marginTop: '80px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} // Fixed height and flex styles
      >
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Select Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            label="Select Role"
            onChange={handleRoleChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </Select>
        </FormControl>

        {isLogin ? (
          <>
            <h2>Login</h2>
            <form>
              <TextField 
                label="Email" 
                variant="outlined" 
                fullWidth 
                margin="normal"
                style={{ backgroundColor: '#fff' }} // Style for text field background
              />
              <TextField 
                label="Password" 
                type="password" 
                variant="outlined" 
                fullWidth 
                margin="normal"
                style={{ backgroundColor: '#fff' }} // Style for text field background
              />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                style={{ padding: '10px 0', fontSize: '16px' }} // Button style
                onClick={handleLogin} // Call handleLogin on click
              >
                Login as {role ? role : '...'} {/* Show role in button */}
              </Button>
            </form>
            <p onClick={toggleForm} className="toggle-text">
              Don't have an account? Register here
            </p>
          </>
        ) : (
          <>
            <h2>Register</h2>
            <form>
              <TextField 
                label="Name" 
                variant="outlined" 
                fullWidth 
                margin="normal"
                style={{ backgroundColor: '#fff' }} // Style for text field background
              />
              <TextField 
                label="Email" 
                variant="outlined" 
                fullWidth 
                margin="normal"
                style={{ backgroundColor: '#fff' }} // Style for text field background
              />
              <TextField 
                label="Password" 
                type="password" 
                variant="outlined" 
                fullWidth 
                margin="normal"
                style={{ backgroundColor: '#fff' }} // Style for text field background
              />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                style={{ padding: '10px 0', fontSize: '16px' }} // Button style
              >
                Register as {role ? role : '...'} {/* Show role in button */}
              </Button>
            </form>
            <p onClick={toggleForm} className="toggle-text">
              Already have an account? Login here
            </p>
          </>
        )}
      </Container>

      {/* Footer */}
      <footer style={{ width: '100%', textAlign: 'center', marginTop: 'auto', padding: '20px', backgroundColor: '#f8f8f8' }}>
        <Typography variant="body2" color="textSecondary">
          © 2024 GMIT, Davanagere.
        </Typography>
      </footer>
    </div>
  );
}

export default LoginRegistration;
