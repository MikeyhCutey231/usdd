import React, { useState, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TopForums = () => {
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState('Politics');
  const container = useRef();

  useGSAP(() => {
    gsap.from('.forum-card', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.forums-grid',
        start: 'top 80%',
      },
    });

    gsap.from('.aside-content', {
      x: -100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.forums-grid',
        start: 'top 80%',
      },
    });

    gsap.from('.header-content', {
      y: -100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.forums-grid',
        start: 'top 80%',
      },
    });
  }, { scope: container });

  const forums = [
    {
      title: 'War is Over',
      description: 'Around 40,000 Japanese citizen have rallied in front of the shizoku bridge.',
      date: '2025',
      votes: 20,
      image: 'https://picsum.photos/300/200',
    },
    {
      title: 'War is Over',
      description: 'Around 40,000 Japanese citizen have rallied in front of the shizoku bridge.',
      date: '2025',
      votes: 20,
      image: 'https://picsum.photos/300/200',
    },
    {
      title: 'War is Over',
      description: 'Around 40,000 Japanese citizen have rallied in front of the shizoku bridge.',
      date: '2025',
      votes: 20,
      image: 'https://picsum.photos/300/200',
    },
    {
      title: 'War is Over',
      description: 'Around 40,000 Japanese citizen have rallied in front of the shizoku bridge.',
      date: '2025',
      votes: 20,
      image: 'https://picsum.photos/300/200',
    },
    {
      title: 'War is Over',
      description: 'Around 40,000 Japanese citizen have rallied in front of the shizoku bridge.',
      date: '2025',
      votes: 20,
      image: 'https://picsum.photos/300/200',
    },
    {
      title: 'War is Over',
      description: 'Around 40,000 Japanese citizen have rallied in front of the shizoku bridge.',
      date: '2025',
      votes: 20,
      image: 'https://picsum.photos/300/200',
    },
    {
      title: 'War is Over',
      description: 'Around 40,000 Japanese citizen have rallied in front of the shizoku bridge.',
      date: '2025',
      votes: 20,
      image: 'https://picsum.photos/300/200',
    },
    {
      title: 'War is Over',
      description: 'Around 40,000 Japanese citizen have rallied in front of the shizoku bridge.',
      date: '2025',
      votes: 20,
      image: 'https://picsum.photos/300/200',
    },
  ];

  return (
    <div ref={container} className="bg-[#1a1a1a] text-white px-8 md:px-32 w-full py-16 md:pt-50">
      <div className="flex flex-col md:flex-row">
        <aside className="w-full md:w-1/4 pr-0 md:pr-10 aside-content mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-5">Top Forums</h2>
          <div className="border-l border-gray-400 pl-2 mt-8 md:mt-28">
            <ul className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
              {['Politics', 'News', 'International', 'Drama', 'Technology'].map((item, index) => (
                <li
                  key={index}
                  className="mb-3 flex items-center cursor-pointer flex-shrink-0 px-4 md:px-0"
                  onClick={() => setActive(item)}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <ChevronRight size={20} className={`mr-2 ${active === item || hovered === index ? 'opacity-100 text-primary' : 'opacity-0'}`} />
                  <span className={active === item || hovered === index ? 'text-primary' : ''}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <div className="w-full md:w-3/4">
          <h2 className="text-3xl font-semibold mb-4 header-content">Voice out your concern</h2>
          <p className="mb-5 text-gray-200 header-content">
              Online platforms where users discuss, ask questions, share information, and network on various topics. Top forums attract large, active communities seeking advice and resources.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 forums-grid">
            {forums.map((forum, index) => (
              <div key={index} className="bg-[#222222] border border-[#2F2F2F] rounded-lg p-4 forum-card">
                <div className="relative">
                  <img src={forum.image} alt={forum.title} className="rounded-lg mb-3" />
                  <div className="absolute top-2 left-2 bg-[#AC952F] border border-[#FAD83B] text-white text-xs font-semibold px-3 py-1 rounded-full">{forum.votes} vote</div>
                </div>
                <h3 className="font-bold mb-2">{forum.title}</h3>
                <p className="text-sm text-[#E9E9E9] mb-3">{forum.description}</p>
                <div className="text-xs text-gray-300">Date {forum.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopForums;
