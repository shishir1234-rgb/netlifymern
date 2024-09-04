import React, { useState } from 'react';
import { useDarkMode } from '../../components/DarkModeContext'; // Adjust the import path as necessary
import ListImg from '../../assets/images/list.jpg';
import ListingImg from '../../assets/images/listing.png';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes

const ListingInput = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: location.state?.firstName || '',
    lastName: location.state?.lastName || '',
    companyName: location.state?.compName || '',
    email: location.state?.email || '',
    companyPassword: '',
    contactNumber: '',
    category: '',
    address: '',
    state: '',
    pincode: '',
    country: '',
    place_Map_url: '',
    description: '',
    videoURL: '',
    facebookURL: '',
    pinterestURL: '',
    skypeURL: '',
    linkedinURL: '',
    websiteURL: '',
    logo: null,
    images: [],
    agreeTerms: false,
  });
  const { darkMode } = useDarkMode();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      if (name === 'logo') {
        if (files[0] && files[0].size <= MAX_FILE_SIZE) {
          setFormData(prevData => ({ ...prevData, [name]: files[0] }));
        } else {
          alert('Logo file size should be less than 2 MB');
        }
      } else if (name === 'images') {
        const validImages = Array.from(files).filter(file => file.size <= MAX_FILE_SIZE);
        if (validImages.length === files.length) {
          setFormData(prevData => ({ ...prevData, [name]: validImages }));
        } else {
          alert('Each image file size should be less than 2 MB');
        }
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file, index) => {
          formDataToSend.append(`${key}[${index}]`, file);
        });
      } else if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post('https://hindu-backend.onrender.com/public/company/compListing', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      console.log('API Response:', response.data);
      alert('Company registered successfully. Check your mail for details.');
      setFormData({
        firstName: '',
        lastName: '',
        companyName: '',
        email: '',
        companyPassword: '',
        contactNumber: '',
        category: '',
        address: '',
        state: '',
        pincode: '',
        country: '',
        place_Map_url: '',
        description: '',
        videoURL: '',
        facebookURL: '',
        pinterestURL: '',
        skypeURL: '',
        linkedinURL: '',
        websiteURL: '',
        logo: null,
        images: [],
        agreeTerms: false,
      }); // Reset the form on success
      navigate('/');
    } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      alert('There was an error registering the company. Please try again.');
    }
  };

  return (
    <main className={`py-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <section className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <div className="text-center mb-6">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Hindu Economic Forum</h2>
          <p className="text-lg lg:text-xl lg:text-justify">
            Hindu Economic Forum brings together various Hindu businesses to enable their rapid growth and success. It encourages synergies and promotes businesses based on Hindu values. We believe these values empower our members to develop their spirituality, guiding them in personal and business development as effective learners and good citizens. By completing this form, you fully agree and accept Hindu Values, follow WhatsApp group rules, and authorize us to register your business details in Hindu Business Directory <span className='text-orange-500'>(hindubusinessdirectory.com.au)</span>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center">
          <div className={`w-full lg:w-1/2 p-6 sm:p-8 ${darkMode ? 'bg-gray-700' : 'bg-white'} rounded-xl`}>
            <h3 className="text-2xl font-semibold mb-6">Add New Business</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                type="password"
                name="companyPassword"
                placeholder="Company Password"
                value={formData.companyPassword}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="contactNumber"
                placeholder="Contact Number"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <SelectField
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={[
                  'Category', 'Shops', 'Retailers', 'Home Businesses', 'Franchises', 'Traders', 'Manufacturers',
                  'Industrialist', 'Exporters', 'Importers', 'Professionals', 'Teachers', 'Doctors',
                  'Nurses', 'Technocrats', 'Economist', 'Thinkers'
                ]}
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <SelectField
                name="state"
                value={formData.state}
                onChange={handleChange}
                options={[
                  'Select', 'NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'
                ]}
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="place_Map_url"
                placeholder="Map URL"
                value={formData.place_Map_url}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="videoURL"
                placeholder="Video URL"
                value={formData.videoURL}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="facebookURL"
                placeholder="Facebook URL"
                value={formData.facebookURL}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="pinterestURL"
                placeholder="Pinterest URL"
                value={formData.pinterestURL}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="skypeURL"
                placeholder="Skype URL"
                value={formData.skypeURL}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="linkedinURL"
                placeholder="LinkedIn URL"
                value={formData.linkedinURL}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                type="text"
                name="websiteURL"
                placeholder="Website URL"
                value={formData.websiteURL}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                type="file"
                name="logo"
                placeholder="Upload Logo"
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                type="file"
                name="images"
                placeholder="Upload Images"
                multiple
                onChange={handleChange}
                darkMode={darkMode}
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className={`mr-2 ${darkMode ? 'accent-orange-500' : 'accent-blue-600'}`}
                />
                <label htmlFor="agreeTerms" className="text-sm">
                  I agree to the <a href="/terms" className={`font-bold ${darkMode ? 'text-orange-500' : 'text-blue-600'}`}>Terms and Conditions</a>.
                </label>
              </div>
              <button
                type="submit"
                className={`w-full py-2 px-4 rounded-lg ${darkMode ? 'bg-orange-500 text-white' : 'bg-blue-600 text-white'}`}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="w-full lg:w-1/2 p-6">
            <img src={ListingImg} alt="Listing" className="w-full h-auto rounded-xl" />
          </div>
        </div>
      </section>
    </main>
  );
};

const InputField = ({ type, name, placeholder, value, onChange, required, darkMode }) => (
  <div className="mb-4">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500`}
    />
  </div>
);

const SelectField = ({ name, value, onChange, options, darkMode }) => (
  <div className="mb-4">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-lg ${darkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-500`}
    >
      {options.map((option, index) => (
        <option key={index} value={option} className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default ListingInput;
