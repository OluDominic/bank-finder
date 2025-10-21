import React, { useState } from 'react';
import NaijaBanks from 'naija-banks-branches-sortcode';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const CompareModal = ({ open, onClose, banks, states, darkMode }) => {
  const [bank1, setBank1] = useState('');
  const [bank2, setBank2] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [comparison, setComparison] = useState(null);

  const handleCompare = () => {
    if (!bank1 || !bank2 || !selectedState) return;

    try {
      const branches1 = NaijaBanks.getBranchesByBankAndState(bank1, selectedState);
      const branches2 = NaijaBanks.getBranchesByBankAndState(bank2, selectedState);

      setComparison({
        bank1: { name: bank1, count: branches1.branches?.length || 0 },
        bank2: { name: bank2, count: branches2.branches?.length || 0 },
        state: selectedState,
      });
    } catch (err) {
      console.error('Error comparing banks:', err);
    }
  };

  const handleReset = () => {
    setBank1('');
    setBank2('');
    setSelectedState('');
    setComparison(null);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        }
      }}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <CompareArrowsIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Compare Banks
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>First Bank</InputLabel>
                <Select
                  value={bank1}
                  label="First Bank"
                  onChange={(e) => setBank1(e.target.value)}
                >
                  <MenuItem value=""><em>-- Select Bank --</em></MenuItem>
                  {banks.filter(b => b !== bank2).map((bank, idx) => (
                    <MenuItem key={idx} value={bank}>{bank}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Second Bank</InputLabel>
                <Select
                  value={bank2}
                  label="Second Bank"
                  onChange={(e) => setBank2(e.target.value)}
                >
                  <MenuItem value=""><em>-- Select Bank --</em></MenuItem>
                  {banks.filter(b => b !== bank1).map((bank, idx) => (
                    <MenuItem key={idx} value={bank}>{bank}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  value={selectedState}
                  label="State"
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <MenuItem value=""><em>-- Select State --</em></MenuItem>
                  {states.map((state, idx) => (
                    <MenuItem key={idx} value={state}>{state}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box display="flex" gap={2} mt={3} justifyContent="center">
            <Button
              variant="contained"
              onClick={handleCompare}
              disabled={!bank1 || !bank2 || !selectedState}
            >
              Compare
            </Button>
            <Button variant="outlined" onClick={handleReset}>
              Reset
            </Button>
          </Box>

          {comparison && (
            <Box mt={4}>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h6" gutterBottom align="center" color="primary">
                Comparison Results for {comparison.state}
              </Typography>
              <Grid container spacing={2} mt={2}>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      backgroundImage: darkMode ? 'linear-gradient(135deg, rgba(144,202,249,0.15) 0%, rgba(144,202,249,0.05) 100%)' : 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {comparison.bank1.name}
                    </Typography>
                    <Typography variant="h3" color="primary" fontWeight="bold">
                      {comparison.bank1.count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      branches
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      backgroundImage: darkMode ? 'linear-gradient(135deg, rgba(244,143,177,0.15) 0%, rgba(244,143,177,0.05) 100%)' : 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {comparison.bank2.name}
                    </Typography>
                    <Typography variant="h3" color="secondary" fontWeight="bold">
                      {comparison.bank2.count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      branches
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Box mt={3} textAlign="center">
                {comparison.bank1.count > comparison.bank2.count ? (
                  <Typography variant="body1" color="text.secondary">
                    <strong>{comparison.bank1.name}</strong> has <strong>{comparison.bank1.count - comparison.bank2.count}</strong> more branches than <strong>{comparison.bank2.name}</strong> in {comparison.state}
                  </Typography>
                ) : comparison.bank2.count > comparison.bank1.count ? (
                  <Typography variant="body1" color="text.secondary">
                    <strong>{comparison.bank2.name}</strong> has <strong>{comparison.bank2.count - comparison.bank1.count}</strong> more branches than <strong>{comparison.bank1.name}</strong> in {comparison.state}
                  </Typography>
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    Both banks have an <strong>equal number</strong> of branches in {comparison.state}
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompareModal;
