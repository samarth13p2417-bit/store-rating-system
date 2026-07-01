import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Badge as BadgeIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  const theme = useTheme();

  const roleColor = {
    ADMIN: '#ef4444',
    USER: '#6366f1',
    OWNER: '#10b981',
  };

  const infoItems = [
    { icon: <PersonIcon />, label: 'Full Name', value: user?.name },
    { icon: <EmailIcon />, label: 'Email', value: user?.email },
    { icon: <LocationIcon />, label: 'Address', value: user?.address },
  ];

  return (
    <Box className="animate-fadeIn">
      <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
        Profile
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Your account information
      </Typography>

      <Card sx={{ maxWidth: 550, borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {/* Avatar & Role */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 2,
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                fontSize: '2rem',
                fontWeight: 700,
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
            <Typography variant="h5" fontWeight={700}>
              {user?.name || 'User'}
            </Typography>
            <Chip
              label={user?.role || 'USER'}
              size="small"
              sx={{
                mt: 1,
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.5px',
                backgroundColor: `${roleColor[user?.role] || '#6366f1'}22`,
                color: roleColor[user?.role] || '#6366f1',
                border: `1px solid ${roleColor[user?.role] || '#6366f1'}44`,
              }}
            />
          </Box>

          <Divider sx={{ mb: 3, opacity: 0.1 }} />

          {/* Info Items */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {infoItems.map((item) => (
              <Box key={item.label} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(0,0,0,0.03)',
                    display: 'flex',
                    color: 'text.secondary',
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    {item.label}
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {item.value || '—'}
                  </Typography>
                </Box>
              </Box>
            ))}

            {/* Role */}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box
                sx={{
                  p: 1,
                  borderRadius: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.03)',
                  display: 'flex',
                  color: 'text.secondary',
                }}
              >
                <BadgeIcon />
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                  Role
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {user?.role || 'USER'}
                </Typography>
              </Box>
            </Box>

            {/* Member Since */}
            {user?.createdAt && (
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.05)'
                      : 'rgba(0,0,0,0.03)',
                    display: 'flex',
                    color: 'text.secondary',
                  }}
                >
                  <CalendarIcon />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    Member Since
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
