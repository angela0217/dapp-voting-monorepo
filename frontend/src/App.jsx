import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import CreatePoll from "./components/CreatePoll";
import PollList from "./components/PollList";
import PollDetails from "./components/PollDetails";
import MyPolls from "./components/MyPolls";
import Home from "./components/Home";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState(localStorage.getItem("currentAccount") || "");

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setCurrentAccount(accounts[0]);
          localStorage.setItem("currentAccount", accounts[0]);
        } else {
          setCurrentAccount("");
          localStorage.removeItem("currentAccount");
        }
      });

      return () => {
        window.ethereum.removeListener("accountsChanged", () => {});
      };
    }
  }, []);

  const handleLogin = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it.");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);
      localStorage.setItem("currentAccount", accounts[0]);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    setCurrentAccount("");
    localStorage.removeItem("currentAccount");
  };

  return (
    <BrowserRouter>
      <Layout currentAccount={currentAccount} onLogout={handleLogout}>
        <Routes>
          {/* ✅ Redirect to login if not logged in */}
          <Route path="/" element={currentAccount ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={currentAccount ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/polls" element={currentAccount ? <PollList /> : <Navigate to="/login" />} />
          <Route path="/polls/:id" element={currentAccount ? <PollDetails currentAccount={currentAccount} /> : <Navigate to="/login" />} />
          <Route path="/create" element={currentAccount ? <CreatePoll currentAccount={currentAccount} /> : <Navigate to="/login" />} />
          <Route path="/mypolls" element={currentAccount ? <MyPolls currentAccount={currentAccount} /> : <Navigate to="/login" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}


