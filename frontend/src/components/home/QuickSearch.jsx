// src/components/QuickSearch.jsx
import React from 'react';

const QuickSearch = () => {
  const options = [
    "Story Mode Games",
    "Online Games",
    "Strategy Games",
    "Racing Games",
    "Sports Games",
    "Simulator Games",
  ];

  return (
    <section className="py-8 my-8 max-w-5xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-[#222] uppercase tracking-wide text-center relative pb-2 mb-8">
        Quick Search
        {/* Underline element */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 max-w-md h-1 bg-[#DFBF00] rounded"></div>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {options.map((option, idx) => (
          <label key={idx} className="cursor-pointer group relative">
            <a href="shop.html" className="block">
              <input type="radio" name="radio" className="hidden" />
              <span className="flex items-center justify-center text-lg bg-white text-[#555] border-2 border-gray-200 rounded-lg p-5 transition-all duration-200 shadow-sm min-h-[4rem] w-full group-hover:bg-yellow-400 group-hover:border-yellow-400 group-hover:text-black group-hover:-translate-y-1 group-hover:shadow-lg">
                {option}
              </span>
            </a>
          </label>
        ))}
      </div>
    </section>
  );
};

export default QuickSearch;
