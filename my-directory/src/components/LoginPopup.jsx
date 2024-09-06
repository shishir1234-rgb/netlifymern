import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaGoogle } from 'react-icons/fa';
import aboutimg from '../../src/assets/images/about.jpg';
import loadingGif from '../assets/images/truck.gif'; // Ensure path is correct
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginPopup from './LoginPopup';

const SignUpPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    compName: '',
    contactNo: '',
    compPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('https://hindu-backend.onrender.com/public/company/compRegister', formData);
      if (response.status === 201) {
        setSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          compName: '',
          contactNo: '',
          compPassword: '',
        });
        alert('Company registered successfully. Check mail for login details.');
        setLoginPopup(true); // Open login popup
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <img src={loadingGif} alt="Loading" className="w-24 h-24" />
        </div>
      )}

      {!loading && !success && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-40 transition-opacity duration-300 ease-in-out p-4 sm:p-6">
          <div className="relative bg-white p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-lg md:max-w-3xl min-h-[400px] flex flex-col md:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 ease-in-out"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <div className="flex-1 p-4 relative">
              <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Sign Up</h2>
              <p className="text-gray-700 mb-4 text-center">Please enter your details to sign up.</p>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700">First Name:</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded transition-colors duration-200 ease-in-out focus:border-red-600 focus:outline-none"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Last Name:</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded transition-colors duration-200 ease-in-out focus:border-red-600 focus:outline-none"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email Address:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded transition-colors duration-200 ease-in-out focus:border-red-600 focus:outline-none"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Company Name:</label>
                    <input
                      type="text"
                      name="compName"
                      value={formData.compName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded transition-colors duration-200 ease-in-out focus:border-red-600 focus:outline-none"
                      placeholder="Enter your company name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Contact Number:</label>
                    <input
                      type="text"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded transition-colors duration-200 ease-in-out focus:border-red-600 focus:outline-none"
                      placeholder="Enter your contact number"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Password:</label>
                    <input
                      type="password"
                      name="compPassword"
                      value={formData.compPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded transition-colors duration-200 ease-in-out focus:border-red-600 focus:outline-none"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-red-600 text-white px-4 py-2 rounded transition-transform duration-200 ease-in-out transform hover:scale-105 w-full"
                >
                  Sign Up
                </button>
              </form>
              {error && <p className="text-red-600 mt-2">{error}</p>}
              <br />
              <hr />
              <br />
              <div className="text-center">
                <p className="text-gray-700 mt-2">Already have an account?</p>
                <a className="text-red-600 hover:underline cursor-pointer" onClick={() => navigate('/')}>Login</a>
                <a
                  href="https://accounts.google.com/signup"
                  className="block mt-4 bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center transition-transform duration-200 ease-in-out transform hover:scale-105"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGoogle className="mr-2" size="20" />
                  Sign Up with Google
                </a>
              </div>
            </div>

            <div className="flex-1 hidden md:block">
              <img
                src={aboutimg}
                alt="About"
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}

      {loginPopup && (
        <LoginPopup onClose={() => setLoginPopup(false)} />
      )}
    </>
  );
};

export default SignUpPopup;
