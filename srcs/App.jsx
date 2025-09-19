import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Forum from './components/Forum';
import CreatePost from './components/CreatePost';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="bg-[#1A1A1A] min-h-screen">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex">
          <div className="md:border-r md:border-[#222222]">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          </div>
          <Routes>
            <Route path="/" element={<Forum />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
