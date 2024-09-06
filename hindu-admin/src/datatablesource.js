import React from 'react';

export const userColumns = (handleStatusChange) => [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => (
      <div className="cellWithImg">
        <img className="cellImg" src={params.row.logo} alt="avatar" />
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
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
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
    renderCell: (params) => (
      <div className="statusButtons">
        <button
          className={`statusButton ${params.row.status === 'active' ? 'active' : ''}`}
          onClick={() => handleStatusChange(params.row.id, 'active')}
          disabled={params.row.status === 'active'}
        >
          Approved
        </button>
        &nbsp;
        <button
          className={`statusButton ${params.row.status === 'inactive' ? 'inactive' : ''}`}
          onClick={() => handleStatusChange(params.row.id, 'inactive')}
          disabled={params.row.status === 'inactive'}
        >
          Not Approved
        </button>
      </div>
    ),
  },
];



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
];
