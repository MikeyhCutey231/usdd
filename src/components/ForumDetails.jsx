import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ThumbsUp, MessageCircle, Reply, Eye, Flag, MessageSquare, ChevronDown, Trash2 } from 'lucide-react';
import { useData } from '../DataContext';

const ForumDetails = () => {
  const { posts, setPosts } = useData();
  const { id } = useParams();
  const post = posts.find(p => p.id === id);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    const updatedPosts = posts.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    setPosts(updatedPosts);
  };

  const handleComment = (e) => {
    e.preventDefault();
    const updatedPosts = posts.map(p => {
      if (p.id === id) {
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

  const handleDeleteComment = (commentId) => {
    const updatedPosts = posts.map(p => {
      if (p.id === id) {
        return { ...p, comments: p.comments.filter(c => c.id !== commentId) };
      }
      return p;
    });
    setPosts(updatedPosts);
  };

  if (!post) {
    return <div className="text-white text-center p-12">Post not found.</div>;
  }

  return (
    <main className="flex-1 p-8 bg-secondary text-white">
      <div className="flex">
        <div className="w-2/3 pr-8 pl-4">
          <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <img src={`https://i.pravatar.cc/40?u=${post.author}`} alt={post.author} className="rounded-full mr-4" />
              <div>
                <p className="font-bold">{post.author}</p>
                <p className="text-sm text-gray-400">{new Date(post.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <button onClick={handleLike} className="flex items-center">
                  <Flag size={20} className="text-gray-400 mr-2" />
                  <span>{post.likes}</span>
                </button>
              </div>
              <div className="flex items-center">
                <MessageCircle size={20} className="text-gray-400 mr-2" />
                <span>{post.comments.length}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-300 mb-8">{post.content}</p>
          
          <h2 className="text-2xl font-bold mb-6">{post.comments.length} Comments</h2>
          <div className="space-y-6">
            <form onSubmit={handleComment} className="flex items-start">
              <img src="https://i.pravatar.cc/40?u=a" alt="Johnfritz Antipuesto" className="rounded-full mr-4" />
              <div className="flex-1">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add your comment here."
                  className="w-full bg-primary-text text-white rounded-lg p-3"
                  required
                />
              </div>
            </form>
            {post.comments.map((c) => (
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
                    <button className="flex items-center mr-4 hover:text-white">
                      <Reply size={16} className="mr-1" /> Reply
                    </button>
                    {c.author === 'Johnfritz Antipuesto' && (
                      <button onClick={() => handleDeleteComment(c.id)} className="flex items-center text-red-500 hover:text-red-400">
                        <Trash2 size={16} className="mr-1" /> Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3">
          <div className="border border-primary-text p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Forum Activity</h3>
            <ul className="space-y-3 text-[#DDDDDD]">
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
            <h3 className="text-lg font-semibold mb-4">Rules & Regulations</h3>
            <ul className="space-y-3 text-[#DDDDDD]">
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
            <hr className="border-t border-primary-text my-6" />
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {(post.tags || []).map((tag, i) => (
                <span key={i} className="bg-[#333333] text-gray-300 px-3 py-1 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForumDetails;
