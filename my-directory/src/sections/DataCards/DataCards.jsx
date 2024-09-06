import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import Cards from '../../components/cards/Cards';
import axios from 'axios';

const DataCards = () => {
  const [selectedState, setSelectedState] = useState('');
  const [category, setCategory] = useState('');
  const [cardData, setCardData] = useState([]);
  
  // To handle URL query parameters
  const location = useLocation();

  useEffect(() => {
    // Extract query parameters from URL if available
    const params = new URLSearchParams(location.search);
    const stateFromUrl = params.get('state') || '';
    const categoryFromUrl = params.get('category') || '';

    if (stateFromUrl || categoryFromUrl) {
      setSelectedState(stateFromUrl);
      setCategory(categoryFromUrl);
      fetchData(stateFromUrl, categoryFromUrl);
    }
  }, [location.search]);

  const fetchData = async (state, category) => {
    try {
      const response = await axios.post('https://hindu-backend.onrender.com/public/company/details', { state, category });
      setCardData(response.data.data); // Assuming the data is in response.data.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    fetchData(state, category);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
    fetchData(selectedState, category);
  };

  return (
    <>
      <div className='flex justify-center items-center p-10'>
        <SearchBar 
          onStateSelect={handleStateSelect} 
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <div>
        <Cards companies={cardData} />
      </div>
    </>
  );
};

export default DataCards;
