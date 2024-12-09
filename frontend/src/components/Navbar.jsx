import React, { useEffect, useState } from 'react';
import { Box, IconButton, List, ListItem, Button, Typography } from '@mui/joy';
import { Menu, X } from 'lucide-react';
import axios from 'axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);

  const navItems = [
          { name: 'Home' , path: '/' },
          { name: 'Join us', path: '/membership-tiers' },
          { name: 'Donate', path: '/Donation' },
          { name: 'Event Registration', path: '/UserPage' },
          { name: 'Quiz', path: '/Quiz' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const findUser = async() => {
    try {

      const response = await axios.post('https://website-8t82.onrender.com/api/profile', 
        {
          token: localStorage.getItem('token')
        }
      );

      if (response.data) {
        const responseData = response.data;
        console.log('User data:', responseData);
        setUsername(responseData.username);
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    findUser();
  }, []);

  return (
    <Box
      component="nav"
      sx={{
        position: 'relative',
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          backgroundColor: 'rgba(34, 34, 34, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography
            level="h1"
            component="h1"
            sx={{
              fontFamily: "'Pricedown', sans-serif",
              color: '#ffab00',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              flexGrow: 1,
              textAlign: 'center',
              
            }}
          >
            Epsilon Program
          </Typography>

        {/* Desktop Menu */}
        <Box
          sx={{
            marginLeft: '10px',
            display: { xs: 'none', md: 'flex' },
            gap: 2,
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.name}
              component="a"
              href={item.path}
              variant="outlined"
              color="neutral"
              sx={{
                fontFamily: "'Pricedown', sans-serif",
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                borderColor: 'transparent',
                '&:hover': {
                  borderColor: '#ffab00',
                  backgroundColor: 'rgba(255, 171, 0, 0.1)',
                },
              }}
            >
              {item.name}
            </Button>
          ))}
          {username ? (
                <Button variant="outlined"
                  color="neutral"
                  sx={{
                    fontFamily: "'Pricedown', sans-serif",
                    color: '#ffab00',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    borderColor: 'transparent',
                    '&:hover': {
                      borderColor: '#ffab00',
                      backgroundColor: 'rgba(255, 171, 0, 0.1)',
                    },
                  }} 
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                }}>
                  Logout
                </Button>
              ) : (
                <Button variant="outlined"
                  color="neutral"
                  sx={{
                    fontFamily: "'Pricedown', sans-serif",
                    color: '#ffab00',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    borderColor: 'transparent',
                    '&:hover': {
                      borderColor: '#ffab00',
                      backgroundColor: 'rgba(255, 171, 0, 0.1)',
                    },
                  }} onClick={() => {
                    window.location.href = '/Login';
                  }}>
                    Login
                </Button>
              )}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          onClick={toggleMenu}
          sx={{
            display: { xs: 'flex', md: 'none' },
            color: '#fff',
          }}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </IconButton>
      </Box>

      {/* Mobile Menu */}
      <Box
        sx={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'rgba(34, 34, 34, 0.95)',
          backdropFilter: 'blur(10px)',
          display: { xs: isMenuOpen ? 'block' : 'none', md: 'none' },
          zIndex: 1000,
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem key={item.name}>
              <Button
                component="a"
                href={item.path}
                fullWidth
                variant="outlined"
                color="neutral"
                sx={{
                  justifyContent: 'flex-start',
                  color: '#fff',
                  borderColor: 'transparent',
                  '&:hover': {
                    borderColor: '#ffab00',
                    backgroundColor: 'rgba(255, 171, 0, 0.1)',
                  },
                }}
              >
                {item.name}
              </Button>
              </ListItem>
          ))}
          <ListItem>
          {username ? (
                <Button 
                  fullWidth
                  variant="outlined"
                  color="neutral"
                  sx={{
                    justifyContent: 'flex-start',
                    color: '#ffab00',
                    borderColor: 'transparent',
                    '&:hover': {
                      borderColor: '#ffab00',
                      backgroundColor: 'rgba(255, 171, 0, 0.1)',
                    },
                  }}
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                  }}>
                    Logout
                </Button>
              ) : (
                <Button 
                fullWidth
                variant="outlined"
                color="neutral"
                sx={{
                  justifyContent: 'flex-start',
                  color: '#ffab00',
                  borderColor: 'transparent',
                  '&:hover': {
                    borderColor: '#ffab00',
                    backgroundColor: 'rgba(255, 171, 0, 0.1)',
                  },
                }}
                onClick={() => {
                  window.location.href = '/Login';
                }}>
                  Login
                </Button>
              )}
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Navbar;