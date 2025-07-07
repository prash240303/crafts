"use client";
import React, { useEffect } from 'react';

const MagicText: React.FC = () => {
  useEffect(() => {
    const interval = 1000;
    const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    const animate = (star: HTMLElement) => {
      star.style.setProperty('--star-left', `${rand(-10, 110)}%`);
      star.style.setProperty('--star-top', `${rand(-30, 130)}%`);
      star.style.animation = 'none';
      star.offsetHeight;
      star.style.animation = '';
    };

    const stars = document.querySelectorAll('.magic-star') as NodeListOf<HTMLElement>;
    stars.forEach((star, i) => {
      setTimeout(() => {
        animate(star);
        setInterval(() => animate(star), interval);
      }, i * (interval / 3));
    });
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes magic {
          0% { opacity: 0; transform: translateY(100%) rotate(0deg); }
          100% { opacity: 1; transform: translateY(0) rotate(360deg); }
        }
        @keyframes bg-pan {
          0% { background-position: 0% center; }
          100% { background-position: -200% center; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .magic-star {
          --size: 0.75rem;
          --color: #9333ea;
          position: absolute;
          left: var(--star-left, 50%);
          top: var(--star-top, 50%);
          width: var(--size);
          height: var(--size);
          color: var(--color);
          animation: magic 0.5s ease-in-out infinite alternate;
          pointer-events: none;
        }
        .magic-star svg {
          width: 100%;
          height: 100%;
          fill: currentColor;
          animation: spin 4s linear infinite;
        }
        .magic-text {
          background: linear-gradient(45deg, #9333ea, #a855f7, #c084fc, #9333ea);
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: bg-pan 3s ease-in-out infinite;
        }
      `}</style>
      
      <div className="flex justify-center mt-8 relative">
        <h1 className="text-black text-3xl md:text-5xl font-light text-center relative">
          Like all good stories, it&apos;s a{' '}
          <span className="relative inline-block">
            <span className="relative inline-block">
              {[...Array(3)].map((_, i) => (
                <span key={i} className="magic-star absolute">
                  <svg viewBox="0 0 512 512">
                    <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
                  </svg>
                </span>
              ))}
              <span className="magic-text">
                story about magic ✦
              </span>
            </span>
          </span>
        </h1>
      </div>
    </>
  );
};

export default MagicText;