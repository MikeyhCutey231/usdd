import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MarqueeItem = ({ text, isLight }) => {
    const containerRef = useRef(null);
    const duration = isLight ? 20 : 10;

    useEffect(() => {
        const inner = containerRef.current;
        const content = inner.querySelector('.ticker-text');
        const clone = content.cloneNode(true);
        inner.append(clone);

        const animations = [];
        inner.querySelectorAll('.ticker-text').forEach(element => {
            const animation = gsap.to(element, {
                x: "-100%",
                repeat: -1,
                duration: duration,
                ease: "linear"
            });
            animations.push(animation);
        });

        const handleMouseEnter = () => animations.forEach(anim => anim.pause());
        const handleMouseLeave = () => animations.forEach(anim => anim.play());

        inner.addEventListener('mouseenter', handleMouseEnter);
        inner.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            animations.forEach(anim => anim.kill());
            inner.removeEventListener('mouseenter', handleMouseEnter);
            inner.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [duration]);

    return (
        <div className={`ticker ${isLight ? 'bg-[#FAD83B]' : 'bg-[#1f1f1f]'} p-[1vw] whitespace-nowrap`}
             style={{ transform: `rotateZ(${isLight ? -2 : 2}deg)`, scale: 1.1 }}>
            <div ref={containerRef} className="flex gap-5 ticker-wrap">
                <div className={`ticker-text text-[clamp(40px,4.375vw,70px)] font-semibold tracking-tight ${isLight ? 'text-black' : 'text-white'}`}>
                    {text}
                </div>
            </div>
        </div>
    );
};

const Marquee = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center gap-[50px] overflow-hidden">
            <MarqueeItem
                isLight={true}
                text="Join the discussion • Verify your voice on the blockchain • Propose new petitions • Shape laws together • Empower democracy through technology •"
            />
            <MarqueeItem
                isLight={false}
                text="Connect with us • Share your ideas • Engage in petitions • Collaborate on forums • Strengthen democracy together •"
            />
        </div>
    );
};

export default Marquee;
