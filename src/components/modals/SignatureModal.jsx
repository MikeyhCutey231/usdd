import React from 'react';
import toast from 'react-hot-toast';
import { X, HelpCircle, AlarmClock } from 'lucide-react';
import { useData } from '../../DataContext';

const SignatureModal = ({ isOpen, onClose, petition, post }) => {
  const { petitions, setPetitions } = useData();

  if (!isOpen) return null;

  const handleSupport = () => {
    const updatedPetitions = petitions.map(p => {
      if (p.id === petition.id) {
        return {
          ...p,
          signatures: p.signatures + 1,
        };
      }
      return p;
    });
    setPetitions(updatedPetitions);
    toast.success('Successfully Supported this Petition.');
    onClose();
  };

  return (
    <div className={`fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-end z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`w-1/3 bg-secondary h-full shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Cast Signature</h2>
          <button onClick={onClose}>
            <X size={24} className="text-white"/>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-b border-[#1F1F1F]">
          <div className="border-r border-[#1F1F1F] p-4">
            <p className="text-xs text-[#707070] mb-1">TIME REMAINING</p>
            <div className="flex items-center text-lg font-semibold text-white">
              <AlarmClock size={14} className="mr-2" />
              <span>
                <span className="text-white">01</span><span className="text-[#C5C5C5] font-normal text-sm mr-1"> D </span>
                <span className="text-white">13</span><span className="text-[#C5C5C5] font-normal text-sm mr-1"> H </span>
                <span className="text-white">10</span><span className="text-[#C5C5C5] font-normal text-sm mr-1"> M </span>
                <span className="text-white">07</span><span className="text-[#C5C5C5] font-normal text-sm mr-1"> S</span>
              </span>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs mb-1 text-[#707070] flex items-center">QUOROM <HelpCircle size={16} className="ml-2" /></p>
            <p className="text-lg font-bold text-white">40%</p>
          </div>
        </div>
        <div className="p-8">
          <div className="mb-8">
            <p className="text-sm text-[#707070] mb-1">TITLE</p>
            <p className="text-lg font-normal text-[#EFEFEF]">{petition.title}</p>
          </div>
          <div className="mb-8">
            <p className="text-sm text-[#707070] mb-1">DESCRIPTION</p>
            <p className="font-normal text-[#EFEFEF]">{petition.description}</p>
          </div>
          <div className="mb-8">
            <p className="text-sm text-[#707070]">CREATED BY</p>
            <div className="flex items-center mt-2">
              <img src={`https://i.pravatar.cc/40?u=${post.author}`} alt={post.author} className="rounded-full mr-4" />
              <div>
                <p className="font-bold text-white">{post.author}</p>
              </div>
            </div>
          </div>
        <button
          onClick={handleSupport}
          className="w-full bg-primary text-black font-bold py-3 rounded-lg"
        >
          Support Initiative
        </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureModal;
