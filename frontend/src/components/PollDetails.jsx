import React, { useEffect, useState } from 'react';
import { getPoll, vote } from '../pollService';
import { useParams } from 'react-router-dom';
import { Typography, Box, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';

export default function PollDetails({ currentAccount }) {
  const { id } = useParams();  // pollId
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const p = await getPoll(id);
        setPoll(p);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  const handleVote = async () => {
    if (!currentAccount) {
      setMessage("Please connect wallet first");
      return;
    }
    if (selectedOption === null) {
      setMessage("Please select an option");
      return;
    }
    try {
      await vote(poll.pollId, selectedOption);
      setMessage("Voted successfully!");
      // 重新加载结果
      const updated = await getPoll(poll.pollId);
      setPoll(updated);
    } catch (err) {
      setMessage("Error voting: " + err.message);
    }
  };

  if (!poll) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h5">{poll.title}</Typography>
      <Typography>{poll.description}</Typography>
      <Typography>Creator: {poll.creator}</Typography>
      <Typography>Active: {poll.active ? "Yes" : "No"}</Typography>
      <Typography>Start: {poll.startTime} | End: {poll.endTime}</Typography>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Options</Typography>
        <RadioGroup
          value={selectedOption}
          onChange={(e) => setSelectedOption(parseInt(e.target.value))}
        >
          {poll.options.map((opt, i) => (
            <FormControlLabel 
              key={i} 
              value={i} 
              control={<Radio />} 
              label={`${opt} (votes: ${poll.votes[i]})`} 
            />
          ))}
        </RadioGroup>
        {poll.active && (
          <Button variant="contained" onClick={handleVote} sx={{ mt: 2 }}>
            Vote
          </Button>
        )}
        {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
      </Box>
    </Box>
  );
}
