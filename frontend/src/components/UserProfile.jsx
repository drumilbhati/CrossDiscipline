import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import CssBaseline from '@mui/joy/CssBaseline';
import { User } from 'lucide-react';

// Custom theme inspired by GTA5 (matching Login theme)
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

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        navigate('/login');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        
        const response = await axios.get('https://website-8t82.onrender.com/api/auth-endpoint', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser({ ...decodedToken, ...response.data });
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to fetch user profile');
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (error) {
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
          <Typography level="h4" sx={{ color: '#ff3d00' }}>{error}</Typography>
        </Sheet>
      </CssVarsProvider>
    );
  }

  if (!user) {
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
          <Typography level="h4" sx={{ color: '#ffab00' }}>Loading user profile...</Typography>
        </Sheet>
      </CssVarsProvider>
    );
  }

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
          <User size={48} color="#ffab00" style={{ display: 'block', margin: '0 auto 16px' }} />
          <Typography
            level="h3"
            sx={{
              mb: 2,
              fontFamily: "'Pricedown', sans-serif",
              color: '#ffab00',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              textAlign: 'center',
            }}
          >
            User Profile
          </Typography>
          <Typography level="body-lg" sx={{ color: '#fff', mb: 1 }}>
            Username: {user.username}
          </Typography>
          <Typography level="body-lg" sx={{ color: '#fff', mb: 1 }}>
            Balance: ${user.balance}
          </Typography>
        </Sheet>
      </Sheet>
    </CssVarsProvider>
  );
};

export default UserProfile;