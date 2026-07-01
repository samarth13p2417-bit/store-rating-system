import { Box } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { Typography } from '@mui/material';

const sizeMap = {
  small: 20,
  medium: 28,
  large: 36,
};

export default function StarRating({
  value = 0,
  onChange,
  readOnly = false,
  size = 'medium',
  hoverValue: externalHoverValue,
  onHoverChange,
}) {
  const iconSize = sizeMap[size] || sizeMap.medium;

  const handleClick = (star) => {
    if (!readOnly && onChange) {
      onChange(star);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (externalHoverValue || value);
        const StarIcon = filled ? Star : StarBorder;

        return (
          <StarIcon
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readOnly && onHoverChange?.(star)}
            onMouseLeave={() => !readOnly && onHoverChange?.(0)}
            sx={{
              fontSize: iconSize,
              color: filled ? '#ffc107' : 'rgba(150, 150, 150, 0.5)',
              cursor: readOnly ? 'default' : 'pointer',
              transition: 'all 0.15s ease',
              '&:hover': !readOnly
                ? {
                    transform: 'scale(1.2)',
                  }
                : {},
            }}
          />
        );
      })}
      {readOnly && value > 0 && (
        <Typography
          variant="body2"
          sx={{
            ml: 0.5,
            fontWeight: 600,
            color: '#ffc107',
            fontSize: size === 'small' ? '0.75rem' : '0.875rem',
          }}
        >
          {Number(value).toFixed(1)}
        </Typography>
      )}
    </Box>
  );
}
