import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";

export default function Layout({ children, currentAccount, onLogout }) {
  const navigate = useNavigate(); // 🚀 Hook for navigation
  const location = useLocation(); // 📍 Get current URL path

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Decentralized Voting
          </Typography>

          {currentAccount && (
            <>
              <Button color="inherit" onClick={() => navigate("/")}>
                Home
              </Button>

              {/* ✅ Only show "Go Back" if NOT on Home Page ("/") */}
              {location.pathname !== "/" && (
                <Button color="inherit" onClick={() => navigate(-1)}>
                  🔙 Go Back
                </Button>
              )}

              <Button color="inherit" onClick={onLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}


