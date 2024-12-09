import React, { useState, useEffect } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Input from '@mui/joy/Input';
import { DollarSign, Zap, Brain, ChevronUp, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar.jsx';
import axios from 'axios';

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

const EpsilonDonation = () => {
  const [donationAmount, setDonationAmount] = useState(0);
  const [isEnlightened, setIsEnlightened] = useState(false);
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [open, setOpen] = useState(false);
  const [donationInput, setDonationInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const addFloatingIcon = () => {
    const newIcon = {
      id: Date.now(),
      icon: [DollarSign, Zap, Brain, Eye][Math.floor(Math.random() * 4)],
      x: Math.random() * window.innerWidth,
      y: window.innerHeight,
    };
    setFloatingIcons(prev => [...prev, newIcon]);
    setTimeout(() => {
      setFloatingIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
    }, 5000);
  };

  const handleDonation = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    const amount = parseFloat(donationInput);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://website-8t82.onrender.com/api/donate', 
        { token, amount },
      );
      
      if(response.status !== 200) {
        throw new Error(response.data.message);
      }
      if (response.status === 200) {
        setDonationAmount(response.data.donation);
      }
      const responseData = response.data;
      console.log('Donation response:', responseData);
      
      setSuccess('Donation successful! Thank you for your contribution.');
      setDonationInput('');
      console.log('Donation amount:', donationAmount);
      
      addFloatingIcon();
      setOpen(false);
      return responseData;
    } catch (error) {
      console.error('Donation error:', error);
      setError(error.response?.data?.message || 'An error occurred while processing your donation.');
    }
  };

  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      <Sheet
        sx={{
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #1e1e1e, #121212)',
          overflowX: 'hidden',
        }}
      >
        <AnimatePresence>
          {floatingIcons.map(icon => (
            <motion.div
              key={icon.id}
              initial={{ x: icon.x, y: icon.y, opacity: 0 }}
              animate={{ y: -100, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 5 }}
              style={{ position: 'absolute', zIndex: 10 }}
            >
              <icon.icon size={32} color="#ffab00" />
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
        </motion.div>

        <Sheet
          component="header"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#222',
            padding: 2,
          }}
        > 
          <Navbar/>
        </Sheet>

        <Sheet component="main" sx={{ px: 4, py: 8, justifyItems: 'center', backgroundColor: 'rgba(18, 18, 18, 0.8)' }}>
          <motion.div
            animate={{ scale: isEnlightened ? 1.1 : 1 }}
            transition={{ duration: 2 }}
          >
            <Typography
              level="h1"
              textAlign="center"
              sx={{
                mb: 4,
                fontFamily: "'Pricedown', sans-serif",
                color: '#ffab00',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              Kifflom! Seek the Truth in Los Santos
            </Typography>
          </motion.div>
          <Typography level="h3" textAlign="center" sx={{ mb: 4, color: '#ffab00' }}>
            Embrace the teachings of Kraff and ascend to the 10th Paradigm.
          </Typography>
          <Button
            size="lg"
            onClick={() => setOpen(true)}
            sx={{
              display: 'block',
              mx: 'auto',
              mb: 2,
              backgroundColor: '#ffab00',
              color: '#000',
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#ffd600', transform: 'scale(1.05)' },
              transition: 'all 0.3s ease',
              boxShadow: '0 0 10px rgba(255, 171, 0, 0.5)',
            }}
          >
            Donate to Ascend
          </Button>
          <div style={{color: '#ffab00'}}>
            Donated: ${donationAmount}
          </div>
          <Grid container spacing={4} sx={{ mb: 8, mt: 2}}>
            {[
              { icon: DollarSign, title: 'Generous Donations', description: 'Your path to enlightenment begins with opening your wallet.' },
              { icon: Zap, title: 'Karmic Energy', description: 'Harness the power of the universe through our patented Epsilon tracts.' },
              { icon: Brain, title: 'Paradigm Shift', description: 'Expand your mind beyond the limits of this dimensional reality.' },
            ].map((item, index) => (
              <Grid key={index} xs={12} md={4}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card 
                    sx={{ 
                      backgroundColor: 'rgba(30, 30, 30, 0.8)', 
                      backdropFilter: 'blur(10px)',
                      transform: 'perspective(1000px) rotateY(5deg)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'perspective(1000px) rotateY(0deg) scale(1.05)',
                      },
                      boxShadow: '0 0 20px rgba(255, 171, 0, 0.3)',
                    }}
                  >
                    <CardContent>
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <item.icon style={{ width: 48, height: 48, marginBottom: 16, color: '#ffab00' }} />
                      </motion.div>
                      <Typography level="h4" component="h3" sx={{ mb: 1, color: '#ffab00' }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: '#fff' }}>
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Typography 
              level="h2" 
              textAlign="center" 
              sx={{ 
                mb: 2, 
                color: '#ffab00', 
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              The Truth is Expensive
            </Typography>
          </motion.div>
          <Typography level="body-lg" textAlign="center" sx={{ mb: 4, color: '#ffab00' }}>
            Join Cris Formage and the Epsilon Program. Remember, happiness is yours for only $5000!
          </Typography>
        </Sheet>

        <Sheet
          component="footer"
          sx={{
            p: 2,
            textAlign: 'center',
            background: 'rgba(30, 30, 30, 0.8)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography level="body-sm" sx={{ color: 'grey' }}>
            © 2024 Epsilon Program. Kifflom!
          </Typography>
        </Sheet>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ModalDialog
            aria-labelledby="donation-modal-title"
            aria-describedby="donation-modal-description"
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
              backgroundColor: 'rgba(30, 30, 30, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <ModalClose
              variant="outlined"
              sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.body',
              }}
            />
            <Typography
              id="donation-modal-title"
              component="h2"
              level="h4"
              textColor="#ffab00"
              fontWeight="lg"
              mb={1}
            >
              Ascend Through Donation
            </Typography>
            <Typography id="donation-modal-description" textColor="#90caf9" mb={3}>
              Enter the amount you wish to donate to the Epsilon Program. Remember, the path to enlightenment is paved with generous contributions.
            </Typography>
            <form onSubmit={handleDonation}>
              <Input
                autoFocus
                placeholder="Enter donation amount"
                type="number"
                value={donationInput}
                onChange={(e) => setDonationInput(e.target.value)}
                sx={{ mb: 2, input: { color: 'primary' } }}
              />
              <Button
                type="submit"
                sx={{
                  backgroundColor: '#ffab00',
                  color: '#000',
                  '&:hover': { backgroundColor: '#ffd600' },
                }}
              >
                Donate and Ascend
              </Button>
            </form>
            {error && (
              <Typography color="danger" mt={2}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="success" mt={2}>
                {success}
              </Typography>
            )}
          </ModalDialog>
        </Modal>
      </Sheet>
    </CssVarsProvider>
  );
};

export default EpsilonDonation;