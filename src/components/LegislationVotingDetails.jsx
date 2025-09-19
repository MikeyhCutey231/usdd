import React, { useState } from 'react';
import { ThumbsUp, MessageCircle, Reply, Eye, Flag, MessageSquare, ChevronDown } from 'lucide-react';
import LegislationCastVoteModal from './LegislationCastVoteModal';

const LegislationVotingDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className="flex-1 p-12 bg-[#1A1A1A] text-white">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 pr-8">
            <h1 className="text-4xl font-bold mb-4">Bill #2025-04: The Community Garden Act</h1>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/40" alt="Michael C. Labastida" className="rounded-full mr-4" />
                <div>
                  <p className="font-bold">Michael C. Labastida</p>
                  <p className="text-sm text-gray-400">Posted 18 hrs ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Flag size={20} className="text-yellow-500 mr-2" />
                  <span>91</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare size={20} className="text-gray-400 mr-2" />
                  <span>24</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 text-gray-300 mb-8">
              <p>Section 1: The parcel of land located at 123 Elm Street, currently designated as Lot B, shall be repurposed for public use as a community garden. The garden will be managed by a volunteer board, to be elected annually.</p>
              <p>Section 2: The city shall allocate a one-time budget of $10,000 for initial setup, including soil, tools, and irrigation systems.</p>
              <p>Section 3: Membership in the garden is open to all residents of the city.</p>
              <p>Section 4: The volunteer board shall be responsible for establishing garden rules, including plot assignments, maintenance schedules, and guidelines for shared resources.</p>
            </div>
            
            <h2 className="text-2xl font-bold mb-6">281 Comments</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-3">
                  <img src="https://i.pravatar.cc/40?u=a" alt="Johnfritz Antipuesto" className="rounded-full mr-4" />
                  <p className="font-bold">Johnfritz Antipuesto</p>
                </div>
                <input
                  type="text"
                  placeholder="Add your comment here."
                  className="w-full bg-[#2D2D2D] text-white rounded-lg p-3 border border-[#2F2F2F]"
                />
              </div>
              <div className="flex items-start">
                <img src="https://i.pravatar.cc/40?u=b" alt="John Doe" className="rounded-full mr-4" />
                <div className="flex-1">
                  <p className="font-bold">John Doe</p>
                  <p className="text-sm text-gray-400 mb-2">1 day ago</p>
                  <p className="text-gray-300">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                  <div className="flex items-center mt-2 text-gray-400">
                    <button className="flex items-center mr-4 hover:text-white">
                      <ThumbsUp size={16} className="mr-1" /> 24
                    </button>
                    <button className="flex items-center mr-4 hover:text-white">
                      <MessageCircle size={16} className="mr-1" /> 5
                    </button>
                    <button className="flex items-center hover:text-white">
                      <Reply size={16} className="mr-1" /> Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
            <div className="border border-[#2F2F2F] p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Vote Count</h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4 flex">
                <div className="bg-green-500 h-2.5 rounded-l-full" style={{ width: '60.02%' }}></div>
                <div className="bg-red-500 h-2.5 rounded-r-full" style={{ width: '34.12%' }}></div>
              </div>
              <div className="flex justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Voted Yes 60.02%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                  <span>Voted No 34.12%</span>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="w-full bg-primary text-black font-bold py-2 px-4 rounded-lg">Cast Vote</button>
              
              <h3 className="text-lg font-bold mb-4 mt-8">Petition Activity</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Flag size={16} className="mr-2" /> 91 likes
                </li>
                <li className="flex items-center">
                  <MessageSquare size={16} className="mr-2" /> 310 comments
                </li>
                <li className="flex items-center">
                  <Eye size={16} className="mr-2" /> 1k watching
                </li>
              </ul>
              <hr className="border-t border-[#2F2F2F] my-6" />
              <h3 className="text-lg font-bold mb-4">Rules & Regulations</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex justify-between items-start">
                  <span className="mr-2">1. Respect each others opinion</span>
                  <ChevronDown size={20} className="flex-shrink-0" />
                </li>
                <li className="flex justify-between items-start">
                  <span className="mr-2">2. Keep discussion civil</span>
                  <ChevronDown size={20} className="flex-shrink-0" />
                </li>
                <li className="flex justify-between items-start">
                  <span className="mr-2">3. Promotion of personal social media accounts is not allowed.</span>
                  <ChevronDown size={20} className="flex-shrink-0" />
                </li>
                <li className="flex justify-between items-start">
                  <span className="mr-2">4. Posting of private posts</span>
                  <ChevronDown size={20} className="flex-shrink-0" />
                </li>
                <li className="flex justify-between items-start">
                  <span className="mr-2">5. Spamming is not allowed</span>
                  <ChevronDown size={20} className="flex-shrink-0" />
                </li>
              </ul>
              <hr className="border-t border-[#2F2F2F] my-6" />
              <h3 className="text-lg font-bold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#333333] text-gray-300 px-3 py-1 rounded-full text-sm">Technology</span>
                <span className="bg-[#333333] text-gray-300 px-3 py-1 rounded-full text-sm">Fashion</span>
                <span className="bg-[#333333] text-gray-300 px-3 py-1 rounded-full text-sm">Politics</span>
                <span className="bg-[#333333] text-gray-300 px-3 py-1 rounded-full text-sm">Business</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <LegislationCastVoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default LegislationVotingDetails;
