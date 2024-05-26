"use client";
import React, { useEffect } from 'react';

const MagicText: React.FC = () => {
  useEffect(() => {
    let index = 0;
    const interval = 1000;

    const rand = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const animate = (star: HTMLElement) => {
      star.style.setProperty('--star-left', `${rand(-10, 110)}%`);
      star.style.setProperty('--star-top', `${rand(-30, 130)}%`);
      star.style.animation = 'none';
      star.offsetHeight; // trigger reflow
      star.style.animation = '';
    };

    const stars = document.getElementsByClassName('magic-star');
    Array.from(stars).forEach((star) => {
      setTimeout(() => {
        animate(star as HTMLElement);
        setInterval(() => animate(star as HTMLElement), interval);
      }, index++ * (interval / 3));
    });
  }, []);

  return (
    <div className="flex justify-center mt-8 relative">
      <h1 className="text-black font-sans text-3xl md:text-5xl font-light text-center relative">
        Like all good stories, it’s a  <span className="relative inline-block magic-container">
          <span className="magic">
            <span className="magic-star absolute">
              <svg viewBox="0 0 512 512" className="animate-spin-slow">
                <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
              </svg>
            </span>
            <span className="magic-star absolute">
              <svg viewBox="0 0 512 512" className="animate-spin-slow">
                <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
              </svg>
            </span>
            <span className="magic-star absolute">
              <svg viewBox="0 0 512 512" className="animate-spin-slow">
                <path d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
              </svg>
            </span>
            <span className="magic-text bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 bg-clip-text text-transparent animate-bg-pan">
              story about magic ✦
            </span>
          </span>
        </span>
      </h1>
    </div>
  );
};

export default MagicText;
