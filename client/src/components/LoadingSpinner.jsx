import { Box, CircularProgress, Typography } from '@mui/material';

export default function LoadingSpinner({ fullPage = true, text = '' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...(fullPage
          ? {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              background: 'rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(4px)',
            }
          : {
              minHeight: 300,
              width: '100%',
            }),
      }}
    >
      <CircularProgress
        size={48}
        sx={{
          color: '#6366f1',
          mb: text ? 2 : 0,
        }}
      />
      {text && (
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          {text}
        </Typography>
      )}
    </Box>
  );
}
