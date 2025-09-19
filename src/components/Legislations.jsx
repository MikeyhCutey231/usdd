import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown } from 'lucide-react';

const legislations = [
  {
    title: 'Bill #2025-04: The Community Garden Act',
    phase: 'Drafting Phase',
    sections: [
      'Section 1: The parcel of land located at 123 Elm Street, currently designated as Lot B, shall be repurposed for public use as a community garden. The garden will be managed by a volunteer board, to be elected annually.',
      'Section 2: The city shall allocate a one-time budget of $10,000 for initial setup, including soil, tools, and irrigation systems.',
      'Section 3: Membership in the garden is open to all residents of the city.',
    ],
    dates: 'March 23, 2024 - October 01, 2025',
  },
  {
    title: 'Bill #2025-04: The Community Garden Act',
    phase: 'Voting Phase',
    sections: [
      'Section 1: The parcel of land located at 123 Elm Street, currently designated as Lot B, shall be repurposed for public use as a community garden. The garden will be managed by a volunteer board, to be elected annually.',
      'Section 2: The city shall allocate a one-time budget of $10,000 for initial setup, including soil, tools, and irrigation systems.',
      'Section 3: Membership in the garden is open to all residents of the city.',
    ],
    dates: 'March 23, 2024 - October 01, 2025',
  },
];

const LegislationCard = ({ legislation }) => (
  <div className="bg-primary-text rounded-lg border-l-4 border-primary">
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-bold">{legislation.title}</h3>
        <span className={`text-xs font-regular ${legislation.phase === 'Drafting Phase' ? 'text-primary' : 'text-green-500'}`}>
          {legislation.phase}
        </span>
      </div>
      <div className="space-y-4 text-gray-400 border-t border-[#2F2F2F] pt-4">
        {legislation.sections.map((section, index) => (
          <p className="text-[#DDDDDD]" key={index}>{section}</p>
        ))}
      </div>
    </div>
    <div className="px-6 py-4 flex justify-between items-center">
      <Link to={`/legislation/${legislation.title.toLowerCase().replace(/\s+/g, '-')}`}>
        <button className="text-primary text-sm font-bold border border-primary rounded-lg px-4 py-2">
          {legislation.phase === 'Drafting Phase' ? 'Suggest Edit' : 'Cast Vote'}
        </button>
      </Link>
      <p className="text-sm text-[#666666]">{legislation.dates}</p>
    </div>
  </div>
);

const Legislations = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <main className="flex-1 p-12 bg-[#1A1A1A] text-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">Legislations</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a legislation..."
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
                <div className="mb-4 relative">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Phase</label>
                  <select className="w-full bg-[#333333] text-white rounded-lg p-2 appearance-none pr-10">
                    <option>All</option>
                    <option>Drafting Phase</option>
                    <option>Voting Phase</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-3 top-9 text-gray-400" />
                </div>
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
        {legislations.map((legislation, index) => (
          <LegislationCard key={index} legislation={legislation} />
        ))}
      </div>
    </main>
  );
};

export default Legislations;
