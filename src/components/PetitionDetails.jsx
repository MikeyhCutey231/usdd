import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { ThumbsUp, MessageCircle, Reply, Eye, Flag, MessageSquare, ChevronDown, FileText, ArrowLeft, RefreshCw } from 'lucide-react';
import SignatureModal from './modals/SignatureModal';
import ProposedSolutionModal from './modals/ProposedSolutionModal';
import WithdrawPetitionModal from './modals/WithdrawPetitionModal';
import DraftLegalRevisionModal from './modals/DraftLegalRevisionsModal';
import { useData } from '../DataContext';

const PetitionDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const pageName = new URLSearchParams(location.search).get('page_name');

  const { petitions, setPetitions, posts, setPosts, legalRevisions } = useData();

  const petition = petitions.find(p => p.id === id);
  const post = petition ? posts.find(p => p.id === petition.post_id) : null;
  const isDrafted = legalRevisions.some(rev => rev.petition_id === id);

  const handleLike = () => {
    const updatedPosts = posts.map(p => {
      if (p.id === post.id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    setPosts(updatedPosts);
  };

  const handleComment = (e) => {
    e.preventDefault();
    const updatedPosts = posts.map(p => {
      if (p.id === post.id) {
        const newComment = {
          id: uuidv4(),
          author: 'Johnfritz Antipuesto',
          content: comment,
          date: new Date().toISOString(),
        };
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    });
    setPosts(updatedPosts);
    setComment('');
  };

  const handleWithdraw = () => {
    const updatedPetitions = petitions.filter(p => p.id !== petition.id);
    setPetitions(updatedPetitions);

    const updatedPosts = posts.map(p => {
      if (p.id === petition.post_id) {
        return { ...p, isInPetition: false };
      }
      return p;
    });
    setPosts(updatedPosts);

    setIsWithdrawModalOpen(false);
    toast.success('Petition Withdrawn Successfully.');
    navigate('/profile');
  };

  if (!petition || !post) {
    return <div className="text-white text-center p-12">Petition not found.</div>;
  }

  return (
    <>
    <main className="flex-1 p-12 bg-secondary text-white">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 pr-8">
            {pageName === 'accountProfilePetition' && (
              <div className="flex justify-between items-center mb-6">
                <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-white">
                  <ArrowLeft size={20} className="mr-2" />
                  Go Back
                </button>
                <button onClick={() => setIsWithdrawModalOpen(true)} className="flex items-center bg-[#222222] text-white rounded-lg py-2 px-4 text-sm">
                  <RefreshCw size={16} className="mr-2" />
                  Withdraw Petition
                </button>
              </div>
            )}
            <h1 className="text-3xl font-bold mb-4">{petition.title}</h1>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/40" alt={post.author} className="rounded-full mr-4" />
                <div>
                  <p className="font-bold">{post.author}</p>
                  <p className="text-sm text-gray-400">{new Date(petition.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <button onClick={handleLike} className="flex items-center">
                    <Flag size={20} className={post.liked ? "text-yellow-500 mr-2" : "text-gray-400 mr-2"} />
                    <span>{post.likes}</span>
                  </button>
                </div>
                <div className="flex items-center">
                  <MessageSquare size={20} className="text-gray-400 mr-2" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-8">{petition.description}</p>
            
            <h2 className="text-2xl font-bold mb-6">{post.comments.length} Comments</h2>
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
              {post.comments.map(c => (
                <div key={c.id} className="flex items-start">
                  <img src={`https://i.pravatar.cc/40?u=${c.author}`} alt={c.author} className="rounded-full mr-4" />
                  <div className="flex-1">
                    <p className="font-bold">{c.author}</p>
                    {c.date && <p className="text-sm text-gray-400 mb-2">{new Date(c.date).toLocaleDateString()}</p>}
                    <p className="text-gray-300">{c.content}</p>
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
          <div className="border border-primary-text p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Signature Count</h3>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(petition.signatures / petition.goal) * 100}%` }}></div>
              </div>
              <div className="flex items-center text-sm text-gray-400 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>{petition.signatures} Signatures</span>
              </div>
              <div className="flex items-stretch">
                {pageName === 'accountProfilePetition' ? (
                  <button
                    onClick={() => setIsDraftModalOpen(true)}
                    className={`w-full font-bold py-2 px-4 rounded-lg ${
                      isDrafted ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-primary text-black'
                    }`}
                    disabled={isDrafted}
                  >
                    {isDrafted ? 'Drafted' : 'Draft Legal Revision'}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={`w-full font-bold py-2 px-4 rounded-lg ${
                      petition.signatures >= petition.goal
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-primary text-black'
                    }`}
                    disabled={petition.signatures >= petition.goal}
                  >
                    Vote Signature
                  </button>
                )}
                <button onClick={() => setIsSolutionModalOpen(true)} className="ml-2 p-2 bg-gray-700 rounded-lg">
                  <FileText size={20} />
                </button>
              </div>
              
              <h3 className="text-lg font-bold mb-4 mt-8">Petition Activity</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Flag size={16} className="mr-2" /> {post.likes} likes
                </li>
                <li className="flex items-center">
                  <MessageSquare size={16} className="mr-2" /> {post.comments.length} comments
                </li>
                <li className="flex items-center">
                  <Eye size={16} className="mr-2" /> 1k watching
                </li>
              </ul>
            <hr className="border-t border-primary-text my-6" />
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
      </main>
      <SignatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        petition={petition}
        post={post}
        onSignatureCast={() => {}}
      />
      <ProposedSolutionModal
        isOpen={isSolutionModalOpen}
        onClose={() => setIsSolutionModalOpen(false)}
        solution={petition.description}
      />
      <WithdrawPetitionModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={handleWithdraw}
      />
      <DraftLegalRevisionModal
        isOpen={isDraftModalOpen}
        onClose={() => setIsDraftModalOpen(false)}
        petition={petition}
      />
    </>
  );
};

export default PetitionDetails;
