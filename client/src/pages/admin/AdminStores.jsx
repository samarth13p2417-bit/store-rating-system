import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  TableSortLabel,
  useTheme,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import api from '../../services/api';
import SearchBar from '../../components/SearchBar';
import StarRating from '../../components/StarRating';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';
import {
  nameValidation,
  emailValidation,
  addressValidation,
} from '../../utils/validators';

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [owners, setOwners] = useState([]);
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchStores = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/stores', {
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

  const fetchOwners = async () => {
    try {
      const response = await api.get('/admin/users', {
        params: { limit: 100, sortBy: 'name', sortOrder: 'asc' },
      });
      const allUsers = response.data.data || [];
      setOwners(allUsers.filter((u) => u.role === 'OWNER'));
    } catch (error) {
      toast.error('Failed to load owners');
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setPage(0);
  };

  const handleSearch = useCallback((value) => {
    setSearch(value);
    setPage(0);
  }, []);

  const handleOpenDialog = () => {
    reset({ name: '', email: '', address: '', ownerId: '' });
    fetchOwners();
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    reset();
  };

  const onSubmitStore = async (data) => {
    setSubmitting(true);
    try {
      await api.post('/admin/stores', {
        name: data.name,
        email: data.email,
        address: data.address,
        ownerId: parseInt(data.ownerId),
      });
      toast.success('Store created successfully!');
      handleCloseDialog();
      fetchStores();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create store');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="animate-fadeIn">
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Stores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all registered stores
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Add Store
        </Button>
      </Box>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <SearchBar onSearch={handleSearch} placeholder="Search stores by name, email, or address..." />
      </Box>

      {/* Table */}
      {loading ? (
        <LoadingSpinner fullPage={false} text="Loading stores..." />
      ) : stores.length === 0 ? (
        <EmptyState
          title="No Stores Found"
          subtitle="No stores match your search criteria"
        />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 3,
            boxShadow: theme.palette.mode === 'dark'
              ? '0 4px 24px rgba(0,0,0,0.3)'
              : '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'name'}
                    direction={sortBy === 'name' ? sortOrder : 'asc'}
                    onClick={() => handleSort('name')}
                  >
                    Store Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === 'email'}
                    direction={sortBy === 'email' ? sortOrder : 'asc'}
                    onClick={() => handleSort('email')}
                  >
                    Email
                  </TableSortLabel>
                </TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Average Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stores.map((store, index) => (
                <TableRow
                  key={store.id}
                  sx={{
                    '&:hover': {
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.03)'
                        : 'rgba(0,0,0,0.02)',
                    },
                    background: index % 2 === 0
                      ? 'transparent'
                      : theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.01)'
                        : 'rgba(0,0,0,0.01)',
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{store.name}</TableCell>
                  <TableCell>{store.email}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {store.address}
                  </TableCell>
                  <TableCell>
                    {store.averageRating !== undefined && store.averageRating !== null ? (
                      <StarRating
                        value={Number(store.averageRating)}
                        readOnly
                        size="small"
                      />
                    ) : (
                      <Typography variant="body2" color="text.disabled">
                        No ratings
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
        </TableContainer>
      )}

      {/* Add Store Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Add New Store</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(onSubmitStore)} noValidate>
          <DialogContent sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Store Name"
              margin="dense"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name', nameValidation)}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              margin="dense"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', emailValidation)}
            />
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={2}
              margin="dense"
              error={!!errors.address}
              helperText={errors.address?.message}
              {...register('address', addressValidation)}
            />
            <TextField
              fullWidth
              label="Owner"
              select
              margin="dense"
              defaultValue=""
              error={!!errors.ownerId}
              helperText={errors.ownerId?.message}
              {...register('ownerId', { required: 'Owner is required' })}
            >
              {owners.length === 0 ? (
                <MenuItem disabled value="">
                  No owners available
                </MenuItem>
              ) : (
                owners.map((owner) => (
                  <MenuItem key={owner.id} value={owner.id}>
                    {owner.name} ({owner.email})
                  </MenuItem>
                ))
              )}
            </TextField>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCloseDialog} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={submitting}>
              {submitting ? (
                <CircularProgress size={20} sx={{ color: '#fff' }} />
              ) : (
                'Create Store'
              )}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
