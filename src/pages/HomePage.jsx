// src/pages/HomePage.jsx
import React from 'react';
import HeroHeader from '../components/home/HeroHeader';
import QuickSearch from '../components/home/QuickSearch';
import Categories from '../components/home/Categories';
const HomePage = () => {
  return (
    <div>
      <HeroHeader />
      <QuickSearch />
      <Categories />
    </div>
  );
};

export default HomePage;
