import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  Package, 
  ShoppingCart, 
  Warehouse,
  Ticket,
  MessageSquare,
  Mail,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  ChevronRight,
  Sword,
  Shield,
  Gem,
  ScrollText,
  Castle,
  Crosshair,
  Crown,
  Trophy,
  Coins,
  Scroll,
  Hammer,
  MessageCircle
} from 'lucide-react';

// Premium Royal Gold Color Palette
const colors = {
  royalGold: '#D4AF37',         // Classic royal gold
  brightGold: '#FFD700',        // Vibrant gold
  darkGold: '#996515',          // Deep antique gold
  paleGold: '#F5E6B3',          // Soft parchment gold
  goldGradient: 'linear-gradient(135deg, #D4AF37 0%, #996515 100%)',
  goldGradientAlt: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 50%, #996515 100%)',
  richBlack: '#0A0A0A',         // Deep black for contrast
  velvetBlack: '#1A1A1A',       // Slightly softer black
  parchment: '#F8F4E6',         // Warm antique white
  lightParchment: '#FFFDF5',    // Brighter parchment
  charcoal: '#333333',          // Dark gray
  silver: '#C0C0C0',            // Metallic silver
  glowGold: '0 0 12px rgba(212, 175, 55, 0.7)',
  deepShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
  royalBorder: '1px solid rgba(212, 175, 55, 0.3)'
};

const SidebarAdmin = ({ setSelectedTab, selectedTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [activeGlow, setActiveGlow] = useState(null);
  const [hoverItem, setHoverItem] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1280) {
        setIsExpanded(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // RPG-themed menu items with enhanced descriptions
  const menuItems = [
    { id: 'Users', label: 'Royal Knights', icon: <Sword size={28} />, desc: 'Manage Nobility' },
    { id: 'Categories', label: 'Ancient Tomes', icon: <ScrollText size={28} />, desc: 'Library Archives' },
    { id: 'Products', label: 'Crown Jewels', icon: <Gem size={28} />, desc: 'Treasure Vault' },
    { id: 'Orders', label: 'Royal Decrees', icon: <Crosshair size={28} />, desc: 'Kingdom Orders' },
    { id: 'Inventory', label: 'Armory', icon: <Shield size={28} />, desc: 'Weapons & Armor' },
    { id: 'Coupons', label: 'Royal Seals', icon: <Scroll size={28} />, desc: 'Official Proclamations' },
    { id: 'Comments', label: 'Court Gossip', icon: <MessageCircle size={28} />, desc: 'Kingdom Rumors' },
    { id: 'Messages', label: 'Royal Scrolls', icon: <Mail size={28} />, desc: 'Messenger Pigeons' }
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setActiveGlow(null);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMenuClick = (id) => {
    setSelectedTab(id);
    setActiveGlow(id);
    setTimeout(() => setActiveGlow(null), 2000);
    if (windowWidth < 768) {
      setIsOpen(false);
    }
  };

  const sidebarWidthClasses = isExpanded 
    ? "w-80 xl:w-96"  // Responsive larger width
    : "w-24"; // Elegant collapsed width

  return (
    <>
      {/* Enhanced Mobile Menu Button */}
      <button 
        onClick={toggleSidebar}
        style={{
          background: colors.goldGradient,
          boxShadow: `${colors.glowGold}, ${colors.deepShadow}`,
          border: colors.royalBorder
        }}
        className="md:hidden fixed top-6 left-6 z-50 p-3 text-black rounded-full shadow-lg transform transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Luxurious Sidebar Container */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 ${sidebarWidthClasses} flex flex-col transition-all duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} md:relative shadow-2xl`}
        style={{ 
          background: colors.velvetBlack,
          borderRight: `2px solid ${colors.royalGold}`,
          boxShadow: colors.deepShadow
        }}
      >
        
        {/* Regal Sidebar Header */}
        <div 
          className={`p-5 flex ${isExpanded ? 'justify-between' : 'justify-center'} items-center`}
          style={{ 
            background: colors.goldGradient,
            borderBottom: `1px solid ${colors.darkGold}`
          }}
        >
          {isExpanded ? (
            <>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 overflow-hidden"
                    style={{ 
                      background: colors.goldGradientAlt,
                      borderColor: colors.brightGold,
                      boxShadow: colors.glowGold
                    }}
                  >
                    <Crown size={24} className="text-velvetBlack" />
                  </div>
                  <div 
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2"
                    style={{ 
                      background: colors.brightGold,
                      borderColor: colors.darkGold,
                      boxShadow: colors.glowGold
                    }}
                  ></div>
                </div>
                <h1 
                  className="text-xl font-bold tracking-wider"
                  style={{ 
                    color: colors.velvetBlack,
                    textShadow: '0 1px 2px rgba(255, 215, 0, 0.5)',
                    fontFamily: "'Cinzel', serif"
                  }}
                >
                  07ASN HUB
                </h1>
              </div>
              <button 
                onClick={toggleExpanded}
                className="p-1 rounded-full transition-all transform hover:rotate-180 duration-300"
                style={{ 
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: `1px solid ${colors.darkGold}`
                }}
              >
                <ChevronRight 
                  size={24}
                  className={`transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`} 
                  style={{ color: colors.velvetBlack }}
                />
              </button>
            </>
          ) : (
            <button 
              onClick={toggleExpanded}
              className="p-1 rounded-full transition-all transform hover:rotate-180 duration-300"
              style={{ 
                background: 'rgba(0, 0, 0, 0.2)',
                border: `1px solid ${colors.darkGold}`
              }}
            >
              <div className="relative">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 overflow-hidden"
                  style={{ 
                    background: colors.goldGradientAlt,
                    borderColor: colors.brightGold,
                    boxShadow: colors.glowGold
                  }}
                >
                  <Crown size={20} className="text-velvetBlack" />
                </div>
              </div>
            </button>
          )}
        </div>
        
        {/* Royal Navigation Links */}
        <nav 
          className="flex-1 overflow-y-auto py-5 px-3 scrollbar-thin"
          style={{ background: colors.richBlack }}
        >
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                onMouseEnter={() => setHoverItem(item.id)}
                onMouseLeave={() => setHoverItem(null)}
                className={`relative w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out text-left
                  ${selectedTab === item.id 
                    ? 'border-l-4' 
                    : 'border-l-4 border-transparent'} 
                  ${isExpanded ? 'justify-start' : 'justify-center'}`}
                style={{
                  background: selectedTab === item.id 
                    ? `linear-gradient(to right, rgba(212, 175, 55, 0.15), transparent)` 
                    : hoverItem === item.id ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
                  boxShadow: selectedTab === item.id ? colors.glowGold : 'none',
                  borderLeftColor: selectedTab === item.id ? colors.royalGold : 'transparent'
                }}
              >
                <div 
                  className="relative flex-shrink-0"
                  style={{ 
                    color: selectedTab === item.id 
                      ? colors.royalGold 
                      : hoverItem === item.id ? colors.silver : colors.silver,
                    filter: selectedTab === item.id ? 'drop-shadow(0 0 4px rgba(212, 175, 55, 0.7))' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {item.icon}
                  {selectedTab === item.id && (
                    <div 
                      className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full"
                      style={{ 
                        background: colors.brightGold,
                        boxShadow: colors.glowGold
                      }}
                    ></div>
                  )}
                </div>
                {isExpanded && (
                  <div className="flex flex-col items-start overflow-hidden">
                    <span 
                      className="font-medium tracking-wide truncate"
                      style={{ 
                        color: selectedTab === item.id 
                          ? colors.royalGold 
                          : hoverItem === item.id ? colors.paleGold : colors.parchment,
                        fontFamily: "'Cinzel', serif",
                        fontSize: '0.95rem'
                      }}
                    >
                      {item.label}
                    </span>
                    <span 
                      className="text-xs tracking-wide truncate"
                      style={{ 
                        color: selectedTab === item.id 
                          ? colors.paleGold 
                          : hoverItem === item.id ? colors.silver : colors.charcoal,
                        fontFamily: "'Marcellus', serif"
                      }}
                    >
                      {item.desc}
                    </span>
                  </div>
                )}
                {selectedTab === item.id && isExpanded && (
                  <div 
                    className="ml-auto w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ 
                      background: colors.brightGold,
                      boxShadow: colors.glowGold
                    }}
                  ></div>
                )}
                {(hoverItem === item.id || selectedTab === item.id) && (
                  <div 
                    className="absolute -left-0.5 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-full"
                    style={{ 
                      background: colors.royalGold,
                      boxShadow: '0 0 8px rgba(212, 175, 55, 0.8)'
                    }}
                  ></div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Royal Footer Commands */}
        <div 
          className={`px-3 py-4 space-y-2 ${!isExpanded && 'flex flex-col items-center'}`}
          style={{ 
            background: `linear-gradient(to top, rgba(255, 196, 0, 0.1), transparent)`,
            borderTop: `1px solid rgba(212, 175, 55, 0.2)`
          }}
        >
          <button 
            onClick={() => window.location.href = "/"}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out w-full group hover:bg-opacity-10`}
            style={{ 
              background: 'rgba(212, 175, 55, 0.05)',
              color: colors.parchment
            }}
          >
            <ArrowLeft 
              size={24}
              className="group-hover:animate-bounce" 
              style={{ color: colors.paleGold }}
            />
            {isExpanded && (
              <span 
                className="font-medium tracking-wide" 
                style={{ 
                  fontSize: '0.95rem',
                  fontFamily: "'Cinzel', serif",
                  color: colors.paleGold
                }}
              >
                Return to Kingdom
              </span>
            )}
          </button>
          <button 
            onClick={handleLogout}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out w-full group hover:bg-opacity-10`}
            style={{ 
              background: 'rgba(212, 175, 55, 0.05)',
              color: colors.parchment
            }}
          >
            <LogOut 
              size={24}
              className="group-hover:animate-pulse" 
              style={{ color: colors.paleGold }}
            />
            {isExpanded && (
              <span 
                className="font-medium tracking-wide" 
                style={{ 
                  fontSize: '0.95rem',
                  fontFamily: "'Cinzel', serif",
                  color: colors.paleGold  
                }}
              >
                Abdicate Throne
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Enhanced Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Marcellus&display=swap');
        
        body {
          font-family: 'Marcellus', serif;
          background-color: ${colors.richBlack};
          color: ${colors.parchment};
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: ${colors.royalGold};
          border-radius: 2px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: ${colors.velvetBlack};
          border-radius: 2px;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-3px);
          }
        }
        
        .animate-bounce {
          animation: bounce 0.6s ease infinite;
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(212, 175, 55, 0.5);
          }
          50% {
            box-shadow: 0 0 15px rgba(212, 175, 55, 0.8);
          }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite alternate;
        }
      `}</style>
    </>
  );
};

export default SidebarAdmin;