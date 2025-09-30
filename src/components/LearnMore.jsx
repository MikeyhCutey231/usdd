import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Blocks, UserCog, ScanFace, AudioLines } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LearnMore = () => {
    const [hovered, setHovered] = useState(null);
    const [active, setActive] = useState('Security Features');
    const container = useRef();
    const authCardRef = useRef(null);
    const timeline = useRef(null);

    useEffect(() => {
        const paths = authCardRef.current.querySelectorAll('.top10-animation-overlay');
        paths.forEach(path => {
            const dashLength = path.getTotalLength();
            gsap.set(path, { strokeDasharray: `${dashLength} ${dashLength}`, strokeDashoffset: dashLength });
        });
    }, []);

    useGSAP(() => {
        gsap.from('.learn-more-card', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.learn-more-grid',
                start: 'top 80%',
            },
        });

        gsap.from('.aside-content', {
            x: -100,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: '.learn-more-grid',
                start: 'top 80%',
            },
        });

        gsap.from('.header-content', {
            y: -100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.learn-more-grid',
                start: 'top 80%',
            },
        });
    }, { scope: container });

    const handleAuthHover = () => {
        const paths = authCardRef.current.querySelectorAll('.top10-animation-overlay');
        const rects = authCardRef.current.querySelectorAll('.glow-rect');
        const rect2 = rects[1];

        if (timeline.current) {
            timeline.current.kill();
        }

        timeline.current = gsap.timeline()
            .to(paths, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power1.inOut'
            })
            .to(rect2, {
                attr: { stroke: '#FAD83B' },
                filter: 'drop-shadow(0 0 0px #FAD83B) drop-shadow(0 0 4px #FAD83B)',
                duration: 1,
                ease: 'power2.inOut',
                yoyo: true,
                repeat: -1
            }, "-=0.2");
    };

    const handleAuthHoverOut = () => {
        if (timeline.current) {
            timeline.current.kill();
        }

        const paths = authCardRef.current.querySelectorAll('.top10-animation-overlay');
        const rects = authCardRef.current.querySelectorAll('.glow-rect');

        gsap.to(paths, {
            strokeDashoffset: (i, target) => target.getTotalLength(),
            duration: 0.3,
            ease: 'power1.inOut'
        });

        gsap.to(rects, {
            attr: { stroke: '#2F2F2F' },
            filter: 'none',
            duration: 0.3
        });
    };

    return (
        <div ref={container} className="bg-[#1a1a1a] text-white px-8 md:px-32 w-full pt-20 pb-40">
            <div className="flex flex-col md:flex-row">
                <aside className="w-full md:w-1/4 pr-0 md:pr-10 aside-content mb-8 md:mb-0">
                    <h2 className="text-2xl font-bold mb-5">Our Ideal's</h2>
                    <div className="border-l border-gray-400 pl-2 mt-8 md:mt-28">
                        <ul className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible">
                            {['About us', 'Offered Services', 'Security Features', 'Benefits'].map((item, index) => (
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
                    <h2 className="text-3xl font-semibold mb-4 header-content">Learn more about us</h2>
                    <p className="mb-5 text-gray-200 header-content">
                        Our core values and principles serve as the foundation that guides our beliefs, decisions, and actions, consistently shaping our integrity, sense of purpose, and long-term vision for the future.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mt-10 learn-more-grid">
                        <div className="col-span-1 md:col-span-2 bg-[#222222] border border-[#2F2F2F] rounded-lg learn-more-card flex flex-col overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <Blocks className="text-2xl mr-4" />
                                    <h3 className="font-bold">Blockchain</h3>
                                </div>
                                <p className="text-sm text-[#E9E9E9] leading-relaxed">Digital ledger that records transactions and tracks assets across a network of computers.</p>
                            </div>
                            <div className="flex-grow h-48 pt-[30px] hidden md:block">
                                <svg width="403" height="258" viewBox="30 0 403 258" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M273.848 204.098L240.538 184.866L273.848 165.635L307.158 184.866L273.848 204.098Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <path d="M240.538 224.65L274.098 244.027V204.296L240.538 184.92V224.65Z" fill="#434343"/>
                                    <path d="M274.098 204.205V204.296M274.098 204.296V244.027L240.538 224.65V184.92L274.098 204.296Z" stroke="#D8D8D8" strokeWidth="0.500908"/>
                                    <path d="M307.361 185.173L274.144 204.286V243.009L307.361 224.286V185.173Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <circle cx="257.108" cy="215.346" r="2.67264" fill="#AAAAAA"/>
                                    <line x1="254.703" y1="216.343" x2="206.595" y2="244.139" stroke="#BBBBBB" strokeWidth="1.06906"/>
                                    <path d="M368.994 148.507L335.684 129.275L368.994 110.044L402.304 129.275L368.994 148.507Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <path d="M335.684 169.059L369.244 188.436V148.705L335.684 129.329V169.059Z" fill="#434343"/>
                                    <path d="M369.244 148.614V148.705M369.244 148.705V188.436L335.684 169.059V129.329L369.244 148.705Z" stroke="#D8D8D8" strokeWidth="0.500908"/>
                                    <path d="M402.507 129.583L369.29 148.695V187.418L402.507 168.696V129.583Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <circle cx="352.254" cy="159.755" r="2.67264" fill="#AAAAAA"/>
                                    <line x1="349.848" y1="160.753" x2="307.085" y2="185.341" stroke="#BBBBBB" strokeWidth="1.06906"/>
                                    <path d="M273.848 89.7091L240.538 70.4774L273.848 51.2456L307.158 70.4774L273.848 89.7091Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <path d="M240.538 110.261L274.098 129.638V89.9069L240.538 70.5305V110.261Z" fill="#434343"/>
                                    <path d="M274.098 89.8155V89.9069M274.098 89.9069V129.638L240.538 110.261V70.5305L274.098 89.9069Z" stroke="#D8D8D8" strokeWidth="0.500908"/>
                                    <path d="M307.361 70.7844L274.144 89.8973V128.62L307.361 109.897V70.7844Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <circle cx="257.108" cy="100.957" r="2.67264" fill="#AAAAAA"/>
                                    <line x1="254.718" y1="101.945" x2="172.401" y2="153.26" stroke="#BBBBBB" strokeWidth="1.06906"/>
                                    <path d="M356.165 39.4635L322.855 20.2318L356.165 1L389.476 20.2318L356.165 39.4635Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <path d="M322.855 60.0157L356.416 79.3921V39.6613L322.855 20.2849V60.0157Z" fill="#434343"/>
                                    <path d="M356.416 39.5699V39.6613M356.416 39.6613V79.3921L322.855 60.0157V20.2849L356.416 39.6613Z" stroke="#D8D8D8" strokeWidth="0.500908"/>
                                    <path d="M389.678 20.5388L356.462 39.6517V78.3739L389.678 59.6518V20.5388Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <circle cx="339.425" cy="50.7111" r="2.67264" fill="#AAAAAA"/>
                                    <line x1="337.042" y1="51.6952" x2="307.108" y2="70.9382" stroke="#BBBBBB" strokeWidth="1.06906"/>
                                    <path d="M181.909 42.6707L148.599 23.4389L181.909 4.20715L215.22 23.4389L181.909 42.6707Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <path d="M148.599 63.2229L182.16 82.5992V42.8684L148.599 23.4921V63.2229Z" fill="#434343"/>
                                    <path d="M182.16 42.777V42.8684M182.16 42.8684V82.5992L148.599 63.2229V23.4921L182.16 42.8684Z" stroke="#D8D8D8" strokeWidth="0.500908"/>
                                    <path d="M215.422 23.746L182.206 42.8589V81.5811L215.422 62.859V23.746Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <circle cx="165.169" cy="53.9182" r="2.67264" fill="#AAAAAA"/>
                                    <line x1="162.779" y1="54.9064" x2="80.462" y2="106.221" stroke="#BBBBBB" strokeWidth="1.06906"/>
                                    <path d="M163.735 157.06L130.425 137.828L163.735 118.596L197.046 137.828L163.735 157.06Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <path d="M130.425 177.612L163.986 196.988V157.257L130.425 137.881V177.612Z" fill="#434343"/>
                                    <path d="M163.986 157.166V157.257M163.986 157.257V196.988L130.425 177.612V137.881L163.986 157.257Z" stroke="#D8D8D8" strokeWidth="0.500908"/>
                                    <path d="M197.248 138.135L164.032 157.248V195.97L197.248 177.248V138.135Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <circle cx="146.995" cy="168.307" r="2.67264" fill="#AAAAAA"/>
                                    <line x1="144.592" y1="169.304" x2="93.2772" y2="199.237" stroke="#BBBBBB" strokeWidth="1.06906"/>
                                    <path d="M79.2798 104.676L45.9694 85.4442L79.2798 66.2124L112.59 85.4442L79.2798 104.676Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <path d="M45.9694 125.228L79.5302 144.604V104.874L45.9694 85.4973V125.228Z" fill="#434343"/>
                                    <path d="M79.5302 104.782V104.874M79.5302 104.874V144.604L45.9694 125.228V85.4973L79.5302 104.874Z" stroke="#D8D8D8" strokeWidth="0.500908"/>
                                    <path d="M112.792 85.7512L79.5763 104.864V143.586L112.792 124.864V85.7512Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <circle cx="62.5398" cy="115.923" r="2.67264" fill="#AAAAAA"/>
                                    <line x1="60.1336" y1="116.921" x2="17.3713" y2="141.51" stroke="#BBBBBB" strokeWidth="1.06906"/>
                                    <path d="M62.1749 216.927L28.8645 197.695L62.1749 178.463L95.4853 197.695L62.1749 216.927Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <path d="M28.8645 237.479L62.4253 256.855V217.125L28.8645 197.748V237.479Z" fill="#434343"/>
                                    <path d="M62.4253 217.033V217.125M62.4253 217.125V256.855L28.8645 237.479V197.748L62.4253 217.125Z" stroke="#D8D8D8" strokeWidth="0.500908"/>
                                    <path d="M95.6875 198.002L62.4714 217.115V255.837L95.6875 237.115V198.002Z" fill="#434343" stroke="#BBBBBB" strokeWidth="0.500908"/>
                                    <circle cx="45.4349" cy="228.174" r="2.67264" fill="#AAAAAA"/>
                                    <line x1="43.0287" y1="229.172" x2="0.266451" y2="253.761" stroke="#BBBBBB" strokeWidth="1.06906"/>
                                    <circle cx="223.433" cy="122.872" r="10.156" fill="#AC952F" stroke="#FAD83B" strokeWidth="1.06906"/>
                                    <path d="M218.355 124.665L217.088 121.173H217.837L218.789 123.957L219.747 121.173H220.486L219.218 124.665H218.355ZM222.399 124.725C222.06 124.725 221.76 124.649 221.501 124.496C221.242 124.343 221.037 124.131 220.887 123.862C220.741 123.589 220.668 123.275 220.668 122.919C220.668 122.563 220.741 122.251 220.887 121.981C221.037 121.708 221.242 121.496 221.501 121.343C221.76 121.19 222.06 121.113 222.399 121.113C222.742 121.113 223.043 121.19 223.302 121.343C223.565 121.496 223.768 121.708 223.911 121.981C224.057 122.251 224.13 122.563 224.13 122.919C224.13 123.275 224.057 123.589 223.911 123.862C223.768 124.131 223.565 124.343 223.302 124.496C223.043 124.649 222.742 124.725 222.399 124.725ZM222.399 124.096C222.609 124.096 222.79 124.048 222.943 123.952C223.096 123.855 223.214 123.721 223.297 123.548C223.38 123.371 223.422 123.162 223.422 122.919C223.422 122.676 223.38 122.468 223.297 122.295C223.214 122.119 223.096 121.983 222.943 121.886C222.79 121.79 222.609 121.742 222.399 121.742C222.193 121.742 222.013 121.79 221.86 121.886C221.711 121.983 221.592 122.119 221.506 122.295C221.423 122.468 221.381 122.676 221.381 122.919C221.381 123.162 221.423 123.371 221.506 123.548C221.592 123.721 221.711 123.855 221.86 123.952C222.013 124.048 222.193 124.096 222.399 124.096ZM225.406 124.665V121.737H224.388V121.173H227.117V121.737H226.099V124.665H225.406ZM227.589 124.665V121.173H229.899V121.737H228.287V122.62H229.749V123.163H228.287V124.101H229.899V124.665H227.589Z" fill="white"/>
                                    <circle cx="322.855" cy="118.596" r="10.156" fill="#AC952F" stroke="#FAD83B" strokeWidth="1.06906"/>
                                    <path d="M317.778 120.389L316.51 116.897H317.259L318.212 119.681L319.169 116.897H319.908L318.641 120.389H317.778ZM321.821 120.449C321.482 120.449 321.183 120.372 320.923 120.219C320.664 120.066 320.459 119.855 320.31 119.586C320.163 119.313 320.09 118.999 320.09 118.643C320.09 118.287 320.163 117.974 320.31 117.705C320.459 117.432 320.664 117.219 320.923 117.066C321.183 116.913 321.482 116.837 321.821 116.837C322.164 116.837 322.465 116.913 322.724 117.066C322.987 117.219 323.19 117.432 323.333 117.705C323.479 117.974 323.552 118.287 323.552 118.643C323.552 118.999 323.479 119.313 323.333 119.586C323.19 119.855 322.987 120.066 322.724 120.219C322.465 120.372 322.164 120.449 321.821 120.449ZM321.821 119.82C322.031 119.82 322.212 119.772 322.365 119.676C322.518 119.579 322.636 119.444 322.719 119.272C322.802 119.095 322.844 118.886 322.844 118.643C322.844 118.4 322.802 118.192 322.719 118.019C322.636 117.843 322.518 117.707 322.365 117.61C322.212 117.514 322.031 117.466 321.821 117.466C321.615 117.466 321.435 117.514 321.282 117.61C321.133 117.707 321.015 117.843 320.928 118.019C320.845 118.192 320.803 118.4 320.803 118.643C320.803 118.886 320.845 119.095 320.928 119.272C321.015 119.444 321.133 119.579 321.282 119.676C321.435 119.772 321.615 119.82 321.821 119.82ZM324.828 120.389V117.461H323.81V116.897H326.539V117.461H325.521V120.389H324.828ZM327.011 120.389V116.897H329.321V117.461H327.709V118.344H329.171V118.887H327.709V119.825H329.321V120.389H327.011Z" fill="white"/>
                                    <circle cx="134.701" cy="72.6267" r="10.156" fill="#AC952F" stroke="#FAD83B" strokeWidth="1.06906"/>
                                    <path d="M129.624 74.4196L128.357 70.9273H129.105L130.058 73.7111L131.016 70.9273H131.754L130.487 74.4196H129.624ZM133.667 74.4794C133.328 74.4794 133.029 74.4029 132.769 74.2499C132.51 74.0969 132.305 73.8857 132.156 73.6163C132.009 73.3436 131.936 73.0293 131.936 72.6734C131.936 72.3176 132.009 72.0049 132.156 71.7355C132.305 71.4628 132.51 71.2499 132.769 71.0969C133.029 70.9439 133.328 70.8674 133.667 70.8674C134.01 70.8674 134.311 70.9439 134.57 71.0969C134.833 71.2499 135.036 71.4628 135.179 71.7355C135.325 72.0049 135.399 72.3176 135.399 72.6734C135.399 73.0293 135.325 73.3436 135.179 73.6163C135.036 73.8857 134.833 74.0969 134.57 74.2499C134.311 74.4029 134.01 74.4794 133.667 74.4794ZM133.667 73.8508C133.877 73.8508 134.058 73.8026 134.211 73.7061C134.364 73.6097 134.482 73.475 134.565 73.302C134.649 73.1258 134.69 72.9162 134.69 72.6734C134.69 72.4306 134.649 72.2228 134.565 72.0498C134.482 71.8735 134.364 71.7372 134.211 71.6407C134.058 71.5443 133.877 71.496 133.667 71.496C133.461 71.496 133.282 71.5443 133.129 71.6407C132.979 71.7372 132.861 71.8735 132.774 72.0498C132.691 72.2228 132.65 72.4306 132.65 72.6734C132.65 72.9162 132.691 73.1258 132.774 73.302C132.861 73.475 132.979 73.6097 133.129 73.7061C133.282 73.8026 133.461 73.8508 133.667 73.8508ZM136.674 74.4196V71.4911H135.656V70.9273H138.385V71.4911H137.368V74.4196H136.674ZM138.857 74.4196V70.9273H141.167V71.4911H139.556V72.3741H141.017V72.9179H139.556V73.8558H141.167V74.4196H138.857Z" fill="white"/>
                                    <circle cx="117.596" cy="185.947" r="10.156" fill="#AC952F" stroke="#FAD83B" strokeWidth="1.06906"/>
                                    <path d="M112.519 187.74L111.252 184.247H112L112.953 187.031L113.911 184.247H114.649L113.382 187.74H112.519ZM116.562 187.799C116.223 187.799 115.924 187.723 115.664 187.57C115.405 187.417 115.201 187.206 115.051 186.936C114.904 186.664 114.831 186.349 114.831 185.993C114.831 185.638 114.904 185.325 115.051 185.055C115.201 184.783 115.405 184.57 115.664 184.417C115.924 184.264 116.223 184.187 116.562 184.187C116.905 184.187 117.206 184.264 117.465 184.417C117.728 184.57 117.931 184.783 118.074 185.055C118.22 185.325 118.294 185.638 118.294 185.993C118.294 186.349 118.22 186.664 118.074 186.936C117.931 187.206 117.728 187.417 117.465 187.57C117.206 187.723 116.905 187.799 116.562 187.799ZM116.562 187.171C116.772 187.171 116.953 187.123 117.106 187.026C117.259 186.93 117.377 186.795 117.46 186.622C117.544 186.446 117.585 186.236 117.585 185.993C117.585 185.751 117.544 185.543 117.46 185.37C117.377 185.193 117.259 185.057 117.106 184.961C116.953 184.864 116.772 184.816 116.562 184.816C116.356 184.816 116.177 184.864 116.024 184.961C115.874 185.057 115.756 185.193 115.669 185.37C115.586 185.543 115.545 185.751 115.545 185.993C115.545 186.236 115.586 186.446 115.669 186.622C115.756 186.795 115.874 186.93 116.024 187.026C116.177 187.123 116.356 187.171 116.562 187.171ZM119.569 187.74V184.811H118.551V184.247H121.28V184.811H120.263V187.74H119.569ZM121.752 187.74V184.247H124.062V184.811H122.451V185.694H123.912V186.238H122.451V187.176H124.062V187.74H121.752Z" fill="white"/>
                                    <line x1="335.379" y1="129.726" x2="293.686" y2="100.862" stroke="#BBBBBB" strokeWidth="1.06906"/>
                                    <line x1="132.251" y1="139.342" x2="98.0412" y2="114.754" stroke="#BBBBBB" strokeWidth="1.06906"/>
                                    <circle cx="293.456" cy="100.957" r="2.67264" fill="#AAAAAA"/>
                                    <circle cx="97.8186" cy="114.854" r="2.67264" fill="#AAAAAA"/>
                                </svg>

                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-3 flex flex-col gap-5">
                            <div ref={authCardRef} onMouseEnter={handleAuthHover} onMouseLeave={handleAuthHoverOut} className="bg-[#222222] border border-[#2F2F2F] rounded-lg learn-more-card overflow-hidden">
                                <div className="p-6 pb-0">
                                    <div className="flex items-center mb-4">
                                        <UserCog className="text-2xl mr-4" />
                                        <h3 className="font-bold">Authentication</h3>
                                    </div>
                                    <p className="text-sm text-[#E9E9E9] leading-relaxed">Implement user sign-ups and logins while ensuring your data is protected with the highest level of security.</p>
                                </div>
                                <div className="h-16 pb-25">
                                    <svg width="600" height="100" viewBox="10 -5 543 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M72.629 18.6594C72.629 18.6594 132 1.60202 170.621 1.01379C209.241 0.42555 261.119 18.6594 261.119 18.6594" stroke="#434343" strokeWidth="1.15284"/>
                                        <path d="M465.172 53.9503C465.172 53.9503 405.8 71.0077 367.18 71.5959C328.56 72.1842 276.682 53.9503 276.682 53.9503" stroke="#434343" strokeWidth="1.15284"/>
                                        <path className="top10-animation-overlay" d="M72.629 18.6594C72.629 18.6594 132 1.60202 170.621 1.01379C209.241 0.42555 261.119 18.6594 261.119 18.6594" stroke="#FAD83B" strokeWidth="1.15284"/>
                                        <path className="top10-animation-overlay" d="M465.172 53.9503C465.172 53.9503 405.8 71.0077 367.18 71.5959C328.56 72.1842 276.682 53.9503 276.682 53.9503" stroke="#FAD83B" strokeWidth="1.15284"/>

                                        <rect className="glow-rect" x="0.576421" y="16.8831" width="151.022" height="42.3728" rx="8.64632" fill="#222222" stroke="#2F2F2F" strokeWidth="1.15284"/>
                                        <text x="76" y="42" fontFamily="Arial" fontSize="12" fill="#BBBBBB" textAnchor="middle">John Doe@gmail.com</text>

                                        <rect className="glow-rect" x="194.254" y="16.8831" width="151.022" height="42.3728" rx="8.64632" fill="#222222" stroke="#2F2F2F" strokeWidth="1.15284"/>
                                        <text x="270" y="42" fontFamily="Arial" fontSize="12" fill="#BBBBBB" textAnchor="middle">010110111001010010</text>

                                        <rect className="glow-rect" x="389.084" y="16.8831" width="153.337" height="42.3728" rx="8.64632" fill="#222222" stroke="#2F2F2F" strokeWidth="1.15284"/>
                                        <text x="465" y="42" fontFamily="Arial" fontSize="12" fill="#BBBBBB" textAnchor="middle">USDD 2F1dgKVGasG8s</text>
                                    </svg>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="bg-[#222222] border border-[#2F2F2F] rounded-lg p-6 learn-more-card">
                                    <div className="flex items-center mb-4">
                                        <ScanFace className="text-2xl mr-4" />
                                        <h3 className="font-bold">Face Auth</h3>
                                    </div>
                                    <p className="text-sm text-[#E9E9E9] leading-relaxed">Identifies or verifies a person's identity by analyzing facial features from a digital image or video.</p>
                                </div>
                                <div className="bg-[#222222] border border-[#2F2F2F] rounded-lg p-6 learn-more-card">
                                    <div className="flex items-center mb-4">
                                        <AudioLines className="text-2xl mr-4" />
                                        <h3 className="font-bold">Voice Auth</h3>
                                    </div>
                                    <p className="text-sm text-[#E9E9E9] leading-relaxed">It converts spoken words into a format that computers can understand, typically text.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearnMore;
