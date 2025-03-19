import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Container, Paper } from "@mui/material";

export default function Home() {
  const navigate = useNavigate(); // 🚀 Hook for navigation

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", mt: 5, borderRadius: 3 }}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          🗳️ Welcome to Decentralized Voting
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mb: 3 }}>
          Vote with transparency and trust. Start by creating or viewing polls!
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
          <Button variant="contained" size="large" color="primary" onClick={() => navigate("/create")}>
            ✏️ Create Poll
          </Button>

          <Button variant="contained" size="large" color="secondary" onClick={() => navigate("/polls")}>
            📊 View Polls
          </Button>

          <Button variant="contained" size="large" color="success" onClick={() => navigate("/mypolls")}>
            🔍 My Polls
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
