import React, { useState, useEffect } from "react";
import G1 from "../../assets/G1.jpeg";
import G2 from "../../assets/G2.jpg";
import G3 from "../../assets/G3.jpeg";
import G5 from "../../assets/G5.webp";
import G6 from "../../assets/G6.jpg";
import G7 from "../../assets/G7.jpg";

const COLORS = {
  gold: '#DFBF00',
  brightGold: '#FFDF00',
  darkGold: '#C1A811',
  goldGradient: 'linear-gradient(135deg, #FFDF00, #C1A811)',
  black: '#000000',
  lightGray: '#DBDBDB',
  mediumGray: '#636362',
  darkGray: '#2A2A2A',
  offWhite: '#F6F6F6',
  glowGold: '0 0 15px rgba(223, 191, 0, 0.5)'
};

const LibraryGames = () => {
  // State for RPG animations
  const [isLoading, setIsLoading] = useState(true);
  const [animationState, setAnimationState] = useState(0);

  // Simulate loading screen like in RPGs
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play animation cycle for visual effects
  useEffect(() => {
    if (isLoading) return;
    
    const interval = setInterval(() => {
      setAnimationState(prevState => (prevState + 1) % 7); // Cycle through animation states
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isLoading]);

  // Loading screen component
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: COLORS.brightGold }}>
            Loading Game Library...
          </h2>
          <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full transition-all duration-1500 rounded-full"
              style={{ 
                width: `${(isLoading ? 0 : 100)}%`,
                backgroundImage: COLORS.goldGradient 
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ backgroundColor: COLORS.offWhite, color: COLORS.darkGray }}
    >
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: COLORS.brightGold, opacity: 0.15, animationDuration: '4s' }}
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: COLORS.darkGold, opacity: 0.15, animationDuration: '5s' }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading with RPG style */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1
            className="mb-4 text-4xl md:text-5xl font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: COLORS.goldGradient }}
          >
            Huge Library of Games
          </h1>
          <p
            className="mb-6 text-center text-lg"
            style={{ color: COLORS.mediumGray }}
          >
            We offer a vast selection of games from all genres, ensuring that you'll
            find something you love. Whether you're into action, adventure, or puzzle
            games, we have it all. Explore our collection today!
          </p>
        </div>

        {/* Images Layout with RPG animation effects */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Left Column */}
          <div className="md:col-span-3">
            <ImageSquare 
              src={G1} 
              alt="Ubisoft" 
              title="Ubisoft" 
              isHighlighted={animationState === 0}
            />
          </div>

          {/* Middle Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex gap-4">
              <div className="w-7/12">
                <ImageSquare 
                  src={G2} 
                  alt="XBOX" 
                  title="XBOX" 
                  isHighlighted={animationState === 1}
                />
              </div>
              <div className="w-5/12">
                <ImageSquare 
                  src={G3} 
                  alt="Playstation" 
                  title="Playstation" 
                  isHighlighted={animationState === 2}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-5/12">
                <ImageSquare 
                  src={G5} 
                  alt="Activiction" 
                  title="Activiction" 
                  isHighlighted={animationState === 3}
                />
              </div>
              <div className="w-7/12">
                <ImageSquare 
                  src={G7} 
                  alt="Rockstar" 
                  title="Rockstar" 
                  isHighlighted={animationState === 4}
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-3">
            <ImageSquare 
              src={G6} 
              alt="EA" 
              title="EA" 
              isHighlighted={animationState === 5}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ImageSquare = ({ src, alt, title, isHighlighted }) => {
  return (
    <div
      className={`relative aspect-square overflow-hidden transition-all duration-700 ${isHighlighted ? 'ring-2 ring-yellow-400' : ''}`}
      style={{ 
        boxShadow: isHighlighted ? '0 0 20px rgba(223, 191, 0, 0.8)' : COLORS.glowGold,
        transform: isHighlighted ? 'scale(1.05)' : 'scale(1)'
      }}
    >
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isHighlighted ? 'scale-110' : ''}`}
      />
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-500 ${isHighlighted ? 'opacity-0' : 'opacity-40'}`}
      />
      <h3
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-bold px-4 py-2 rounded transition-all duration-500 ${isHighlighted ? 'bg-black bg-opacity-80 scale-110' : 'bg-black bg-opacity-60'}`}
        style={{ 
          boxShadow: isHighlighted ? '0 0 15px rgba(255, 223, 0, 0.9)' : COLORS.glowGold,
        }}
      >
        {title}
      </h3>
      
      {/* RPG-like particles effect when highlighted */}
      {isHighlighted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full bg-yellow-400 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: `${Math.random() * 2 + 1}s`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Add these animations to your global CSS
const animationStyles = `
@keyframes float {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-20px); opacity: 0; }
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-float {
  animation: float 2s ease-out forwards;
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out forwards;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
`;

export default LibraryGames;