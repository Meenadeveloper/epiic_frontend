import React, { useState, useRef, useEffect } from 'react';

function CountryInput({ formData, formErrors, handleChange }) {
  const [focused, setFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState(formData.country || '');  // Set the initial value to formData.country
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const url = process.env.REACT_APP_STATE_API_URL;
        console.log("Requesting from URL:", url);

        const response = await fetch(url);
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log("Received data:", data);

          const stateNames = data.states.map((state) => state.state_name);
          setStates(stateNames);
          setFilteredStates(stateNames);
        } else {
          console.error('Expected JSON but got:', contentType);
          const textResponse = await response.text();
          console.log('Response content:', textResponse);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  // Handle dropdown visibility toggle
  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle selecting a state from the dropdown
  const handleSelectItem = (item) => {
    setInputValue(item);
    setIsDropdownOpen(false);

    // Update the formData for the country field
    handleChange({
      target: {
        name: 'country',
        value: item,
      },
    });

    
  };

  // Handle input changes and filter states
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setInputValue(query);
    const filtered = states.filter((state) =>
      state.toLowerCase().includes(query)
    );
    setFilteredStates(filtered);

    // Show the dropdown when there is input
    setIsDropdownOpen(query.length > 0);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`register-form-control ${formErrors.country ? 'error-input' : ''}`}>
      <label className="register-label">Country</label>
      <div className="dropdown-container">
        <div className="search-box-container">
          <input
            type="search"
            name="country"
            className={`register-input drodown-input ${formErrors.country ? 'err-input-field' : ''}`}
            placeholder="Search"
            value={inputValue}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={handleSearchChange}
          />
          {!inputValue && !focused && (
            <i className="material-icons search-icon">search</i>
          )}
          <i
            className="material-icons dropdown-icon"
            onClick={handleDropdownClick}
          >
            arrow_drop_down
          </i>
        </div>

        {isDropdownOpen && (
          <div className="dropdown-option-box" ref={dropdownRef}>
            <ul className="dropdown-container">
              {filteredStates.length > 0 ? (
                filteredStates.map((state, index) => (
                  <li
                    key={index}
                    className="dropdown-list"
                    onClick={() => handleSelectItem(state)}
                  >
                    {state}
                  </li>
                ))
              ) : (
                <li className="dropdown-list not-found">
                  <em>Not Found</em>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      {formErrors.country && <p className="error">{formErrors.country}</p>} {/* Display error message if exists */}
    </div>
  );
}

export default CountryInput;
