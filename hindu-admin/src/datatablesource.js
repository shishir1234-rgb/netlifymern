<<<<<<< HEAD
=======
// userColumns.js
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
import React from 'react';

export const userColumns = (handleStatusChange) => [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => (
      <div className="cellWithImg">
<<<<<<< HEAD
        <img className="cellImg" src={params.row.logo} alt="avatar" />
=======
        <img className="cellImg" src={params.row.img} alt="avatar" />
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
        {params.row.firstName} &nbsp;
        {params.row.lastName}
      </div>
    ),
  },
  {
    field: "compName",
    headerName: "Business Name",
    width: 200,
  },
<<<<<<< HEAD
=======
  
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
<<<<<<< HEAD
=======
  
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
  {
    field: "address",
    headerName: "Address",
    width: 230,
  },
  {
    field: "state",
    headerName: "State",
    width: 100,
  },
  {
    field: "category",
    headerName: "Category",
    width: 130,
  },
<<<<<<< HEAD
  {
    field: "description",
    headerName: "Description",
    width: 250,
  },
  {
    field: "videoURL",
    headerName: "Video URL",
    width: 200,
  },
  {
    field: "facebookURL",
    headerName: "Facebook URL",
    width: 200,
  },
  {
    field: "pinterestURL",
    headerName: "Pinterest URL",
    width: 200,
  },
  {
    field: "skypeURL",
    headerName: "Skype URL",
    width: 200,
  },
  {
    field: "linkedinURL",
    headerName: "LinkedIn URL",
    width: 200,
  },
  {
    field: "websiteURL",
    headerName: "Website URL",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 250,
=======
 
  {
    field: "status",
    headerName: "Status",
    width: 200,
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
    renderCell: (params) => (
      <div className="statusButtons">
        <button
          className={`statusButton ${params.row.status === 'active' ? 'active' : ''}`}
          onClick={() => handleStatusChange(params.row.id, 'active')}
          disabled={params.row.status === 'active'}
        >
<<<<<<< HEAD
          Approved
=======
          Active
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
        </button>
        &nbsp;
        <button
          className={`statusButton ${params.row.status === 'inactive' ? 'inactive' : ''}`}
          onClick={() => handleStatusChange(params.row.id, 'inactive')}
          disabled={params.row.status === 'inactive'}
        >
<<<<<<< HEAD
          Not Approved
=======
          Inactive
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
        </button>
      </div>
    ),
  },
];



<<<<<<< HEAD
export const userRows = [
  {
    id: 1,
    username: "Shishir",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "gautamshiv170@gmail.com",
    address: "Sarai, Faridabad",
    state: "Haryana",
    category: "Engineer",
    compName: "Tech Solutions",
    description: "Leading solutions in technology.",
    videoURL: "https://example.com/video1",
    facebookURL: "https://facebook.com/techsolutions",
    pinterestURL: "https://pinterest.com/techsolutions",
    skypeURL: "skype:techsolutions",
    linkedinURL: "https://linkedin.com/company/techsolutions",
    websiteURL: "https://techsolutions.com",
    status: "active",
  },
  {
    id: 2,
    username: "Vipin",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "vipin@example.com",
    address: "Sarai, Faridabad",
    state: "Haryana",
    category: "Engineer",
    compName: "Tech Solutions",
    description: "Innovative tech solutions.",
    videoURL: "https://example.com/video2",
    facebookURL: "https://facebook.com/techsolutions",
    pinterestURL: "https://pinterest.com/techsolutions",
    skypeURL: "skype:techsolutions",
    linkedinURL: "https://linkedin.com/company/techsolutions",
    websiteURL: "https://techsolutions.com",
    status: "active",
  },
  // Add more rows as needed
=======
// temporary data
export const userRows = [
    {
      id: 1,
      username: "Shishir",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "gautamshiv170@gmail.com",
      address: "Sarai, Faridabad",
      state: "Haryana",
      category: "Engineer",
      businessName: "Tech Solutions",
      status: "active",
    },
    {
      id: 2,
      username: "Vipin",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "vipin@example.com",
      address: "Sarai, Faridabad",
      state: "Haryana",
      category: "Engineer",
      businessName: "Tech Solutions",
      status: "active",
    },
    {
      id: 3,
      username: "Amit",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "amit@example.com",
      address: "Sector 15, Faridabad",
      state: "Haryana",
      category: "Developer",
      businessName: "Code Innovators",
      status: "inactive",
    },
    {
      id: 4,
      username: "Rohit",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "rohit@example.com",
      address: "NIT, Faridabad",
      state: "Haryana",
      category: "Engineer",
      businessName: "Build It Solutions",
      status: "active",
    },
    {
      id: 5,
      username: "Neha",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "neha@example.com",
      address: "Greenfield Colony, Faridabad",
      state: "Haryana",
      category: "Designer",
      businessName: "Creative Minds",
      status: "active",
    },
    {
      id: 6,
      username: "Ankit",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "ankit@example.com",
      address: "Old Faridabad",
      state: "Haryana",
      category: "Engineer",
      businessName: "Innovative Solutions",
      status: "inactive",
    },

>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
];
