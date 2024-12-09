import React, { useState } from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import { Send } from 'lucide-react';
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

const EpsilonEnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.post('https://website-8t82.onrender.com/api/submit-enquiry', formData);
      if (response.status === 200) {
        console.log('Form submitted:', formData);
        alert('Form submitted successfully!');
        setFormData({name: '', email: '', message: ''});
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      <Sheet
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 400,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography
          level="h4"
          component="h2"
          sx={{ 
            mb: 2,
            fontFamily: "'Pricedown', sans-serif",
            color: '#ffab00',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          Contact the Epsilon Program
        </Typography>
        <FormControl>
          <FormLabel sx={{ color: '#ffab00' }}>Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            sx={{ 
              '& input': { color: '#fff' },
              '&::before': { borderBottom: '1px solid #ffab00' },
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel sx={{ color: '#ffab00' }}>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ 
              '& input': { color: '#fff' },
              '&::before': { borderBottom: '1px solid #ffab00' },
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel sx={{ color: '#ffab00' }}>Message</FormLabel>
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            minRows={3}
            required
            sx={{ 
              '& textarea': { color: '#fff' },
              '&::before': { borderBottom: '1px solid #ffab00' },
            }}
          />
        </FormControl>
        <Button
          type="submit"
          startDecorator={<Send />}
          sx={{
            mt: 2,
            backgroundColor: '#ffab00',
            color: '#000',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#ffd600' },
          }}
        >
          Send Message
        </Button>
      </Sheet>
    </CssVarsProvider>
  );
};

export default EpsilonEnquiryForm;