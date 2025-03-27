import React from 'react';
import { Star } from 'lucide-react';

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

const RatingSection = ({ onOpen }) => (
  <div
    className="rounded-2xl p-8 shadow-lg border relative overflow-hidden"
    style={{ backgroundColor: COLORS.offWhite, borderColor: COLORS.lightGray }}
  >
    {/* Gold accent decorations */}
    <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-10"
         style={{ backgroundColor: COLORS.gold }}></div>
    <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full opacity-10"
         style={{ backgroundColor: COLORS.gold }}></div>

    <div className="relative z-10 text-center space-y-6">
      <div
        className="inline-flex items-center justify-center p-4 rounded-full border-2 shadow-lg"
        style={{ backgroundColor: COLORS.offWhite, borderColor: COLORS.gold }}
      >
        <Star size={36} style={{ color: COLORS.gold, fill: COLORS.gold }} />
      </div>

      <h2
        className="text-2xl font-bold text-transparent bg-clip-text"
        style={{ backgroundImage: COLORS.goldGradient }}
      >
        How was your experience?
      </h2>

      <p className="max-w-prose mx-auto" style={{ color: COLORS.mediumGray }}>
        Your feedback helps us improve! Please take a moment to rate your shopping experience.
      </p>

      <button
        onClick={onOpen}
        className="px-8 py-3 rounded-lg font-medium transition-all duration-300 border-2"
        style={{
          backgroundColor: COLORS.brightGold,
          color: COLORS.black,
          borderColor: COLORS.darkGold,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.darkGold;
          e.currentTarget.style.color = COLORS.offWhite;
          e.currentTarget.style.boxShadow = COLORS.glowGold;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.brightGold;
          e.currentTarget.style.color = COLORS.black;
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        Submit Your Rating
      </button>
    </div>
  </div>
);

export default RatingSection;