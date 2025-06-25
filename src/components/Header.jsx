import { AppBar, Toolbar, Button, Typography } from '@mui/material';

export default function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Feedback Board</Typography>
        <Button variant="contained" color="secondary">+ Submit Feedback</Button>
      </Toolbar>
    </AppBar>
  );
}
