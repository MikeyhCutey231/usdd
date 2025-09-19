import React from 'react';

const elections = {
  federal: [
    {
      title: 'Presidential',
      status: 'Active',
      description: 'Every four years, the U.S. elects the President and Vice President through primaries, party conventions, and a general election held in early November.',
    },
    {
      title: 'Congressional',
      status: 'Inactive',
      description: 'Every two years, voters choose all 435 members of the House of Representatives and about one-third of the 100 members of the Senate.',
    },
    {
      title: 'Senate',
      status: 'Inactive',
      description: 'Senators are elected to six-year terms, and every two years the members of one class—approximately one-third of the senators—face election or reelection.',
    },
  ],
  state: [
    {
      title: 'Gubernatorial',
      status: 'Inactive',
      description: 'The governor is the chief executive of a state, although the specific powers and duties vary by state.',
    },
    {
      title: 'State Legislature',
      status: 'Inactive',
      description: 'State legislators are responsible for drafting and voting on state laws.',
    },
  ],
  local: [
    {
      title: 'Local',
      status: 'Inactive',
      description: 'Local elections are for positions like mayor, city council, school board, and other local offices.',
    },
  ],
};

const ElectionCard = ({ election }) => (
  <div className="bg-[#222222] rounded-lg border border-[#2F2F2F]">
    <div className="p-6">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm text-[#7D7D7D]">USA Elections</p>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${election.status === 'Active' ? 'bg-[#41B883] text-white' : 'bg-[#E83B3C] text-white'}`}>
          {election.status}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-4">{election.title}</h3>
      <p className="text-xs text-[#DDDDDD]">{election.description}</p>
    </div>
    <div className="border-t border-[#2F2F2F] pl-6 pr-6 py-4">
      <button className="text-primary text-sm font-semibol">View Election</button>
    </div>
  </div>
);

const StateElections = () => {
  return (
    <main className="flex-1 p-12 bg-[#1A1A1A] text-white">
      <h2 className="text-4xl font-bold mb-8">State Elections</h2>
      
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-[#DDDDDD]">Federal Elections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {elections.federal.map((election, index) => (
            <ElectionCard key={index} election={election} />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-[#DDDDDD]">State Elections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {elections.state.map((election, index) => (
            <ElectionCard key={index} election={election} />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold mb-4 text-[#DDDDDD]">Local Elections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {elections.local.map((election, index) => (
            <ElectionCard key={index} election={election} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default StateElections;
