import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MarketplacePage } from './pages/MarketplacePage';
import { CustomProjectsPage } from './pages/CustomProjectsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/custom-projects" element={<CustomProjectsPage />} />
      </Routes>
    </Router>
  );
}

export default App;