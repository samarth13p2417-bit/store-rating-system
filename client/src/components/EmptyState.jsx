import { Box, Typography, Button } from '@mui/material';
import { InboxOutlined } from '@mui/icons-material';

export default function EmptyState({ icon, title, subtitle, action }) {
  const IconComponent = icon || InboxOutlined;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 3,
        textAlign: 'center',
      }}
      className="animate-fadeIn"
    >
      {typeof IconComponent === 'object' ? (
        <Box sx={{ mb: 2, opacity: 0.3, fontSize: 64 }}>{IconComponent}</Box>
      ) : (
        <IconComponent
          sx={{
            fontSize: 80,
            color: 'text.disabled',
            mb: 2,
            opacity: 0.4,
          }}
        />
      )}
      <Typography
        variant="h6"
        color="text.secondary"
        fontWeight={600}
        sx={{ mb: 1 }}
      >
        {title || 'No Data Found'}
      </Typography>
      {subtitle && (
        <Typography
          variant="body2"
          color="text.disabled"
          sx={{ maxWidth: 360, mb: action ? 3 : 0 }}
        >
          {subtitle}
        </Typography>
      )}
      {action && (
        <Button variant="contained" color="primary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </Box>
  );
}
