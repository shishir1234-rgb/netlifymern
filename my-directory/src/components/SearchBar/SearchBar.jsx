import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import businessLoadingSVG from '../../assets/images/truck.gif'; // Example path

const SearchBar = ({ onStateSelect, onCategoryChange }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [category, setCategory] = useState('');
  const [companyCount, setCompanyCount] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setDropdownOpen(false);
    onStateSelect(state); // Pass selected state to parent
  };

  const handleSearch = async () => {
    setLoading(true); // Start loading animation

    // Construct requestData based on your form values
    const requestData = {
      state: selectedState,
      category: category,
    };

    console.log('Request data:', requestData);

    try {
      // Make the API request
      const response = await axios.post('https://hindu-backend.onrender.com/public/company/details', requestData);
      
      // Check the response data
      if (response.data && response.data.data) {
        setCompanyCount(response.data.count);
        console.log('Companies found:', response.data.data);
        
        // Redirect to data cards page with query parameters
        navigate(`/data-cards?state=${selectedState}&category=${category}`);
      } else {
        console.log('Unexpected response format:', response.data);
      }

      // Optionally clear the form if needed
      setSelectedState('');
      setCategory('');
      setCompanyCount(0);
    } catch (error) {
      console.error('Error fetching companies:', error.response?.data?.message || error.message);
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      borderRadius: '9999px',
      backgroundColor: 'white',
      padding: '0.1rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      position: 'relative',
      zIndex: 20
    }}>
      {loading && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 50
        }}>
          <img src={businessLoadingSVG} alt="Loading..." style={{ width: '80px', height: '80px' }} />
        </div>
      )}
      <div style={{
        position: 'relative',
        width: '16rem',
        borderRadius: '9999px',
        backgroundColor: '#FFA500', // Orange color
        border: '1px solid white',
        cursor: 'pointer'
      }}>
        <div
          onClick={toggleDropdown}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: '600',
            color: 'white',
            fontSize: '1.25rem',
            padding: '1rem'
          }}
        >
          <span>{selectedState || "States"}</span>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        {isDropdownOpen && (
          <ul style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            width: '100%',
            borderRadius: '0 0 0.375rem 0.375rem',
            backgroundColor: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            height: 'auto',
            zIndex: 10,
            padding: '0',
            margin: '0'
          }}>
            {['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'].map(state => (
              <li
                key={state}
                onClick={() => handleStateSelect(state)}
                style={{
                  padding: '1rem',
                  color: '#FFA500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                {state}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        paddingRight: '1rem',
        width: '100%',
        color: '#FFA500',
      }}>
        <input
          type="text"
          placeholder="Find..."
          style={{
            padding: '1rem',
            width: '100%',
            color: '#FFA500',
            fontWeight: '500',
            fontSize: '1.125rem',
            border: 'none',
            outline: 'none'
          }}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            onCategoryChange(e.target.value); // Update category in parent
          }}
        />
        <FontAwesomeIcon
          icon={faSearch}
          style={{ fontSize: '1.5rem', cursor: 'pointer' }}
          onClick={handleSearch}
        />
      </div>
      {companyCount > 0 && (
        <div style={{
          color: '#FFA500',
          fontWeight: '500',
          fontSize: '1.125rem',
          marginTop: '1rem'
        }}>
          {companyCount} companies found
        </div>
      )}
    </div>
  );
};

export default SearchBar;
