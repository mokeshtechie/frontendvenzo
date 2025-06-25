import React, { useState } from 'react';
import { Container } from '@mui/material';
import Header from '../components/Header';
import FilterTabs from '../components/FilterTabs';
import FeedbackList from '../components/FeedbackList';
import FeedbackForm from '../components/FeedbackForm';

export default function Home() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] =useState('');
  const feedbacks = [/* static or fetched data */];
  const handleFeedbackSubmit = data => {
    // Do something with submitted data
    console.log('Home received:', data);
  };

  return (
    <>
      <Header />
      <Container>
        <FeedbackList feedbacks={feedbacks} />
        <div>
      {/* other components, e.g. Header, SearchBar, etc */}
      <FeedbackForm onSubmit={handleFeedbackSubmit} />
      {/* FeedbackList, etc */}
    </div>
      </Container>
    </>
  );
}