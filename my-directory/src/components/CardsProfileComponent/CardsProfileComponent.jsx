import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaGlobe, FaChevronLeft, FaChevronRight, FaStar, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaBuilding, FaCalendar, FaCertificate } from 'react-icons/fa';
import { AiFillYoutube } from 'react-icons/ai';

const CardsProfileComponent = ({ profileData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const dummyImages = useMemo(() => [
    "https://via.placeholder.com/800x300?text=Dummy+Image+1",
    "https://via.placeholder.com/800x300?text=Dummy+Image+2",
    "https://via.placeholder.com/800x300?text=Dummy+Image+3"
  ], []);

  const images = useMemo(() => [
    profileData?.logo || dummyImages[0],
    ...(profileData?.image || dummyImages.slice(1))
  ].filter(Boolean), [profileData, dummyImages]);

  const dummyReviews = useMemo(() => [
    { text: "Great service and products!", author: "John Doe", rating: 5 },
    { text: "Excellent customer support!", author: "Jane Smith", rating: 4 },
    { text: "Highly recommended!", author: "Bob Johnson", rating: 5 }
  ], []);

  const reviews = useMemo(() => profileData?.reviews || dummyReviews, [profileData, dummyReviews]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted', { username, email, message });
    // You can add form submission logic here
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-white to-orange-50 rounded-3xl ">
      {/* Header with Image Carousel */}
      <div className="relative w-full h-96 mb-16 rounded-2xl overflow-hidden shadow-lg">
        <AnimatePresence initial={false}>
          <motion.img 
            key={currentImageIndex}
            src={images[currentImageIndex]} 
            alt={`${profileData?.compName || "Company"} - Image ${currentImageIndex + 1}`} 
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
          <motion.img 
            src={profileData?.logo || dummyImages[0]} 
            alt="Company Logo" 
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          />
          <motion.h1 
            className="text-4xl font-bold text-white mb-2 text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {profileData?.compName || "Sample Company Name"}
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {profileData?.category || "General Business"}
          </motion.p>
          <motion.div 
            className="flex space-x-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <SocialLink url={profileData?.facebookURL || "#"} Icon={FaFacebook} />
            <SocialLink url={profileData?.instagramURL || "#"} Icon={FaInstagram} />
            <SocialLink url={profileData?.linkedinURL || "#"} Icon={FaLinkedin} />
            <SocialLink url={profileData?.websiteURl || "#"} Icon={FaGlobe} />
            <SocialLink url={profileData?.videoURL || "#"} Icon={AiFillYoutube} />
          </motion.div>
        </div>
        <button 
          onClick={prevImage} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-gray-800 p-2 rounded-full hover:bg-opacity-75 transition duration-300"
          aria-label="Previous Image"
        >
          <FaChevronLeft />
        </button>
        <button 
          onClick={nextImage} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-gray-800 p-2 rounded-full hover:bg-opacity-75 transition duration-300"
          aria-label="Next Image"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        {['about', 'contact', 'reviews'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`mx-2 px-6 py-2 rounded-full text-lg font-semibold transition duration-300 ${
              activeSection === section
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          {activeSection === 'about' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
              <p className="text-gray-700 mb-6">
                {profileData?.discription || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem icon={FaUser} label="Owner" value={`${profileData?.firstName || "John"} ${profileData?.lastName || "Doe"}`} />
                <InfoItem icon={FaBuilding} label="Company" value={profileData?.compName || "Sample Company"} />
                <InfoItem icon={FaCalendar} label="Established" value={profileData?.createdAt ? new Date(profileData.createdAt).getFullYear() : "N/A"} />
                <InfoItem icon={FaCertificate} label="Status" value={profileData?.status || "Active"} />
              </div>
            </div>
          )}

          {activeSection === 'contact' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <InfoItem icon={FaEnvelope} label="Email" value={profileData?.email || "contact@example.com"} />
                <InfoItem icon={FaPhone} label="Phone" value={profileData?.contactNo || "+1 234 567 8900"} />
                <InfoItem icon={FaMapMarkerAlt} label="Address" value={`${profileData?.address || "123 Business St"}, ${profileData?.state || "State"}, ${profileData?.country || "Country"}`} />
                <InfoItem icon={FaGlobe} label="Website" value={profileData?.websiteURl || "www.example.com"} />
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your Message"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                  required
                ></textarea>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                  Send Message
                </button>
              </form>
            </div>
          )}

          {activeSection === 'reviews' && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Reviews & Ratings</h2>
              <div className="flex items-center mb-8">
                <div className="flex text-yellow-400 mr-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.round(profileData?.averageRating || 0) ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="text-2xl font-semibold text-gray-700">
                  {profileData?.averageRating ? `${profileData.averageRating.toFixed(1)}` : '0'} / 5
                </span>
                <span className="ml-2 text-gray-600">
                  ({profileData?.reviewCount || reviews.length} reviews)
                </span>
              </div>
              <div className="bg-gray-100 p-8 rounded-2xl relative overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentReviewIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-gray-700 italic text-lg mb-4">"{reviews[currentReviewIndex].text}"</p>
                    <p className="text-gray-600 font-semibold">- {reviews[currentReviewIndex].author}</p>
                    <div className="flex text-yellow-400 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < reviews[currentReviewIndex].rating ? 'text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
                <button
                  onClick={prevReview}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition duration-300"
                  aria-label="Previous Review"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={nextReview}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition duration-300"
                  aria-label="Next Review"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const SocialLink = ({ url, Icon }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-200 transition duration-300">
    <Icon className="w-6 h-6" />
  </a>
);

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
    <Icon className="w-6 h-6 text-blue-500" />
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-700">{value}</p>
    </div>
  </div>
);

export default CardsProfileComponent;