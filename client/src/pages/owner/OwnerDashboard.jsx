import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Store as StoreIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import api from '../../services/api';
import StarRating from '../../components/StarRating';
import DashboardCard from '../../components/DashboardCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';

export default function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/owner/dashboard');
      setData(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage={false} text="Loading dashboard..." />;
  }

  if (!data || !data.store) {
    return (
      <EmptyState
        title="No Store Found"
        subtitle="You don't have a store assigned to your account yet"
        icon={<StoreIcon sx={{ fontSize: 80 }} />}
      />
    );
  }

  const { store, averageRating, ratings = [] } = data;

  return (
    <Box className="animate-fadeIn">
      <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
        Owner Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Manage your store and view ratings
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Store Info Card */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card
            sx={{
              height: '100%',
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex',
                  }}
                >
                  <StoreIcon sx={{ color: '#fff', fontSize: 24 }} />
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  {store.name}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2, opacity: 0.1 }} />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <EmailIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Email</Typography>
                    <Typography variant="body2" fontWeight={500}>{store.email}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <LocationIcon sx={{ color: 'text.secondary', fontSize: 20, mt: 0.3 }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Address</Typography>
                    <Typography variant="body2" fontWeight={500}>{store.address}</Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Rating Card */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
            <Card
              sx={{
                borderRadius: 3,
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(139, 92, 246, 0.05))',
                border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)'}`,
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={500} sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                  Average Rating
                </Typography>
                <Typography variant="h2" fontWeight={700} color="primary.main" sx={{ my: 1 }}>
                  {averageRating !== null && averageRating !== undefined
                    ? Number(averageRating).toFixed(1)
                    : '—'}
                </Typography>
                <StarRating
                  value={Number(averageRating) || 0}
                  readOnly
                  size="large"
                />
              </CardContent>
            </Card>

            <DashboardCard
              title="Total Ratings"
              value={ratings.length}
              icon={<StoreIcon sx={{ fontSize: 24, color: '#fff' }} />}
              color="linear-gradient(135deg, #f59e0b, #d97706)"
            />
          </Box>
        </Grid>
      </Grid>

      {/* Ratings Table */}
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
        User Ratings
      </Typography>

      {ratings.length === 0 ? (
        <EmptyState
          title="No Ratings Yet"
          subtitle="Your store hasn't received any ratings yet"
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
                <TableCell sx={{ fontWeight: 600 }}>User Name</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>User Email</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ratings.map((r, index) => (
                <TableRow
                  key={index}
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
                  <TableCell sx={{ fontWeight: 500 }}>{r.userName}</TableCell>
                  <TableCell>{r.userEmail}</TableCell>
                  <TableCell>
                    <StarRating value={Number(r.rating)} readOnly size="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
