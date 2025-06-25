import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function FeedbackCard({ title, category, status, upvotes }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">{category}</Typography>
        </Box>
        <Box textAlign="center">
          <ArrowUpwardIcon />
          <Typography>{upvotes}</Typography>
          <Chip label={status} size="small" sx={{ mt: 1 }} />
        </Box>
      </CardContent>
    </Card>
  );
}