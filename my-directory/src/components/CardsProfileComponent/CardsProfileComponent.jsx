import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { AiFillYoutube } from 'react-icons/ai';
// import './CardsP.css'; // Ensure this path is correct

const CardsProfileComponent = ({ profileData }) => {
  return (
    <div className="split-profile-container">
      <div className="left-column">
        <div className="profile-image-container">
          <img 
            src={profileData.logo || "https://via.placeholder.com/300"} 
            alt={profileData.compName || "Profile"} 
            className="profile-image" 
          />
        </div>
        <h1 className="company-name">{profileData.compName || "No name available"}</h1>
        <p className="company-description">{profileData.discription || "No description available"}</p>
        <div className="social-links">
          {profileData.facebookURL && 
            <a href={profileData.facebookURL} target="_blank" rel="noopener noreferrer" className="social-link">
              <FaFacebook size={24} />
            </a>
          }
          {profileData.instagramURL && 
            <a href={profileData.instagramURL} target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram size={24} />
            </a>
          }
          {profileData.linkedinURL && 
            <a href={profileData.linkedinURL} target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin size={24} />
            </a>
          }
          {profileData.websiteURl && 
            <a href={profileData.websiteURl} target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGlobe size={24} />
            </a>
          }
          {profileData.videoURL && 
            <a href={profileData.videoURL} target="_blank" rel="noopener noreferrer" className="social-link">
              <AiFillYoutube size={24} />
            </a>
          }
        </div>
      </div>
      <div className="right-column">
        <div className="info-section">
          <h2>Company Details</h2>
          <div className="info-grid">
            <InfoItem label="Owner" value={`${profileData.firstName} ${profileData.lastName}`} />
            <InfoItem label="Category" value={profileData.category} />
            <InfoItem label="Status" value={profileData.status} />
            <InfoItem label="Average Rating" value={profileData.averageRating ? `${profileData.averageRating.toFixed(1)} / 5` : 'N/A'} />
            <InfoItem label="Review Count" value={profileData.reviewCount || '0'} />
            <InfoItem label="Email" value={profileData.email} />
            <InfoItem label="Phone" value={profileData.contactNo} />
            <InfoItem label="Address" value={profileData.address} />
            <InfoItem label="State" value={profileData.state} />
            <InfoItem label="Pincode" value={profileData.pincode} />
            <InfoItem label="Country" value={profileData.country} />
            <InfoItem label="Created At" value={new Date(profileData.createdAt).toLocaleDateString()} />
            <InfoItem label="Modified At" value={new Date(profileData.modifyAt).toLocaleDateString()} />
            <InfoItem label="Map URL" value={profileData.place_Map_url} isIframe />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, isIframe }) => (
  <div className="info-item">
    <span className="info-label">{label}:</span>
    {isIframe ? (
      value ? (
        <iframe
          src={value}
          title={label}
          className="info-iframe"
          allowFullScreen
        />
      ) : (
        <span className="info-value">N/A</span>
      )
    ) : (
      <span className="info-value">{value || 'N/A'}</span>
    )}
  </div>
);

export default CardsProfileComponent;
