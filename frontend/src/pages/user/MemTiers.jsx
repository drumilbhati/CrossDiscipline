import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Stack, Modal, ModalDialog, ModalClose, Box, Sheet, Alert, CssVarsProvider } from '@mui/joy';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
// import List from '@mui/material/List';

const MembershipTiers = () => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [userBalance, setUserBalance] = useState(null); // Initialize as null
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [membership, setMembership] = useState('None');

  const tiers = [
    {
      name: 'Cris Formage Level 1',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      features: ['Access to basic content', 'Email support', 'Monthly newsletter'],
      gradient: 'linear-gradient(45deg, #FFAB00, #FF12AA)'
    },
    {
      name: 'Cris Formage Level 2',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: ['Access to all content', 'Priority email support', 'Exclusive webinars', 'Ad-free experience'],
      gradient: 'linear-gradient(45deg, #FFAB00, #FF12DD)'
    },
    {
      name: 'Cris Formage Level 3',
      monthlyPrice: 29.99,
      yearlyPrice: 299.99,
      features: ['All Pro features', '24/7 phone support', 'Personal account manager', 'Early access to new features'],
      gradient: 'linear-gradient(45deg, #FFAB00, #FF12FF)'
    }
  ];

  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
    setOpenModal(true);
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await axios.post('https://website-8t82.onrender.com/api/subscribe', {
        tier: selectedTier.name,
        token: localStorage.getItem('token')
      });
      if (response.status === 200) {
        setUserBalance(response.data.balance);
        setMembership(response.data.membership);
        setAlert({
          type: 'success',
          message: `Successfully subscribed to ${selectedTier.name}. Your new balance is $${response.data.balance}.`
        });
      } else {
        setAlert({
          type: 'error',
          message: response.data.message
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setAlert({
        type: 'error',
        message: 'Subscription failed. Please try again later.'
      });
    }
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://website-8t82.onrender.com/api/profile', {
          token: localStorage.getItem('token')
        });
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        console.log(response.data);
        setUserBalance(response.data.balance);
        setMembership(response.data.membership);
      } catch (error) {
        console.error('Error fetching user balance:', error);
        // setAlert({
        //   type: 'error',
        //   message: 'Error fetching user balance. Please try again later.'
        // });
      }
    };
    fetchData();
  }, []);

  return (
    <CssVarsProvider>
      <Sheet
        sx={{
          backgroundColor: '#111111',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar/>
    
    <Box sx={{
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      background: '#121212',
      animation: 'gradientBG 15s ease infinite',
      '@keyframes gradientBG': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      }
    }}>
      <Stack spacing={4} alignItems="center" >
        <Box 
          sx={{ 
            py: 2, 
            mb: 4,
            textAlign: 'center',
            animation: 'fadeIn 1s ease-in'
          }}
        >

          <Typography 
            level="h2" 
            sx={{ 
              color: '#FFA500',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
              animation: 'fadeIn 1s ease-in'
            }}
          > 
            Select Your Membership
          </Typography>
          <Typography 
            level="body1" 
            sx={{ 
              color: '#FFF',
              mt: 2
            }}
          >
            Your current membership: {membership}
          </Typography>
          <Typography
            level="body1" 
            sx={{ 
              color: '#FFF',
              mt: 2
            }}>
            Your balance: ${userBalance !== null ? userBalance : '1000000'}
          </Typography>
        </Box>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} useFlexGap>
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              variant="outlined"
              sx={{
                width: '250px',
                mb: 2,
                background: tier.gradient,
                color: 'white',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2), 0 6px 6px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': { 
                  transform: 'perspective(1000px) rotateX(0deg) scale(1.05)',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.3), 0 10px 10px rgba(0,0,0,0.2)'
                },
                animation: 'fadeIn 1s ease-in',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Typography level="h2" sx={{ mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{tier.name}</Typography>
                <Typography level="h3" sx={{ mb: 2, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>${tier.monthlyPrice}</Typography>
                <Stack spacing={1} sx={{ mb: 2 }}>
                  {tier.features.map((feature, index) => (
                    <Typography key={index} level="body2" sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>• {feature}</Typography>
                  ))}
                </Stack>
              </Box>
              <Button 
                onClick={() => handleTierSelect(tier)}
                sx={{
                  mt: 'auto',
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'black',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  } 
                }}
              >
                Buy {tier.name}
              </Button>
            </Card>
          ))}
        </Stack>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>  
          <ModalDialog
            sx={{
              background: selectedTier?.gradient || 'linear-gradient(45deg, #FFA500, #FFD700)',
              color: 'white',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2), 0 6px 6px rgba(0,0,0,0.1)',
            }}
          >
            <ModalClose sx={{ color: 'white' }} />
            <Typography level="h4" sx={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Confirm Subscription</Typography>
            <Typography sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
              You have selected the {selectedTier?.name} tier at ${selectedTier?.monthlyPrice}.
              Would you like to proceed with this subscription?
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button 
                variant="softA" 
                onClick={() => setOpenModal(false)}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'black',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirm}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'black',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                  }
                }}
              >
                Confirm
              </Button>
            </Stack>
          </ModalDialog>
        </Modal>
        {alert && (
          <Alert
            variant="soft"
            color={alert.type === 'error' ? 'danger' : 'success'}
            sx={{
              position: 'fixed',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              maxWidth: '90%',
              width: '400px',
            }}
          >
            {alert.message}
          </Alert>
        )}
      </Stack>
    </Box>
  </Sheet>
    </CssVarsProvider>
  );
};

export default MembershipTiers;