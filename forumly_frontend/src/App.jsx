// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

import Signup from "./Components/Signup";
import Login from "./Components/login";
import Dashboard from "./pages/Dashboard";
import PostsPage from "./Pages/Posts";
import  ViewPostPage from "./Pages/PostCard";



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
         <Route path="/login" element={<Login />} />
         <Route path ="/signup" element={<Signup />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/posts/category/:categoryId" element={<PostsPage />} />
         <Route path="/posts/:postId" element ={<ViewPostPage />} />
      </Routes>
    </Router>
  );
};

export default App;