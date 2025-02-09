// src/components/Categories.jsx
import React from 'react';
import CategoryCard from './CategoryCard';

const categoriesData = [
  { id: 1, title: 'PC Games', imageSrc: 'img/C1.jpg' },
  { id: 2, title: 'Accounts', imageSrc: 'img/C2.webp' },
  { id: 3, title: 'Programs', imageSrc: 'img/C3.webp' },
  { id: 4, title: 'Digital Cards', imageSrc: 'img/C4.jpg' },
  { id: 5, title: 'Subscriptions', imageSrc: 'img/G6.webp' },
  { id: 6, title: 'Programming', imageSrc: 'img/C5.jpg' },
];

const Categories = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-8 relative inline-block">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-[#222]">
            Browse Our Categories
          </h2>
          <div className="mt-2 mx-auto w-1/2 max-w-[9rem] h-[3px] bg-[#DFBF00] rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoriesData.map((category) => (
            <CategoryCard
              key={category.id}
              imageSrc={category.imageSrc}
              title={category.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
