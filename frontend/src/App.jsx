import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './components/Login';
import CreatePoll from './components/CreatePoll';
import PollList from './components/PollList';
import PollDetails from './components/PollDetails';
import MyPolls from './components/MyPolls';

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const handleLogin = (account) => {
    setCurrentAccount(account);
  };

  const handleLogout = () => {
    setCurrentAccount("");
  };

  return (
    <BrowserRouter>
      <Layout currentAccount={currentAccount} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Navigate to="/polls" />} />
          <Route path="/login" element={
            currentAccount 
              ? <Navigate to="/polls" />
              : <Login onLogin={handleLogin} />
          } />
          <Route path="/polls" element={<PollList />} />
          <Route 
            path="/polls/:id" 
            element={<PollDetails currentAccount={currentAccount} />} 
          />
          <Route 
            path="/create" 
            element={<CreatePoll currentAccount={currentAccount} />} 
          />
          <Route 
            path="/mypolls" 
            element={<MyPolls currentAccount={currentAccount} />} 
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
