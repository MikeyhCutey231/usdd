import React, { useState } from 'react';
import { X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, title }) => {
  const [confirmationText, setConfirmationText] = useState('');
  const email = 'm.labastida1823@gmail.com';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 h-full">
      <div className="bg-[#1E1E1E] rounded-2xl w-full max-w-lg">
          <div className="w-full flex justify-end pt-5 pr-6">
              <button onClick={onClose}>
                  <X size={24} />
              </button>
          </div>
        <div className="flex justify-between items-center mb-6  pl-8 pr-8">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        <div className="space-y-4 pl-8 pr-8">
          <p className="text-[#DDDDDD]">
            To confirm, type "<span className="font-semibold text-white">{email}</span>" in the box below
          </p>
          <input
            type="text"
            value={confirmationText}
            placeholder="Enter your email to confirm"
            onChange={(e) => setConfirmationText(e.target.value)}
            className="w-full bg-[#2A2A2A] rounded-lg p-3"
          />
        </div>
        <div className="flex justify-end space-x-2 mt-8 pl-8 pr-8 pb-8">
          <button onClick={onClose} className="bg-[#2F2F2F] px-6 py-2 rounded-lg">Cancel</button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold disabled:bg-[#CD1010]"
            disabled={confirmationText !== email}
          >
            {title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
