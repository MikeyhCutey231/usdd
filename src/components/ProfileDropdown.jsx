import React from 'react';
import { Link } from 'react-router-dom';
import { User, Bookmark, Users, ShoppingCart, ArrowUpCircle, Moon, LogOut } from 'lucide-react';

const ProfileDropdown = ({ onClose }) => {
  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-72 bg-[#222222] rounded-lg shadow-lg">
      <Link to="/profile" className="p-4 border-b border-gray-700 block" onClick={handleLinkClick}>
        <div className="flex items-center">
          <img src="https://i.pravatar.cc/40" alt="User Avatar" className="rounded-full mr-4" />
          <div>
            <p className="font-bold">Michael C. Labastida</p>
            <p className="text-sm text-gray-400">View Profile</p>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <ul className="space-y-4">
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <Bookmark size={20} className="mr-3" />
              Bookmarks
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <Users size={20} className="mr-3" />
              Manage Proxy
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <ShoppingCart size={20} className="mr-3" />
              Shop
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <ArrowUpCircle size={20} className="mr-3" />
              Exclusive Booster
            </a>
          </li>
          <li className="flex items-center justify-between text-gray-300">
            <div className="flex items-center">
              <Moon size={20} className="mr-3" />
              Dark Mode
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-10 h-5 bg-gray-700 rounded-full"></div>
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </li>
          <li>
            <a href="#" className="flex items-center text-gray-300 hover:text-white">
              <LogOut size={20} className="mr-3" />
              Log Out
            </a>
          </li>
        </ul>
      </div>
      <div className="p-4 border-t border-gray-700">
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="#" className="hover:text-white">Settings</a></li>
          <li><a href="#" className="hover:text-white">Languages</a></li>
          <li><a href="#" className="hover:text-white">Help</a></li>
          <li><a href="#" className="hover:text-white">Terms and Privacy</a></li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileDropdown;
