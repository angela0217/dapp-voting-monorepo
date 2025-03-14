import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createPoll } from '../pollService';

export default function CreatePoll({ currentAccount }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [optionsText, setOptionsText] = useState("");
  const [message, setMessage] = useState("");
  // 简单处理开始/结束时间，使用unix时间戳或别的方式
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleCreate = async () => {
    if (!currentAccount) {
      setMessage("Please connect wallet first");
      return;
    }
    // 将 optionsText 用逗号分割成数组
    const opts = optionsText.split(',').map(o => o.trim()).filter(o => o !== "");
    if (opts.length === 0) {
      setMessage("Please provide at least one option");
      return;
    }

    try {
      await createPoll(title, desc, opts, parseInt(startTime), parseInt(endTime));
      setMessage("Poll created successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Error creating poll: " + err.message);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Create a New Poll</Typography>
      <TextField 
        label="Title" 
        fullWidth 
        margin="normal" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <TextField 
        label="Description" 
        fullWidth 
        margin="normal" 
        value={desc} 
        onChange={(e) => setDesc(e.target.value)} 
      />
      <TextField 
        label="Options (comma-separated)" 
        fullWidth 
        margin="normal" 
        value={optionsText} 
        onChange={(e) => setOptionsText(e.target.value)} 
      />
      <TextField 
        label="Start Time (Unix Timestamp)" 
        fullWidth 
        margin="normal"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)} 
      />
      <TextField 
        label="End Time (Unix Timestamp)" 
        fullWidth 
        margin="normal"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)} 
      />
      <Button variant="contained" onClick={handleCreate} sx={{ mt: 2 }}>
        Create Poll
      </Button>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
}
