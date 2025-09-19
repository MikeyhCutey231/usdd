import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Forum from './components/Forum';
import CreatePost from './components/CreatePost';
import ForumDetails from './components/ForumDetails';
import Petitions from './components/Petitions';
import PetitionDetails from './components/PetitionDetails';
import StateElections from './components/StateElections';
import Legislations from './components/Legislations';
import LegislationVotingDetails from './components/LegislationVotingDetails';
import AccountProfile from './components/AccountProfile';
import PostDetails from './components/PostDetails';
import ForumToPetition from './components/ForumToPetition';

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const showSidebar = !location.pathname.startsWith('/profile') && !location.pathname.startsWith('/forum-to-petition');

  useEffect(() => {
    const checkLegislations = () => {
      console.log('Checking legislations...');
      const legislations = JSON.parse(localStorage.getItem('legislations')) || [];
      const today = new Date().setHours(0, 0, 0, 0);
      let updated = false;
      const updatedLegislations = legislations.map(leg => {
        const startDate = new Date(leg.date?.from).setHours(0, 0, 0, 0);
        if (today >= startDate && leg.isActive === false) {
          updated = true;
          return { ...leg, isActive: true };
        }
        return leg;
      });

      if (updated) {
        console.log('Updated legislations:', updatedLegislations);
        localStorage.setItem('legislations', JSON.stringify(updatedLegislations));
      }
    };
    checkLegislations();
  }, []);

  return (
    <div className="bg-[#1A1A1A] min-h-screen">
      <Header setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex">
          {showSidebar && (
            <div className="hidden md:block md:border-r md:border-[#222222]">
              <Sidebar />
            </div>
          )}
          <div className="flex-1">
          <Routes>
            <Route path="/" element={<Forum />} />
            <Route path="/petitions" element={<Petitions />} />
            <Route path="/petition/:id" element={<PetitionDetails />} />
            <Route path="/state-elections" element={<StateElections />} />
            <Route path="/legislations" element={<Legislations />} />
            <Route path="/legislation/:id" element={<LegislationVotingDetails />} />
            <Route path="/profile" element={<AccountProfile />} />
            <Route path="/post/:id" element={<ForumDetails />} />
            <Route path="/profile/post/:id" element={<PostDetails />} />
            <Route path="/forum-to-petition/:id" element={<ForumToPetition />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </div>
      </div>
      {isSidebarOpen && showSidebar && (
        <>
          <div className="md:hidden fixed inset-0 bg-black opacity-50 z-30" onClick={() => setIsSidebarOpen(false)}></div>
          <div className="md:hidden fixed inset-y-0 left-0 z-40">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Toaster position="bottom-center" />
      <AppContent />
    </Router>
  );
}

export default App;
