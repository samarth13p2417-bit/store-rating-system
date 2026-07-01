import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
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
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '8rem', sm: '12rem' },
          fontWeight: 900,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          mb: 2,
          animation: 'pulse 2s ease-in-out infinite',
        }}
      >
        404
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: '#fff',
          mb: 1,
        }}
      >
        Page Not Found
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: 'rgba(255, 255, 255, 0.6)',
          maxWidth: 440,
          mb: 4,
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/')}
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
        Go Home
      </Button>
    </Box>
  );
}
