import React, { useState } from 'react';
import { X, Camera } from 'lucide-react';

const UpdateProfileModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState('Labastida Michael');
  const [gender, setGender] = useState('Male');
  const [biography, setBiography] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 h-full">
      <div className="bg-[#1E1E1E] rounded-2xl w-full max-w-md -mt-10">
          <div className="w-full flex justify-end pt-5 pr-6">
              <button onClick={onClose}>
                  <X size={24} />
              </button>
          </div>
        <div className="p-8 pt-4">
          <div className="flex justify-end">
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Profile Information</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/100"
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <button className="absolute bottom-0 right-0 bg-gray-700 p-2 rounded-full">
              <Camera size={16} />
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={30}
                className="w-full bg-[#2A2A2A] rounded-lg p-3"
              />
              <span className="absolute right-3 top-3 text-sm text-gray-400">{name.length}/30</span>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2">Gender</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full bg-[#2A2A2A] rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Biography</label>
            <textarea
              value={biography}
              placeholder={"Write a short biography..."}
              onChange={(e) => setBiography(e.target.value)}
              className="w-full bg-[#2A2A2A] rounded-lg p-3 h-24 resize-none"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-8">
          <button onClick={onClose} className="bg-[#2F2F2F] px-6 py-2 rounded-lg">Cancel</button>
          <button className="bg-primary text-black px-6 py-2 rounded-lg font-semibold">Save</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
