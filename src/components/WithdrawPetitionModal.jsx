import React from 'react';

const WithdrawPetitionModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-secondary p-8 rounded-lg shadow-lg max-w-md w-full relative transform transition-transform duration-300 ${isOpen ? 'scale-100' : 'scale-95'}`}>
        <h2 className="text-2xl font-bold mb-4 text-white">Withdraw Petition</h2>
        <p className="text-gray-300 mb-9">
          Are you sure you want to withdraw your petition?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-[#AC952F] border border-primary text-white font-bold py-2 px-6 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPetitionModal;
