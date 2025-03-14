import React, { useEffect, useState } from 'react';
import { getMyPolls, getPoll } from '../pollService';
import { Typography, Box, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

export default function MyPolls({ currentAccount }) {
  const [pollIds, setPollIds] = useState([]);
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    async function load() {
      if (!currentAccount) return;
      try {
        const ids = await getMyPolls(currentAccount);
        setPollIds(ids);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [currentAccount]);

  useEffect(() => {
    async function loadDetails() {
      const arr = [];
      for (let pid of pollIds) {
        const p = await getPoll(pid);
        arr.push(p);
      }
      setPolls(arr);
    }
    if (pollIds.length > 0) {
      loadDetails();
    }
  }, [pollIds]);

  if (!currentAccount) {
    return <Typography sx={{ mt: 4, textAlign: 'center' }}>Please connect wallet first.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h5">My Polls</Typography>
      {polls.map((p) => (
        <Card key={p.pollId} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{p.title}</Typography>
            <Typography>{p.description}</Typography>
            <Typography>Poll ID: {p.pollId}</Typography>
            <Typography>Active: {p.active ? "Yes" : "No"}</Typography>
            <Button component={Link} to={`/polls/${p.pollId}`} variant="outlined" sx={{ mt: 1 }}>
              View
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
