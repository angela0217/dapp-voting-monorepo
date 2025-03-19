import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, AppBar, Toolbar, Typography, Box, Container } from "@mui/material";

export default function Layout({ children, currentAccount, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation(); // 📍 Get current URL path

  return (
    <div>
      {/* 🔹 Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Decentralized Voting
          </Typography>

          {/* ✅ Show "Home" and "Logout" buttons only if logged in */}
          {currentAccount && (
            <>
              <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
              <Button color="inherit" onClick={onLogout}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* 🔹 Ensure child components (like Login, Home) are rendered correctly */}
      <Container sx={{ mt: 4 }}>
        <Box>{children}</Box>
      </Container>
    </div>
  );
}


