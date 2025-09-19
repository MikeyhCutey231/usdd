import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, FileText } from 'lucide-react';

const PetitionCard = ({ petition }) => {
  const today = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });

  return (
    <div className="bg-[#1E1E1E] rounded-lg border border-[#2F2F2F] flex flex-col">
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{petition.title}</h3>
        <p className="text-sm text-[#DDDDDD] mb-4">{petition.summary}</p>
        <p className="text-primary text-sm"># Submission Ordinance</p>
      </div>
      {petition.isActive ? (
        <div className="px-6 pb-6 mt-auto">
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
            <div className="bg-primary h-2.5 rounded-full" style={{ width: `${(petition.signature_count / 5000) * 100}%` }}></div>
          </div>
          <p className="text-sm text-gray-400">{petition.signature_count} / 5000 Signatures</p>
        </div>
      ) : (
        <div className="border-t-2 border-b-2 border-[#222222] mt-auto">
          <div className="flex items-center text-sm text-gray-400">
            <div className="p-4">
              <Clock size={24} className="text-primary" />
            </div>
            <div className="w-0.5 h-16 bg-[#222222]"></div>
            <div className="p-4 flex-1 text-center text-white">
              <p>START DATE</p>
              <p>{today}</p>
            </div>
            <div className="w-0.5 h-16 bg-[#222222]"></div>
            <div className="p-4 flex-1 text-center text-white">
              <p>END DATE</p>
              <p>{new Date(petition.date).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
              })}</p>
            </div>
          </div>
        </div>
      )}
      <div className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">Status</p>
          <p className="font-semibold">{petition.isActive ? 'Petition Active' : 'Petition Close'}</p>
        </div>
        <Link to={`/petition/${petition.id}`}>
          <button className={`py-2 px-4 rounded-lg text-sm font-semibold ${petition.isActive ? 'bg-[#AC952F] text-white border border-[#FAD83B]' : 'bg-[#666666] text-[#222222]'}`}>
            Cast Signature
          </button>
        </Link>
      </div>
    </div>
  );
};

const Petitions = () => {
  const [petitions, setPetitions] = useState([]);

  useEffect(() => {
    const storedPetitions = JSON.parse(localStorage.getItem('petitions')) || [];
    setPetitions(storedPetitions);
  }, []);

  return (
    <main className="flex-1 p-12 bg-secondary text-white">
      <h2 className="text-4xl font-bold mb-2">Petitions</h2>
      <div className="flex items-center text-primary mb-8">
        <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
        <span>{petitions.filter(p => p.isActive).length} Active Petitions</span>
      </div>
      {petitions.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center text-gray-400 h-64">
          <FileText size={48} className="mb-4" />
          <p>No petitions created at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {petitions.map((petition, index) => (
            <PetitionCard key={index} petition={petition} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Petitions;
