import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, FileText } from 'lucide-react';
import { useData } from '../DataContext';

const LegalRevisionCard = ({ legalRevision }) => {
  const dates = legalRevision.date ? `${new Date(legalRevision.date.from).toLocaleDateString()} - ${new Date(legalRevision.date.to).toLocaleDateString()}` : 'No dates specified';

  return (
    <div className="bg-primary-text rounded-lg border-l-4 border-primary">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold">{legalRevision.title}</h3>
          <span className="text-xs font-regular text-primary">
            Drafting Phase
          </span>
        </div>
        <div className="space-y-4 text-gray-400 border-t border-[#2F2F2F] pt-4 line-clamp-4">
          <p className="text-[#DDDDDD]">{legalRevision.summary}</p>
        </div>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <Link to={`/legal-revision/${legalRevision.id}`}>
          <button className="text-primary text-sm font-bold border border-primary rounded-lg px-4 py-2">
            View Bill
          </button>
        </Link>
        <p className="text-sm text-[#666666]">{dates}</p>
      </div>
    </div>
  );
};

const LegalRevisions = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { legalRevisions, petitions } = useData();

  const enrichedLegalRevisions = legalRevisions
    .filter(leg => !leg.isActive)
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
          <p>There are currently no available legal revision</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold">Legal Revisions</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for a legal revision..."
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
          <div className="space-y-8">
            {enrichedLegalRevisions.map((legalRevision) => (
              <LegalRevisionCard key={legalRevision.id} legalRevision={legalRevision} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default LegalRevisions;
