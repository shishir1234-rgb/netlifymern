import React, { useEffect } from 'react';
import { useDarkMode } from '../../components/DarkModeContext';
import hinduVideo from '../../assets/videos/hindubusiness.mp4';
import foggyimg from '../../assets/images/foggy.png';
import Aos from 'aos';
import 'aos/dist/aos.css';

<<<<<<< HEAD
const Hero = (props) => {

  const { message, count } = props;

=======
const Hero = () => {
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  const { darkMode,toggleDarkMode  } = useDarkMode();

  return (
    <>
      <div className={`${darkMode ? 'dark bg-black' : 'light bg-white'}`}>
        <section
          id='hero'
          className='w-full h-[400px] m-auto bg-cover bg-center rounded-xl flex justify-center flex-col items-center lg:px-28 px-10 gap-7 z-10 relative'
        >
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            className='absolute left-0 top-0 w-full h-full object-cover '
          >
            <source src={hinduVideo} type='video/mp4' />
            Your browser does not support the video tag.
          </video>

          <h1
            data-aos='zoom-in'
            className='text-white font-bold text-4xl lg:text-5xl text-center relative z-20'
          >
<<<<<<< HEAD
{message}</h1>
=======
Discover Local Businesses
</h1>
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825

          <p
            data-aos='zoom-in'
            className='text-white text-xl lg:text-xl text-center lg:text-justify relative z-20'
          >
<<<<<<< HEAD
{count}</p>
=======
Explore a wide range of local businesses from various categories. Whether you're looking for the best restaurants, shops, or service providers in your area, our comprehensive listings have you covered. Find the perfect business to meet your needs and connect with them easily.</p>
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
        </section>
      </div>

      {/* Foggy Image */}
      <img
  className="w-full -mt-[12px] sm:-mt-[25px] lg:-mt-[35px] xl:-mt-[45px] 2xl:-mt-[55px] relative z-10 filter invert brightness-0"
  src={foggyimg}
  alt="Foggy effect"
/>



      {/* Form start from here */}
      <div>
        {/* Your form content */}
      </div>
    </>
  );
};

export default Hero;
