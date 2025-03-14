import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

export default function Login({ onLogin }) {
  const [error, setError] = useState("");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError("Metamask not found!");
        return;
      }
      // 请求用户授权
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        onLogin(accounts[0]); // 回调，把地址回传给上层
      }
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <Typography variant="h5" gutterBottom>
        Please Connect Your Wallet
      </Typography>
      <Button variant="contained" onClick={connectWallet}>
        Connect Metamask
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
}
