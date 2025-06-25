import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

export default function CommentForm({ onSubmit, submitLabel = 'Comment' }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText('');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
      <TextField
        multiline
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment..."
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit} disabled={!text.trim()}>
        {submitLabel}
      </Button>
    </Box>
  );
}
