import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    ThumbsUp,
    ThumbsDown,
    MessageCircle,
    Reply,
    Eye,
    MessageSquare,
    ChevronDown,
    Clock,
    AlarmCheck
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useData } from '../DataContext';

const LegalRevisionDetails = () => {
  const { id } = useParams();
  const { legalRevisions, setLegalRevisions, petitions, posts } = useData();
  
  const legalRevision = legalRevisions.find(l => l.id === id);
  const petition = legalRevision ? petitions.find(p => p.id === legalRevision.petition_id) : null;
  const post = petition ? posts.find(p => p.id === petition.post_id) : null;

  const [timeLeft, setTimeLeft] = useState('');
  const [comment, setComment] = useState('');
  
  // Mock current user
  const currentUser = 'CurrentUser'; 
  const voted = legalRevision?.supported_by.some(v => v.voter === currentUser) ? 'upvoted' : legalRevision?.opposed_by.some(v => v.voter === currentUser) ? 'downvoted' : null;

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!legalRevision) return {};
      const difference = +new Date(legalRevision.date.to) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return timeLeft;
    }

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

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

  const handleVote = (type) => {
    const updatedRevisions = legalRevisions.map(rev => {
      if (rev.id === id) {
        let supported = [...rev.supported_by];
        let opposed = [...rev.opposed_by];
        const newVote = { id: uuidv4(), voter: currentUser, comment: '' };

        const supportIndex = supported.findIndex(v => v.voter === currentUser);
        const opposeIndex = opposed.findIndex(v => v.voter === currentUser);

        if (type === 'upvote') {
          if (supportIndex > -1) { // Already upvoted, so remove upvote
            supported.splice(supportIndex, 1);
          } else { // Not upvoted, so add upvote
            supported.push(newVote);
            if (opposeIndex > -1) { // Was downvoted, so remove downvote
              opposed.splice(opposeIndex, 1);
            }
          }
        } else if (type === 'downvote') {
          if (opposeIndex > -1) { // Already downvoted, so remove downvote
            opposed.splice(opposeIndex, 1);
          } else { // Not downvoted, so add downvote
            opposed.push(newVote);
            if (supportIndex > -1) { // Was upvoted, so remove upvote
              supported.splice(supportIndex, 1);
            }
          }
        }
        return { ...rev, supported_by: supported, opposed_by: opposed };
      }
      return rev;
    });
    setLegalRevisions(updatedRevisions);
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
              <button onClick={() => handleVote('upvote')} className="flex items-center">
                <ThumbsUp size={20} className={voted === 'upvoted' ? 'text-primary' : 'text-gray-400'} />
                <span className="ml-2">{legalRevision.supported_by.length}</span>
              </button>
              <button onClick={() => handleVote('downvote')} className="flex items-center">
                <ThumbsDown size={20} className={voted === 'downvoted' ? 'text-primary' : 'text-gray-400'} />
                <span className="ml-2">{legalRevision.opposed_by.length}</span>
              </button>
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
            <div className="flex items-center mb-4">
              <AlarmCheck size={20} className="mr-2 text-primary" />
              <h3 className="text-lg font-bold text-primary">Time Left</h3>
            </div>
            <div className="flex justify-around items-center">
              <div className="text-center">
                <p className="text-2xl font-bold">{timeLeft.days}</p>
                <p className="text-xs text-gray-400">Days</p>
              </div>
              <span className="text-2xl font-bold text-gray-400 self-center mb-4">:</span>
              <div className="text-center">
                <p className="text-2xl font-bold">{timeLeft.hours}</p>
                <p className="text-xs text-gray-400">Hours</p>
              </div>
              <span className="text-2xl font-bold text-gray-400 self-center mb-4">:</span>
              <div className="text-center">
                <p className="text-2xl font-bold">{timeLeft.minutes}</p>
                <p className="text-xs text-gray-400">Minutes</p>
              </div>
              <span className="text-2xl font-bold text-gray-400 self-center mb-4">:</span>
              <div className="text-center">
                <p className="text-2xl font-bold">{timeLeft.seconds}</p>
                <p className="text-xs text-gray-400">Seconds</p>
              </div>
            </div>
            <Link to={`/legal-revision/${id}/suggest-edit`} className="w-full">
              <button className="w-full bg-primary text-black font-bold py-3 rounded-lg mt-4">
                Suggest Edit
              </button>
            </Link>
            <hr className="border-t border-[#2F2F2F] my-6" />
            <h3 className="text-lg font-bold mb-4">Legal Revision Activity</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <ThumbsUp size={16} className="mr-2" /> {legalRevision.supported_by.length} upvotes
              </li>
              <li className="flex items-center">
                <ThumbsDown size={16} className="mr-2" /> {legalRevision.opposed_by.length} downvotes
              </li>
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
    </main>
  );
};

export default LegalRevisionDetails;
