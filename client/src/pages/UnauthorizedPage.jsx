import { Box, Typography, Button } from '@mui/material';
import { Lock as LockIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 3,
        background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
      }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        <LockIcon sx={{ fontSize: 48, color: '#ef4444' }} />
      </Box>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          background: 'linear-gradient(135deg, #ef4444, #f97316)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1,
        }}
      >
        403 - Access Denied
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(255, 255, 255, 0.6)',
          maxWidth: 440,
          mb: 4,
        }}
      >
        You don&apos;t have permission to access this page. Please contact your administrator if you believe this is an error.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate(-1)}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: '1rem',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
          },
        }}
      >
        Go Back
      </Button>
    </Box>
  );
}
