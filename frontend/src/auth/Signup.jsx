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
import '../App.css';

// Custom theme inspired by GTA5 (same as login component)
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

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://website-8t82.onrender.com/api/register', { username, password });

      
      if (response.data) {
        setMessage('Account created successfully');
        navigate('/login');
      }
    } catch (error) {
      setMessage(error.message || 'Error creating account');
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
            Join Los Santos
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
              Create Account
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
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                color: '#ffab00',
                '&:hover': { color: '#ffd600' },
              }}
            >
              Log in
            </Link>
          </Typography>
        </Sheet>
      </Sheet>
    </CssVarsProvider>
  );
}
