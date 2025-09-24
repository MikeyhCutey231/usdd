import React, { useState } from 'react';
import { X } from 'lucide-react';

const UpdateUsernameModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('@labastida123');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 h-full">
      <div className="bg-[#1E1E1E] p-8 rounded-2xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Update Username</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Username</label>
            <p className="text-sm text-[#DDDDDD] mb-2">Changing your display name won't change your username</p>
            <div className="relative flex items-center">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={30}
                className="w-full bg-[#2A2A2A] rounded-lg p-3"
              />
              <span className="absolute right-3 text-sm text-gray-400">{username.length}/30</span>
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

export default UpdateUsernameModal;
