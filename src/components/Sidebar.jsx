import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Vote,
    Home,
    FileText,
    Landmark,
    Tag,
    Star,
    Users,
    Archive,
    Settings,
    ChevronDown,
    X,
    Signature
} from 'lucide-react';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();

  const handleLinkClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      <aside className={`bg-secondary text-white w-72 p-8 h-full md:block md:border-r md:border-[#222222] ${isSidebarOpen ? 'fixed top-0 left-0 z-50 w-full h-full overflow-y-auto' : 'hidden'}`}>
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div>
            <nav>
              <ul>
                <li className="mb-2">
                  <Link to="/" onClick={handleLinkClick} className={`flex items-center p-3 rounded-lg hover:bg-primary-text ${location.pathname === '/' ? 'bg-primary-text' : ''}`}>
                    <Home size={20} className="mr-3" />
                    Forums
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/petitions" onClick={handleLinkClick} className={`flex items-center p-3 rounded-lg hover:bg-primary-text ${location.pathname === '/petitions' ? 'bg-primary-text' : ''}`}>
                    <Signature size={20} className="mr-3" />
                    Petitions
                  </Link>
                </li>
                  <li className="mb-2">
                      <Link to="/legal-revisions" onClick={handleLinkClick} className={`flex items-center p-3 rounded-lg hover:bg-primary-text ${location.pathname.startsWith('/legal-revision') ? 'bg-primary-text' : ''}`}>
                          <FileText size={20} className="mr-3" />
                          Legal Revisions
                      </Link>
                  </li>
                  <li className="mb-2">
                    <Link to="/votes" onClick={handleLinkClick} className={`flex items-center p-3 rounded-lg hover:bg-primary-text ${location.pathname.startsWith('/vote') ? 'bg-primary-text' : ''}`}>
                        <Vote size={20} className="mr-3" />
                        Votes
                    </Link>
                  </li>
                  <li className="mb-2">
                      <Link to="/state-elections" onClick={handleLinkClick} className={`flex items-center p-3 rounded-lg hover:bg-primary-text ${location.pathname === '/state-elections' ? 'bg-primary-text' : ''}`}>
                          <Landmark size={20} className="mr-3" />
                          Elections
                      </Link>
                  </li>
              </ul>
            </nav>

              <div>
                  <hr className="border-t border-primary-text my-8" />

                  <div>
                      <ul>
                          <li className="mb-2">
                              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-primary-text">
                                  <Users size={20} className="mr-3" />
                                  Community
                              </a>
                          </li>
                          <li className="mb-2">
                              <a href="#" className="flex items-center p-3 rounded-lg hover:bg-primary-text">
                                  <Archive size={20} className="mr-3" />
                                  Resources
                              </a>
                          </li>
                          <li>
                              <Link to="/settings" onClick={handleLinkClick} className={`flex items-center p-3 rounded-lg hover:bg-primary-text ${location.pathname === '/settings' ? 'bg-primary-text' : ''}`}>
                                  <Settings size={20} className="mr-3" />
                                  Settings
                              </Link>
                          </li>
                      </ul>
                  </div>
                  <div className="mt-8 md:hidden">
                      <Link to="/profile" onClick={handleLinkClick} className="flex items-center p-3 rounded-lg hover:bg-primary-text">
                          <img src="https://i.pravatar.cc/40" alt="Michael C. Labastida" className="rounded-full mr-4" />
                          <div>
                              <p className="font-bold">Michael C. Labastida</p>
                              <p className="text-sm text-gray-400">View Profile</p>
                          </div>
                      </Link>
                  </div>
              </div>
          </div>

        </div>
      </aside>
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-30 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
    </>
  );
};

export default Sidebar;
