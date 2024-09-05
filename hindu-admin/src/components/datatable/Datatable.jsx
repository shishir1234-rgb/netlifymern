import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import UpdateModal from '../UpdateModal/UpdateModal';
<<<<<<< HEAD
import { userColumns } from '../../datatablesource'; // Assuming userColumns is a function
import './datatable.scss';
import axios from 'axios';
=======
import { userColumns, userRows } from '../../datatablesource';
import './datatable.scss';
import axios from 'axios'
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825

// Convert data to CSV format
const convertToCSV = (data) => {
  const header = Object.keys(data[0]).join(',');
  const rows = data.map(item => Object.values(item).join(','));
  return [header, ...rows].join('\n');
};

// Trigger file download
const downloadCSV = (data) => {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'user_data.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const Datatable = () => {
  const [data, setData] = useState([]);
<<<<<<< HEAD
  const [filteredData, setFilteredData] = useState([]);
=======
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailDetails, setEmailDetails] = useState({ to: '', subject: '' });
<<<<<<< HEAD
  const [refreshList, setRefreshList] = useState(false);

  const navigate = useNavigate();

  const handleDelete = (id) => {
    axios.delete(`https://hindu-backend.onrender.com/public/admin/delete/company/${id}`)
      .then(res => { 
        alert(res?.data?.message);
        setRefreshList(!refreshList);
      })
      .catch(err => console.log(err.message));
=======
  const [refreshList,setRefreshList]=useState(false);

  const navigate=useNavigate();

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    axios.delete("http://localhost:4000/public/admin/delete/company/"+id)
    .then(res=>{alert(res?.data?.message);setRefreshList(!refreshList)})
    .catch(err=>console.log(err.message))
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
  };

  const handleStatusChange = (id, newStatus) => {
    setData(data.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const handleUpdate = (updatedUser) => {
<<<<<<< HEAD
=======
    // setData(data.map((item) =>
    //   item.id === updatedUser.id ? updatedUser : item
    // ));
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
    setRefreshList(!refreshList);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

<<<<<<< HEAD
    const filteredData = data.filter((item) =>
=======
    const filteredData = userRows.filter((item) =>
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(term)
      )
    );
<<<<<<< HEAD
    setFilteredData(filteredData);
=======
    setData(filteredData);
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
  };

  const openModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const openEmailModal = () => {
    setIsEmailModalOpen(true);
    const selectedEmails = selectedUsers.map(user => user.email).join(', ');
    setEmailDetails({ ...emailDetails, to: selectedEmails });
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailDetails({ ...emailDetails, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    // Implement the email sending functionality here
    console.log('Email sent to:', emailDetails.to);
    console.log('Subject:', emailDetails.subject);
    setIsEmailModalOpen(false);
  };

<<<<<<< HEAD
  const handleView = (row) => {
    console.log("Shishir", row);
    navigate("/user-detail", { state: row });
  };
=======
  const handleView =(row)=>{
    console.log("Shishir",row)
        navigate("/user-detail",{state:row})
  }
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      renderCell: (params) => (
        <div className="cellAction">
<<<<<<< HEAD
          <button onClick={() => handleView(params.row)} className="viewButton">View</button>
=======
          {/* <Link to={`/users/${params.row.id}`} style={{ textDecoration: 'none' }}> */}
            <button onClick={()=>handleView(params.row)} className="viewButton">View</button>
          {/* </Link> */}
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
          <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
            Delete
          </div>
          <div className="updateButton" onClick={() => openModal(params.row)}>
            Update
          </div>
        </div>
      ),
    },
  ];

<<<<<<< HEAD
  useEffect(() => {
    axios.get("https://hindu-backend.onrender.com/public/admin/allComp")
      .then(res => {
        const tableData = res.data.data.map((item, idx) => { return { ...item, id: idx + 1 } });
        setData(tableData);
        setFilteredData(tableData);
      })
      .catch(err => console.log(err));
  }, [refreshList]);
=======
  useEffect(()=>{
      axios.get("http://localhost:4000/public/admin/allComp")
      .then(res=>{
        const tableData=res.data.map((item,idx)=>{return {...item,id:idx+1}})
        setData(tableData)})
      .catch(err=>console.log(err))
  },[refreshList]);

>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825

  return (
    <div className="datatable">
      <div className="datatableTitle">
        All Company Listing
<<<<<<< HEAD
        <button 
          onClick={() => downloadCSV(filteredData)} 
=======
        {/* Email Button */}
        <button 
          onClick={openEmailModal} 
          className="emailButton"
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#d14836',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Send Email
        </button>

        {/* Download Button */}
        <button 
          onClick={() => downloadCSV(data)} 
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
          className="downloadButton"
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          <DownloadOutlinedIcon 
            style={{
              marginRight: '8px',
              fontSize: '20px'
            }}
          />
          Download CSV
        </button>

        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <SearchOutlinedIcon />
        </div>
      </div>
      <DataGrid
        className="datagrid"
<<<<<<< HEAD
        rows={filteredData}
=======
        rows={data}
>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
        columns={userColumns(handleStatusChange).concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          const selectedIDs = new Set(newSelection);
          const selectedUsersList = data.filter((row) => selectedIDs.has(row.id));
          setSelectedUsers(selectedUsersList);
        }}
      />
      {currentUser && (
        <UpdateModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          user={currentUser}
          onUpdate={handleUpdate}
        />
      )}
      {isEmailModalOpen && (
        <div className="emailModal" style={{ width: '40%', height: '40%' }}>
<<<<<<< HEAD
          <div 
            className="emailModalContent" 
            style={{ 
              padding: '2%', 
              position: 'relative',
              backgroundColor: 'white',
            }}
          >
            <button 
              type="button" 
              onClick={() => setIsEmailModalOpen(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#333'
              }}
            >
              &times;
            </button>
            <h2>Compose Email</h2>
            <form onSubmit={sendEmail}>
              <div className="formGroup">
                <label>To:</label>
                <input 
                  type="text" 
                  name="to" 
                  value={emailDetails.to} 
                  onChange={handleEmailChange}
                  readOnly
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              </div>
              <div className="formGroup">
                <textarea 
                  id="subject" 
                  name="subject" 
                  value={emailDetails.subject} 
                  onChange={handleEmailChange} 
                  rows="4" 
                  cols="50" 
                  placeholder="Enter the subject here..."
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <button 
                type="submit" 
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
=======
  <div 
    className="emailModalContent" 
    style={{ 
      padding: '2%', 
      position: 'relative',
      backgroundColor: 'white',
    }}
  >
    <button 
      type="button" 
      onClick={() => setIsEmailModalOpen(false)}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#333'
      }}
    >
      &times;
    </button>
    <h2>Compose Email</h2>
    <form onSubmit={sendEmail}>
      <div className="formGroup">
        <label>To:</label>
        <input 
          type="text" 
          name="to" 
          value={emailDetails.to} 
          onChange={handleEmailChange}
          readOnly
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div className="formGroup">
        <textarea 
          id="subject" 
          name="subject" 
          value={emailDetails.subject} 
          onChange={handleEmailChange} 
          rows="4" 
          cols="50" 
          placeholder="Enter the subject here..."
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>
      <button 
        type="submit" 
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Send
      </button>
    </form>
  </div>
</div>

>>>>>>> f15109cd11a472ae7ea9b5343914f090e9543825
      )}
    </div>
  );
};

export default Datatable;
