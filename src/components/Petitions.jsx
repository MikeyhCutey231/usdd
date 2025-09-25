import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, FileText } from 'lucide-react';
import { useData } from '../DataContext';

const PetitionCard = ({ petition }) => {
  const progress = (petition.signatures / petition.goal) * 100;

  return (
    <div className="bg-[#1E1E1E] rounded-lg border border-[#2F2F2F] flex flex-col">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{petition.title}</h3>
        <p className="text-sm text-[#DDDDDD] mb-4 line-clamp-3">{petition.description}</p>
        <p className="text-primary text-sm"># Submission Ordinance</p>
      </div>
      <div className="px-6 pb-6 mt-auto">
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
          <div className="bg-primary h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm text-gray-400">{petition.signatures} / {petition.goal} Signatures</p>
      </div>
      <div className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Status</p>
          <p className="font-semibold">Petition Active</p>
        </div>
        <Link to={`/petition/${petition.id}`}>
          <button className="bg-[#AC952F] text-white border border-[#FAD83B] py-2 px-4 rounded-lg text-sm font-semibold">
            Cast Signature
          </button>
        </Link>
      </div>
    </div>
  );
};

const Petitions = () => {
  const { petitions } = useData();

  return (
    <main className="flex-1 p-12 bg-secondary text-white">
      {petitions.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-400 h-full pt-50">
          <FileText size={48} className="mb-4" />
          <p>No petitions created at the moment.</p>
        </div>
      ) : (
        <>
          <h2 className="text-4xl font-bold mb-2">Petitions</h2>
          <div className="flex items-center text-primary mb-8">
            <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
            <span>{petitions.length} Active Petitions</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {petitions.map((petition) => (
              <PetitionCard key={petition.id} petition={petition} />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default Petitions;
