import React from 'react';
import { useLocation } from 'react-router-dom';
import CardsProfileComponent from '../../components/CardsProfileComponent/CardsProfileComponent';
import Header from '../../components/Header';
import Hero from '../../sections/Listing/Hero';
import Footer from '../../components/Footer';
import { DarkModeProvider } from '../../components/DarkModeContext';

const CardsProfilePage = () => {
  const location = useLocation();
  const profileData = location.state?.profileData || {};

  return (
    <DarkModeProvider>
      <Header/>
      <Hero/>
      <CardsProfileComponent profileData={profileData}/>
      <Footer/>
    </DarkModeProvider>
  );
};

export default CardsProfilePage;
