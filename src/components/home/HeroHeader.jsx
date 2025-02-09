// src/components/HeroHeader.jsx
import React from 'react';
import videoHome from '../../assets/video-home.mp4';

const HeroHeader = () => {
  return (
    <header className="relative overflow-hidden h-[60vh] text-center text-white font-[cursive] bg-[#1a1a1a]">
      {/* Video Background */}
      <video
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoHome} type="video/mp4" />

        Your browser does not support the video tag.
      </video>

      {/* Header Content */}
      <div className="relative z-10 p-5 ">
        <h1 className="animate-gradient-text text-[9rem] font-bold tracking-[2px] my-8 leading-[1.1] md:text-[7rem] sm:text-[5rem] xs:text-[4rem]">
          Beyond Gaming
        </h1>
        <p className="animate-gradient-text text-[1.9rem] font-normal mb-8 leading-[1.4] md:text-[1.5rem]">
          ENJOYING GAME!
        </p>
        <a href="shop.html">
          <button className="w-[17rem] h-[5.5rem] rotate-5 origin-center font-[cursive] text-2xl cursor-pointer pb-1 rounded shadow-[0_2px_0_#494a4b] transition-all bg-white mt-4 text-black header-button">
            <span className="bg-[#FFDF00] block px-6 py-4 rounded border-2 border-[#494a4b] text-black">
              Explore Games
            </span>
          </button>
        </a>
      </div>

      {/* Custom CSS for animated gradient text and active button */}
      <style jsx global>{`
        @keyframes textColorChange {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-text {
          background: linear-gradient(270deg, #eaff00, #00ff1e, #ff75f3, #00ffff);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textColorChange 5s ease-in-out infinite;
        }
        .header-button:active {
          transform: translateY(5px) rotate(5deg);
          padding-bottom: 0px;
        }
      `}</style>
    </header>
  );
};

export default HeroHeader;
