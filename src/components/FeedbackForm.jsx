import React, { useState } from 'react';
import {
  Container, Box, Typography, Divider,
  TextField, Button, Chip, Stack,
  MenuItem, FormControl, InputLabel, Select,
  FormHelperText
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FilterTabs from './FilterTabs';
import CommentForm from './CommentForm';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// ✅ Validation schema
const schema = yup.object({
  title: yup.string().required('Required'),
  description: yup.string().required('Required'),
  category: yup.string().required('Required'),
});


// ✅ Upvote Button (local count)
function UpvoteButton({ initialUpvotes = 0 }) {
  const [count, setCount] = useState(initialUpvotes);
  const handleClick = () => setCount(prev => prev + 1);
  return (
    <Button
      variant="contained"
      startIcon={<ArrowUpwardIcon />}
      onClick={handleClick}
    >
      {count}
    </Button>
  );
}

// ✅ Main Component
export default function FeedbackFormList() {
  const [tab, setTab] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const statuses = ['All', 'Planned', 'In Progress', 'Done'];

  // ✅ Filter logic based on selected tab
  const filteredFeedbackList = feedbackList.filter(item =>
    tab === 0 || item.status === statuses[tab]
  );

  const submitHandler = data => {
    const newEntry = {
      id: Date.now(),
      ...data,
      status: statuses[tab],
      comments: []
    };
  console.log('🔔 New feedback submitted:', newEntry);
    setFeedbackList(prev => [...prev, newEntry]);
    reset();
    setTab(0); 
  };

  const addComment = (feedbackId, commentText) => {
    const newComment = {
      id: Date.now(),
      body: commentText,
      username: 'CurrentUser',
      createdAt: new Date().toISOString(),
    };
console.log(`🗨️ Comment on feedback ${feedbackId}:`, newComment);

    setFeedbackList(prev =>
      prev.map(item =>
        item.id === feedbackId
          ? { ...item, comments: [...item.comments, newComment] }
          : item
      )
    );
  };

  return (
    <Container maxWidth="md" sx={{
          bgcolor: 'white',           // background color
          boxShadow: 3,               // shadow level (1-24)
          borderRadius: 2,            // rounded corners
          p: 4,   
          mt:4,background:"#e3f2fd"                 // padding inside box
        } } 
  >
    <Typography
  variant="h4"
  gutterBottom
  sx={{
    backgroundColor: '#1a237e ', // light cyan
    padding: 2,
    borderRadius: 2,
    color: 'white ',
    fontWeight: 'bold',
    textAlign: 'center',
  }}
>
  Share Your Feedback
</Typography>

      {/* ✅ Tabs for filtering */}
      <FilterTabs value={tab} onChange={(_, newValue) => setTab(newValue)} />

      {/* ✅ Form */}
      <Box component="form" onSubmit={handleSubmit(submitHandler)} sx={{ mt: 2, mb: 4 ,alignItems:"center"}}>
        <Controller name="title" control={control} defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Title" fullWidth margin="dense"
              error={!!errors.title} helperText={errors.title?.message} required
            />
          )}
        />

        <Controller name="description" control={control} defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Description" fullWidth margin="dense"
              multiline minRows={4} required
              error={!!errors.description} helperText={errors.description?.message}
            />
          )}
        />

        <FormControl fullWidth margin="dense" error={!!errors.category}>
          <InputLabel>Category</InputLabel>
          <Controller name="category" control={control} defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Category">
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="feature">Feature</MenuItem>
                <MenuItem value="bug">Bug</MenuItem>
                <MenuItem value="ui">UI</MenuItem>
              </Select>
            )}
          />
          <FormHelperText>{errors.category?.message}</FormHelperText>
        </FormControl>

        <Button type="submit" variant="contained" sx={{ mt: 2 ,alignItems:"center"}}>
          Submit Feedback
        </Button>
      </Box>

      <Divider />

      {/* ✅ Render filtered feedbacks */}
      {filteredFeedbackList.map(item => (
        <Box key={item.id} sx={{ mt: 4, p: 4, border: '2px solid #ccc', borderRadius: 1, bgcolor: 'white',           // background color
          boxShadow: 3,               // shadow level (1-24)
          borderRadius: 2,  }}>
          <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2, mb: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>{item.title}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{item.description}</Typography>

            <Stack direction="row" spacing={6} alignItems="center" justifyContent="center">
              <Stack direction="row" spacing={1}>
                <Chip label={item.category} color="default" />
                <Chip label={item.status} color="primary" />
              </Stack>
              <UpvoteButton initialUpvotes={0} />
            </Stack>
          </Box>

          <Typography variant="subtitle1">Comments ({item.comments.length})</Typography>
          {item.comments.length === 0 ? (
            <Typography color="text.secondary">No comments yet.</Typography>
          ) : (
            item.comments.map(c => (
              <Box key={c.id} sx={{ p: 1, borderTop: '1px solid #eee' }}>
                <Typography variant="subtitle2">
                  {c.username} • {new Date(c.createdAt).toLocaleDateString()}
                </Typography>
                <Typography>{c.body}</Typography>
              </Box>
            ))
          )}

          <CommentForm
            onSubmit={text => addComment(item.id, text)}
            submitLabel="Add Comment"
          />
        </Box>
      ))}
    </Container>
  );
}