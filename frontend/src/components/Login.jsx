import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";

export default function Login({ onLogin }) {
  const [message, setMessage] = useState("");

  const switchAccount = async () => {
    if (!window.ethereum) {
      setMessage("⚠ Please install MetaMask.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }]
      });

      // Fetch the new selected account
      const selectedAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      onLogin(selectedAccounts[0]);
      setMessage(`✅ Switched to ${selectedAccounts[0]}`);
    } catch (error) {
      console.error("Error switching account:", error);
      setMessage("❌ Failed to switch account.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Login with MetaMask</Typography>
      <Button variant="contained" onClick={switchAccount} sx={{ mt: 2 }}>
        Switch Account
      </Button>
      {message && <Typography sx={{ mt: 2, color: "red" }}>{message}</Typography>}
    </Box>
  );
}

