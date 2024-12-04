import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

const CustomLinearProgress = ({ value }: { value: number }) => {
  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 6,
          borderRadius: 4,
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'green', // Progress color
          },
          '& .MuiLinearProgress-bar1Determinate': {
            backgroundColor: 'red', // Remaining color
          },
          '& .MuiLinearProgress-root': {
            backgroundColor: 'lightgrey', // Background color (unprogressed)
          },
        }}
      />
    </Box>
  );
};

export default CustomLinearProgress;
