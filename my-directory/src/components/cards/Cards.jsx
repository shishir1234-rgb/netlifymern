// Cards.js
import React, { useEffect } from 'react';
import { useDarkMode } from '../DarkModeContext';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { FaCamera, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const Cards = ({ companies = [] }) => { // Default companies to empty array
  const [data, setData] = React.useState(companies);

  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  const { darkMode } = useDarkMode();

  useEffect(() => {
    setData(companies); // Update data when companies prop changes
  }, [companies]);

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
      <section id='properties' className={`lg:w-[98%] m-auto lg:px-20 px-6 py-20 w-full flex flex-col justify-center items-start gap-10 ${darkMode ? 'dark:bg-gray-900 text-gray-200' : 'bg-transparent text-gray-300'}`}>
        <div className='flex flex-col justify-center items-start gap-4'>
          <h1 data-aos="zoom-in" className='text-red-500 text-xl'>Trending Business Place</h1>
          <h1 data-aos="zoom-in" className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-white'}`}>Explore Hindu businesses.</h1>
        </div>
        <div id='slider-box' className='w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {data.map((item, index) => (
            <div
              data-aos="zoom-in"
              data-aos-delay="200"
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg`}
            >
              <div
                className='bg-cover bg-center h-[220px] rounded-t-xl p-4 flex flex-col justify-between items-end'
                style={{ backgroundImage: `url(${item.images})` }}
              >
                <div className='flex justify-between items-end w-full'>
                  {/* <button className={`px-3 py-1 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-red-600 text-gray-300 hover:bg-red-500'} rounded-full text-[13px]`}>
                    Trending
                  </button> */}
                  <button className={`px-3 py-1 ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-red-600 text-gray-300 hover:bg-red-500'} rounded-full text-[13px]`}>
                    Favourite
                  </button>
                </div>
                <div className='flex justify-between items-end w-full'>
                  <div className='flex items-center gap-2'>
                    <FaMapMarkerAlt className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-300'}`} />
                    <h1 className={`text-gray-300 ${darkMode ? 'text-gray-300' : 'text-gray-300'}`}><a href={item?.place_Map_url} target='_blank'>{item?.address}</a></h1>
                  </div>
                  <div className='flex items-center gap-2'>
                    <FaCamera className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-300'}`} />
                    <h1 className={`text-gray-300 ${darkMode ? 'text-gray-300' : 'text-gray-300'}`}>{item?.images?.length} photos</h1>
                  </div>
                </div>
              </div>
              <div className='p-4 flex flex-col gap-2'>
                <div className='flex justify-between'>
                  <h1 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{item.name}</h1>
                  <h1 className='text-lg font-bold'>{renderStars(item.rating)}</h1>
                </div>
                <h1 className='text-gray-600'>{item?.description?.slice(0, 90)}...</h1>
                <div className='flex justify-between items-center'>
                  <h1 className='text-gray-600 text-lg'>{item?.rating}</h1>
                  <button className={`px-4 py-2 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-red-600 text-gray-300'} rounded-full text-[13px]`}>
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Cards;
