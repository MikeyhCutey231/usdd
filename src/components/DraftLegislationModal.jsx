import React, { useState } from 'react';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { DatePicker } from './DatePicker';

const DraftLegislationModal = ({ isOpen, onClose, petition }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState();

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    if (!title || !date) {
      toast.error('Please fill in all fields.');
      return;
    }

    const newLegislation = {
      id: uuidv4(),
      petition_id: petition.id,
      title,
      yes: 0,
      no: 0,
      abstain: 0,
      date: date,
      isActive: false,
    };

    const legislations = JSON.parse(localStorage.getItem('legislations')) || [];
    localStorage.setItem('legislations', JSON.stringify([newLegislation, ...legislations]));

    toast.success('Legislation drafted successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">Draft Legislation</h2>
        <p className="text-gray-300 mb-6">
          Process of preparing and writing proposed laws or legal rules in a formal and structured manner.
        </p>
        <div>
          <label htmlFor="legislation-title" className="block text-sm font-semibold mb-2 text-white">Legislation Title</label>
          <input
            type="text"
            id="legislation-title"
            placeholder="e.g Bill #2025-04: The Community Garden Act"
            className="w-full bg-primary-text text-white rounded-lg p-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-6 text-white">
          <DatePicker onSelect={(selectedDate) => setDate(selectedDate)} />
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={handleConfirm}
            className="w-full bg-primary text-black font-bold py-3 rounded-lg"
          >
            Start Drafting
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraftLegislationModal;
