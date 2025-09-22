import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown, FileText } from 'lucide-react';

const VoteCard = ({ legalRevision }) => {

  const renderSlateContent = (content) => {
    if (!Array.isArray(content)) {
      return <p className="text-[#DDDDDD]">{content}</p>;
    }
    return content.map((node, index) => {
      if (node.type === 'paragraph') {
        return (
          <p key={index} className="text-[#DDDDDD]">
            {node.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <Link to={`/vote-legal-revision/${legalRevision.id}`} className="block bg-[#222222] p-4 rounded-lg border border-transparent hover:border-primary">
      <h4 className="font-bold text-lg mb-2">{legalRevision.title}</h4>
      <div className="text-sm text-gray-400 mb-4 line-clamp-2">
        {renderSlateContent(legalRevision.proposed_solution)}
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">{legalRevision.vote.yes}</p>
          <p className="text-sm text-gray-400">Voted Yes</p>
        </div>
        <div>
          <p className="font-bold">{legalRevision.vote.no}</p>
          <p className="text-sm text-gray-400">Voted No</p>
        </div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4 flex">
        <div className="bg-green-500 h-2.5 rounded-l-full" style={{ width: `${(legalRevision.vote.yes / (legalRevision.vote.yes + legalRevision.vote.no)) * 100}%` }}></div>
        <div className="bg-red-500 h-2.5 rounded-r-full" style={{ width: `${(legalRevision.vote.no / (legalRevision.vote.yes + legalRevision.vote.no)) * 100}%` }}></div>
      </div>
    </Link>
  );
};

const Votes = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [legalRevisions, setLegalRevisions] = useState([]);

  useEffect(() => {
    const storedLegalRevisions = JSON.parse(localStorage.getItem('legalRevisions')) || [];
    const storedPetitions = JSON.parse(localStorage.getItem('petitions')) || [];

    const enrichedLegalRevisions = storedLegalRevisions
      .filter(leg => leg.isActive)
      .map(leg => {
        const relatedPetition = storedPetitions.find(p => p.id === leg.petition_id);
        return {
          ...leg,
          proposed_solution: relatedPetition ? relatedPetition.proposed_solution : 'No proposed solution found.'
        };
      });

    setLegalRevisions(enrichedLegalRevisions);
  }, []);

  return (
    <main className="flex-1 p-12 bg-[#1A1A1A] text-white">
      {legalRevisions.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-400 h-full pt-50">
          <FileText size={48} className="mb-4" />
          <p>No Bill to be voted at the moment</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold">Votes</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for a vote..."
                  className="bg-[#222222] text-white rounded-lg py-2 pl-10 pr-4"
                />
              </div>
              <div className="relative">
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center bg-[#222222] text-white rounded-lg py-2 px-4">
                  <Filter size={20} className="mr-2" />
                  Filter
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-96 bg-[#222222] rounded-lg shadow-lg p-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
                      <div className="grid grid-cols-2 gap-2">
                        <input type="date" className="w-full bg-[#333333] text-white rounded-lg p-2" />
                        <input type="date" className="w-full bg-[#333333] text-white rounded-lg p-2" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {legalRevisions.map((legalRevision, index) => (
              <VoteCard key={index} legalRevision={legalRevision} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default Votes;
