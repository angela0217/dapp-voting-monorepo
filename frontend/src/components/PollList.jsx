import React, { useEffect, useState } from 'react';
import { getAllPolls } from '../pollService';
import { Typography, Box, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PollList() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    async function loadPolls() {
      try {
        const all = await getAllPolls();
        setPolls(all);
      } catch (err) {
        console.error(err);
      }
    }
    loadPolls();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>All Polls</Typography>
      {polls.map((poll, idx) => (
        <Card key={idx} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{poll.title}</Typography>
            <Typography>{poll.description}</Typography>
            <Typography>Creator: {poll.creator}</Typography>
            <Typography>Active: {poll.active ? "Yes" : "No"}</Typography>
            <Button
              component={Link}
              to={`/polls/${poll.pollId}`}
              variant="outlined"
              sx={{ mt: 1 }}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
