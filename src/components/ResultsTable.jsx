import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const ROWS_PER_PAGE = 20;

const ResultsTable = ({ results, filter = '', favorites = [], toggleFavorite }) => {
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [copiedType, setCopiedType] = useState(null); // 'address' or 'code'
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCopy = async (text, idx, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      setCopiedType(type);
      setTimeout(() => {
        setCopiedIdx(null);
        setCopiedType(null);
      }, 1200);
    } catch {
      // Optionally handle error
    }
  };

  const filtered = results.filter(r =>
    r.branch.toLowerCase().includes(filter.toLowerCase()) ||
    r.branchaddress.toLowerCase().includes(filter.toLowerCase()) ||
    r.branchcode.toLowerCase().includes(filter.toLowerCase())
  );

  // Pagination logic
  const pageCount = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  // Reset to page 1 if filter changes and current page is out of range
  React.useEffect(() => {
    if ((page - 1) * ROWS_PER_PAGE >= filtered.length) {
      setPage(1);
    }
  }, [filter, filtered.length, page]);

  if (!results || results.length === 0) return null;

  const isFavorite = (branch) => {
    return favorites.some(f => f.branchcode === branch.branchcode);
  };

  // Mobile card view
  if (isMobile) {
    return (
      <Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
          Showing {filtered.length} of {results.length} branches
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {paginated.map((state, i) => (
            <Card key={i + (page - 1) * ROWS_PER_PAGE} sx={{ mb: 1 }}>
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {state.branch}
                  </Typography>
                  <Tooltip title={isFavorite(state) ? 'Remove from favorites' : 'Add to favorites'}>
                    <IconButton 
                      size="small" 
                      onClick={() => toggleFavorite(state)}
                      color="error"
                    >
                      {isFavorite(state) ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  <strong>Code:</strong> {state.branchcode}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, fontSize: '0.875rem' }}>
                  <strong>Address:</strong> {state.branchaddress}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Tooltip title={copiedIdx === i && copiedType === 'address' ? 'Copied!' : 'Copy Address'} placement="top" arrow>
                    <IconButton 
                      onClick={() => handleCopy(state.branchaddress, i, 'address')} 
                      size="small"
                      sx={{ bgcolor: 'primary.light', color: 'white', '&:hover': { bgcolor: 'primary.main' } }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={copiedIdx === i && copiedType === 'code' ? 'Copied!' : 'Copy Code'} placement="top" arrow>
                    <IconButton 
                      onClick={() => handleCopy(state.branchcode, i, 'code')} 
                      size="small"
                      sx={{ bgcolor: 'secondary.light', color: 'white', '&:hover': { bgcolor: 'secondary.main' } }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        {pageCount > 1 && (
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
              shape="rounded"
              size="small"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>
    );
  }

  // Desktop table view
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <caption style={{ captionSide: 'top', textAlign: 'left', padding: 8 }}>
            Showing {filtered.length} of {results.length} branches
          </caption>
          <TableHead>
            <TableRow>
              <TableCell>Branch</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Copy Address</TableCell>
              <TableCell>Copy Code</TableCell>
              <TableCell>Favorite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((state, i) => (
              <TableRow key={i + (page - 1) * ROWS_PER_PAGE}>
                <TableCell>{state.branch}</TableCell>
                <TableCell>{state.branchcode}</TableCell>
                <TableCell>{state.branchaddress}</TableCell>
                <TableCell>
                  <Tooltip title={copiedIdx === i && copiedType === 'address' ? 'Copied!' : 'Copy Address'} placement="top" arrow>
                    <IconButton onClick={() => handleCopy(state.branchaddress, i, 'address')} size="small">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={copiedIdx === i && copiedType === 'code' ? 'Copied!' : 'Copy Code'} placement="top" arrow>
                    <IconButton onClick={() => handleCopy(state.branchcode, i, 'code')} size="small">
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={isFavorite(state) ? 'Remove from favorites' : 'Add to favorites'}>
                    <IconButton onClick={() => toggleFavorite(state)} size="small" color="error">
                      {isFavorite(state) ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pageCount > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            shape="rounded"
            size="small"
          />
        </Box>
      )}
    </Box>
  )
}

export default ResultsTable;
