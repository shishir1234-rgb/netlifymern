import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import ContactUs from '../pages/ContactUs/ContactUs';
import ListingPage from '../pages/Listing/ListingPage';
import ChangePassword from '../components/ChangePassword';
import LoginPopup from '../components/LoginPopup';
import DataCardPage from '../pages/DataCards/dataCardPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import CardsProfilePage from '../pages/CardsProfilePage/CardsProfilePage';

const AllRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/listing" element={<ListingPage />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/data-cards" element={<DataCardPage />} />
        
        {/* <LoginPopup/> */}

        <Route path="/company-profile" element={<ProfilePage />} />
        <Route path="/profile/:id" element={<CardsProfilePage />} />
      </Routes>
    </Router>
  );
}

export default AllRoutes;
