import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const StatsCard = ({ title, value, icon, darkMode }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        textAlign: 'center',
        borderRadius: 3,
        bgcolor: 'background.paper',
        backgroundImage: darkMode 
          ? 'linear-gradient(135deg, rgba(144,202,249,0.08) 0%, rgba(21,101,192,0.08) 100%)'
          : 'linear-gradient(135deg, rgba(25,118,210,0.05) 0%, rgba(21,101,192,0.05) 100%)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <Typography variant="h3" sx={{ mb: 1 }}>
        {icon}
      </Typography>
      <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
    </Paper>
  );
};

export default StatsCard;
