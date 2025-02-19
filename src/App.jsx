import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./index.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Posts from "./components/Posts";
import Users from "./components/Users";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/users">Users</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<h1>Welcome to the API Fetching Example</h1>} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
