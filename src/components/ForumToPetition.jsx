import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import SlateEditor from './SlateEditor';
import { DatePicker } from './DatePicker';
import ConfirmationModal from './modals/ConfirmationModal';

const ForumToPetition = () => {
  const [post, setPost] = useState(null);
  const [summary, setSummary] = useState('');
  const [background, setBackground] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
  const [solution, setSolution] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
  const [date, setDate] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const currentPost = posts.find(p => p.id === id);
    if (currentPost) {
      setPost(currentPost);
      setBackground([
        {
          type: 'paragraph',
          children: [{ text: currentPost.content }],
        },
      ]);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!summary || !background || !solution || !date) {
      toast.error('Please fill in all the input fields.');
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    const newPetition = {
      id: uuidv4(),
      post_id: id,
      title: post.title,
      summary,
      background,
      proposed_solution: solution,
      date,
      isActive: true,
      signature_count: 0,
    };
    const petitions = JSON.parse(localStorage.getItem('petitions')) || [];
    localStorage.setItem('petitions', JSON.stringify([newPetition, ...petitions]));

    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = posts.map(p => {
      if (p.id === post.id) {
        return { ...p, isInPetition: true };
      }
      return p;
    });
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    toast.success('Petition created successfully!');
    navigate('/petitions');
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex-1 p-8 bg-secondary text-white">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-white mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Go Back
        </button>
        <h1 className="text-3xl font-bold mb-8">Petition Details</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label htmlFor="title" className="block text-lg font-bold">Title</label>
            <p className="text-sm text-[#BBBBBB] mb-2">Be clear and precise, as if you are directly asking a question to someone else.</p>
            <input
              type="text"
              id="title"
              value={post.title}
              readOnly
              className="w-full bg-primary-text text-white rounded-lg p-3 focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="summary" className="block text-lg font-bold">Summary</label>
            <p className="text-sm text-[#BBBBBB] mb-2">Be clear and precise, as if directly asking a question.</p>
            <input
              type="text"
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder={`e.g. Do you want ${post.title}`}
              className="w-full bg-primary-text text-white rounded-lg p-3 focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="background" className="block text-lg font-bold">Background</label>
            <p className="text-sm text-[#BBBBBB] mb-2">Introduce the problem and expand on what you put in the title.</p>
            <SlateEditor initialValue={background} onChange={setBackground} />
          </div>
          <div>
            <label htmlFor="solution" className="block text-lg font-bold">Proposed Solution</label>
            <p className="text-sm text-[#BBBBBB] mb-2">Suggest a focused solution that addresses the root cause and offers a clear path forward.</p>
            <SlateEditor initialValue={solution} onChange={setSolution} />
          </div>
          <div>
            <DatePicker onSelect={setDate} />
          </div>
          <div className="flex justify-end mt-8">
            <button type="submit" className="bg-primary text-secondary font-bold py-2 px-6 rounded-lg">Submit Petition</button>
          </div>
        </form>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </main>
  );
};

export default ForumToPetition;
