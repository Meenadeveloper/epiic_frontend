import React, { useState, useRef, useEffect } from 'react';

function CountryInput({ formData, formErrors,selectedCountryName, selectedCountryId,onCountrySelect }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [country, setCountry] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState([]);
  const [inputValue, setInputValue] = useState('');  // Set the initial value to formData.country
    const [countryIdValue, setcountryIdValue] = useState(''); // Hidden input for state ID
  const dropdownRef = useRef(null);

// Set the input value and country ID when selected state is passed (for edit mode)
useEffect(() => {
  if (selectedCountryName && selectedCountryId) {
    setInputValue(selectedCountryName);
    setcountryIdValue(selectedCountryId);
    
    // Log the selected state name and ID
    console.log("Selected Country Name:", selectedCountryName);
    console.log("Selected Country ID:", selectedCountryId);
  }
}, [selectedCountryName, selectedCountryId]);

// Toggle dropdown visibility
const toggleDropdown = () => {
  setIsDropdownOpen(prevState => !prevState);
  if (!isDropdownOpen) {
    setFilteredCountry(country); // Show all states when dropdown is opened
  }
};

// Close dropdown if clicked outside
const handleClickOutside = (event) => {
  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
    setIsDropdownOpen(false);
  }
};

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_COMMON_API_URL);
        const data = await response.json();
        if (data && data.country) {
          setCountry(data.country); // Set the fetched states
          setFilteredCountry(data.country); // Initially, show all states
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchCountry();
  }, []);

  // Listen for click events outside the dropdown to close it
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);


 // Handle input change and filter states
 const handleInputChange = (event) => {
  const value = event.target.value;
  setInputValue(value);


 // Filter states based on the input value
 if (value === '') {
  setFilteredCountry(country); // Show all states if input is empty
} else {
  const filtered = country.filter((country) =>
    country.country_name.toLowerCase().includes(value.toLowerCase())
  );
  setFilteredCountry(filtered.length ? filtered : [{ state_name: 'No states found' }]);
}
};

    // Handle state selection
    const handleCountrySelect = (countryId, countryName) => {
      setInputValue(countryName); // Set state name in visible input
      setcountryIdValue(countryId);  // Set state ID in hidden input
      onCountrySelect(countryId, countryName); // Pass selected state to parent
      setIsDropdownOpen(false); // Close the dropdown after selection
    };
 
  return (

<>

<div className={`register-form-control ${formErrors.countryName ? 'error-input' : ''}`}>
      <label className="register-label">Country</label>
      <div className="dropdown-container trasparent-dropdown-box" ref={dropdownRef}>
        <div className="search-box-container">
          <input
            type="text"
            name="countryName"
            className={`register-input drodown-input ${formErrors.countryName ? 'err-input-field' : ''}`}
            placeholder="Search"
            value={inputValue} // Controlled input value
            onChange={handleInputChange} // Handle input change
            onFocus={() => setIsDropdownOpen(true)} // Open dropdown on focus
          />
          {/* Hidden input field to store state ID */}
          <input
            type="hidden"
            name="countryId"
            value={countryIdValue}  // Hidden input to hold the state ID
          />
          <i className="material-icons search-icon">search</i>
          <i className="material-icons dropdown-icon" onClick={toggleDropdown}>
            arrow_drop_down
          </i>
        </div>
        {/* Display error message if exists */}
        {formErrors.countryName && <p className="error">{formErrors.countryName}</p>} {/* Display error message if exists */}
        {/* Dropdown content */}
        {isDropdownOpen && (
          <div className="dropdown-option-box">
            <ul className="dropdown-container">
              {filteredCountry.length > 0 ? (
                filteredCountry.map((country) => (
                  country.country_name === 'No Country found' ? (
                    <li key="no-Country-found" className="dropdown-list">
                      No Country found
                    </li>
                  ) : (
                    <li
                      key={country.id}
                      className="dropdown-list"
                      onClick={() => handleCountrySelect(country.id, country.country_name)} // Pass state_id and state_name
                    >
                      {country.country_name}
                    </li>
                  )
                ))
              ) : (
                <li className="dropdown-list">No states found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>


</>
  );
}

export default CountryInput;
