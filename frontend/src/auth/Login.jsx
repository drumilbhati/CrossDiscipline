import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/joy/Link';
import axios from 'axios';

// Custom theme inspired by GTA5
const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1e88e5',
          700: '#1976d2',
          800: '#1565c0',
          900: '#0d47a1',
        },
        background: {
          body: '#121212',
          surface: '#1e1e1e',
        },
      },
    },
  },
});

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [alert, setAlert] = useState('');
  const navigate = useNavigate();
  
  const API_URL = 'https://website-8t82.onrender.com'; // Consider moving this to an environment variable

  const handleSubmit = async (event) => {
  event.preventDefault();
  setMessage('');
  
  try {
    console.log('Attempting to login...');
    const response = await axios.post(`${API_URL}/api/login`, 
      { username, password },
      { // Important for CORS if using cookies
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Login response:', response);

    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      setMessage(response.data.message || 'Login successful');
      setAlert({
        type: 'success',
        message: response.data.message || 'Login successful',
      });
      navigate('/');
    } else {
      setAlert({
        type: 'error',
        message: response.data.message || 'Login failed',
      })
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error('Login error:', error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
      setMessage(`Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
      setMessage('No response from server. Please check your network connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      setMessage(`An unexpected error occurred: ${error.message}`);
    }
  }
};
  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      <CssBaseline />
      <Sheet
        sx={{
          width: '100%',
          height: '100vh',
          background: 'linear-gradient(to bottom, #1e1e1e, #121212)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Sheet
          sx={{
            width: 350,
            p: 4,
            borderRadius: 'md',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
            background: 'rgba(30, 30, 30, 0.8)',
            backdropFilter: 'blur(10px)',
          }}
          variant="outlined"
        >
          <Typography
            level="h3"
            sx={{
              mb: 2,
              fontFamily: "'Pricedown', sans-serif", // Custom GTA-style font (you'd need to import this)
              color: '#ffab00',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              textAlign: 'center',
            }}
          >
            Epsilon Program Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ mb: 2 }}>
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  color: '#fff',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
                }}
              />
            </FormControl>
            <FormControl sx={{ mb: 2 }}>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  color: '#fff',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
                }}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                mb: 2,
                backgroundColor: '#ffab00',
                color: '#000',
                fontWeight: 'bold',
                '&:hover': { backgroundColor: '#ffd600' },
              }}
            >
              Enter Los Santos
            </Button>
          </form>
          {message && (
            <Typography level="body-sm" color="danger" sx={{ mb: 2, textAlign: 'center' }}>
              {message}
            </Typography>
          )}
          <Typography 
            level="body-sm"
            sx={{
              textAlign: 'center',
              color: '#bdbdbd',
            }}
          >
            New to Los Santos?{' '}
            <Link
              component={RouterLink}
              to="/signup"
              sx={{
                color: '#ffab00',
                '&:hover': { color: '#ffd600' },
              }}
            >
              Create an account
            </Link>
            <Link 
              component={RouterLink}
              to="/admin-login"
              sx={{
                color: '#ffab00',
                '&:hover': { color: '#ffd600' },
              }}>
              Admin Login
            </Link>
          </Typography>
        </Sheet>
      </Sheet>
    </CssVarsProvider>
  );
}