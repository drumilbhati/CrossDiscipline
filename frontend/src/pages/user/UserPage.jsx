import React, { useState, useEffect } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Grid from '@mui/joy/Grid';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Box from '@mui/joy/Box';
import Navbar from '../../components/Navbar.jsx';
import axios from 'axios';
import { Search } from 'lucide-react';

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

const UserPage = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://website-8t82.onrender.com/api/get-events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRegister = async (eventTitle) => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage
      if (!token) {
        alert('Please log in to register for events.');
        return;
      }

      const response = await axios.post('https://website-8t82.onrender.com/api/register-for-event', {
        token,
        event_title: eventTitle
      });

      if (response.status === 200) {
        alert('Successfully registered for the event!');
        // Optionally, you can update the local state to reflect the registration
        setEvents(events.map(event => 
          event.title === eventTitle 
            ? { ...event, attendees: [...event.attendees, 'You'] } // Add the current user to attendees
            : event
        ));
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      if (error.response) {
        alert(error.response.data.message || 'Failed to register for the event. Please try again.');
      } else {
        alert('Failed to register for the event. Please try again.');
      }
    }
  };

  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      <Sheet
        sx={{
          overflowX: 'hidden',
          backgroundColor: '#000',
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #121212, #0a0a0a)',
        }}
      >
        <Sheet
          component="navbar"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            py: 2,
            px: 3,
            display: 'flex',
            minWidth: "100%",
            background: '#222',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Navbar />
        </Sheet>

        <Sheet component="main" sx={{ px: 4, py: 8, justifyItems: 'center', backgroundColor: '#111' }}>
          <Typography
            level="h2"
            textAlign="center"
            sx={{
              mb: 4,
              fontFamily: "'Pricedown', sans-serif",
              color: '#ffab00',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Upcoming Enlightenment Events
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 4,
              perspective: '1000px',
            }}
          >
            <Input
              startDecorator={<Search />}
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                width: '300px',
                transition: 'transform 0.3s',
                transform: 'rotateX(10deg)',
                '&:hover, &:focus': {
                  transform: 'rotateX(0deg) scale(1.05)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, #ffab00, #ff6d00)',
                  zIndex: -1,
                  filter: 'blur(10px)',
                  opacity: 0.5,
                  transition: 'opacity 0.3s',
                },
                '&:hover::before, &:focus::before': {
                  opacity: 0.8,
                },
              }}
            />
          </Box>

          <Grid container spacing={4} sx={{ mb: 8 }}>
            {filteredEvents.map((event, index) => (
              <Grid key={index} xs={12} md={4}>
                <Card sx={{ backgroundColor: 'rgba(10, 10, 10, 0.9)', backdropFilter: 'blur(10px)' }}>
                  <CardContent>
                    <Typography level="h4" component="h3" sx={{ mb: 1, color: '#ffab00' }}>
                      {event.title}
                    </Typography>
                    <Typography sx={{ color: '#fff', mb: 2 }}>
                      Date: {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Typography sx={{ color: '#fff', mb: 2 }}>
                      Location: {event.location}
                    </Typography>
                    <Typography sx={{ color: '#fff', mb: 2 }}>
                      {event.description}
                    </Typography>
                    {/* <Typography sx={{ color: '#fff', mb: 2 }}>
                      Capacity:  {event.capacity}-{event.attendees}
                    </Typography> */}
                    <Typography sx={{ color: '#fff', mb: 2 }}>
                      Membership Required: {event.membershipRequired ? 'Yes' : 'No'}
                    </Typography>
                    <Button
                      onClick={() => handleRegister(event.title)}
                    //   disabled={event.attendees.length >= event.capacity}
                      sx={{
                        mt: 2,
                        backgroundColor: '#ffab00',
                        color: '#000',
                        '&:hover': {
                          backgroundColor: '#ffd600',
                        },
                        '&:disabled': {
                          backgroundColor: '#555',
                          color: '#888',
                        },
                      }}
                    >
                      Register
                      {/* {event.attendees.length >= event.capacity ? 'Full' : 'Register'} */}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Sheet>

        <Sheet
          component="footer"
          sx={{
            p: 2,
            textAlign: 'center',
            backgroundColor: 'rgba(10, 10, 10, 0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography level="body-sm" sx={{ color: '#fff' }}>
            © 2024 Epsilon Program. All Rights Reserved.
          </Typography>
        </Sheet>
      </Sheet>
    </CssVarsProvider>
  );
};

export default UserPage;

