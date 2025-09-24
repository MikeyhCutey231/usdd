import React, { useState } from 'react';
import { X } from 'lucide-react';

const UpdateCountryModal = ({ isOpen, onClose }) => {
  const [language, setLanguage] = useState('English');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 h-full">
      <div className="bg-[#1E1E1E] p-8 rounded-2xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Language Translation</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Language</label>
            <p className="text-sm text-[#DDDDDD] mb-8">Let us know which language you're most comfortable using. You can change it back at any time</p>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-[#2A2A2A] rounded-lg p-3 appearance-none"
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-8">
          <button onClick={onClose} className="bg-[#2F2F2F] px-6 py-2 rounded-lg">Cancel</button>
          <button className="bg-primary text-black px-6 py-2 rounded-lg font-semibold">Save</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCountryModal;
