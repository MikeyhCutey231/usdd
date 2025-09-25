import React, { useState } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { ChevronDown } from 'lucide-react';
import { useData } from '../DataContext';

const tagOptions = [
  { value: 'politics', label: 'Politics' },
  { value: 'technology', label: 'Technology' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'sports', label: 'Sports' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'business', label: 'Business' },
  { value: 'movies', label: 'Movies' },
  { value: 'programming', label: 'Programming' },
];

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const { posts, setPosts } = useData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: uuidv4(),
      title,
      content: details,
      author: 'Michael C. Labastida',
      date: new Date().toISOString(),
      likes: 0,
      comments: [],
      tags: tags.map(tag => tag.label),
      isInPetition: false,
    };
    setPosts([newPost, ...posts]);
    toast.success('Forum submitted successfully!');
    navigate('/');
  };

  return (
    <main className="flex-1 p-12 bg-secondary text-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold">Create Post</h2>
        <div className="flex items-center">
          <span className="mr-2">Discussion</span>
          <ChevronDown size={20} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="title" className="block text-xl font-bold">Title</label>
          <p className="text-sm text-[#BBBBBB] mb-4">Be clear and precise, as if you are directly asking a question to someone else.</p>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Do you want Vice Ganda banned in Davao City"
            className="w-full bg-primary-text text-white rounded-lg p-3"
            required
          />
        </div>
        <div>
          <label htmlFor="details" className="block text-lg font-medium">What are the details of your problem?</label>
          <p className="text-sm text-[#BBBBBB] mb-4">Introduce the problem and expand on what you put in the title.</p>
          <textarea
            id="details"
            rows="8"
            placeholder='e.g. I want to share my insight...'
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full bg-primary-text text-white rounded-lg p-3 h-48 resize-none"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="tags" className="block text-lg font-medium">Tags</label>
          <p className="text-sm text-[#BBBBBB] mb-4">Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</p>
          <Select
            isMulti
            options={tagOptions}
            onChange={setTags}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="e.g. (politics, technology, fashion)"
          />
        </div>
        <div className="flex justify-end mt-20">
          <button type="submit" className="bg-[#AC952F] text-white font-medium py-2 px-6 rounded-lg border border-primary">Submit Post</button>
        </div>
      </form>
    </main>
  );
};

export default CreatePost;
