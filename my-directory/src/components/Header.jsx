import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { FaBars, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "./DarkModeContext";
import LoginPopup from "./LoginPopup";
import SignUpPopup from "./SignUpPopup";
import axios from "axios";
import businessLoadingSVG from "../assets/images/truck.gif"; // Replace with the path to your loading SVG

const Header = () => {
  const { darkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory || selectedState) {
      navigate(`/data-cards?category=${selectedCategory}&state=${selectedState}`);
    }
  }, [selectedCategory, selectedState, navigate]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false); // Close dropdown when menu is closed
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const navItems = [
    { linkText: "Home", path: "/home" },
    {
      linkText: "Categories",
      dropdown: [
        "Shops", "Retailers", "Home Businesses", "Franchises", "Traders", "Manufacturers",
        "Industrialist", "Exporters", "Importers", "Professionals", "Teachers", "Doctors",
        "Nurses", "Technocrats", "Economist", "Thinkers"
      ],
    },
    {
      linkText: "States",
      dropdown: ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"],
    },
    { linkText: "Contact Us", path: "/contact" },
  ];

  const handleLoginSuccess = () => {
    setShowLoginPopup(false);
  };

  const handleAddListingClick = () => {
    if (!localStorage.getItem("token")) {
      setShowLoginPopup(true);
    } else {
      navigate('/listing');
    }
  };


  const menuStyles = {
    transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease',
    backgroundColor: darkMode ? '#2d2d2d' : '#ffffff',
    color: darkMode ? '#ffffff' : '#000000',
  };


  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
          <img src={businessLoadingSVG} alt="Loading..." className="w-32 h-32" />
        </div>
      )}

      <nav className={`${darkMode ? "bg-gray-900 text-white" : "bg-[#f3f3f3] text-black"} flex lg:flex-row justify-between items-center gap-4 py-5 px-4 sticky top-0 z-30`}>
        {/* Logo */}
        <div id="logo" className="text-center lg:text-left">
          <h1 className="text-xl font-bold text-orange-600">Hindu Business Directory</h1>
        </div>

        {/* Desktop View */}
        <ul className="lg:flex hidden gap-8 items-center">
          {navItems.map(({ linkText, path, dropdown }) => (
            <li key={path || linkText} className="relative group">
              {dropdown ? (
                <>
                  <button
                    className={`cursor-pointer px-1 py-2 rounded-lg ${darkMode ? 'hover:bg-red-600 hover:text-white' : 'hover:bg-red-600 hover:text-white'} ${darkMode ? 'text-white' : 'text-black'} text-[15px] uppercase font-semibold`}
                    onClick={() => setIsDropdownOpen(prev => (prev === linkText ? "" : linkText))}
                  >
                    {linkText}
                  </button>
                  {isDropdownOpen === linkText && (
                    <ul className={`absolute left-0 mt-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} border rounded shadow-lg`}>
                      {dropdown.map((item, index) => (
                        <li key={index}>
                          <button
                            className={`block px-4 py-2 ${darkMode ? 'text-white hover:bg-red-600' : 'text-black hover:bg-red-600 hover:text-white'}`}
                            onClick={() => linkText === "Categories" ? setSelectedCategory(item) : setSelectedState(item)}
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  className={`cursor-pointer px-1 py-2 rounded-lg ${darkMode ? 'hover:bg-red-600 hover:text-white' : 'hover:bg-red-600 hover:text-white'} ${darkMode ? 'text-white' : 'text-black'} text-[15px] uppercase font-semibold`}
                  to={path}
                >
                  {linkText}
                </Link>
              )}
            </li>
          ))}

          {!localStorage.getItem("token") && (
            <>
              <button
                className={`text-lg p-4 font-semibold rounded-xl ${darkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'} hover:bg-red-700`}
                onClick={() => setShowLoginPopup(true)}
              >
                Login
              </button>
              <button
                className={`text-lg p-4 font-semibold rounded-xl ${darkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'} hover:bg-red-700`}
                onClick={() => setShowSignUpPopup(true)}
              >
                Sign Up
              </button>
            </>
          )}

          <button
            className={`text-lg p-4 font-semibold rounded-xl ${darkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'} hover:bg-red-700`}
            onClick={handleAddListingClick}
          >
            Add Listing
          </button>

          <div className="flex items-center gap-2">
            <FaPhoneAlt className={`text-2xl ${darkMode ? 'text-red-600' : 'text-red-600'}`} />
            <h1 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-orange-600'}`}>
              <a href="tel:+443453123505">+44 (0)34 5312 3505</a>
            </h1>
            <div className="relative">
              {localStorage.getItem("token") && (
                <>
                  <FaUserCircle
                    className={`text-3xl cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                  />
                  {isDropdownOpen && (
                    <div className={`absolute top-full right-0 mt-2 w-24 ${darkMode ? 'bg-gray-800' : 'bg-white'} ${darkMode ? 'text-white' : 'text-black'} border rounded shadow-lg`}>
                      <Link to="/company-profile" className="block px-4 py-2 hover:bg-red-600 hover:text-white">Profile</Link>
                      <button className="block px-4 py-2 hover:bg-red-600 hover:text-white" onClick={handleLogout}>Logout</button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </ul>
{/* Mobile View */}



  
{/* Mobile View */}
<div className="lg:hidden flex flex-col items-center gap-4">
      <button className="text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? (
          <FontAwesomeIcon icon={faXmark} className={`text-xl ${darkMode ? 'text-white' : 'text-black'}`} />
        ) : (
          <FaBars className={`text-xl ${darkMode ? 'text-white' : 'text-black'}`} />
        )}
      </button>

      {/* Mobile Menu Items */}
      <div
        className="fixed top-0 left-0 w-64 h-full flex flex-col items-center gap-4"
        style={menuStyles}
      >
        {navItems.map(({ linkText, path, dropdown }) => (
          <div key={path || linkText} className="relative">
            {dropdown ? (
              <>
                <button
                  className={`cursor-pointer px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} text-lg uppercase font-semibold`}
                  onClick={() => setIsDropdownOpen(prev => (prev === linkText ? "" : linkText))}
                >
                  {linkText}
                </button>
                {isDropdownOpen === linkText && (
                  <ul
                    className={`absolute left-0 mt-2 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} border rounded shadow-lg w-48`}
                  >
                    {dropdown.map((item, index) => (
                      <li key={index}>
                        <button
                          className={`block px-4 py-2 ${darkMode ? 'hover:bg-red-600' : 'hover:bg-red-600 hover:text-white'}`}
                          onClick={() => linkText === "Categories" ? setSelectedCategory(item) : setSelectedState(item)}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                className={`block px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} text-lg uppercase font-semibold`}
                to={path}
              >
                {linkText}
              </Link>
            )}
          </div>
        ))}

        {!localStorage.getItem("token") && (
          <>
            <button
              className={`block px-4 py-2 rounded-lg ${darkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'} hover:bg-red-700`}
              onClick={() => setShowLoginPopup(true)}
            >
              Login
            </button>
            <button
              className={`block px-4 py-2 rounded-lg ${darkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'} hover:bg-red-700`}
              onClick={() => setShowSignUpPopup(true)}
            >
              Sign Up
            </button>
          </>
        )}

        <button
          className={`block px-4 py-2 rounded-lg ${darkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'} hover:bg-red-700`}
          onClick={handleAddListingClick}
        >
          Add Listing
        </button>

        {localStorage.getItem("token") && (
          <div className="relative">
            <FaUserCircle
              className={`text-3xl cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}
              onClick={() => setIsDropdownOpen(prev => !prev)}
            />
            {isDropdownOpen && (
              <div
                className={`absolute top-full right-0 mt-2 w-24 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} border rounded shadow-lg`}
              >
                <Link to="/company-profile" className="block px-4 py-2 hover:bg-red-600 hover:text-white">Profile</Link>
                <button className="block px-4 py-2 hover:bg-red-600 hover:text-white" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>




      </nav>

      {showLoginPopup && (
        <LoginPopup onClose={() => setShowLoginPopup(false)} onLoginSuccess={handleLoginSuccess} />
      )}
      {showSignUpPopup && <SignUpPopup onClose={() => setShowSignUpPopup(false)} />}
    </>
  );
};

export default Header;
