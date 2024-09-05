<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("companyId"));
    setUser(userData);
  }, []);

  return (
    <div className="split-profile-container">
      <div className="left-column">
        <div className="profile-image-container">
          <img src={user.logo || "https://via.placeholder.com/300"} alt="Profile" className="profile-image" />
        </div>
        <h1 className="company-name">{user.compName}</h1>
        <p className="company-description">{user.discription || "No description available."}</p>
        <div className="social-links">
          {user.facebookURL && <a href={user.facebookURL} target="_blank" rel="noopener noreferrer" className="social-link facebook">Facebook</a>}
          {user.instagramURL && <a href={user.instagramURL} target="_blank" rel="noopener noreferrer" className="social-link instagram">Instagram</a>}
          {user.linkedinURL && <a href={user.linkedinURL} target="_blank" rel="noopener noreferrer" className="social-link linkedin">LinkedIn</a>}
          {user.websiteURl && <a href={user.websiteURl} target="_blank" rel="noopener noreferrer" className="social-link website">Website</a>}
        </div>
      </div>
      <div className="right-column">
        <div className="info-section">
          <h2>Company Details</h2>
          <div className="info-grid">
            <InfoItem label="Owner" value={`${user.firstName} ${user.lastName}`} />
            <InfoItem label="Category" value={user.category} />
            <InfoItem label="Status" value={user.status} />
            <InfoItem label="Average Rating" value={user.averageRating ? `${user.averageRating.toFixed(1)} / 5` : 'N/A'} />
            <InfoItem label="Review Count" value={user.reviewCount || '0'} />
          </div>
        </div>
        <div className="info-section">
          <h2>Contact Information</h2>
          <div className="info-grid">
            <InfoItem label="Email" value={user.email} />
            <InfoItem label="Phone" value={user.contactNo} />
            <InfoItem label="Address" value={user.address} />
            <InfoItem label="State" value={user.state} />
            <InfoItem label="Pincode" value={user.pincode} />
            <InfoItem label="Country" value={user.country} />
          </div>
=======
import React, { useEffect } from 'react';
import './Profile.css';

const Profile = () => {
const [user,setUser]=React.useState({});

useEffect(()=>{

    const userData=JSON.parse(localStorage.getItem("companyId"));
    setUser(userData);

},[]);

  return (
    <div className="profile-container">
      <div className="profile-left">
        <div className="profile-image">
          {/* Placeholder image, replace with actual image if available */}
          <img src="https://via.placeholder.com/150" alt="Profile" />
        </div>
        <div className="profile-basic-details">
          <h2>{user.firstName} {user.lastName}</h2>
          <p>{user.compName}</p>
          <p>{user.status}</p>
        </div>
      </div>
      <div className="profile-right">
        <div className="profile-details">
          <h3>Contact Information</h3>
          <p>Email: {user.email}</p>
          <p>Contact No: {user.contactNo}</p>
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
const InfoItem = ({ label, value }) => (
  <div className="info-item">
    <span className="info-label">{label}:</span>
    <span className="info-value">{value || 'N/A'}</span>
  </div>
);

export default Profile;
=======
export default Profile;
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
