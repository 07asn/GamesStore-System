import React from "react";

const LibraryGames = () => {
  return (
    <section
      className="layout-creation bg-white"
      style={{ padding: "clamp(2rem, 5vw, 4rem) 0" }}
    >
      <div className="container mx-auto px-4">
        {/* Heading & Text */}
        <div className="text-center mb-8">
          <h1
            className="mb-4 quick-search-heading animate"
            data-animation="fadeUp"
          >
            Huge Library of Games
          </h1>
          <p className="mb-6 text-center text-gray-500 animate" data-animation="fadeUp">
            We offer a vast selection of games from all genres, ensuring that you'll
            find something you love. Whether you're into action, adventure, or puzzle
            games, we have it all. Come explore our collection today and find your next
            favorite game!
          </p>
        </div>

        {/* Images Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Left Column */}
          <div className="md:col-span-3">
            <ImageSquare src="img/G1.jpeg" alt="Ubisoft" title="Ubisoft" />
          </div>

          {/* Middle Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex gap-4">
              <div className="w-7/12">
                <ImageSquare src="img/G2.jpg" alt="XBOX" title="XBOX" />
              </div>
              <div className="w-5/12">
                <ImageSquare src="img/G3.jpeg" alt="Playstation" title="Playstation" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-5/12">
                <ImageSquare src="img/G5.webp" alt="Activiction" title="Activiction" />
              </div>
              <div className="w-7/12">
                <ImageSquare src="img/G7.jpg" alt="Rockstar" title="Rockstar" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-3">
            <ImageSquare src="img/G6.jpg" alt="EA" title="EA" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable component for each image square with overlay text
const ImageSquare = ({ src, alt, title }) => {
  return (
    <div className="relative aspect-square overflow-hidden group transition-transform duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:-translate-y-1">
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <h3 className="img-overlay absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] px-2">
        {title}
      </h3>
    </div>
  );
};

export default LibraryGames;
