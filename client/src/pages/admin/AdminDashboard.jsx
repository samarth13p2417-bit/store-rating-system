import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  useTheme,
} from '@mui/material';
import {
  People as PeopleIcon,
  Store as StoreIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { toast } from 'react-toastify';
import api from '../../services/api';
import DashboardCard from '../../components/DashboardCard';
import LoadingSpinner from '../../components/LoadingSpinner';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/admin/dashboard');
      setStats(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullPage={false} text="Loading dashboard..." />;
  }

  const chartData = [
    { name: 'Users', value: stats?.totalUsers || 0, color: '#3b82f6' },
    { name: 'Stores', value: stats?.totalStores || 0, color: '#10b981' },
    { name: 'Ratings', value: stats?.totalRatings || 0, color: '#f59e0b' },
  ];

  return (
    <Box className="animate-fadeIn">
      <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
        Admin Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Overview of your platform statistics
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            title="Total Users"
            value={stats?.totalUsers || 0}
            icon={<PeopleIcon sx={{ fontSize: 28, color: '#fff' }} />}
            color="linear-gradient(135deg, #3b82f6, #2563eb)"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            title="Total Stores"
            value={stats?.totalStores || 0}
            icon={<StoreIcon sx={{ fontSize: 28, color: '#fff' }} />}
            color="linear-gradient(135deg, #10b981, #059669)"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardCard
            title="Total Ratings"
            value={stats?.totalRatings || 0}
            icon={<StarIcon sx={{ fontSize: 28, color: '#fff' }} />}
            color="linear-gradient(135deg, #f59e0b, #d97706)"
          />
        </Grid>
      </Grid>

      {/* Chart */}
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          background: theme.palette.background.paper,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 24px rgba(0,0,0,0.3)'
            : '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
          Platform Overview
        </Typography>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} barSize={60}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: theme.palette.text.secondary, fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: theme.palette.text.secondary, fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme.palette.background.paper,
                border: 'none',
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                color: theme.palette.text.primary,
              }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
