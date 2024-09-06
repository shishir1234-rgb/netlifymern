import React, { useEffect } from "react";
import { useDarkMode } from "../DarkModeContext";
import Aos from "aos";
import "aos/dist/aos.css";
import { FaCamera, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Cards = ({ companies = [] }) => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({
      offset: 200,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-white" />);
      }
    }
    return stars;
  };

  const dummyData = {
    name: "Sample Business",
    address: "123 Sample St, Sample City",
    place_Map_url: "#",
    images: "https://via.placeholder.com/300",
    rating: 4.5,
    description: "This is a sample description of the business.",
  };

  const dataToDisplay = companies.length > 0 ? companies : [dummyData];

  const handleViewClick = (item) => {
    navigate(`/profile/${item.name}`, { state: { profileData: item } });
  };

  return (
    <div className={`${darkMode ? "dark bg-black" : "light bg-transparent"}`}>
      <section
        id="properties"
        className={`lg:w-[98%] m-auto lg:px-20 px-6 py-20 w-full flex flex-col justify-center items-start gap-10 ${
          darkMode
            ? "dark:bg-gray-900 text-gray-200"
            : "bg-transparent text-white"
        }`}
      >
        <div className="flex flex-col justify-center items-start gap-4">
          <h1 data-aos="zoom-in" className="text-red-500 text-xl">
            Trending Business Place
          </h1>
          <h1
            data-aos="zoom-in"
            className={`text-3xl font-semibold ${
              darkMode ? "text-white" : "text-white"
            }`}
          >
            Explore Hindu businesses.
          </h1>
        </div>
        <div
          id="slider-box"
          className="w-full grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {dataToDisplay.map((item, index) => (
            <div
              data-aos="zoom-in"
              data-aos-delay="200"
              key={index}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              <div
                className="bg-cover bg-center h-[220px] rounded-t-xl p-4 flex flex-col justify-between"
                style={{ backgroundImage: `url(${item.images || "https://via.placeholder.com/300"})` }}
              >
                <div className="flex justify-between items-end w-full">
                </div>
                <div className="flex justify-between items-end w-full">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt
                      className={`text-xl ${
                        darkMode ? "text-white" : "text-white"
                      }`}
                    />
                    <h1
                      className={`text-white ${
                        darkMode ? "text-white" : "text-white"
                      }`}
                    >
                      <a href={item?.place_Map_url || "#"} target="_blank" rel="noopener noreferrer">
                        {item?.address || "No address available"}
                      </a>
                    </h1>
                  </div>
                  {/* <div className="flex items-center gap-2"> */}
                    {/* <FaCamera
                      className={`text-xl ${
                        darkMode ? "text-white" : "text-white"
                      }`}
                    /> */}
                    {/* <h1
                      className={`text-white ${
                        darkMode ? "text-white" : "text-white"
                      }`}
                    >
                      {item?.images?.length || 0} photos
                    </h1> */}
                  {/* </div> */}
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h1
                    className={`text-lg font-bold ${
                      darkMode ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {item.name || "No name available"}
                  </h1>
                  <div className="flex">{renderStars(item.rating || 0)}</div>
                </div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-white" : "text-gray-600"
                  }`}
                >
                  {item?.description?.slice(0, 90) || "No description available..."}
                </p>
                <div className="flex justify-between items-center">
                  <h1 className="text-gray-600 text-lg">{item?.rating || "N/A"}</h1>
                  <button
                    onClick={() => handleViewClick(item)}
                    className={`px-4 py-2 ${
                      darkMode ? "bg-gray-700 text-white" : "bg-red-600 text-white"
                    } rounded-full text-[13px] hover:bg-opacity-80 transition-colors duration-200`}
                  >
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
