// src/components/CategoryCard.jsx
import React from 'react';

const CategoryCard = ({ imageSrc, title, link = 'shop.html' }) => {
  return (
    <a href={link} className="block group">
      <div className="rounded-[20px] overflow-hidden bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-transform duration-300 ease hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:rounded-[25px] cursor-pointer">
        <div className="overflow-hidden rounded-[20px]">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-[220px] object-cover transition-transform duration-400 ease-in-out group-hover:scale-110"
          />
        </div>
        <div className="p-5 text-center">
          <h5 className="text-[1.3rem] font-bold uppercase mb-4 transition-all duration-300 group-hover:text-[#C70039] group-hover:-translate-y-1">
            {title}
          </h5>
          <button className="py-[12px] px-[25px] bg-[#FFDF00] text-black rounded-[50px] text-base font-semibold uppercase transition-all duration-300 hover:bg-[#C70039] hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
            Explore
          </button>
        </div>
      </div>
    </a>
  );
};

export default CategoryCard;
