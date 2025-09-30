import React, {useRef, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import TopForums from './TopForums';
import Marquee from './Marquee';
import LearnMore from './LearnMore';
import Testimonials from './Testimonials';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

import mapLanding1 from '../assets/map_landing_1.png';

gsap.registerPlugin(TextPlugin);

const LandingPage = () => {
    const navigate = useNavigate();
    const container = useRef();
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
        window.scrollTo(0, 0);
        return () => {
            window.onbeforeunload = null;
        };
    }, []);

    useEffect(() => {
        if (animationComplete) {
            document.body.classList.remove('hide-scrollbar');
        } else {
            document.body.classList.add('hide-scrollbar');
        }

        return () => {
            document.body.classList.remove('hide-scrollbar');
        };
    }, [animationComplete]);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => setAnimationComplete(true)
        });

        tl.to('.typing-h1', {
            text: `A blockchain voting platform that lets residents <span class="text-primary font-bold">discuss, propose, draft,</span> and <span class="text-primary font-bold">decide public policy</span> from almost any device`,
            duration: 4,
            ease: 'none',
        })
            .from('.header-content', {
                y: -100,
                opacity: 0,
                duration: 1,
            })
            .from('.top-badge', {
                y: 100,
                opacity: 0,
                duration: 1,
            })
            .from('.paragraph-content', {
                y: -100,
                opacity: 0,
                duration: 1,
            })
            .from('.start-post-btn', {
                x: -100,
                opacity: 0,
                duration: 1,
            }, "-=0.5")
            .from('.doc-btn', {
                x: 100,
                opacity: 0,
                duration: 1,
            }, "<");
    }, { scope: container });

    return (
        <div
            ref={container}
            className={`bg-[#1A1A1A] text-white font-sans min-h-screen flex flex-col items-center overflow-x-hidden ${
                animationComplete ? 'overflow-y-auto' : 'overflow-hidden'
            }`}
        >
      <header className="w-full flex justify-between items-center py-4 px-32 pt-5 bg-secondary relative z-10 header-content">
        <div className="flex items-center">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-primary leading-tight">Universal Secure</h1>
            <p className="text-xl text-white leading-tight font-medium -mt-1">Direct Democracy</p>
          </div>
          <nav className="hidden md:flex ml-10">
            <ul className="flex space-x-6 items-center">
              <li className="flex items-center">
                <a href="#" className="flex items-center hover:text-primary text-lg font-[400] ml-4">
                  Features<ChevronDown size={16} className="ml-2" />
                </a>
              </li>
                <li className="flex items-center">
                <a href="#" className="flex items-center hover:text-primary text-lg font-[400] ml-4">
                  Security<ChevronDown size={16} className="ml-2" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center hover:text-primary text-lg font-[400]">
                  Benefits
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={() => navigate('/forum')} className="text-white no-underline mr-8">Sign in</button>
          <a href="#" className="bg-[#AC952F] text-white font-medium py-2 px-3 rounded-lg flex items-center border border-primary">Contact Us</a>
        </div>
      </header>
      <main className="relative text-center w-full flex-grow flex items-center justify-center h-[700px]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${mapLanding1})` }}
        ></div>
        <div className="relative z-10">
          <div className="inline-flex items-center bg-[#2a2a2a] rounded-full p-2 px-3 mb-15 top-badge">
            <span className="bg-primary text-[#1a1a1a] rounded-full px-3 py-1 text-sm font-semibold">TOP#1</span>
            <span className="ml-3 mr-3 font-medium">Secured Voting System</span>
          </div>
          <h1 className="text-5xl max-w-5xl mx-auto mb-5 typing-h1"></h1>
          <p className="max-w-3xl mx-auto mb-10 mt-8 text-lg leading-relaxed paragraph-content">
            The system links to voter rolls without changes, recording all
            actions on a public ledger and paper backup for verification.
          </p>
          <div className="action-buttons mt-20">
            <button className="py-3 px-8 border border-primary rounded-lg mx-2 cursor-pointer bg-[#AC952F] text-white font-semibold start-post-btn">Start your post</button>
            <button className="py-3 px-8 border border-[#2F2F2F] rounded-lg mx-2 cursor-pointer bg-[#222222] text-white font-semibold doc-btn">Documentation</button>
          </div>
        </div>
      </main>
      <TopForums />
      <Marquee />
      <LearnMore />
      <Testimonials />
    </div>
  );
};

export default LandingPage;
