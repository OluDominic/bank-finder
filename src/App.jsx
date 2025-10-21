import { useEffect, useState } from 'react'
import NaijaBanks from 'naija-banks-branches-sortcode';
import './App.css'
import BankSelector from './components/BankSelector';
import StateSelector from './components/StateSelector';
import ResultsTable from './components/ResultsTable';
import StatsCard from './components/StatsCard';
import CompareModal from './components/CompareModal';
import ExportMenu from './components/ExportMenu';
import FavoritesDrawer from './components/FavoritesDrawer';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [banks, setBanks] = useState([]);
  const [bankDetails, setBankDetails] = useState([]); // store full bank objects
  const [states] = useState([
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
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [shareSnackbar, setShareSnackbar] = useState(false);

  useEffect(()=> {
    const allBanks = NaijaBanks.all();
    setBankDetails(allBanks);
    setBanks(allBanks.map(b => b.bank));
    
    // Load favorites and recent searches from localStorage
    const savedFavorites = localStorage.getItem('bankFavorites');
    const savedRecent = localStorage.getItem('recentSearches');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedRecent) setRecentSearches(JSON.parse(savedRecent));
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
        dark: '#1565c0',
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#dc004e',
      },
      background: {
        default: darkMode ? '#121212' : '#f8fafc',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });

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
          
          // Add to recent searches
          const searchItem = { bank: selectedBank, state: selectedState, timestamp: Date.now() };
          const updated = [searchItem, ...recentSearches.filter(s => !(s.bank === selectedBank && s.state === selectedState))].slice(0, 5);
          setRecentSearches(updated);
          localStorage.setItem('recentSearches', JSON.stringify(updated));
        }
        setSearched(true);
      } catch {
        setError('Failed to fetch branches. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 700);
  };

  const toggleFavorite = (branch) => {
    const exists = favorites.find(f => f.branchcode === branch.branchcode);
    let updated;
    if (exists) {
      updated = favorites.filter(f => f.branchcode !== branch.branchcode);
    } else {
      updated = [...favorites, { ...branch, bank: selectedBank, state: selectedState }];
    }
    setFavorites(updated);
    localStorage.setItem('bankFavorites', JSON.stringify(updated));
  };

  const handleShare = () => {
    const url = `${window.location.origin}?bank=${encodeURIComponent(selectedBank)}&state=${encodeURIComponent(selectedState)}`;
    navigator.clipboard.writeText(url);
    setShareSnackbar(true);
    setTimeout(() => setShareSnackbar(false), 2000);
  };

  // Find selected bank details
  const selectedBankObj = bankDetails.find(b => b.bank === selectedBank);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Box
      minHeight="100vh"
      sx={{
        background: darkMode 
          ? 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e3e9f6 100%)',
        py: 0,
        px: 0,
        transition: 'background 0.3s ease',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 4, md: 6 }, px: { xs: 1, sm: 2 } }}>
        {/* Header with Actions */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          >
            🏦 Nigerian Bank Finder
          </Typography>
          <Box display="flex" gap={1}>
            <Tooltip title="Toggle Dark Mode">
              <IconButton onClick={() => setDarkMode(!darkMode)} color="primary">
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Favorites">
              <IconButton onClick={() => setFavoritesOpen(true)} color="primary">
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Compare Banks">
              <IconButton onClick={() => setCompareOpen(true)} color="primary">
                <CompareArrowsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <StatsCard title="Total Banks" value={banks.length} icon="🏦" darkMode={darkMode} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatsCard title="States Covered" value={states.length} icon="📍" darkMode={darkMode} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatsCard title="Your Favorites" value={favorites.length} icon="❤️" darkMode={darkMode} />
          </Grid>
        </Grid>
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
            borderRadius: { xs: 2, sm: 3, md: 4 },
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
            bgcolor: 'background.paper',
          }}
        >
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: { xs: 1, sm: 2 },
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
            }}
          >
            Find Bank Branches Across Nigeria
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
            Search, compare, and save your favorite bank branches. Get instant access to branch details, locations, and codes.
          </Typography>
          
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <Box mb={2}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Recent Searches:
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap" justifyContent="center">
                {recentSearches.map((search, idx) => (
                  <Chip
                    key={idx}
                    label={`${search.bank} - ${search.state}`}
                    size="small"
                    onClick={() => {
                      setSelectedBank(search.bank);
                      setSelectedState(search.state);
                    }}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>
          )}
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
              startIcon={!loading && <SearchIcon />}
              sx={{
                minWidth: { xs: '100%', sm: 160 },
                py: 1.2,
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.10)',
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Search'}
            </Button>
          </Box>
          {selectedBankObj && (
            <Box mb={2}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>Bank Details</Typography>
              <Typography variant="body2"> <b>Bank:</b> {selectedBankObj.bank}</Typography>
              {selectedBankObj.code && <Typography variant="body2"><b>Code:</b> {selectedBankObj.code}</Typography>}
              {selectedBankObj.ussd && <Typography variant="body2"><b>USSD:</b> {selectedBankObj.ussd}</Typography>}
            </Box>
          )}
          
          {/* Action Buttons */}
          {results.length > 0 && (
            <Box mt={2} display="flex" gap={1} justifyContent="center" flexWrap="wrap">
              <ExportMenu results={results} selectedBank={selectedBank} selectedState={selectedState} />
              <Button
                variant="outlined"
                size="small"
                startIcon={<ShareIcon />}
                onClick={handleShare}
              >
                Share Search
              </Button>
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
              bgcolor: 'background.paper',
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
                      bgcolor: darkMode ? 'rgba(255,255,255,0.05)' : 'action.hover', 
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
                <ResultsTable 
                  results={results} 
                  filter={filter} 
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                />
              </>
            )}
          </Paper>
        ) : null}
        
        {/* Share Snackbar */}
        {shareSnackbar && (
          <Alert 
            severity="success" 
            sx={{ 
              position: 'fixed', 
              bottom: 20, 
              right: 20, 
              zIndex: 9999 
            }}
          >
            Link copied to clipboard!
          </Alert>
        )}
      </Container>
      
      {/* Compare Modal */}
      <CompareModal 
        open={compareOpen} 
        onClose={() => setCompareOpen(false)}
        banks={banks}
        states={states}
        darkMode={darkMode}
      />
      
      {/* Favorites Drawer */}
      <FavoritesDrawer
        open={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        favorites={favorites}
        onRemove={(branch) => toggleFavorite(branch)}
      />
    </Box>
    </ThemeProvider>
  )
}

export default App
