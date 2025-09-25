import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp, MessageCircle, Reply, Eye, MessageSquare, ChevronDown } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import LegalRevisionsCastVoteModal from './modals/LegalRevisionsCastVoteModal';
import { useData } from '../DataContext';

const VoteLegalRevision = () => {
  const { id } = useParams();
  const { legalRevisions, setLegalRevisions, petitions, posts } = useData();

  const legalRevision = legalRevisions.find(l => l.id === id);
  const petition = legalRevision ? petitions.find(p => p.id === legalRevision.petition_id) : null;
  const post = petition ? posts.find(p => p.id === petition.post_id) : null;

  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!legalRevision || !petition || !post) {
    return <div className="text-white text-center p-12">Legal revision not found.</div>;
  }

  const handleComment = (e) => {
    e.preventDefault();
    const newComment = {
      id: uuidv4(),
      author: 'Johnfritz Antipuesto',
      content: comment,
      date: new Date().toISOString(),
    };
    const updatedRevisions = legalRevisions.map(rev => {
      if (rev.id === id) {
        return { ...rev, comments: [...(rev.comments || []), newComment] };
      }
      return rev;
    });
    setLegalRevisions(updatedRevisions);
    setComment('');
  };

  const renderSlateContent = (content) => {
    if (typeof content !== 'string') {
      return <p className="text-[#DDDDDD]">Invalid content</p>;
    }

    const lines = content.split('\n').map(line => line.trim()).filter(line => line);

    return lines.map((line, index) => {
      const parts = line.split('**');
      const formattedLine = parts.map((part, i) => {
        return i % 2 === 1 ? <strong key={i}>{part}</strong> : part;
      });
      return <p key={index} className="text-[#DDDDDD] mb-2">{formattedLine}</p>;
    });
  };

  return (
    <main className="flex-1 p-12 bg-[#1A1A1A] text-white">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 pr-8">
          <h1 className="text-4xl font-bold mb-4">{legalRevision.title}</h1>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img src="https://i.pravatar.cc/40" alt={post.author} className="rounded-full mr-4" />
              <div>
                <p className="font-bold">{post.author}</p>
                <p className="text-sm text-gray-400">Posted on {new Date(legalRevision.date.from).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <MessageSquare size={20} className="text-gray-400 mr-2" />
                    <span>{(legalRevision.comments || []).length}</span>
                </div>
            </div>
          </div>
          <div className="space-y-4 text-gray-300 mb-8">
            {renderSlateContent(legalRevision.content)}
          </div>
          
          <h2 className="text-2xl font-bold mb-6">{(legalRevision.comments || []).length} Comments</h2>
          <div className="space-y-6">
            <form onSubmit={handleComment}>
              <div className="flex items-center mb-3">
                <img src="https://i.pravatar.cc/40?u=a" alt="Johnfritz Antipuesto" className="rounded-full mr-4" />
                <p className="font-bold">Johnfritz Antipuesto</p>
              </div>
              <input
                type="text"
                placeholder="Add your comment here."
                className="w-full bg-[#2D2D2D] text-white rounded-lg p-3 border border-[#2F2F2F]"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </form>
            {(legalRevision.comments || []).map(comment => (
              <div key={comment.id} className="flex items-start">
                <img src={`https://i.pravatar.cc/40?u=${comment.author}`} alt={comment.author} className="rounded-full mr-4" />
                <div className="flex-1">
                  <p className="font-bold">{comment.author}</p>
                  <p className="text-sm text-gray-400 mb-2">{new Date(comment.date).toLocaleDateString()}</p>
                  <p className="text-gray-300">{comment.content}</p>
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
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/3 mt-8 md:mt-0">
          <div className="border border-[#2F2F2F] p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Vote Count</h3>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4 flex">
                <div className="bg-green-500 h-2.5 rounded-l-full" style={{ width: `${(legalRevision.supported_by.length / (legalRevision.supported_by.length + legalRevision.opposed_by.length)) * 100}%` }}></div>
                <div className="bg-red-500 h-2.5 rounded-r-full" style={{ width: `${(legalRevision.opposed_by.length / (legalRevision.supported_by.length + legalRevision.opposed_by.length)) * 100}%` }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mb-4">
                <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span>Voted Yes {((legalRevision.supported_by.length / (legalRevision.supported_by.length + legalRevision.opposed_by.length)) * 100).toFixed(2)}%</span>
                </div>
                <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span>Voted No {((legalRevision.opposed_by.length / (legalRevision.supported_by.length + legalRevision.opposed_by.length)) * 100).toFixed(2)}%</span>
                </div>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="w-full bg-primary text-black font-bold py-2 px-4 rounded-lg">Cast Vote</button>
            <hr className="border-t border-[#2F2F2F] my-6" />
            <h3 className="text-lg font-bold mb-4">Petition Activity</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <MessageSquare size={16} className="mr-2" /> {(legalRevision.comments || []).length} comments
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
          </div>
        </div>
      </div>
      <LegalRevisionsCastVoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} legalRevision={legalRevision} post={post} />
    </main>
  );
};

export default VoteLegalRevision;
