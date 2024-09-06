import React, { useState } from 'react';
import axios from 'axios';
import { useDarkMode } from '../../components/DarkModeContext';
import { Button, Card, CardContent, Typography, Box, Alert, AlertTitle } from '@mui/material';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaGlobe } from 'react-icons/fa';
import { MdUpload } from 'react-icons/md';
import { User, Globe, Phone, Lock, Mail } from 'lucide-react'; // You can replace with icons you need

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes

const InputField = ({ label, icon: Icon, darkMode, ...props }) => (
  <Box mb={4} position="relative">
    <Typography variant="body2" color={darkMode ? 'text.secondary' : 'text.primary'}>{label}</Typography>
    <Box position="relative">
      <input
        className={`block w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
          darkMode ? 'bg-gray-800 border-gray-700 text-gray-200 focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
        } transition`}
        {...props}
      />
      <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={18} />
    </Box>
  </Box>
);

const SelectField = ({ label, options, darkMode, ...props }) => (
  <Box mb={4}>
    <Typography variant="body2" color={darkMode ? 'text.secondary' : 'text.primary'}>{label}</Typography>
    <select
      className={`block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
        darkMode ? 'bg-gray-800 border-gray-700 text-gray-200 focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
      } transition`}
      {...props}
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </Box>
);

const ImageUpload = ({ label, name, multiple, onChange, darkMode, previews }) => (
  <Box mb={4}>
    <Typography variant="body2" color={darkMode ? 'text.secondary' : 'text.primary'}>{label}</Typography>
    <Box className={`relative flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg ${darkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-300 bg-gray-50'} cursor-pointer hover:bg-gray-100 transition`}>
      <input
        type="file"
        name={name}
        accept="image/*"
        multiple={multiple}
        onChange={onChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <Box textAlign="center">
        <MdUpload className={`mx-auto mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={24} />
        <Typography variant="body2" color={darkMode ? 'text.secondary' : 'text.primary'}>Click or drag files here</Typography>
      </Box>
    </Box>
    {previews && previews.length > 0 && (
      <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
        {previews.map((preview, index) => (
          <Box key={index} position="relative">
            <img src={preview.url} alt={`Preview ${index + 1}`} className="w-20 h-20 object-cover rounded-lg" />
            <Typography variant="caption" mt={1} textAlign="center">{preview.name}</Typography>
          </Box>
        ))}
      </Box>
    )}
  </Box>
);

const ImprovedListingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    companyPassword: '',
    contactNumber: '',
    category: '',
    state: '',  // Added state field
    website: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    twitter: '',
    logo: null,
    images: []
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [logoPreviews, setLogoPreviews] = useState([]);
  const { darkMode } = useDarkMode();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      if (name === 'logo') {
        if (files[0] && files[0].size <= MAX_FILE_SIZE) {
          setFormData(prevData => ({ ...prevData, [name]: files[0] }));
          setLogoPreviews([{ url: URL.createObjectURL(files[0]), name: files[0].name }]);
        } else {
          // alert('Logo file size should be less than 2 MB');
        }
      } else if (name === 'images') {
        const validImages = Array.from(files).filter(file => file.size <= MAX_FILE_SIZE);
        if (validImages.length === files.length) {
          setFormData(prevData => ({ ...prevData, [name]: validImages }));
          setImagePreviews(validImages.map(file => ({ url: URL.createObjectURL(file), name: file.name })));
        } else {
          // alert('Each image file size should be less than 2 MB');
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

    // Create a FormData object
    const formDataToSend = new FormData();

    // Append form fields
    for (const key in formData) {
      if (key === 'logo') {
        if (formData[key]) {
          formDataToSend.append('logo', formData[key]);
        }
      } else if (key === 'images' && formData[key].length > 0) {
        formData[key].forEach((file, index) => {
          formDataToSend.append(`images[${index}]`, file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      await axios.post('http://localhost:4000/public/company/compListing', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      // Handle successful response here
      console.log('Form submitted successfully');
    } catch (error) {
      // Handle error response here
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Box py={12} className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <Box className={`container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <Box textAlign="center" mb={8} pt={8}>
          <Typography variant="h3" component="h2" gutterBottom className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Hindu Economic Forum</Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Hindu Economic Forum brings together various Hindu businesses to enable their rapid growth and success. It encourages synergies and promotes businesses based on Hindu values.
          </Typography>
          <Alert severity="info">
            <AlertTitle>Important</AlertTitle>
            By completing this form, you fully agree and accept Hindu Values, follow WhatsApp group rules, and authorize us to register your business details in Hindu Business Directory.
          </Alert>
        </Box>

        <Card className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(240px, 1fr))" gap={6}>
                <InputField label="First Name" icon={User} name="firstName" type="text" value={formData.firstName} onChange={handleChange} darkMode={darkMode} />
                <InputField label="Last Name" icon={User} name="lastName" type="text" value={formData.lastName} onChange={handleChange} darkMode={darkMode} />
                <InputField label="Company Name" icon={FaGlobe} name="companyName" type="text" value={formData.companyName} onChange={handleChange} darkMode={darkMode} />
                <InputField label="Email" icon={Mail} name="email" type="email" value={formData.email} onChange={handleChange} darkMode={darkMode} />
                <InputField label="Password" icon={Lock} name="companyPassword" type="password" value={formData.companyPassword} onChange={handleChange} darkMode={darkMode} />
                <InputField label="Contact Number" icon={Phone} name="contactNumber" type="text" value={formData.contactNumber} onChange={handleChange} darkMode={darkMode} />
                <SelectField label="Category" name="category" options={['Category1', 'Category2', 'Category3']} value={formData.category} onChange={handleChange} darkMode={darkMode} />
                <SelectField label="State" name="state" options={['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA']} value={formData.state} onChange={handleChange} darkMode={darkMode} />
                <InputField label="Website" icon={FaGlobe} name="website" type="text" value={formData.website} onChange={handleChange} darkMode={darkMode} />
                <InputField label="Facebook" icon={FaFacebookF} name="facebook" type="text" value={formData.facebook} onChange={handleChange} darkMode={darkMode} />
                <InputField label="LinkedIn" icon={FaLinkedinIn} name="linkedin" type="text" value={formData.linkedin} onChange={handleChange} darkMode={darkMode} />
                <InputField label="Instagram" icon={FaInstagram} name="instagram" type="text" value={formData.instagram} onChange={handleChange} darkMode={darkMode} />
                <InputField label="Twitter" icon={FaTwitter} name="twitter" type="text" value={formData.twitter} onChange={handleChange} darkMode={darkMode} />
              </Box>

              <ImageUpload
                label="Upload Logo"
                name="logo"
                onChange={handleChange}
                darkMode={darkMode}
                previews={logoPreviews}
              />

              <ImageUpload
                label="Upload Images"
                name="images"
                multiple
                onChange={handleChange}
                darkMode={darkMode}
                previews={imagePreviews}
              />

              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ImprovedListingForm;
