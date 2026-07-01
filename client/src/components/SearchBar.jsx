import { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import useDebounce from '../hooks/useDebounce';

export default function SearchBar({ onSearch, placeholder = 'Search...' }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      sx={{
        minWidth: { xs: '100%', sm: 300 },
        '& .MuiOutlinedInput-root': {
          borderRadius: 3,
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(99, 102, 241, 0.1)',
          },
          '&.Mui-focused': {
            boxShadow: '0 2px 12px rgba(99, 102, 241, 0.15)',
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
