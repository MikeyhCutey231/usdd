import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Globe, Plus, Search, ChevronDown, Menu } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

const Header = ({ setIsSidebarOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-secondary text-white py-4 px-8 flex justify-between items-center border-b border-primary-text">
      <div className="flex items-center">
        <Link to="/" className="text-center">
          <h1 className="text-2xl font-extrabold text-primary leading-tight">Universal Secure</h1>
          <p className="text-xl text-white leading-tight font-medium -mt-1">Direct Democracy</p>
        </Link>
        <nav className="hidden md:flex ml-10">
          <ul className="flex space-x-6 items-center">
            <li>
            <a href="#" className="flex items-center hover:text-primary">
                Topics<ChevronDown size={16} className="ml-0.5" />
              </a>
            </li>
            <li>
            <a href="#" className="flex items-center hover:text-primary">
                News<ChevronDown size={16} className="ml-0.5" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" size={20} />
          <input
            type="text"
            placeholder="Search anything..."
            className="bg-primary-text text-white rounded-lg py-2 pl-10 pr-4 w-full max-w-[32rem] min-w-[200px] focus:outline-none placeholder:text-[#666666]"
          />
        </div>
        <div className="flex items-center space-x-6">
          <Bell size={24} />
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <img
                src="https://i.pravatar.cc/40"
                alt="User Avatar"
                className="rounded-full w-10 h-10"
              />
            </button>
            {isDropdownOpen && <ProfileDropdown onClose={() => setIsDropdownOpen(false)} />}
          </div>
          <Globe size={24} />
          <Link to="/create-post" className="bg-[#AC952F] text-white font-medium py-2 px-3 rounded-lg flex items-center border border-primary">
            <Plus size={20} strokeWidth={3} className="mr-[8px]" />
            Create a post
          </Link>
        </div>
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
