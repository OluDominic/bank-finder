import { useEffect, useState } from 'react'
import NaijaBanks from 'naija-banks-branches-sortcode';
import './App.css'
import BankSelector from './components/BankSelector';
import StateSelector from './components/StateSelector';
import ResultsTable from './components/ResultsTable';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

function App() {
  const [banks, setBanks] = useState([]);
  const [bankDetails, setBankDetails] = useState([]); // store full bank objects
  const [states, setStates] = useState([
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
    'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu',
    'FCT', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi',
    'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun',
    'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ]);
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(()=> {
    const allBanks = NaijaBanks.all();
    setBankDetails(allBanks);
    setBanks(allBanks.map(b => b.bank));
  }, []);

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    setSearched(false);
    setResults([]);
    setTimeout(() => { // Simulate async fetch
      try {
        if (selectedBank && selectedState) {
          const branches = NaijaBanks.getBranchesByBankAndState(selectedBank, selectedState);
          setResults(branches.branches);
        }
        setSearched(true);
      } catch (err) {
        setError('Failed to fetch branches. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 700);
  };

  // Find selected bank details
  const selectedBankObj = bankDetails.find(b => b.bank === selectedBank);

  return (
    <Box
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e3e9f6 100%)',
        py: 0,
        px: 0,
      }}
    >
      <Container maxWidth="md" sx={{ py: { xs: 2, sm: 4, md: 8 }, px: { xs: 1, sm: 2 } }}>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, sm: 3, md: 4 },
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
            background: 'rgba(255,255,255,0.95)',
          }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              color: '#1a237e',
              mb: { xs: 1, sm: 2 },
              fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' },
            }}
          >
            Nigerian Bank Finder
          </Typography>
          <Typography 
            align="center" 
            color="text.secondary" 
            sx={{ 
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              px: { xs: 1, sm: 0 }
            }}
          >
            Find all branches of your favorite Nigerian banks by state. Powered by naija-banks-branches-sortcode.
          </Typography>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            gap={{ xs: 1.5, sm: 2 }}
            alignItems="center"
            justifyContent="center"
            mb={1}
          >
            <BankSelector banks={banks} selectedBank={selectedBank} setSelectedBank={setSelectedBank} />
            <StateSelector states={states} selectedState={selectedState} setSelectedState={setSelectedState} />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              disabled={!selectedBank || !selectedState || loading}
              sx={{
                minWidth: { xs: '100%', sm: 160 },
                py: 1.2,
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.10)',
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Search Branches'}
            </Button>
          </Box>
          {selectedBankObj && (
            <Box mb={2}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: '#3949ab' }}>Bank Details</Typography>
              <Typography variant="body2"> <b>Bank:</b> {selectedBankObj.bank}</Typography>
              {selectedBankObj.code && <Typography variant="body2"><b>Code:</b> {selectedBankObj.code}</Typography>}
              {selectedBankObj.ussd && <Typography variant="body2"><b>USSD:</b> {selectedBankObj.ussd}</Typography>}
            </Box>
          )}
        </Paper>
        {(selectedBank && selectedState) || searched ? (
          <Paper
            elevation={2}
            sx={{
              p: { xs: 1.5, sm: 2, md: 3 },
              minHeight: 200,
              borderRadius: { xs: 2, sm: 3 },
              background: 'rgba(255,255,255,0.98)',
              boxShadow: '0 4px 16px 0 rgba(31, 38, 135, 0.07)',
              mt: 2
            }}
          >
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {loading && (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
                <CircularProgress />
              </Box>
            )}
            {!loading && searched && results.length === 0 && !error && (
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight={120}>
                <Typography variant="h6" color="text.secondary" gutterBottom>No branches found for this bank in the selected state.</Typography>
              </Box>
            )}
            {!loading && results.length > 0 && (
              <>
                <Box 
                  display="flex" 
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'stretch', sm: 'center' }} 
                  gap={{ xs: 1, sm: 2 }} 
                  mb={2}
                >
                  <TextField
                    label="Search branches"
                    variant="outlined"
                    size="small"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    sx={{ 
                      maxWidth: { xs: '100%', sm: 320 }, 
                      background: '#f5f7fa', 
                      borderRadius: 2 
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      textAlign: { xs: 'center', sm: 'left' },
                      fontSize: { xs: '0.75rem', sm: '0.875rem' }
                    }}
                  >
                    Showing {results.filter(r =>
                      r.branch.toLowerCase().includes(filter.toLowerCase()) ||
                      r.branchaddress.toLowerCase().includes(filter.toLowerCase()) ||
                      r.branchcode.toLowerCase().includes(filter.toLowerCase())
                    ).length} of {results.length} branches
                  </Typography>
                </Box>
                <ResultsTable results={results} filter={filter} />
              </>
            )}
          </Paper>
        ) : null}
      </Container>
    </Box>
  )
}

export default App
