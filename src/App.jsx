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
import LegalRevisions from './components/LegalRevisions';
import LegalRevisionDetails from './components/LegalRevisionDetails';
import VoteLegalRevision from './components/VoteLegalRevision';
import DraftingLegalRevision from './components/DraftingLegalRevision';
import Votes from './components/Votes';
import AccountProfile from './components/AccountProfile';
import PostDetails from './components/PostDetails';
import ForumToPetition from './components/ForumToPetition';
import SuggestEdit from './components/SuggestEdit';
import Settings from './components/Settings';

const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const showSidebar = !location.pathname.startsWith('/profile') && !location.pathname.startsWith('/forum-to-petition');

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  useEffect(() => {
    const checkLegalRevisions = () => {
      const legalRevisions = JSON.parse(localStorage.getItem('legalRevisions')) || [];
      
      const phTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' });
      const today = new Date(phTime);
      today.setHours(0, 0, 0, 0);

      let updated = false;
      const updatedLegalRevisions = legalRevisions.map(leg => {
        const endDate = new Date(leg.date?.to);
        endDate.setHours(0, 0, 0, 0);

        if (today.getTime() >= endDate.getTime() && leg.isActive === false) {
          updated = true;
          return { ...leg, isActive: true };
        }
        return leg;
      });

      if (updated) {
        localStorage.setItem('legalRevisions', JSON.stringify(updatedLegalRevisions));
      }
    };
    checkLegalRevisions();
  }, []);

  return (
    <div className="bg-[#1A1A1A] min-h-screen">
      <Header setIsSidebarOpen={setIsSidebarOpen} />
        <div className="flex">
          {showSidebar && (
            <div className="hidden md:block md:w-72">
              <Sidebar />
            </div>
          )}
          <div className={`flex-1 overflow-y-auto no-scrollbar ${location.pathname.startsWith('/profile') ? 'z-0' : ''}`}>
          <Routes>
            <Route path="/" element={<Forum />} />
            <Route path="/petitions" element={<Petitions />} />
            <Route path="/petition/:id" element={<PetitionDetails />} />
            <Route path="/state-elections" element={<StateElections />} />
            <Route path="/legal-revisions" element={<LegalRevisions />} />
            <Route path="/votes" element={<Votes />} />
            <Route path="/legal-revision/:id" element={<LegalRevisionDetails />} />
            <Route path="/vote-legal-revision/:id" element={<VoteLegalRevision />} />
            <Route path="/drafting-legal-revision/:id" element={<DraftingLegalRevision />} />
            <Route path="/legal-revision/:id/suggest-edit" element={<SuggestEdit />} />
            <Route path="/profile" element={<AccountProfile />} />
            <Route path="/post/:id" element={<ForumDetails />} />
            <Route path="/profile/post/:id" element={<PostDetails />} />
            <Route path="/forum-to-petition/:id" element={<ForumToPetition />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
      {isSidebarOpen && (
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
