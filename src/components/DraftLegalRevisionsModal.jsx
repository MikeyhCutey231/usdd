import React, { useState } from 'react';
import Select from 'react-select';
import { X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { DatePicker } from './DatePicker';

const legalSpecialists = [
  { value: 'john-doe', label: 'John Doe', specialty: 'Constitutional Law', avatar: 'https://i.pravatar.cc/40?u=a' },
  { value: 'jane-smith', label: 'Jane Smith', specialty: 'Criminal Law', avatar: 'https://i.pravatar.cc/40?u=b' },
  { value: 'peter-jones', label: 'Peter Jones', specialty: 'Environmental Law', avatar: 'https://i.pravatar.cc/40?u=c' },
  { value: 'mary-williams', label: 'Mary Williams', specialty: 'Family Law', avatar: 'https://i.pravatar.cc/40?u=d' },
  { value: 'david-brown', label: 'David Brown', specialty: 'Intellectual Property Law', avatar: 'https://i.pravatar.cc/40?u=e' },
];

const formatOptionLabel = ({ label, specialty, avatar }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src={avatar} alt={label} style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }} />
    <div>
      <div>{label}</div>
      <div style={{ fontSize: '0.8em', color: '#ccc' }}>{specialty}</div>
    </div>
  </div>
);

const DraftLegalRevisionModal = ({ isOpen, onClose, petition }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState();
  const [selectedSpecialists, setSelectedSpecialists] = useState([]);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#222222',
      color: 'white',
      borderRadius: '0.5rem',
      padding: '0.5rem',
      border: 'none',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#222222',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: 'white',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: 'white',
      ':hover': {
        backgroundColor: '#FFC107',
        color: 'black',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#FFC107' : '#2D2D2D',
      color: state.isSelected ? 'black' : 'white',
      ':hover': {
        backgroundColor: '#FFFFFF',
        color: 'black',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#2D2D2D',
    }),
  };

  if (!isOpen) {
    return null;
  }

  const handleConfirm = () => {
    if (!title || !date || selectedSpecialists.length === 0) {
      toast.error('Please fill in all fields.');
      return;
    }

    const newLegalRevision = {
      id: uuidv4(),
      petition_id: petition.id,
      title,
      upvotes: 0,
      downvotes: 0,
      comments: [],
      vote: {
        yes: 0,
        no: 0,
      },
      date: date,
      isActive: false,
      specialists: selectedSpecialists.map(s => s.label),
      updated_at: new Date().toISOString(),
    };

    const legalRevisions = JSON.parse(localStorage.getItem('legalRevisions')) || [];
    localStorage.setItem('legalRevisions', JSON.stringify([newLegalRevision, ...legalRevisions]));

    toast.success('Legal Revision drafted successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-xl w-full relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-white">Draft Legal Revision</h2>
        <p className="text-gray-300 mb-6">
          Process of preparing and writing proposed laws or legal rules in a formal and structured manner.
        </p>
        <div>
          <label htmlFor="legal-revision-title" className="block text-sm font-semibold mb-2 text-white">Legal Revision Title</label>
          <input
            type="text"
            id="legal-revision-title"
            placeholder="e.g Bill #2025-04: The Community Garden Act"
            className="w-full bg-primary-text text-white rounded-lg p-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <label htmlFor="legal-specialists" className="block text-sm font-semibold mb-2 text-white">Legal Specialists</label>
          <Select
            id="legal-specialists"
            isMulti
            options={legalSpecialists}
            styles={customStyles}
            onChange={setSelectedSpecialists}
            formatOptionLabel={formatOptionLabel}
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

export default DraftLegalRevisionModal;
