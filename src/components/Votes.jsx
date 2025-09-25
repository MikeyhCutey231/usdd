import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, FileText } from 'lucide-react';
import { useData } from '../DataContext';

const VoteCard = ({ legalRevision }) => {
  const yesVotes = legalRevision.supported_by.length;
  const noVotes = legalRevision.opposed_by.length;
  const totalVotes = yesVotes + noVotes;
  const yesPercentage = totalVotes > 0 ? (yesVotes / totalVotes) * 100 : 0;
  const noPercentage = totalVotes > 0 ? (noVotes / totalVotes) * 100 : 0;

  return (
    <Link to={`/vote-legal-revision/${legalRevision.id}`} className="block bg-[#222222] p-4 rounded-lg border border-transparent hover:border-primary">
      <h4 className="font-bold text-lg mb-2">{legalRevision.title}</h4>
      <div className="text-sm text-gray-400 mb-4 line-clamp-2">
        <p className="text-[#DDDDDD]">{legalRevision.summary}</p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold">{yesVotes}</p>
          <p className="text-sm text-gray-400">Voted Yes</p>
        </div>
        <div>
          <p className="font-bold">{noVotes}</p>
          <p className="text-sm text-gray-400">Voted No</p>
        </div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4 flex">
        <div className="bg-green-500 h-2.5 rounded-l-full" style={{ width: `${yesPercentage}%` }}></div>
        <div className="bg-red-500 h-2.5 rounded-r-full" style={{ width: `${noPercentage}%` }}></div>
      </div>
    </Link>
  );
};

const Votes = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { legalRevisions, petitions } = useData();

  const enrichedLegalRevisions = legalRevisions
    .filter(leg => leg.isActive)
    .map(leg => {
      const relatedPetition = petitions.find(p => p.id === leg.petition_id);
      return {
        ...leg,
        summary: relatedPetition ? relatedPetition.description : 'No summary found.'
      };
    });

  return (
    <main className="flex-1 p-12 bg-[#1A1A1A] text-white">
      {enrichedLegalRevisions.length === 0 ? (
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
            {enrichedLegalRevisions.map((legalRevision) => (
              <VoteCard key={legalRevision.id} legalRevision={legalRevision} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default Votes;
