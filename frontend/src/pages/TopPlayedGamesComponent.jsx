import React, { useState, useEffect } from "react";
import { Star, List, Grid, ArrowUp, Trophy, Search, Download } from "lucide-react";

// Light theme color constants
const colors = {
  primary: '#FFDF00',
  primaryDark: '#DFBF00',
  background: '#FFFFFF',
  backgroundAlt: '#F8F9FA',
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    accent: '#DFBF00'
  },
  border: '#E5E7EB'
};

const TopPlayedGamesComponent = () => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("players");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 32;
  useEffect(() => {
    // Handle scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fetch top played games
    const fetchTopPlayedGames = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/api/top-played");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Ensure 'data.response.ranks' exists and is an array
        if (data && data.response && Array.isArray(data.response.ranks)) {
          // Fetch game names based on appid
          const gameData = await Promise.all(
            data.response.ranks.map(async (game) => {
              const appid = game.appid;
              const gameName = await fetchGameName(appid);  // Fetch game name from Steam Store API
              return {
                ...game,
                name: gameName,  // Add the name property to each game
              };
            })
          );
          setGames(gameData);
        } else {
          throw new Error("Invalid data format received from the API.");
        }
      } catch (err) {
        setError("Failed to fetch data from the Steam Charts API.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch the game name using Steam's API
    const fetchGameName = async (appid) => {
      try {
        const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
        const data = await response.json();
        if (data[appid] && data[appid].success) {
          return data[appid].data.name;  // Return the game name from the Steam Store API
        }
        return "Unknown Game";  // Fallback if no name is found
      } catch (error) {
        console.error("Error fetching game name:", error);
        return "Unknown Game";
      }
    };

    fetchTopPlayedGames();
  }, []);

  const sortGames = (method) => {
    setSortBy(method);
    let sortedGames = [...games];
    switch (method) {
      case "players":
        sortedGames.sort((a, b) => b.peak_in_game - a.peak_in_game);  // Sort by peak_in_game (players)
        break;
      case "name":
        sortedGames.sort((a, b) => a.name.localeCompare(b.name));  // Sort by game name
        break;
      default:
        break;
    }
    setGames(sortedGames);
  };

  const toggleView = () => {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredGames.length / itemsPerPage);
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handleGameSelect = (game) => {
    setSelectedGame(selectedGame && selectedGame.appid === game.appid ? null : game);
  };

  // Loading UI with updated styling
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="flex flex-col items-center w-full max-w-7xl px-4">
          <div className="w-20 h-20 border-4 border-t-4 border-[#FFDF00] border-t-[#FFDF00] border-opacity-20 rounded-full animate-spin"></div>
          <p className="mt-6 text-xl font-medium text-gray-700">Loading top games...</p>
          <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded-md mb-3 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error UI with updated styling
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="p-8 bg-white rounded-lg shadow-xl max-w-md w-full border border-gray-200">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-50">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <p className="text-center text-red-500 font-bold text-xl mb-2">Error</p>
          <p className="text-center text-gray-600">{error}</p>
          <button
            className="mt-6 px-6 py-3 bg-[#FFDF00] hover:bg-[#DFBF00] text-gray-900 rounded-md transition-colors duration-300 mx-auto block w-full font-medium"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Hero Header */}
        <header className="relative py-16 overflow-hidden bg-[#FFDF00]/10">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-2 mb-4 bg-[#FFDF00]/20 rounded-full">
                <Trophy className="h-5 w-5 text-[#DFBF00] mr-2" />
                <span className="text-gray-900 font-medium">Live Rankings</span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">Top Most Played Games</h1>
              <p className="text-xl text-[#DFBF00] max-w-2xl mx-auto">
                The definitive list of the most popular games on Steam right now
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 pt-8 relative z-10">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
              <div className="relative w-full lg:w-1/3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFDF00] focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between w-full lg:w-auto">
                <div className="flex items-center">
                  <span className="text-gray-700 font-medium mr-3">Sort by:</span>
                  <div className="inline-flex rounded-lg shadow-sm">
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${sortBy === "players"
                        ? "bg-[#FFDF00] text-gray-900 border-[#FFDF00]"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        } transition-colors duration-200`}
                      onClick={() => sortGames("players")}
                    >
                      Players
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${sortBy === "name"
                        ? "bg-[#FFDF00] text-gray-900 border-[#FFDF00]"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                        } transition-colors duration-200`}
                      onClick={() => sortGames("name")}
                    >
                      Name
                    </button>
                  </div>
                </div>

                <button
                  className="ml-4 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 flex items-center transition-colors duration-200"
                  onClick={toggleView}
                >
                  {viewMode === "grid" ? (
                    <>
                      <List className="h-5 w-5 mr-2" />
                      <span className="hidden sm:inline">List View</span>
                    </>
                  ) : (
                    <>
                      <Grid className="h-5 w-5 mr-2" />
                      <span className="hidden sm:inline">Grid View</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-[#DFBF00]">{filteredGames.length}</span> games
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {/* Game Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedGames.map((game) => (
                <div
                  key={game.appid}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#FFDF00]/50 cursor-pointer group"
                  onClick={() => handleGameSelect(game)}
                >
                  <div className="relative">
                    <img
                      src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}
                      alt={game.name}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/api/placeholder/400/320";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center text-white font-bold rounded-full bg-[#FFDF00] text-gray-900">
                      {game.rank}
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm text-gray-900 text-sm font-medium px-3 py-1 rounded-full">
                        {game.peak_in_game.toLocaleString()} Players
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-1">{game.name}</h3>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Trophy className="h-4 w-4 text-[#DFBF00] mr-1" />
                        <p className="text-sm text-gray-600">Rank #{game.rank}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {game.peak_in_game.toLocaleString()} Players
                      </div>
                    </div>
                  </div>

                  {/* Expanded Game Details */}
                  {selectedGame && selectedGame.appid === game.appid && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-900">Game Details</h4>
                        <a
                          href={`https://store.steampowered.com/app/${game.appid}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#DFBF00] hover:text-[#FFDF00] flex items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View on Steam
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                          </svg>
                        </a>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Current Players:</span>
                          <span className="font-medium text-gray-900">{game.peak_in_game.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Global Rank:</span>
                          <span className="font-medium text-gray-900">#{game.rank}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">App ID:</span>
                          <span className="font-medium text-gray-900">{game.appid}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Players</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {paginatedGames.map((game) => (
                    <React.Fragment key={game.appid}>
                      <tr
                        className={`hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${selectedGame && selectedGame.appid === game.appid ? 'bg-[#FFDF00]/5' : ''
                          }`}
                        onClick={() => handleGameSelect(game)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FFDF00] text-gray-900 font-medium text-sm">
                            {game.rank}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-20 rounded overflow-hidden">
                              <img
                                className="h-12 w-20 object-cover"
                                src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`}
                                alt={game.name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/api/placeholder/400/320";
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{game.name}</div>
                              <div className="text-xs text-gray-500">App ID: {game.appid}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-[#FFDF00] h-2.5 rounded-full" style={{ width: `${Math.min(100, game.peak_in_game / 50000 * 100)}%` }}></div>
                            </div>
                            <span className="ml-3 text-sm text-gray-700">{game.peak_in_game.toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href={`https://store.steampowered.com/app/${game.appid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#DFBF00] hover:text-[#FFDF00]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View
                          </a>
                        </td>
                      </tr>

                      {/* Expanded Row */}
                      {selectedGame && selectedGame.appid === game.appid && (
                        <tr className="bg-gray-50">
                          <td colSpan="4" className="px-6 py-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div className="mb-4 md:mb-0">
                                <h4 className="font-medium text-gray-900 mb-2">Game Statistics</h4>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                                  <div>
                                    <span className="text-gray-500">Peak Players:</span>
                                    <span className="ml-2 font-medium text-gray-900">{game.peak_in_game.toLocaleString()}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Global Rank:</span>
                                    <span className="ml-2 font-medium text-gray-900">#{game.rank}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <a
                                  href={`https://store.steampowered.com/app/${game.appid}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-[#FFDF00] hover:bg-[#DFBF00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFDF00]"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  View on Steam
                                  <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty State */}
          {filteredGames.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-[#DFBF00] bg-[#FFDF00]/10 p-4 rounded-full mb-4">
                <Search className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No games found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search term</p>
              <button
                className="px-4 py-2 bg-[#FFDF00] hover:bg-[#DFBF00] text-gray-900 rounded-md transition-colors duration-200"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md font-medium ${currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#FFDF00] text-gray-900 hover:bg-[#DFBF00]'
                  }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md font-medium ${currentPage === page
                    ? 'bg-[#FFDF00] text-gray-900'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md font-medium ${currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-[#FFDF00] text-gray-900 hover:bg-[#DFBF00]'
                  }`}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 rounded-full bg-[#FFDF00] text-gray-900 shadow-lg hover:bg-[#DFBF00] transition-all duration-300 z-50"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Game Preview Modal */}
      {selectedGame && viewMode === "grid" && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={() => setSelectedGame(null)}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={`https://steamcdn-a.akamaihd.net/steam/apps/${selectedGame.appid}/header.jpg`}
                  alt={selectedGame.name}
                  className="w-full object-cover h-64"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/api/placeholder/400/320";
                  }}
                />
                <button
                  className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-all duration-200"
                  onClick={() => setSelectedGame(null)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-8 px-6">
                  <h3 className="text-2xl font-bold text-white">{selectedGame.name}</h3>
                  <div className="flex items-center mt-2">
                    <div className="bg-[#FFDF00] text-gray-900 text-sm px-3 py-1 rounded-full">
                      Rank #{selectedGame.rank}
                    </div>
                    <div className="bg-white/90 text-gray-900 text-sm px-3 py-1 rounded-full ml-2">
                      {selectedGame.peak_in_game.toLocaleString()} Players
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Player Statistics</h4>
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#FFDF00] h-2.5 rounded-full" style={{ width: `${Math.min(100, selectedGame.peak_in_game / 50000 * 100)}%` }}></div>
                      </div>
                      <span className="ml-3 text-sm font-medium">{selectedGame.peak_in_game.toLocaleString()} current players</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">App ID</h4>
                      <p className="mt-1 text-gray-900">{selectedGame.appid}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Global Rank</h4>
                      <p className="mt-1 text-gray-900">#{selectedGame.rank}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                <a
                  href={`https://store.steampowered.com/app/${selectedGame.appid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-900 bg-[#FFDF00] hover:bg-[#DFBF00] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFDF00]"
                >
                  View on Steam
                  <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopPlayedGamesComponent;