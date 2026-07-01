import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  TablePagination,
  useTheme,
} from '@mui/material';
import {
  Store as StoreIcon,
  Edit as EditIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import api from '../../services/api';
import SearchBar from '../../components/SearchBar';
import StarRating from '../../components/StarRating';
import RatingDialog from '../../components/RatingDialog';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';

export default function UserStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [ratingDialog, setRatingDialog] = useState({
    open: false,
    store: null,
  });
  const theme = useTheme();

  const fetchStores = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/stores', {
        params: {
          search,
          sortBy,
          sortOrder,
          page: page + 1,
          limit,
        },
      });
      setStores(response.data.data || []);
      setTotal(response.data.pagination?.total || 0);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load stores');
    } finally {
      setLoading(false);
    }
  }, [search, sortBy, sortOrder, page, limit]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  const handleSearch = useCallback((value) => {
    setSearch(value);
    setPage(0);
  }, []);

  const handleOpenRating = (store) => {
    setRatingDialog({ open: true, store });
  };

  const handleCloseRating = () => {
    setRatingDialog({ open: false, store: null });
  };

  const handleSubmitRating = async (rating) => {
    const store = ratingDialog.store;
    try {
      if (store.userRating && store.userRating.id) {
        await api.put(`/ratings/${store.userRating.id}`, { rating });
        toast.success('Rating updated successfully!');
      } else {
        await api.post('/ratings', { storeId: store.id, rating });
        toast.success('Rating submitted successfully!');
      }
      fetchStores();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit rating');
      throw error;
    }
  };

  return (
    <Box className="animate-fadeIn">
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Stores
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Browse and rate stores
        </Typography>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <SearchBar onSearch={handleSearch} placeholder="Search stores by name, email, or address..." />
      </Box>

      {/* Stores Grid */}
      {loading ? (
        <LoadingSpinner fullPage={false} text="Loading stores..." />
      ) : stores.length === 0 ? (
        <EmptyState
          title="No Stores Found"
          subtitle="No stores match your search criteria"
          icon={<StoreIcon sx={{ fontSize: 80 }} />}
        />
      ) : (
        <>
          <Grid container spacing={3}>
            {stores.map((store) => {
              const hasRated = store.userRating && store.userRating.rating;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={store.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.palette.mode === 'dark'
                          ? '0 12px 40px rgba(0,0,0,0.4)'
                          : '0 12px 40px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      {/* Store Name */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))',
                            display: 'flex',
                          }}
                        >
                          <StoreIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                        </Box>
                        <Typography variant="h6" fontWeight={600} noWrap>
                          {store.name}
                        </Typography>
                      </Box>

                      {/* Address */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: 40,
                        }}
                      >
                        {store.address}
                      </Typography>

                      {/* Average Rating */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                          Average Rating
                        </Typography>
                        <Box sx={{ mt: 0.5 }}>
                          {store.averageRating !== undefined && store.averageRating !== null ? (
                            <StarRating
                              value={Number(store.averageRating)}
                              readOnly
                              size="small"
                            />
                          ) : (
                            <Typography variant="body2" color="text.disabled">
                              No ratings yet
                            </Typography>
                          )}
                        </Box>
                      </Box>

                      {/* Your Rating */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={500}>
                          Your Rating
                        </Typography>
                        <Box sx={{ mt: 0.5 }}>
                          {hasRated ? (
                            <StarRating
                              value={Number(store.userRating.rating)}
                              readOnly
                              size="small"
                            />
                          ) : (
                            <Chip
                              label="Not Rated Yet"
                              size="small"
                              variant="outlined"
                              icon={<StarBorderIcon sx={{ fontSize: 14 }} />}
                              sx={{ fontSize: '0.7rem' }}
                            />
                          )}
                        </Box>
                      </Box>

                      {/* Rate Button */}
                      <Button
                        variant={hasRated ? 'outlined' : 'contained'}
                        fullWidth
                        size="small"
                        startIcon={hasRated ? <EditIcon /> : <StarBorderIcon />}
                        onClick={() => handleOpenRating(store)}
                        sx={{ mt: 'auto' }}
                      >
                        {hasRated ? 'Edit Rating' : 'Rate Store'}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Box sx={{ mt: 3 }}>
            <TablePagination
              component="div"
              count={total}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={limit}
              onRowsPerPageChange={(e) => {
                setLimit(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Box>
        </>
      )}

      {/* Rating Dialog */}
      {ratingDialog.store && (
        <RatingDialog
          open={ratingDialog.open}
          onClose={handleCloseRating}
          onSubmit={handleSubmitRating}
          currentRating={ratingDialog.store.userRating?.rating || null}
          storeName={ratingDialog.store.name}
        />
      )}
    </Box>
  );
}
