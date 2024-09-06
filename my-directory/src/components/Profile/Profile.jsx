import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  Calendar,
  User,
  Briefcase,
  FileText,
  Star,
  MessageSquare
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Profile = () => {
  const [company, setCompany] = useState({});
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const companyId = JSON.parse(localStorage.getItem('companyId'));
        if (!companyId) throw new Error('Company ID not found');
        
        const response = await fetch(`/api/companies/${companyId}`);
        if (!response.ok) throw new Error('Failed to fetch company data');
        
        const data = await response.json();
        setCompany(data);
      } catch (error) {
        console.error('Error:', error);
        setCompany({});
      }
    };

    fetchCompanyData();
  }, []);

  const mockReviewData = [
    { month: 'Jan', reviews: 4 },
    { month: 'Feb', reviews: 7 },
    { month: 'Mar', reviews: 5 },
    { month: 'Apr', reviews: 9 },
    { month: 'May', reviews: 6 },
    { month: 'Jun', reviews: 8 },
  ];

  const InfoItem = React.memo(({ icon, label, value }) => (
    <motion.div
      className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg shadow-sm"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
    >
      {icon}
      <span className="font-semibold text-gray-700">{label}:</span>
      <span className="text-gray-600">{value || 'N/A'}</span>
    </motion.div>
  ));

  const TabButton = React.memo(({ name, icon, isActive }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
        isActive ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'
      }`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
    </motion.button>
  ));

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-2xl">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-12"
      >
        <div className="relative">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={company.logo || '/api/placeholder/150/150'}
            alt="Company Logo"
            className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-orange-500 shadow-lg"
          />
          <motion.div
            className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-2"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Award className="w-6 h-6 text-white" />
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mt-4">{company.compName || 'Company Name'}</h1>
        <p className="text-xl text-gray-600 mt-2 text-center max-w-2xl">{company.discription || 'No description available.'}</p>
      </motion.div>

      <div className="flex justify-center space-x-4 mb-8">
        <TabButton name="details" icon={<FileText className="w-5 h-5 text-orange-500" />} isActive={activeTab === 'details'} />
        <TabButton name="contact" icon={<Mail className="w-5 h-5 text-orange-500" />} isActive={activeTab === 'contact'} />
        <TabButton name="media" icon={<Camera className="w-5 h-5 text-orange-500" />} isActive={activeTab === 'media'} />
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'details' && (
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-gray-700">Company Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={<User className="w-6 h-6 text-orange-500" />} label="Owner" value={`${company.firstName || ''} ${company.lastName || ''}`} />
              <InfoItem icon={<Briefcase className="w-6 h-6 text-orange-500" />} label="Category" value={company.category} />
              <InfoItem icon={<Award className="w-6 h-6 text-orange-500" />} label="Status" value={company.status} />
              <InfoItem icon={<Star className="w-6 h-6 text-orange-500" />} label="Average Rating" value={company.averageRating ? `${company.averageRating.toFixed(1)} / 5` : 'N/A'} />
              <InfoItem icon={<MessageSquare className="w-6 h-6 text-orange-500" />} label="Review Count" value={company.reviewCount || '0'} />
              <InfoItem icon={<Calendar className="w-6 h-6 text-orange-500" />} label="Established" value={company.createdAt ? new Date(company.createdAt).toLocaleDateString() : 'N/A'} />
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">Review Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockReviewData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="reviews" stroke="#f97316" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-gray-700">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem icon={<Mail className="w-6 h-6 text-orange-500" />} label="Email" value={company.email} />
              <InfoItem icon={<Phone className="w-6 h-6 text-orange-500" />} label="Phone" value={company.contactNo} />
              <InfoItem icon={<MapPin className="w-6 h-6 text-orange-500" />} label="Address" value={company.address} />
              <InfoItem icon={<MapPin className="w-6 h-6 text-orange-500" />} label="City" value={company.city} />
              <InfoItem icon={<Globe className="w-6 h-6 text-orange-500" />} label="Website" value={company.website} />
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-gray-700">Media Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.isArray(company.image) && company.image.map((img, index) => (
                <img key={index} src={img} alt={`Media ${index + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md" />
              ))}
              {Array.isArray(company.image2) && company.image2.map((img, index) => (
                <img key={index} src={img} alt={`Media ${index + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md" />
              ))}
              {Array.isArray(company.image3) && company.image3.map((img, index) => (
                <img key={index} src={img} alt={`Media ${index + 1}`} className="w-full h-64 object-cover rounded-lg shadow-md" />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
