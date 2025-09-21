// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        
      </Routes>
    </Router>
  );
};

export default App;
