import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, Typography, Box, Avatar } from '@mui/joy';

const testimonials = [
  {
    name: "Michael De Santa",
    story: "The Epsilon Program has shown me the path to true enlightenment. Kifflom!",
    avatar: "/api/placeholder/100/100" // Placeholder for Michael's image
  },
  {
    name: "Trevor Philips",
    story: "Through generous donations, I've ascended to a higher plane of existence.",
    avatar: "/api/placeholder/100/100" // Placeholder for Trevor's image
  },
  {
    name: "Franklin Clinton",
    story: "Epsilon has taught me the truth about the world. The world is 157 years old!",
    avatar: "/api/placeholder/100/100" // Placeholder for Franklin's image
  }
];

const EpsilonTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{  
      mt: 5,
      mb: 10,
      bgcolor: '#111',
      color: '#ffab00',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography 
        level="h2" 
        sx={{ 
          mb: 2,
          textAlign: 'center', 
          color: '#ffab00',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          animation: 'pulse 2s infinite'
        }}
      >
        Epsilon Program Testimonials
      </Typography>
      <motion.div
        key={currentTestimonial}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <Card
          variant="outlined"
          sx={{
            border: '2px solid #ffab00',
            background: '#333',
            color: 'white',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2), 0 6px 6px rgba(0,0,0,0.1)',
            transform: 'perspective(1000px) rotateX(10deg)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': { 
              transform: 'perspective(1000px) rotateX(0deg) scale(1.05)',
              boxShadow: '0 15px 30px rgba(0,0,0,0.3), 0 10px 10px rgba(0,0,0,0.2)'
            },
          }}
        >
          <Avatar
            src={testimonials[currentTestimonial].avatar}
            alt={testimonials[currentTestimonial].name}
            sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
          />
          <Typography level="h4" sx={{ mb: 2, textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {testimonials[currentTestimonial].name}
          </Typography>
          <Typography sx={{ textAlign: 'center', fontStyle: 'italic', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
            "{testimonials[currentTestimonial].story}"
          </Typography>
        </Card>
      </motion.div>
      <Typography 
        sx={{ 
          mt: 4, 
          fontSize: '0.875rem', 
          animation: 'bounce 1s infinite',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}
      >
        Kifflom, Brother-Brother!
      </Typography>
      <style jsx global>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </Box>
  );
};

export default EpsilonTestimonials;