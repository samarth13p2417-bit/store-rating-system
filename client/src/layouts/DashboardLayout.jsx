import { useState } from 'react';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar, { SIDEBAR_WIDTH } from '../components/Sidebar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const handleMenuToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navbar onMenuToggle={handleMenuToggle} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onToggle={handleMenuToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isDesktop ? `${SIDEBAR_WIDTH}px` : 0,
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh',
          background: theme.palette.background.default,
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, sm: 3 } }} className="animate-fadeIn">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
