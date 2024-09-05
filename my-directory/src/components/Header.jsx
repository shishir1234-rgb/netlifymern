import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { FaBars, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "./DarkModeContext";
import LoginPopup from "./LoginPopup";
import SignUpPopup from "./SignUpPopup";
import axios from "axios";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [companies, setCompanies] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const fetchCompanies = async () => {
    try {
      const response = await axios.post('https://hindu-backend.onrender.com/public/company/details', {
        category: selectedCategory,
        state: selectedState,
      });
      setCompanies(response.data.data);
      alert("Selected field data is in response data.");
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    if (selectedCategory || selectedState) {
      fetchCompanies();
    }
  }, [selectedCategory, selectedState]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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

  return (
    <nav className={`${darkMode ? "bg-gray-900 text-white" : "bg-[#f3f3f3] text-black"} flex justify-between items-center gap-4 py-5 px-4 sticky top-0 z-30`}>
      <div id="logo">
        <h1 className="text-xl font-bold text-orange-600">Hindu Business Directory</h1>
      </div>

      {/* Desktop View */}
      <ul className="lg:flex justify-center items-center gap-8 hidden">
        {navItems.map(({ linkText, path, dropdown }) => (
          <li key={path || linkText} className="relative group">
            {dropdown ? (
              <>
                <span className={`cursor-pointer px-1 py-2 rounded-lg ${darkMode ? 'hover:bg-red-600 hover:text-white' : 'hover:bg-red-600 hover:text-white'} ${darkMode ? 'text-white' : 'text-black'} text-[15px] uppercase font-semibold`}>
                  {linkText}
                </span>
                <ul className={`absolute left-0 mt-2 hidden group-hover:block ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} border rounded shadow-lg`}>
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

        <div className="flex items-center gap-2 mt-4">
          <FaPhoneAlt className={`text-2xl ${darkMode ? 'text-red-600' : 'text-red-600'}`} />
          <h1 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-orange-600'}`}>
            <a href="tel:+443453123505">+44 (0)34 5312 3505</a>
          </h1>
          <div className="relative">
            {localStorage.getItem("token") && (
              <>
                <FaUserCircle
                  className={`text-3xl cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                {isDropdownOpen && (
                  <div className={`absolute top-full right-0 mt-2 w-24 bg-${darkMode ? 'gray-800' : 'white'} text-${darkMode ? 'white' : 'black'} border rounded shadow-lg`}>
                    <Link to="/profile" className="block px-4 py-2 hover:bg-red-600 hover:text-white">Profile</Link>
                    <button className="block px-4 py-2 hover:bg-red-600 hover:text-white" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </ul>

      {/* Mobile View */}
      <div className="flex items-center gap-4 lg:hidden">
        <div className="flex justify-center items-center" onClick={toggleMenu}>
          <div>
            {isMenuOpen ? (
              <FontAwesomeIcon
                icon={faXmark}
                className={`text-2xl cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}
              />
            ) : (
              <FaBars className={`text-2xl cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`} />
            )}
          </div>
        </div>
      </div>

      <div className={`${isMenuOpen ? "flex" : "hidden"} flex-col w-full h-fit ${darkMode ? 'bg-gray-900' : 'bg-slate-800'} p-4 absolute top-[80px] left-0`}>
        <ul className="flex flex-col justify-center items-center gap-2">
          {navItems.map(({ linkText, path, dropdown }) => (
            <li key={path || linkText} className="w-full">
              {dropdown ? (
                <div className="relative group">
                  <span className={`cursor-pointer p-3 rounded-lg ${darkMode ? 'text-white hover:bg-red-600 hover:text-black' : 'text-white hover:bg-red-600 hover:text-black'} w-full text-center`}>
                    {linkText}
                  </span>
                  <ul className={`absolute left-0 mt-2 hidden group-hover:block w-[156px] ${darkMode ? 'bg-gray-800 text-white' : 'bg-slate-800 text-white'} border rounded shadow-lg`}>
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
                </div>
              ) : (
                <Link
                  className={`cursor-pointer p-3 rounded-lg ${darkMode ? 'text-white hover:bg-red-600 hover:text-black' : 'text-white hover:bg-red-600 hover:text-black'} w-full text-center`}
                  to={path}
                  onClick={closeMenu}
                >
                  {linkText}
                </Link>
              )}
            </li>
          ))}

          {!localStorage.getItem("token") && (
            <>
              <button
                className={`w-full p-3 rounded-lg ${darkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'} hover:bg-red-700`}
                onClick={() => {
                  setShowLoginPopup(true);
                  closeMenu();
                }}
              >
                Login
              </button>
              <button
                className={`w-full p-3 rounded-lg ${darkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'} hover:bg-red-700`}
                onClick={() => {
                  setShowSignUpPopup(true);
                  closeMenu();
                }}
              >
                Sign Up
              </button>
            </>
          )}

          <button
            className={`w-full p-3 rounded-lg ${darkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'} hover:bg-red-700`}
            onClick={() => {
              handleAddListingClick();
              closeMenu();
            }}
          >
            Add Listing
          </button>

          <div className="flex justify-center items-center gap-2 mt-4">
            <FaPhoneAlt className={`text-2xl ${darkMode ? 'text-red-600' : 'text-red-600'}`} />
            <h1 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-orange-600'}`}>
              <a href="tel:+443453123505">+44 (0)34 5312 3505</a>
            </h1>
          </div>
        </ul>
      </div>

      {/* Login and SignUp Popup */}
      {showLoginPopup && <LoginPopup onClose={() => setShowLoginPopup(false)} onSuccess={handleLoginSuccess} />}
      {showSignUpPopup && <SignUpPopup onClose={() => setShowSignUpPopup(false)} />}
    </nav>
  );
};

export default Header;
