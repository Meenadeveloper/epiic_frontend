import React, { useState, useEffect, useRef } from 'react';

function DistrictInput({
  formErrors,
  stateId,
  onDistrictSelect,
  selectedDistrictId,
  selectedDistrictName,
  name,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [districts, setDistricts] = useState([]); // List of all districts fetched from API
  const [filteredDistricts, setFilteredDistricts] = useState([]); // Filtered list based on search input
  const [inputValue, setInputValue] = useState(''); // Input field value
  const [districtIdValue, setDistrictIdValue] = useState(''); // Hidden input for district ID

  // Set the input value and district ID when selected district is passed (for edit mode)
  useEffect(() => {
    if (selectedDistrictName && selectedDistrictId) {
      setInputValue(selectedDistrictName);
      setDistrictIdValue(selectedDistrictId);

      // Log the selected district name and ID
      console.log('Selected District Name:', selectedDistrictName);
      console.log('Selected District ID:', selectedDistrictId);
    }
  }, [selectedDistrictName, selectedDistrictId]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
    if (!isDropdownOpen) {
      setFilteredDistricts(districts); // Show all districts when dropdown is opened
    }
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Fetch districts from the API
  useEffect(() => {
    console.log("State ID:", stateId); 
    const fetchDistricts = async () => {
      try {
        // Check if stateId is valid before making API request
        if (stateId) {
          console.log('API URL:', process.env.REACT_APP_DESTRICT_API_URL); // Check the URL
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
  }, [stateId]); // Add stateId as a dependency to refetch districts when it changes

  // Handle input change and filter districts
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter districts based on the input value
    if (value === '') {
      setFilteredDistricts(districts); // Show all districts if input is empty
    } else {
      const filtered = districts.filter((district) =>
        district.district_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDistricts(filtered.length ? filtered : [{ district_name: 'No districts found' }]);
    }
  };

  // Handle district selection
  const handleDistrictSelect = (districtId, districtName) => {
    setInputValue(districtName); // Set district name in visible input
    setDistrictIdValue(districtId); // Set district ID in hidden input
    onDistrictSelect(districtId, districtName); // Pass selected district to parent
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  // Listen for click events outside the dropdown to close it
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="register-form-control">
      <label className="register-label">Select District</label>
      <div className="dropdown-container transparent-dropdown-box" ref={dropdownRef}>
        <div className="search-box-container">
          <input
            type="text"
            name={name}
            className="register-input drodown-input"
            placeholder="Search"
            value={inputValue} // Controlled input value
            onChange={handleInputChange} // Handle input change
            onFocus={() => setIsDropdownOpen(true)} // Open dropdown on focus
          />
          {/* Hidden input field to store district ID */}
          <input type="hidden" name="districtId" value={districtIdValue} />
          <i className="material-icons search-icon">search</i>
          <i className="material-icons dropdown-icon" onClick={toggleDropdown}>
            arrow_drop_down
          </i>
        </div>
        {/* Display error message if exists */}
        {formErrors.districtId && <p className="error selectbox-error">{formErrors.districtId}</p>}

        {/* Conditionally render the dropdown options based on state */}
        {isDropdownOpen && (
          <div className="dropdown-option-box transparent-bg">
            <ul className="dropdown-container">
              {filteredDistricts.length > 0 ? (
                filteredDistricts.map((district) =>
                  district.district_name === 'No districts found' ? (
                    <li key="no-districts-found" className="b-txt">
                      No districts found
                    </li>
                  ) : (
                    <li
                      key={district.id}
                      className="b-txt"
                      onClick={() => handleDistrictSelect(district.id, district.district_name)} // Pass district_id and district_name
                    >
                      {district.district_name}
                    </li>
                  )
                )
              ) : (
                <li className="b-txt">No districts found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default DistrictInput;
