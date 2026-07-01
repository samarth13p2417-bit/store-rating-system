import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import StarRating from './StarRating';

export default function RatingDialog({ open, onClose, onSubmit, currentRating, storeName }) {
  const [rating, setRating] = useState(currentRating || 0);
  const [hoverValue, setHoverValue] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setSubmitting(true);
    try {
      await onSubmit(rating);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setRating(currentRating || 0);
    setHoverValue(0);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 1 },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
        <Typography variant="h6" fontWeight={600}>
          Rate {storeName}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Select a rating from 1 to 5 stars
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ textAlign: 'center', py: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <StarRating
            value={rating}
            onChange={setRating}
            hoverValue={hoverValue}
            onHoverChange={setHoverValue}
            size="large"
          />
        </Box>
        <Typography variant="h4" fontWeight={700} color="primary.main">
          {hoverValue || rating || '-'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {rating === 0 ? 'No rating selected' : `You selected ${rating} star${rating > 1 ? 's' : ''}`}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, justifyContent: 'center', gap: 1 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          color="inherit"
          sx={{ minWidth: 100 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={rating === 0 || submitting}
          sx={{ minWidth: 100 }}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
