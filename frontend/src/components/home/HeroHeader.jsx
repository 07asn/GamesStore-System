import React from 'react';
import videoHome from '../../assets/video-home.mp4';

const HeroHeader = () => {
  return (
    <header className="relative overflow-hidden min-h-[70vh] text-center text-white font-[cursive] bg-[#1a1a1a]">
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
      <div className="relative z-10 p-4 sm:p-5 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="py-4 sm:py-8">
          <h1 className="animate-gradient-text text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[2px] leading-[1.3] px-2 sm:px-4">
            Beyond Gaming
          </h1>
          <p className="animate-gradient-text text-xl sm:text-2xl md:text-[1.9rem] font-normal mb-6 sm:mb-8 leading-[1.4] mt-2 sm:mt-4">
            ENJOYING GAME!
          </p>
          <a href="shop.html">
            <button className="w-[14rem] sm:w-[17rem] h-[4.5rem] sm:h-[5.5rem] rotate-5 origin-center font-[cursive] text-xl sm:text-2xl cursor-pointer pb-1 rounded shadow-[0_2px_0_#494a4b] transition-all bg-white mt-4 text-black header-button">
              <span className="bg-[#FFDF00] block px-4 sm:px-6 py-3 sm:py-4 rounded border-2 border-[#494a4b] text-black">
                Explore Games
              </span>
            </button>
          </a>
        </div>
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
          padding: 0.1em 0;
        }
        .header-button:active {
          transform: translateY(5px) rotate(5deg);
          padding-bottom: 0px;
        }
        
        /* Additional responsive adjustments */
        @media (max-width: 360px) {
          .animate-gradient-text {
            padding: 0.15em 0;
          }
        }
      `}</style>
    </header>
  );
};

export default HeroHeader;
