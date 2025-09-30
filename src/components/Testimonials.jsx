import React, { useRef } from 'react';
import { Users } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Testimonials = () => {
  const container = useRef();
  const testimonials = [
    {
      name: 'Cutey Michael',
      role: 'Product Manager',
      feedback: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Cutey Michael',
      role: 'Product Manager',
      feedback: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
      avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    },
    {
      name: 'Cutey Michael',
      role: 'Product Manager',
      feedback: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
      avatar: 'https://randomuser.me/api/portraits/men/34.jpg',
    },
    {
      name: 'Cutey Michael',
      role: 'Product Manager',
      feedback: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
      avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    },
    {
      name: 'Cutey Michael',
      role: 'Product Manager',
      feedback: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg',
    },
    {
        name: 'Cutey Michael',
        role: 'Product Manager',
        feedback: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
        avatar: 'https://randomuser.me/api/portraits/men/37.jpg',
      },
  ];

  useGSAP(() => {
    gsap.from('.testimonial-card', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 80%',
      },
    });
  }, { scope: container });

  return (
    <div ref={container} className="bg-[#1a1a1a] text-white px-8 md:px-32 py-20">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 testimonials-grid">
        <div className="md:col-span-1 md:row-span-1 bg-[#222222] border border-[#2F2F2F] rounded-lg p-6 testimonial-card cursor-box">
            <div className="flex items-center mb-4">
            <img src={testimonials[0].avatar} alt={testimonials[0].name} className="w-12 h-12 rounded-full mr-4" />
            <div>
                <h4 className="font-bold">{testimonials[0].name}</h4>
                <p className="text-sm text-gray-400">{testimonials[0].role}</p>
            </div>
            </div>
            <p className="text-gray-300">{testimonials[0].feedback}</p>
        </div>
        <div className="md:col-span-1 md:row-span-1 bg-[#222222] border border-[#2F2F2F] rounded-lg p-6 testimonial-card cursor-box">
            <div className="flex items-center mb-4">
            <img src={testimonials[1].avatar} alt={testimonials[1].name} className="w-12 h-12 rounded-full mr-4" />
            <div>
                <h4 className="font-bold">{testimonials[1].name}</h4>
                <p className="text-sm text-gray-400">{testimonials[1].role}</p>
            </div>
            </div>
            <p className="text-gray-300">{testimonials[1].feedback}</p>
        </div>
        <div className="md:col-span-1 md:row-span-1 bg-[#222222] border border-[#2F2F2F] rounded-lg p-6 testimonial-card cursor-box">
            <div className="flex items-center mb-4">
            <img src={testimonials[2].avatar} alt={testimonials[2].name} className="w-12 h-12 rounded-full mr-4" />
            <div>
                <h4 className="font-bold">{testimonials[2].name}</h4>
                <p className="text-sm text-gray-400">{testimonials[2].role}</p>
            </div>
            </div>
            <p className="text-gray-300">{testimonials[2].feedback}</p>
        </div>
        <div className="md:col-span-1 md:row-span-2 bg-[#222222] border border-[#2F2F2F] rounded-lg p-6 testimonial-card cursor-box">
            <div className="flex items-center mb-4">
            <img src={testimonials[3].avatar} alt={testimonials[3].name} className="w-12 h-12 rounded-full mr-4" />
            <div>
                <h4 className="font-bold">{testimonials[3].name}</h4>
                <p className="text-sm text-gray-400">{testimonials[3].role}</p>
            </div>
            </div>
            <p className="text-gray-300 mb-2">The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, making it look like natural, readable English.</p>
            <p className="text-gray-300">This prevents text layouts and design mockups from appearing unbalanced or distracting, allowing designers to focus on the overall visual presentation without being influenced by the content itself.</p>
        </div>
        <div className="md:col-span-2 md:row-span-2">
          <div className="bg-[#222222] border border-[#2F2F2F] rounded-lg p-4 testimonial-card cursor-box">
              <div className="flex justify-between items-center mb-4 pl-4 pr-4">
                  <h3 className="text-2xl font-medium">Website Statistics</h3>
                  <button className="text-sm bg-[#333333] px-3 py-1 rounded-full">This week</button>
              </div>
              <div className="grid grid-cols-3 gap-4 p-6 text-center">
                  <div>
                      <p className="text-5xl font-bold mb-1">20k</p>
                      <p className="text-[#E3E3E3]">Forum Created</p>
                  </div>
                  <div>
                      <p className="text-5xl font-bold mb-1">18</p>
                      <p className="text-[#E3E3E3]">Tags Available</p>
                  </div>
                  <div>
                      <p className="text-5xl font-bold mb-1">6</p>
                      <p className="text-[#E3E3E3]">Partnership</p>
                  </div>
              </div>
          </div>

            <div className="pl-0 pr-10 pt-10 pb-10">
                <h2 className="text-7xl font-bold">Testimonials</h2>
                <h3 className="text-7xl font-bold text-gray-400">Client Feedbacks.</h3>
            </div>
        </div>
        <div className="md:col-span-1 md:row-span-1 bg-[#222222] border border-[#2F2F2F] rounded-lg p-6 testimonial-card cursor-box">
            <div className="flex items-center mb-4">
            <img src={testimonials[4].avatar} alt={testimonials[4].name} className="w-12 h-12 rounded-full mr-4" />
            <div>
                <h4 className="font-bold">{testimonials[4].name}</h4>
                <p className="text-sm text-gray-400">{testimonials[4].role}</p>
            </div>
            </div>
            <p className="text-gray-300">{testimonials[4].feedback}</p>
        </div>
        <div className="md:col-span-1 md:row-span-1 bg-[#222222] border border-[#2F2F2F] rounded-lg p-6 testimonial-card cursor-box">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Visitors</h3>
            <Users className="text-gray-400" />
          </div>
          <p className="text-5xl font-bold">300</p>
          <p className="text-gray-400 text-sm">An overall total users who have an account</p>
        </div>

          <div className="md:col-span-1 md:row-span-1 bg-[#222222] border border-[#2F2F2F] rounded-lg p-6 testimonial-card cursor-box">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Petitions</h3>
                  <Users className="text-gray-400" />
              </div>
              <p className="text-5xl font-bold">50</p>
              <p className="text-gray-400 text-sm">An overall total of active petitions and is currently in discussion</p>
          </div>
      </div>

    </div>
  );
};

export default Testimonials;
