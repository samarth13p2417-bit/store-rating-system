import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Button,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useThemeContext } from '../context/ThemeContext';

export default function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useThemeContext();
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: darkMode
          ? 'rgba(18, 18, 32, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${
          darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'
        }`,
      }}
    >
      <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuToggle}
          sx={{
            mr: 1,
            display: { lg: 'none' },
            color: theme.palette.text.primary,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
            fontSize: { xs: '1.1rem', sm: '1.3rem' },
          }}
        >
          StoreRating
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1.5 } }}>
          <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: theme.palette.text.primary,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'rgba(99, 102, 241, 0.1)',
                  transform: 'rotate(180deg)',
                },
              }}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          <Typography
            variant="body2"
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: theme.palette.text.secondary,
              fontWeight: 500,
            }}
          >
            Hi, {user?.name?.split(' ')[0] || 'User'}
          </Typography>

          <Avatar
            sx={{
              width: 36,
              height: 36,
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              fontSize: '0.95rem',
              fontWeight: 600,
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>

          <Tooltip title="Logout">
            <IconButton
              onClick={logout}
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  color: '#ef4444',
                  background: 'rgba(239, 68, 68, 0.1)',
                },
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
