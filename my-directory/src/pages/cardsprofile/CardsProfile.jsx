// ProfilePage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDarkMode } from '../../components/DarkModeContext';
import { FaCamera, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const CardsProfile = ({ companies = [] }) => {
  const { index } = useParams();
  const company = companies[index];
  const { darkMode } = useDarkMode();

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className='text-yellow-400' />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStar key={i} className='text-yellow-400' />); 
      } else {
        stars.push(<FaStar key={i} className='text-gray-300' />);
      }
    }
    return stars;
  };

  return (
    <div className={`${darkMode ? 'dark bg-black' : 'light bg-transparent'}`}>
      <section className={`w-full p-6 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
        {company ? (
          <div className='flex flex-col'>
            <div
              className='bg-cover bg-center h-[300px] rounded-xl'
              style={{ backgroundImage: `url(${company.images})` }}
            />
            <h1 className='text-3xl font-bold mt-4'>{company.name}</h1>
            <div className='flex items-center mt-2'>
              {renderStars(company.rating)}
            </div>
            <p className='mt-2'>{company.description}</p>
            <div className='flex items-center mt-4'>
              <FaMapMarkerAlt className='text-xl' />
              <a href={company.place_Map_url} target='_blank' className='ml-2'>{company.address}</a>
            </div>
            <div className='flex items-center mt-2'>
              <FaCamera className='text-xl' />
              <span className='ml-2'>{company.images.length} photos</span>
            </div>
          </div>
        ) : (
          <p>Company not found</p>
        )}
      </section>
    </div>
  );
};

export default CardsProfile;
