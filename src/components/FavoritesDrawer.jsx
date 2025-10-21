import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';

const FavoritesDrawer = ({ open, onClose, favorites, onRemove }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 400 },
          p: 3,
        },
      }}
    >
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <FavoriteIcon color="error" />
            <Typography variant="h6" fontWeight="bold">
              Favorite Branches
            </Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        {favorites.length === 0 ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight={200}
          >
            <FavoriteIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
            <Typography color="text.secondary" align="center">
              No favorites yet. Start adding branches to your favorites!
            </Typography>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            {favorites.map((fav, idx) => (
              <Card key={idx} variant="outlined">
                <CardContent>
                  <Box display="flex" justifyContent="between" alignItems="start">
                    <Box flex={1}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        {fav.branch}
                      </Typography>
                      <Typography variant="caption" color="primary" display="block" gutterBottom>
                        {fav.bank} - {fav.state}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', mb: 1 }}>
                        Code: {fav.branchcode}
                      </Typography>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                        {fav.branchaddress}
                      </Typography>
                    </Box>
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => onRemove(fav)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default FavoritesDrawer;
