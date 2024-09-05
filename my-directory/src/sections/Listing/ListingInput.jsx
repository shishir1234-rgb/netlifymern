import React, { useState } from 'react';
import { useDarkMode } from '../../components/DarkModeContext';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import listImage from '../../assets/images/list.jpg'

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes

const Alert = ({ children, darkMode }) => (
  <div className={`p-4 mb-6 rounded-lg ${darkMode ? 'bg-orange-900 text-orange-100' : 'bg-orange-100 text-orange-800'}`}>
    {children}
  </div>
);

const InputField = ({ label, darkMode, ...props }) => (
  <div className="relative">
    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
    <input
      className={`block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-300 text-gray-900'} transition`}
      {...props}
    />
  </div>
);

const SelectField = ({ label, options, darkMode, ...props }) => (
  <div className="relative">
    <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
    <select
      className={`block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-300 text-gray-900'} transition`}
      {...props}
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      });
      navigate('/');
    } catch (error) {
      console.error('API Error:', error.response ? error.response.data : error.message);
      alert('There was an error registering the company. Please try again.');
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className={`py-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <section className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 rounded-xl  ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4">Hindu Economic Forum</h2>
          <p className="text-lg lg:text-xl lg:text-justify">
            Hindu Economic Forum brings together various Hindu businesses to enable their rapid growth and success. It encourages synergies and promotes businesses based on Hindu values. We believe these values empower our members to develop their spirituality, guiding them in personal and business development as effective learners and good citizens.
          </p>
        </div>
        <Alert darkMode={darkMode}>
          <h4 className="font-bold mb-2">Important Notice</h4>
          <p>
            By completing this form, you fully agree and accept Hindu Values, follow WhatsApp group rules, and authorize us to register your business details in Hindu Business Directory <span className='font-bold'>(hindubusinessdirectory.com.au)</span>
          </p>
        </Alert>
        <div 
  className="flex flex-col lg:flex-row items-start gap-8"
  style={{
    backgroundImage: `url(${listImage})`, /* Replace with your image path */
    backgroundSize: 'cover', /* Ensures the image covers the container */
    backgroundPosition: 'center', /* Centers the image within the container */
    backgroundRepeat: 'no-repeat', /* Prevents the image from repeating */
  }}
>          <div className={`w-full lg:w-[50%] p-6 sm:p-8 bg-orange-50 ${darkMode ? 'bg-gray-700' : 'bg-white'}  `}>
            <h3 className="text-3xl font-semibold mb-6">Add New Business</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                label="Company Name"
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                label="Company Password"
                type="password"
                name="companyPassword"
                value={formData.companyPassword}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <InputField
                label="Contact Number"
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                darkMode={darkMode}
              />
              <SelectField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={[
                  'Select Category', 'Shops', 'Retailers', 'Home Businesses', 'Franchises', 'Traders', 'Manufacturers',
                  'Industrialist', 'Exporters', 'Importers', 'Professionals', 'Teachers', 'Doctors',
                  'Nurses', 'Technocrats', 'Economist', 'Thinkers'
                ]}
                darkMode={darkMode}
              />
              <InputField
                label="Address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                label="State"
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                label="Pincode"
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                label="Country"
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                label="Place Map URL"
                type="url"
                name="place_Map_url"
                value={formData.place_Map_url}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                label="Description"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                label="Video URL"
                type="url"
                name="videoURL"
                value={formData.videoURL}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                label="Facebook URL"
                type="url"
                name="facebookURL"
                value={formData.facebookURL}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                label="Pinterest URL"
                type="url"
                name="pinterestURL"
                value={formData.pinterestURL}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                label="Skype URL"
                type="url"
                name="skypeURL"
                value={formData.skypeURL}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                label="LinkedIn URL"
                type="url"
                name="linkedinURL"
                value={formData.linkedinURL}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <InputField
                label="Website URL"
                type="url"
                name="websiteURL"
                value={formData.websiteURL}
                onChange={handleChange}
                darkMode={darkMode}
              />
              <div className="relative">
  <label
    className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
  >
    Logo (max 2 MB)
  </label>
  <div
    className={`relative flex items-center justify-center  w-20  h-20 rounded-full ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} transition cursor-pointer`}
  >
    <input
      type="file"
      name="logo"
      accept="image/*"
      onChange={handleChange}
      className="absolute inset-0 opacity-0 cursor-pointer"
    />
    <span className="text-2xl ">{/* Icon or text for the circular button */}📁</span>
  </div>
</div>


<label
    className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
  >
    Images
  </label>
              <div className="relative flex items-center justify-center  w-20  h-20 rounded-sm  ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'} transition cursor-pointer">
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                  className={`absolute inset-0 opacity-0 cursor-pointer`}
                />
                    <span className="text-2xl">{/* Icon or text for the circular button */}📁</span>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="w-5 h-5"
                />
                <label htmlFor="agreeTerms" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={openModal}
                    className="text-blue-500 underline hover:text-blue-700"
                  >
                    terms and conditions
                  </button>
                </label>
              </div>
              <button
                type="submit"
                className={`w-[40%] py-2 px-4 text-lg font-semibold rounded-lg ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} hover:bg-blue-700 transition`}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
  <div className={`relative bg-white p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'}`}>
    <button
      onClick={closeModal}
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
    >
      &times;
    </button>
    <h3 className="text-lg font-semibold mb-4">Terms and Conditions</h3>
    <p className="mb-4">
      By submitting this form, you agree to the following terms and conditions:
    </p>
    <ul className="list-disc pl-5 mb-4">
      <li>
        Follow Hindu Values and WhatsApp Guidelines and Rules of the group.
      </li>
      <li>
        HEF's objective is to promote Hindu eco-systemic and businesses.
      </li>
      <li>
        Do not exhibit rude or disrespectful behavior towards any individual or group.
      </li>
      <li>
        This group should not be used for personal opinions, private messages, spam chains, individual chatting, self-promotions, or wishes.
      </li>
      <li>
        If your message is not relevant to the majority of the group members, please send it directly to the relevant person rather than to the entire group.
      </li>
      <li>
        For suggestions or grievances, please address them in private meetings rather than in the group.
      </li>
      <li>
        Avoid arguments in the WhatsApp group. If you need to argue, contact the individual directly via phone or private chat.
      </li>
      <li>
        Announcements about third-party events require Committee approval before circulation.
      </li>
      <li>
        Delinquent members will be removed from the group.
      </li>
    </ul>
  </div>
</div>

      )}
    </main>
  );
};

export default ListingInput;
