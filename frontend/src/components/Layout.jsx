import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Layout({ children, currentAccount, onLogout }) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            DApp Voting
          </Typography>
          {currentAccount ? (
            <>
              <Typography>{currentAccount.slice(0,6)}...{currentAccount.slice(-4)}</Typography>
              <Button color="inherit" onClick={onLogout}>Logout</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <div style={{ margin: '20px' }}>
        {children}
      </div>
    </div>
  );
}
