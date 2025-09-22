import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
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

const LegalRevisionDetails = () => {
  const [legalRevision, setLegalRevision] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [petition, setPetition] = useState(null);
  const [post, setPost] = useState(null);
  const [voted, setVoted] = useState(null);
  const [comment, setComment] = useState('');
  const { id } = useParams();

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

  useEffect(() => {
    const storedLegalRevisions = JSON.parse(localStorage.getItem('legalRevisions')) || [];
    const currentLegalRevision = storedLegalRevisions.find(l => l.id === id);
    setLegalRevision(currentLegalRevision);
    setVoted(currentLegalRevision.voted);

    if (currentLegalRevision) {
      const storedPetitions = JSON.parse(localStorage.getItem('petitions')) || [];
      const currentPetition = storedPetitions.find(p => p.id === currentLegalRevision.petition_id);
      setPetition(currentPetition);

      if (currentPetition) {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const currentPost = storedPosts.find(p => p.id === currentPetition.post_id);
        setPost(currentPost);
      }
    }
  }, [id]);

  if (!legalRevision || !petition || !post) {
    return <div>Loading...</div>;
  }

  const handleComment = (e) => {
    e.preventDefault();
    const newComment = {
      id: uuidv4(),
      author: 'Johnfritz Antipuesto',
      text: comment,
      date: 'Just now',
    };
    const updatedLegalRevision = { ...legalRevision, comments: [...legalRevision.comments, newComment] };
    setLegalRevision(updatedLegalRevision);

    const storedLegalRevisions = JSON.parse(localStorage.getItem('legalRevisions')) || [];
    const updatedRevisions = storedLegalRevisions.map(rev => rev.id === id ? updatedLegalRevision : rev);
    localStorage.setItem('legalRevisions', JSON.stringify(updatedRevisions));
    setComment('');
  };

  const handleVote = (type) => {
    let newUpvotes = legalRevision.upvotes;
    let newDownvotes = legalRevision.downvotes;
    let newVoted = voted;

    if (type === 'upvote') {
      if (voted === 'upvoted') {
        newUpvotes -= 1;
        newVoted = null;
      } else {
        newUpvotes += 1;
        if (voted === 'downvoted') {
          newDownvotes -= 1;
        }
        newVoted = 'upvoted';
      }
    } else if (type === 'downvote') {
      if (voted === 'downvoted') {
        newDownvotes -= 1;
        newVoted = null;
      } else {
        newDownvotes += 1;
        if (voted === 'upvoted') {
          newUpvotes -= 1;
        }
        newVoted = 'downvoted';
      }
    }

    const updatedLegalRevision = { ...legalRevision, upvotes: newUpvotes, downvotes: newDownvotes, voted: newVoted };
    setLegalRevision(updatedLegalRevision);
    setVoted(newVoted);

    const storedLegalRevisions = JSON.parse(localStorage.getItem('legalRevisions')) || [];
    const updatedRevisions = storedLegalRevisions.map(rev => rev.id === id ? updatedLegalRevision : rev);
    localStorage.setItem('legalRevisions', JSON.stringify(updatedRevisions));
  };

  const renderSlateContent = (content) => {
    if (!Array.isArray(content)) {
      return <p className="text-[#DDDDDD]">{content}</p>;
    }
    return content.map((node, index) => {
      if (node.type === 'paragraph') {
        return (
          <p key={index} className="text-[#DDDDDD]">
            {node.children.map((child, childIndex) => (
              <span key={childIndex}>{child.text}</span>
            ))}
          </p>
        );
      }
      return null;
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
                <span className="ml-2">{legalRevision.upvotes}</span>
              </button>
              <button onClick={() => handleVote('downvote')} className="flex items-center">
                <ThumbsDown size={20} className={voted === 'downvoted' ? 'text-primary' : 'text-gray-400'} />
                <span className="ml-2">{legalRevision.downvotes}</span>
              </button>
              <div className="flex items-center">
                <MessageSquare size={20} className="text-gray-400 mr-2" />
                <span>{legalRevision.comments.length}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4 text-gray-300 mb-8">
            {renderSlateContent(petition.proposed_solution)}
          </div>
          
          <h2 className="text-2xl font-bold mb-6">{legalRevision.comments.length} Comments</h2>
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
            {legalRevision.comments.map(comment => (
              <div key={comment.id} className="flex items-start">
                <img src="https://i.pravatar.cc/40?u=b" alt={comment.author} className="rounded-full mr-4" />
                <div className="flex-1">
                  <p className="font-bold">{comment.author}</p>
                  <p className="text-sm text-gray-400 mb-2">{comment.date}</p>
                  <p className="text-gray-300">{comment.text}</p>
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
            <h3 className="text-lg font-bold mb-4">Legal Specialists</h3>
            <div className="grid grid-cols-2 gap-4">
              {legalRevision.specialists.map((specialist, index) => (
                <div key={index} className="flex items-center">
                  <img src={`https://i.pravatar.cc/40?u=${specialist}`} alt={specialist} className="rounded-full mr-4" />
                  <span>{specialist}</span>
                </div>
              ))}
            </div>
            <hr className="border-t border-[#2F2F2F] my-6" />
            <h3 className="text-lg font-bold mb-4">Legal Revision Activity</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <ThumbsUp size={16} className="mr-2" /> {legalRevision.upvotes} upvotes
              </li>
              <li className="flex items-center">
                <ThumbsDown size={16} className="mr-2" /> {legalRevision.downvotes} downvotes
              </li>
              <li className="flex items-center">
                <MessageSquare size={16} className="mr-2" /> {legalRevision.comments.length} comments
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
              {post.tags.map((tag, i) => (
                <span key={i} className="bg-[#333333] text-gray-300 px-3 py-1 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LegalRevisionDetails;
