import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MessageSquare } from 'lucide-react';
import { useData } from '../DataContext';

const Forum = () => {
  const { posts } = useData();
  const forumPosts = posts.filter(p => !p.isInPetition);

  return (
    <main className="flex-1 p-12 bg-secondary text-white min-h-screen w-full">
      <h2 className="text-4xl font-bold mb-8">Explore Forums</h2>

      <div className="flex items-center mb-6 space-x-2 overflow-x-auto">
        <button className="bg-[#AC952F] text-white py-2 px-6 rounded-lg border border-[#FAD83B]">All</button>
        <button className="text-white bg-primary-text border border-[#2F2F2F] py-2 px-6 rounded-lg">Technology</button>
        <button className="text-white bg-primary-text border border-[#2F2F2F] py-2 px-6 rounded-lg">Fashion</button>
        <button className="text-white bg-primary-text border border-[#2F2F2F] py-2 px-6 rounded-lg">Sports</button>
        <button className="text-white bg-primary-text border border-[#2F2F2F] py-2 px-6 rounded-lg">Politics</button>
        <button className="text-white bg-primary-text border border-[#2F2F2F] py-2 px-6 rounded-lg hidden lg:block">Gaming</button>
        <button className="text-white bg-primary-text border border-[#2F2F2F] py-2 px-6 rounded-lg hidden xl:block">Business</button>
        <button className="text-white bg-primary-text border border-[#2F2F2F] py-2 px-6 rounded-lg hidden xl:block">Movies</button>
        <button className="text-white bg-primary-text border border-[#2F2F2F] py-2 px-6 rounded-lg hidden xl:block">Flutter</button>
        <button className="text-white bg-primary-text border border-[#2F2F2F] py-2 px-6 rounded-lg hidden xl:block">Dancir</button>
        <ChevronRight size={20} className="ml-2 text-gray-400" />
      </div>
        
      
      <hr className="border-t border-primary-text my-8" />

      {forumPosts.length > 0 ? (
        <div>
          {forumPosts.map((post, index) => (
            <div key={post.id}>
              <Link to={`/post/${post.id}`}>
                <div>
                  <h3 className="text-xl font-bold hover:text-[#FAD83B]">{post.title}</h3>
                  <p className="text-sm text-[#BBBBBB] mb-2">{new Date(post.date).toLocaleDateString()}</p>
                  <p className="text-gray-300 mb-4 line-clamp-2">{post.content}</p>
                </div>
              </Link>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {(post.tags || []).map((tag, i) => (
                    <span key={i} className="bg-primary-text text-gray-300 px-3 py-1 rounded-full text-sm">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center">
                  <img src={`https://i.pravatar.cc/30?u=${post.author}`} alt={post.author} className="rounded-full mr-3" />
                  <div>
                    <p className="font-bold">{post.author}</p>
                  </div>
                </div>
              </div>
              {index < forumPosts.length - 1 && <hr className="border-t border-primary-text my-8" />}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <MessageSquare size={48} className="mx-auto text-gray-500" />
          <p className="mt-4 text-lg text-gray-500">No forums available.</p>
        </div>
      )}

      {forumPosts.length >= 10 && (
        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center">
            <span>Result per page</span>
          <select className="bg-secondary text-white ml-2 p-2 rounded-md">
              <option>50</option>
            </select>
          </div>
          <div className="flex items-center">
            <span>1-50 of 1,250</span>
            <div className="flex items-center ml-4">
              <button className="p-2 rounded-md hover:bg-[#FAD83B] hover:text-black"><ChevronsLeft size={20} /></button>
              <button className="p-2 rounded-md hover:bg-[#FAD83B] hover:text-black"><ChevronLeft size={20} /></button>
              <button className="p-2 rounded-md hover:bg-[#FAD83B] hover:text-black"><ChevronRight size={20} /></button>
              <button className="p-2 rounded-md hover:bg-[#FAD83B] hover:text-black"><ChevronsRight size={20} /></button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Forum;
