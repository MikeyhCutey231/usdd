import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Search, Filter, MoreHorizontal, Eye, User, Shield, MessageSquare, FileText, Landmark } from 'lucide-react';

const defaultPosts = [
  {
    id: 1,
    author: '@labastida1823',
    posted: '1 min ago',
    title: 'Why Vice Ganda Should be banned in Davao City?',
    content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://i.imgur.com/5yQ1mct.png',
  },
  {
    id: 2,
    author: '@labastida1823',
    posted: '1 min ago',
    title: 'The Impact of Technology on Modern Politics',
    content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://i.imgur.com/5yQ1mct.png',
  },
  {
    id: 3,
    author: '@labastida1823',
    posted: '1 min ago',
    title: 'Exploring the Rise of Sustainable Fashion',
    content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://i.imgur.com/5yQ1mct.png',
  },
  {
    id: 4,
    author: '@labastida1823',
    posted: '1 min ago',
    title: 'The Future of Gaming: Trends to Watch',
    content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://i.imgur.com/5yQ1mct.png',
  },
  {
    id: 5,
    author: '@labastida1823',
    posted: '1 min ago',
    title: 'Navigating the World of Business Startups',
    content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://i.imgur.com/5yQ1mct.png',
  },
];

const PostCard = ({ post, handleDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Placeholder for update functionality
    alert(`Update post: ${post.title}`);
    setDropdownOpen(false);
  };

  const onDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDelete(post.id);
    setDropdownOpen(false);
  };

  return (
    <Link to={`/profile/post/${post.id}`} className="block p-6 rounded-lg hover:bg-[#222222]">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <img src="https://i.pravatar.cc/30" alt={post.author} className="rounded-full mr-2" />
          <span className="font-bold">{post.author}</span>
          <span className="text-sm text-gray-400 ml-2">{post.posted}</span>
        </div>
        <div className="relative">
          <button onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDropdownOpen(!dropdownOpen);
          }} className="focus:outline-none">
            <MoreHorizontal size={20} />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-[#333333] rounded-md shadow-lg z-10">
              <button onClick={handleUpdate} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#444444]">Update</button>
              <button onClick={onDeleteClick} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-[#444444]">Delete</button>
            </div>
          )}
        </div>
      </div>
      <h3 className="font-bold text-lg mb-2">{post.title}</h3>
      <p className="text-gray-300 line-clamp-3">{post.content}</p>
    </Link>
  );
};

const PetitionCard = ({ id, title, description, signatures, goal }) => (
  <Link to={`/petition/${id}?page_name=accountProfilePetition`} className="block bg-[#222222] p-4 rounded-lg border border-transparent hover:border-primary">
    <h4 className="font-bold text-lg mb-2">{title}</h4>
    <p className="text-sm text-gray-400 mb-4">{description}</p>
    <div className="flex justify-between items-center">
      <div>
        <p className="font-bold">{signatures}</p>
        <p className="text-sm text-gray-400">Signatures</p>
      </div>
      <div>
        <p className="font-bold">{goal}</p>
        <p className="text-sm text-gray-400">Goal</p>
      </div>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: `${(signatures / goal) * 100}%` }}></div>
    </div>
  </Link>
);

const LegalRevisionCard = ({ legalRevision }) => {
  const navigate = useNavigate();
  const status = legalRevision.isActive ? 'Voting Phase' : 'Drafting Phase';
  const statusColor = legalRevision.isActive ? 'text-green-500' : 'text-[#FFAF03]';

  const handleClick = () => {
    if (legalRevision.isActive) {
      navigate(`/vote-legal-revision/${legalRevision.id}`);
    } else {
      navigate(`/drafting-legal-revision/${legalRevision.id}`);
    }
  };

  return (
    <div onClick={handleClick} className="bg-[#222222] p-4 rounded-lg cursor-pointer">
      <h4 className="font-bold text-lg mb-2">{legalRevision.title}</h4>
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-400">Status: <span className={statusColor}>{status}</span></p>
        <p className="text-gray-400">Total Vote Count: <span className="text-white">{legalRevision.vote.yes + legalRevision.vote.no}</span></p>
      </div>
    </div>
  );
};

const PetitionsContent = () => {
  const [petitions, setPetitions] = useState([]);

  useEffect(() => {
    const storedPetitions = JSON.parse(localStorage.getItem('petitions')) || [];
    setPetitions(storedPetitions);
  }, []);

  return (
    <div>
      {petitions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {petitions.map(petition => (
            <PetitionCard key={petition.id} id={petition.id} title={petition.title} description={petition.summary} signatures={petition.signature_count} goal={5000} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <FileText size={48} className="mx-auto text-gray-500" />
          <p className="mt-4 text-lg text-gray-500">You have not created any petitions.</p>
        </div>
      )}
    </div>
  );
};

const LegalRevisionsContent = () => {
  const [legalRevisions, setLegalRevisions] = useState([]);

  useEffect(() => {
    const storedLegalRevisions = JSON.parse(localStorage.getItem('legalRevisions')) || [];
    setLegalRevisions(storedLegalRevisions);
  }, []);

  return (
    <div>
      {legalRevisions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {legalRevisions.map(legalRevision => (
            <LegalRevisionCard
              key={legalRevision.id}
              legalRevision={legalRevision}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Landmark size={48} className="mx-auto text-gray-500" />
          <p className="mt-4 text-lg text-gray-500">You have not created any legal revisions.</p>
        </div>
      )}
    </div>
  );
};

const AccountProfile = () => {
  const [activeTab, setActiveTab] = useState('Posts');
  const [posts, setPosts] = useState([]);
  const [petitionCount, setPetitionCount] = useState(0);

  useEffect(() => {
    const storedPetitions = JSON.parse(localStorage.getItem('petitions')) || [];
    setPetitionCount(storedPetitions.length);

    const storedPosts = JSON.parse(localStorage.getItem('posts'));
    if (storedPosts && storedPosts.length > 0) {
      setPosts(storedPosts.filter(p => !p.isInPetition));
    } else {
      setPosts(defaultPosts.filter(p => !p.isInPetition));
    }
  }, []);

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter(p => p.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    toast.success('Post deleted successfully!');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Posts':
        return (
          <div>
            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map(post => (
                  <PostCard key={post.id} post={post} handleDelete={handleDelete} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <MessageSquare size={48} className="mx-auto text-gray-500" />
                <p className="mt-4 text-lg text-gray-500">You have not created any posts.</p>
              </div>
            )}
          </div>
        );
      case 'Petitions':
        return <PetitionsContent />;
      case 'Legal Revisions':
        return <LegalRevisionsContent />;
      default:
        return null;
    }
  };

  return (
    <main className="flex-1 bg-[#1A1A1A] text-white">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 p-10 pr-8">
          <h2 className="text-3xl font-bold mb-6">@labastida1823</h2>
          <div className="flex space-x-8 border-b border-[#222222] mb-6">
            <button onClick={() => setActiveTab('Posts')} className={`py-2 ${activeTab === 'Posts' ? 'border-b-2 border-yellow-500 text-yellow-500' : 'text-gray-400'}`}>Posts</button>
            <button onClick={() => setActiveTab('Petitions')} className={`py-2 ${activeTab === 'Petitions' ? 'border-b-2 border-yellow-500 text-yellow-500' : 'text-gray-400'}`}>Petitions</button>
            <button onClick={() => setActiveTab('Legal Revisions')} className={`py-2 ${activeTab === 'Legal Revisions' ? 'border-b-2 border-yellow-500 text-yellow-500' : 'text-gray-400'}`}>Legal Revisions</button>
            <button className="py-2 text-gray-400">Comments</button>
            <button className="py-2 text-gray-400">Reported</button>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#666666]" />
              <input
                type="text"
                placeholder="Search any in posts..."
                className="bg-[#222222] text-white rounded-lg py-2 pl-10 pr-4"
              />
            </div>
            <button className="flex items-center bg-[#222222] text-white rounded-lg py-2 px-4">
              <Filter size={20} className="mr-2" />
              Filter
            </button>
          </div>
          {renderContent()}
        </div>
        <div className="w-full lg:w-1/3 lg:border-l border-[#222222]">
          <div className="p-6 pr-12 rounded-lg">
            <div className="flex items-center mb-4">
              <img src="https://i.pravatar.cc/60" alt="Michael C. Labastida" className="rounded-full mr-4" />
              <div>
                <h3 className="text-xl font-bold">Michael C. Labastida</h3>
                <p className="text-sm text-gray-400">@labastida1823</p>
              </div>
            </div>
            <div className="flex justify-between text-center mb-6">
              <div>
                <p className="font-bold">45</p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div>
                <p className="font-bold">14</p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
              <div>
                <p className="font-bold">{petitionCount}</p>
                <p className="text-sm text-gray-400">Petitions</p>
              </div>
            </div>
            <div className="mb-6 border-t border-b border-[#222222] py-6">
              <div className='flex justify-between mb-2'>
                <h4 className="font-bold">Know about me</h4>
                <button className="text-yellow-500 text-sm">Edit</button>
              </div>
              <p className="text-sm text-[#DDDDDD]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Settings</h4>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Eye size={20} className="mr-3" />
                    <div>
                      <p>Curate your profile</p>
                      <p className="text-xs text-[#DDDDDD]">Manage what people see when they visit your profile</p>
                    </div>
                  </div>
                  <button className="bg-[#2F2F2F] text-white px-3 py-1 rounded-full text-xs">Update</button>
                </li>
                <li className="flex justify-between items-center">
                  <div className="flex items-center">
                    <User size={20} className="mr-3" />
                    <div>
                      <p>Banner Profile</p>
                      <p className="text-xs text-[#DDDDDD]">Manage what banner would look cool in your profile</p>
                    </div>
                  </div>
                  <button className="bg-[#2F2F2F] text-white px-3 py-1 rounded-full text-xs">Update</button>
                </li>
                <li className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Shield size={20} className="mr-3" />
                    <div>
                      <p>Account Security</p>
                      <p className="text-xs text-[#DDDDDD]">Manage your account security by enabling available services.</p>
                    </div>
                  </div>
                  <button className="bg-[#2F2F2F] text-white px-3 py-1 rounded-full text-xs">Update</button>
                </li>
              </ul>
            </div>
            <div className="mt-8 border-[#222222] border-t">
              <p className="text-sm text-gray-400 pt-6">Member Since</p>
              <p>August 23, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountProfile;
