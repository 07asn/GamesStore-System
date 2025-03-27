import React, { useState, useEffect } from 'react';
import axios from 'axios';
import malePic from '../../assets/male.png';
import femalePic from '../../assets/female.png';

// Enhanced color palette with more depth
const colors = {
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

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const reviewsPerPage = 2;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews/fivestar');
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Auto-rotate every 7 seconds, pauses on hover
  useEffect(() => {
    if (reviews.length > 0 && !isHovering) {
      const totalPages = Math.ceil(reviews.length / reviewsPerPage);
      const interval = setInterval(() => {
        setCurrentPage(prevPage => (prevPage + 1) % totalPages);
      }, 7000);
      
      return () => clearInterval(interval);
    }
  }, [reviews, isHovering]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 transition-all duration-300 ${i < rating ? 'animate-pulse-subtle' : ''}`}
        fill={i < rating ? colors.brightGold : colors.lightGray}
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: i < rating ? 'drop-shadow(0 0 2px rgba(255, 223, 0, 0.5))' : 'none' }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div style={{ background: colors.offWhite }} className="flex justify-center items-center h-64">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin" 
            style={{ borderColor: `transparent ${colors.gold} ${colors.gold} ${colors.gold}` }}></div>
          <div className="absolute inset-3 rounded-full border-2 border-t-transparent animate-spin" 
            style={{ borderColor: `${colors.brightGold} transparent ${colors.brightGold} ${colors.brightGold}`, 
            animationDirection: 'reverse', animationDuration: '1s' }}></div>
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gradient-to-br from-brightGold to-darkGold rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const displayedReviews = reviews.slice(
    currentPage * reviewsPerPage, 
    (currentPage + 1) * reviewsPerPage
  );

  return (
    <section 
      style={{ backgroundColor: colors.offWhite }} 
      className="py-16 relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Enhanced background with parallax effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{ 
            backgroundImage: 'url(/api/placeholder/1200/800)', 
            backgroundSize: 'cover', 
            filter: 'blur(8px)',
            transform: 'scale(1.1)',
            transition: 'transform 0.5s ease-out'
          }}></div>
      </div>
      
      {/* Animated controller outlines in background */}
      <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10 animate-pulse-slow"
        style={{ border: `2px solid ${colors.gold}` }}></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-10 animate-float"
        style={{ border: `2px solid ${colors.gold}` }}></div>
      
      {/* Gaming grid pattern overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{ 
          backgroundImage: `linear-gradient(${colors.darkGold}33 1px, transparent 1px), linear-gradient(90deg, ${colors.darkGold}33 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 transform transition-all duration-500 hover:scale-105">
          <div className="inline-block mb-2 relative">
            {/* Enhanced Controller Icon with glow effect */}
            <div className="absolute inset-0 opacity-50 animate-pulse-slow rounded-full"
              style={{ 
                background: `radial-gradient(circle, ${colors.brightGold}40 0%, transparent 70%)`,
                filter: 'blur(10px)'
              }}></div>
            <svg className="w-12 h-12 mx-auto mb-2 relative z-10 transform transition-transform duration-500 hover:rotate-12" 
              fill={colors.darkGold} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5,7A5.5,5.5 0 0,1 23,12.5A5.5,5.5 0 0,1 17.5,18C15.79,18 14.27,17.22 13.26,16H10.74C9.73,17.22 8.21,18 6.5,18A5.5,5.5 0 0,1 1,12.5A5.5,5.5 0 0,1 6.5,7H17.5M6.5,9A3.5,3.5 0 0,0 3,12.5A3.5,3.5 0 0,0 6.5,16C7.9,16 9.1,15.18 9.66,14H14.34C14.9,15.18 16.1,16 17.5,16A3.5,3.5 0 0,0 21,12.5A3.5,3.5 0 0,0 17.5,9H6.5M5.75,10.25H7.25V11.75H8.75V13.25H7.25V14.75H5.75V13.25H4.25V11.75H5.75V10.25M16.75,12.5A1,1 0 0,1 17.75,13.5A1,1 0 0,1 16.75,14.5A1,1 0 0,1 15.75,13.5A1,1 0 0,1 16.75,12.5M18.75,10.5A1,1 0 0,1 19.75,11.5A1,1 0 0,1 18.75,12.5A1,1 0 0,1 17.75,11.5A1,1 0 0,1 18.75,10.5Z" />
            </svg>
          </div>
          
          <h2 className="text-4xl font-bold mb-4 uppercase tracking-wider relative inline-block" style={{ color: colors.black }}>
            {/* Text with gradient and shadow effect */}
            <span className="relative z-10" style={{ 
              background: colors.goldGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>PLAYER</span>
            <span style={{ color: colors.black }}> REVIEWS</span>
            
            {/* Underline accent */}
            <span className="absolute -bottom-1 left-0 h-1 w-full transform origin-left" 
              style={{ 
                background: colors.goldGradient,
                transformOrigin: 'left',
                transform: 'scaleX(0.3)',
                opacity: 0.7
              }}></span>
          </h2>
          
          {/* Enhanced pixel-style separator with animation */}
          <div className="flex justify-center items-center mb-4">
            <div className="h-1 w-12 transform origin-right transition-all duration-500 hover:scale-x-150" 
              style={{ backgroundColor: colors.lightGray }}></div>
            <div className="h-1 w-16 transform transition-all duration-500 hover:scale-y-2" 
              style={{ 
                background: colors.goldGradient,
                boxShadow: colors.glowGold
              }}></div>
            <div className="h-1 w-12 transform origin-left transition-all duration-500 hover:scale-x-150" 
              style={{ backgroundColor: colors.lightGray }}></div>
          </div>
          
          <p className="mt-4 max-w-2xl mx-auto text-lg" style={{ color: colors.darkGray }}>
            Authentic experiences from our gaming community
          </p>
        </div>

        {/* Enhanced pagination controls styled as game UI element */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-8">
            <div className="flex space-x-3 bg-opacity-20 py-3 px-6 rounded-full transition-all duration-300 hover:bg-opacity-30" 
              style={{ 
                backgroundColor: colors.lightGray,
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
              }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className="h-3 rounded-full transition-all duration-300 transform hover:scale-110"
                  style={{ 
                    backgroundColor: i === currentPage ? colors.brightGold : colors.mediumGray,
                    width: i === currentPage ? '28px' : '12px',
                    boxShadow: i === currentPage ? `0 0 12px ${colors.darkGold}80` : 'none'
                  }}
                  aria-label={`View review page ${i + 1}`}
                ></button>
              ))}
            </div>
          </div>
        )}

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedReviews.map((review, index) => (
              <ReviewCard 
                key={review.review_id || index} 
                review={review} 
                renderStars={renderStars} 
                colors={colors}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ review, renderStars, colors, delay = 0 }) => {
  // Extract data using the specified structure
  const { rating = 5, review: reviewText = "Great Game and Service" } = review;
  const userName = review.user?.name || "Anonymous Gamer";
  const userGender = review.user?.gender || "male";
  const productName = review.product?.name || "Game Title";
  
  // Gender-specific profile image based on imported assets
  const profileImage = userGender === "male" ? malePic : femalePic;
  
  return (
    <div 
      className="transform transition-all duration-500 hover:-translate-y-2 hover:scale-103"
      style={{ 
        animation: `fadeSlideUp 0.6s ease-out ${delay}s both`,
        willChange: 'transform, opacity'
      }}
    >
      <div className="rounded-lg relative overflow-hidden border-2" 
        style={{ 
          backgroundColor: colors.offWhite,
          borderColor: colors.darkGold,
          boxShadow: `0 15px 30px -10px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(223, 191, 0, 0.05)`,
          transition: 'all 0.4s ease'
        }}>
        {/* Top hexagon pattern with gradient */}
        <div className="h-4" style={{ 
          background: colors.goldGradient,
          clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)"
        }}></div>
        
        <div className="p-6">
          {/* Enhanced game badge with hexagon shape and glow effect */}
          <div className="absolute top-6 right-6 z-10">
            <div className="px-4 py-1 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ 
                backgroundColor: colors.darkGray,
                color: colors.lightGray,
                clipPath: "polygon(8% 0, 100% 0, 92% 100%, 0% 100%)",
                boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
                transform: 'translateZ(0)',
                borderRight: `2px solid ${colors.darkGold}`
              }}>
              {productName}
            </div>
          </div>
          
          {/* Enhanced user info with gender-specific image */}
          <div className="flex items-center mb-6">
            <div className="relative group">
              {/* User profile image with hover effect */}
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-300 transform group-hover:scale-110"
                style={{ 
                  borderColor: colors.darkGold,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}>
                <img 
                  src={profileImage} 
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Online indicator with pulse animation */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 animate-pulse"
                style={{ 
                  backgroundColor: "#44bd32", 
                  borderColor: colors.offWhite,
                  boxShadow: '0 0 0 2px rgba(68, 189, 50, 0.3)'
                }}></div>
            </div>
            
            <div className="ml-4">
              <h5 className="font-bold text-lg" style={{ color: colors.black }}>{userName}</h5>
              <div className="flex mt-1">
                {renderStars(rating)}
              </div>
            </div>
          </div>
          
          {/* Enhanced review text with gaming style quote and hover effects */}
          <div className="mb-6 p-5 rounded relative transition-all duration-300 hover:shadow-md" 
            style={{ 
              backgroundColor: colors.lightGray,
              border: `1px solid ${colors.mediumGray}`,
              transform: 'translateZ(0)'
            }}>
            {/* Top quote mark with enhanced design */}
            <div className="absolute -top-3 left-5 px-3 py-1 transform transition-all duration-300 hover:rotate-12 hover:scale-110"
              style={{ 
                background: colors.goldGradient,
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}>
              <svg className="w-5 h-5" fill={colors.darkGray} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
              </svg>
            </div>
            
            <p className="text-lg leading-relaxed" style={{ color: colors.black }}>
              {reviewText}
            </p>
            
            {/* Bottom quote mark with enhanced design */}
            <div className="absolute -bottom-3 right-5 px-3 py-1 rotate-180 transform transition-all duration-300 hover:rotate-12 hover:scale-110"
              style={{ 
                background: colors.goldGradient,
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
              }}>
              <svg className="w-5 h-5" fill={colors.darkGray} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,7L8,11H11V17H5V11L7,7H10M18,7L16,11H19V17H13V11L15,7H18Z" />
              </svg>
            </div>
          </div>
          
          {/* Enhanced date stamp with game-style design */}
          <div className="flex justify-center">
            <span className="text-xs px-4 py-1 rounded-full transition-all duration-300 hover:shadow-inner" 
              style={{ 
                color: colors.mediumGray,
                backgroundColor: `${colors.lightGray}80`,
                border: `1px dashed ${colors.mediumGray}50`
              }}>
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
        
        {/* Bottom accent border */}
        <div className="h-1" style={{ background: colors.goldGradient }}></div>
      </div>
    </div>
  );
};

// Define new CSS animations
const styles = `
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-subtle {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}
`;

// Add style tag for custom animations
const styleTag = document.createElement('style');
styleTag.innerHTML = styles;
document.head.appendChild(styleTag);

export default ReviewsSection;