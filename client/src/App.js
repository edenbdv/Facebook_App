import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginContainer from './LoginContainer/LoginContainer';
import FeedContainer from './FeedContainer/FeedContainer';
import SignUpContainer from './SignUpContainer/SignUpContainer';
import Profile from './Screen/Profile/Profile';
import config from './config.js';

function App() {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if user data exists in local storage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      // If user data exists, set it to the state
      const userData = JSON.parse(storedUserData);
      setUsername(userData.username);
      setToken(userData.token);
    }
  }, []);

  console.log("ip:", config.server.ip); // This will log the IP address


  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* Redirect to login page if the user is not logged in */}
          {!username && <Route path="/feed" element={<Navigate to="/" />} />}
          <Route path="/feed" element={<FeedContainer token={token}/>} />
          <Route path="/signup" element={<SignUpContainer setUsername={setUsername} />} />
          <Route path="/profile/:username" element={<Profile token={token}/>} />
          <Route path="/" element={<LoginContainer setUsername={setUsername} setToken={setToken}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
