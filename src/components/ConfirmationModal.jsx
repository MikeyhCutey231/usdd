import React from 'react';
import { X } from 'lucide-react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-secondary p-8 rounded-lg shadow-lg max-w-md w-full relative transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Filed Petition</h2>
        <p className="text-gray-300 mb-8">
          Once the petition has been filed, you cannot modify the existing details within the system; however, you are allowed to withdraw the filed petition.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="bg-primary text-black font-bold py-2 px-6 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
