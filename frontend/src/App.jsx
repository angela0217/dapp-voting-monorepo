import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Login";
import CreatePoll from "./components/CreatePoll";
import PollList from "./components/PollList";
import PollDetails from "./components/PollDetails";
import MyPolls from "./components/MyPolls";
import Home from "./components/Home"; // ✅ Import Home Page

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
          <Route path="/" element={<Home />} /> {/* Main Page */}
          <Route path="/login" element={currentAccount ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/polls" element={<PollList />} />
          <Route path="/polls/:id" element={<PollDetails currentAccount={currentAccount} />} />
          <Route path="/create" element={<CreatePoll currentAccount={currentAccount} />} />
          <Route path="/mypolls" element={<MyPolls currentAccount={currentAccount} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

