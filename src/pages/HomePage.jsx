// src/pages/HomePage.jsx
import React from 'react';
import HeroHeader from '../components/home/HeroHeader';
import QuickSearch from '../components/home/QuickSearch';
import Categories from '../components/home/Categories';
import Offers from '../components/home/Offers';
import HowWork from '../components/home/HowWork';
import LibraryGames from '../components/home/Library Games';
import WhyUs from '../components/home/WhyUs';
import Reviews from '../components/home/Reviews';
import WhatsappChat from '../components/home/WhatsappChat';

const HomePage = () => {
  return (
    <div>
      <HeroHeader />
      <QuickSearch />
      <Categories />
      <Offers />
      <HowWork />
      <LibraryGames />
      <WhyUs />
      <Reviews />
      <WhatsappChat />
    </div>
  );
};

export default HomePage;
