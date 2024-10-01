import React, { useState } from 'react';
import { Button, TextField, Container, MenuItem, Select, FormControl, InputLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoginRegistration({ setRole, handleLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [localRole, setLocalRole] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleRoleChange = (event) => {
    setLocalRole(event.target.value);
    setRole(event.target.value);
  };

  const handleFormLogin = () => {
    if (localRole === 'customer') {
      // Store both name and email in localStorage
      localStorage.setItem('userInfo', JSON.stringify({ name, email }));
      handleLogin();
      navigate('/home');
    } else {
      alert('Only customers are allowed.');
    }
  };

  return (
    <div className="login-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', justifyContent: 'center' }}>
      <header style={{ width: '100%', textAlign: 'center', padding: '5px', backgroundColor: '#FFA500', position: 'fixed', top: 0, zIndex: 1000 }}>
        <Typography variant="h4" gutterBottom style={{ color: 'white', fontSize: '28px' }}>
          ONLINE RETAIL SHOP
        </Typography>
      </header>

      <Container 
        maxWidth="md"
        className="login-form"
        style={{ marginTop: '120px', padding: '40px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '600px' }}
      >
        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Select Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={localRole}
            label="Select Role"
            onChange={handleRoleChange}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
          </Select>
        </FormControl>

        {isLogin ? (
          <>
            <Typography variant="h4" gutterBottom>Login</Typography>
            <form>
              <TextField 
                label="Name" // Added name field for login
                variant="outlined" 
                fullWidth 
                margin="normal"
                style={{ backgroundColor: '#fff' }}
                value={name}
                onChange={(e) => setName(e.target.value)} // Capture name
              />
              <TextField 
                label="Email" 
                variant="outlined" 
                fullWidth 
                margin="normal"
                style={{ backgroundColor: '#fff' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}  // Capture email
              />
              <TextField 
                label="Password" 
                type="password" 
                variant="outlined" 
                fullWidth 
                margin="normal"
                style={{ backgroundColor: '#fff' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Capture password
              />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                style={{ padding: '15px 0', fontSize: '18px', marginTop: '20px' }}
                onClick={handleFormLogin}
              >
                Login as {localRole ? localRole : '...'}
              </Button>
            </form>
            <Typography variant="body1" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={toggleForm} className="toggle-text">
              Don't have an account? Register here
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>Register</Typography>
            <form>
              <TextField 
                label="Name" 
                variant="outlined" 
                fullWidth 
                margin="normal"
                style={{ backgroundColor: '#fff' }}
                value={name}
                onChange={(e) => setName(e.target.value)}  // Capture name
              />
              <TextField 
                label="Email" 
                variant="outlined" 
                fullWidth 
                margin="normal"
                style={{ backgroundColor: '#fff' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}  // Capture email
              />
              <TextField 
                label="Password" 
                type="password" 
                variant="outlined" 
                fullWidth 
                margin="normal"
                style={{ backgroundColor: '#fff' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Capture password
              />
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth
                style={{ padding: '15px 0', fontSize: '18px', marginTop: '20px' }}
                onClick={handleFormLogin}
              >
                Register as {localRole ? localRole : '...'}
              </Button>
            </form>
            <Typography variant="body1" style={{ marginTop: '20px', cursor: 'pointer' }} onClick={toggleForm} className="toggle-text">
              Already have an account? Login here
            </Typography>
          </>
        )}
      </Container>

      <footer style={{ width: '100%', textAlign: 'center', marginTop: 'auto', padding: '20px', backgroundColor: '#f8f8f8' }}>
        <Typography variant="body2" color="textSecondary">
          © 2024 GMIT, Davanagere.
        </Typography>
      </footer>
    </div>
  );
}

export default LoginRegistration;
