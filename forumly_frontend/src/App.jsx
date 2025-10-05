// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/landingPage";
import Login from "./Components/login";
import Signup from "./Components/Signup";
import Dashboard from "./Pages/Dashboard";
import PostsPage from "./Pages/Posts";
import ViewPostPage from "./Pages/PostCard";
import ProfilePage from "./Pages/ProfilePage";




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
         <Route path="/profile" element ={<ProfilePage/>} />
      </Routes>
    </Router>
  );
};

export default App;