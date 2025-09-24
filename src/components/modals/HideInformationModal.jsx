import React from 'react';
import { X } from 'lucide-react';

const HideInformationModal = ({ isOpen, onClose, onConfirm, isEnabled }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 h-full">
      <div className="bg-[#1E1E1E] rounded-2xl w-full max-w-lg">
          <div className="w-full flex justify-end pt-5 pr-6">
              <button onClick={onClose}>
                  <X size={24} />
              </button>
          </div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold pl-8 pr-8">Hide information</h2>
        </div>
        <p className="text-[#DDDDDD] mb-8 pl-8 pr-8">
          By enabling hide information, all your post will be anonymous and no one will be able to search for your identity.
        </p>
        <div className="flex justify-end pl-8 pr-8 pb-8">
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-primary text-black px-6 py-2 rounded-lg font-semibold"
          >
            {isEnabled ? 'Disable' : 'Enable'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HideInformationModal;
