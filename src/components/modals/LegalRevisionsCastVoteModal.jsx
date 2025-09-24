import React, { useState } from 'react';
import { X, AlarmClock, HelpCircle, Download } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const LegalRevisionsCastVoteModal = ({ isOpen, onClose, legalRevision, post }) => {
  const [voted, setVoted] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  if (!isOpen) return null;

  const handleVote = () => {
    if (!selectedOption) return;

    setTransactionId(`0x${uuidv4().replace(/-/g, '')}`);
    const storedLegalRevisions = JSON.parse(localStorage.getItem('legalRevisions')) || [];
    const updatedRevisions = storedLegalRevisions.map(rev => {
      if (rev.id === legalRevision.id) {
        const newVote = { ...rev.vote };
        const currentVote = rev.voted;

        if (currentVote) {
          if (currentVote === 'yes') {
            newVote.yes -= 1;
          } else if (currentVote === 'no') {
            newVote.no -= 1;
          }
        }

        if (selectedOption === 'yes') {
          newVote.yes += 1;
        } else if (selectedOption === 'no') {
          newVote.no += 1;
        }
        return { ...rev, vote: newVote, voted: selectedOption };
      }
      return rev;
    });
    localStorage.setItem('legalRevisions', JSON.stringify(updatedRevisions));
    setVoted(selectedOption);
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-end backdrop-blur-sm">
      <div className="w-1/3 bg-[#1A1A1A] h-full shadow-lg overflow-y-auto">
        <div className="p-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Cast Vote</h2>
          <button onClick={onClose}>
            <X size={24} class="text-white" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-b border-[#1F1F1F]">
          <div className="border-r border-[#1F1F1F] p-4 pl-8">
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
            <p className="text-xs font-semibold text-[#707070] mb-1">TITLE</p>
            <p className="text-lg font-normal text-[#EFEFEF]">{legalRevision.title}</p>
          </div>
          <div className="mb-8">
            <p className="text-xs font-semibold text-[#707070] mb-1">DESCRIPTION</p>
            <p className="font-normal text-[#EFEFEF]">{post.content}</p>
          </div>
          <div className="mb-4">
            <p className="text-xs font-semibold text-[#707070]">CREATED BY</p>
            <div className="flex items-center mt-2">
              <img src="https://i.pravatar.cc/40" alt={post.author} className="rounded-full mr-4" />
              <div>
                <p className="font-bold text-white">{post.author}</p>
                <p className="text-sm text-[#EFEFEF]">Posted on {new Date(legalRevision.date.from).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-b border-[#1F1F1F] py-10 px-8">
          <p className="text-xs text-[#707070] font-semibold mb-4">SELECT AN OPTION:</p>
          <div className="flex items-center space-x-8 mb-8">
            <label className="flex items-center">
              <input type="radio" name="vote" className="h-5 w-5 appearance-none rounded-full border border-gray-600 bg-[#2F2F2F] checked:bg-primary" onChange={() => setSelectedOption('yes')} />
              <span className="ml-2 text-white">Vote Yes</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="vote" className="h-5 w-5 appearance-none rounded-full border border-gray-600 bg-[#2F2F2F] checked:bg-primary" onChange={() => setSelectedOption('no')} />
              <span className="ml-2 text-white">Vote No</span>
            </label>
          </div>
          <button onClick={handleVote} className="w-full bg-primary text-black font-bold py-3 rounded-lg">Cast Secure Vote</button>
        </div>
        {voted && (
          <div className="p-8">
            <div className="mt-4">
              <h3 className="text-2xl font-bold mb-4 text-white">Official Voter Receipt</h3>
            <div className="space-y-4 text-sm">
              <p className='text-[#DDDDDD]'><span className="font-bold text-white">Election:</span> Bill #2025-04: The Community Garden Act</p>
              <p className='text-[#DDDDDD]'><span className="font-bold text-white">Status:</span> Your vote has been securely recorded.</p>
              <p className='text-[#DDDDDD]'><span className="font-bold text-white">Timestamp:</span> 16/09/2025, 03:01:23</p>
              <p className="font-bold text-white">Verification Transaction ID:</p>
              <div className="bg-[#AC952F] border border-[#FAD83B] text-white font-semibold rounded-lg p-4">
                <p>{transactionId}</p>
              </div>
              <p className="text-xs text-gray-400">Use this ID on a public block explorer to confirm your vote was tallied. Your choice remains private to protect against coercion.</p>
            </div>
            <button className="w-full flex items-center justify-center mt-8 text-[#23B181] text-sm">
              <Download size={18} className="mr-2" />
              Download Receipt
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default LegalRevisionsCastVoteModal;
