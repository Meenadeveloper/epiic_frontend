import React, { useState, useEffect, useRef } from 'react';

function DistrictInput({ 
  stateId,
  onDistrictSelect,
  selectedDistrictId,
  selectedDistrictName,
  name,
  error,

}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [districts, setDistricts] = useState([]); // List of districts fetched from API
  const [filteredDistricts, setFilteredDistricts] = useState([]); // Filtered list based on search input
  const [inputValue, setInputValue] = useState(''); // Input field value
  const [districtIdValue, setDistrictIdValue] = useState(''); // For state ID (hidden)

  const dropdownRef = useRef(null);

// Set the input value and state ID when selected state is passed (for edit mode)
useEffect(() => {
  if (selectedDistrictName && selectedDistrictId) {
    setInputValue(selectedDistrictName);
    setDistrictIdValue(selectedDistrictId);
    
    // Log the selected state name and ID
    console.log("Selected District Name:", selectedDistrictName);
    console.log("Selected District ID:", selectedDistrictId);
  }
}, [selectedDistrictName, selectedDistrictId]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      setFilteredDistricts(districts); // Show all districts when dropdown is opened
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        // Check if stateId is valid before making API request
        if (stateId) {
          console.log("API URL:", process.env.REACT_APP_DESTRICT_API_URL);  // Check the URL
          const response = await fetch(`${process.env.REACT_APP_DESTRICT_API_URL}?state_id=${stateId}`);          
          const data = await response.json();
          console.log('Districts data:', data); // Log the response to verify the structure

          if (data && data.districts && data.districts.length > 0) {
            setDistricts(data.districts);
            setFilteredDistricts(data.districts);
          } else {
            setDistricts([]);
            setFilteredDistricts([{ district_name: 'No districts found' }]);
          }
        }
      } catch (error) {
        console.error('Error fetching districts:', error);
      }
    };

    fetchDistricts();

  }, [stateId]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // If input is empty, show all districts
    if (value === '') {
      setFilteredDistricts(districts);
    } else {
      // Filter the districts based on the input value
      const filtered = districts.filter((district) =>
        district.district_name.toLowerCase().includes(value.toLowerCase())
      );

      // If no districts match the input, show "No districts found"
      if (filtered.length === 0) {
        setFilteredDistricts([{ district_name: 'No districts found' }]);
      } else {
        setFilteredDistricts(filtered);
      }
    }
  };

  const handleDistrictSelect = (districtId, districtName) => {
    setInputValue(districtName); // Set input value to selected district
    setDistrictIdValue(districtId); 
    if (onDistrictSelect) {
      onDistrictSelect(districtId, districtName); // Pass selected state ID and name to parent
    }
    setIsDropdownOpen(false); // Close dropdown
  };

  return (

    <>
    <div className="register-form-control">
      <label className="register-label">District</label>
      <div className="dropdown-container trasparent-dropdown-box" ref={dropdownRef}>
        <div className="search-box-container">
          <input
            type="text"
            name={name} 
            className="register-input drodown-input"
            placeholder="Search"
            value={inputValue || ""}// Controlled input value
            onChange={handleInputChange} // Handle input change to filter districts
            onFocus={() => setIsDropdownOpen(true)} // Open dropdown when focused
          />

                <input
            type="hidden"
            name={name} 
            value={districtIdValue || ""}// Controlled input value
            
          />
          <i className="material-icons search-icon">search</i>
          <i className="material-icons dropdown-icon" onClick={toggleDropdown}>
            arrow_drop_down
          </i>
        </div>

         {/* Display error message if exists */}
      {error && <p className="error selectbox-error">{error}</p>}

        {/* Dropdown content */}
        {isDropdownOpen && (
          <div className="dropdown-option-box">
            <ul className="dropdown-container">
              {filteredDistricts && filteredDistricts.length > 0 ? (
                filteredDistricts.map((district) =>
                  district.district_name === 'No districts found' ? (
                    <li key="no-districts-found" className="dropdown-list">
                      No districts found
                    </li>
                  ) : (
                    <li
                      key={district.id}
                      className="dropdown-list"
                      onClick={() => handleDistrictSelect(district.id, district.district_name)}
                    >
                      {district.district_name}
                    </li>
                  )
                )
              ) : (
                <li className="dropdown-list unselect">Select State</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
    </>
    
  );
}

export default DistrictInput;
