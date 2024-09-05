import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import { FaBars, FaPhoneAlt, FaUserCircle } from "react-icons/fa";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
=======
import { Link } from "react-router-dom";
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
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
<<<<<<< HEAD
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const fetchCompanies = async () => {
    try {
      const response = await axios.post('https://hindu-backend.onrender.com/public/company/details', {
=======

  const fetchCompanies = async () => {
    try {
      const response = await axios.post('http://localhost:4000/public/company/details', {
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
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

<<<<<<< HEAD
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

=======
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
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

<<<<<<< HEAD
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

=======
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
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

<<<<<<< HEAD
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
=======

{
  !localStorage.getItem("token") &&  
  <div>

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


</div>
}
       

     
        {/* Contact Info */}
        <div className="flex items-center gap-3">
          <FaPhoneAlt className={`text-2xl ${darkMode ? 'text-red-600' : 'text-red-600'}`} />
          <h1 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
            +44 (0)34 5312 3505
          </h1>
          <FaUserCircle
            className={`text-3xl cursor-pointer `}
          />
           <h1 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
          </h1>
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
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
<<<<<<< HEAD
=======
        {/* Main Navigation Items */}
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
        <ul className="flex flex-col justify-center items-center gap-2">
          {navItems.map(({ linkText, path, dropdown }) => (
            <li key={path || linkText} className="w-full">
              {dropdown ? (
                <div className="relative group">
                  <span className={`cursor-pointer p-3 rounded-lg ${darkMode ? 'text-white hover:bg-red-600 hover:text-black' : 'text-white hover:bg-red-600 hover:text-black'} w-full text-center`}>
                    {linkText}
                  </span>
<<<<<<< HEAD
                  <ul className={`absolute left-0 mt-2 hidden group-hover:block w-[156px] ${darkMode ? 'bg-gray-800 text-white' : 'bg-slate-800 text-white'} border rounded shadow-lg`}>
=======
                  <ul className={`absolute left-0 mt-2 hidden group-hover:block w-[156px] ${darkMode ? 'bg-gray-800 text-white' : 'bg-slate-800 text-white'} border rounded shadow-lg`} style={{width:"156px"}}>
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
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
<<<<<<< HEAD
                  onClick={closeMenu}
=======
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
                >
                  {linkText}
                </Link>
              )}
            </li>
          ))}
<<<<<<< HEAD

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
=======
        </ul>


        {/* Login and Sign Up Buttons */}

        {
          !localStorage.getItem("token") && 
          <>
        <hr className="my-4 border-white" />

          <div className="flex gap-4">
          <button
            className={`text-lg p-4 font-semibold rounded-xl w-full ${darkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'} hover:bg-red-700`}
            onClick={() => setShowLoginPopup(true)}
          >
            Login
          </button>

          <button
            className={`text-lg p-4 font-semibold rounded-xl w-full ${darkMode ? 'bg-red-600 text-white' : 'bg-red-600 text-white'} hover:bg-red-700`}
            onClick={() => setShowSignUpPopup(true)}
          >
            Sign Up
          </button>
        </div>

        </>

        }
   

        <hr className="my-4 border-white" />

        {/* Contact Info */}
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center items-center gap-3">
            <FaPhoneAlt className="text-2xl text-red-600" />
            <h1 className="text-sm font-semibold text-white">+44 (0)34 5312 3505</h1>
          </div>
          <FaUserCircle
            className="text-3xl text-white cursor-pointer"
            onClick={toggleDarkMode}
          />
          
        </div>
      </div>

      {/* Popups for Login and Sign Up */}
      {showLoginPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <LoginPopup onClose={() => setShowLoginPopup(false)} />
        </div>
      )}

      {showSignUpPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <SignUpPopup onClose={() => setShowSignUpPopup(false)} />
        </div>
      )}
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
    </nav>
  );
};

export default Header;
