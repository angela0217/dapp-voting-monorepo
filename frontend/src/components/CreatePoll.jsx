import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { createPoll } from "../pollService";

export default function CreatePoll({ currentAccount }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [optionsText, setOptionsText] = useState("");
  const [message, setMessage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!currentAccount) {
      setMessage("⚠ Please connect your wallet first.");
      return;
    }

    const opts = optionsText.split(",").map((o) => o.trim()).filter((o) => o !== "");
    if (opts.length < 2) {
      setMessage("⚠ Please provide at least two options.");
      return;
    }

    if (!startTime || !endTime) {
      setMessage("⚠ Please select valid start and end times.");
      return;
    }

    const startTimestamp = Math.floor(new Date(startTime).getTime() / 1000);
    const endTimestamp = Math.floor(new Date(endTime).getTime() / 1000);

    if (startTimestamp >= endTimestamp) {
      setMessage("⚠ End time must be after start time.");
      return;
    }

    try {
      setLoading(true);
      await createPoll(title, desc, opts, startTimestamp, endTimestamp);
      setMessage("✅ Poll created successfully!");
      setTitle("");
      setDesc("");
      setOptionsText("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating poll: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
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
        label="Start Time" 
        fullWidth 
        type="datetime-local" 
        InputLabelProps={{ shrink: true }}
        margin="normal"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      
      <TextField 
        label="End Time" 
        fullWidth 
        type="datetime-local" 
        InputLabelProps={{ shrink: true }}
        margin="normal"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
      />
      
      <Button variant="contained" onClick={handleCreate} sx={{ mt: 2 }} disabled={loading}>
        {loading ? "Creating..." : "Create Poll"}
      </Button>

      {message && <Typography sx={{ mt: 2, color: "red" }}>{message}</Typography>}
    </Box>
  );
}

