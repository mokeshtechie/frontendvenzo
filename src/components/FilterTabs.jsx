import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';

export default function FilterTabs({ value, onChange }) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs
        value={value}
        onChange={onChange}
        textColor="inherit"
        indicatorColor="primary"
      >
        <Tab
          label="All"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem', // like h5 (20px)
            color: '#000',       // dark black
            textTransform: 'none',
          }}
        />
        <Tab
          label="Planned"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            color: '#000',
            textTransform: 'none',
          }}
        />
        <Tab
          label="In Progress"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            color: '#000',
            textTransform: 'none',
          }}
        />
        <Tab
          label="Done"
          sx={{
            fontWeight: 'bold',
            fontSize: '1rem',
            color: '#000',
            textTransform: 'none',
          }}
        />
      </Tabs>
    </Box>
  );
}

