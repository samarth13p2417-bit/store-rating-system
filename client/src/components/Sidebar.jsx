import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Chip,
  Toolbar,
  useTheme,
  useMediaQuery,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Store as StoreIcon,
  Lock as LockIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SIDEBAR_WIDTH = 260;

const menuItems = {
  ADMIN: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Stores', icon: <StoreIcon />, path: '/admin/stores' },
  ],
  USER: [
    { text: 'Stores', icon: <StoreIcon />, path: '/stores' },
  ],
  OWNER: [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/owner/dashboard' },
  ],
};

const commonItems = [
  { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  { text: 'Change Password', icon: <LockIcon />, path: '/change-password' },
];

export default function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const roleItems = menuItems[user?.role] || [];
  const allItems = [...roleItems, ...commonItems];

  const handleNavigate = (path) => {
    navigate(path);
    if (!isDesktop) {
      onClose();
    }
  };

  const isActive = (path) => location.pathname === path;

  const roleColor = {
    ADMIN: '#ef4444',
    USER: '#6366f1',
    OWNER: '#10b981',
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Toolbar />

      <Box sx={{ px: 3, py: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '1.1rem',
          }}
        >
          Navigation
        </Typography>
      </Box>

      <Divider sx={{ opacity: 0.1 }} />

      <List sx={{ px: 1.5, py: 1, flexGrow: 1 }}>
        {allItems.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  px: 2,
                  transition: 'all 0.2s ease',
                  ...(active
                    ? {
                        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))',
                        '& .MuiListItemIcon-root': {
                          color: theme.palette.primary.main,
                        },
                        '& .MuiListItemText-primary': {
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        },
                      }
                    : {
                        '&:hover': {
                          background: theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.05)'
                            : 'rgba(0, 0, 0, 0.04)',
                          transform: 'translateX(4px)',
                        },
                      }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: active
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: active ? 600 : 500,
                  }}
                />
                {active && (
                  <Box
                    sx={{
                      width: 4,
                      height: 20,
                      borderRadius: 2,
                      background: 'linear-gradient(180deg, #6366f1, #8b5cf6)',
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            background: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.03)'
              : 'rgba(0, 0, 0, 0.02)',
            textAlign: 'center',
          }}
        >
          <Chip
            label={user?.role || 'USER'}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '0.5px',
              backgroundColor: `${roleColor[user?.role] || '#6366f1'}22`,
              color: roleColor[user?.role] || '#6366f1',
              border: `1px solid ${roleColor[user?.role] || '#6366f1'}44`,
            }}
          />
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop drawer */}
      {isDesktop && (
        <Drawer
          variant="permanent"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
              borderRight: `1px solid ${
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(0,0,0,0.06)'
              }`,
              background: theme.palette.background.paper,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile drawer */}
      {!isDesktop && (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
              background: theme.palette.background.paper,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}

export { SIDEBAR_WIDTH };
