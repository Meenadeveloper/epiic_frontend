import React, { useState, useRef, useEffect } from 'react';

function CountryInput() {
  const [focused, setFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [states, setStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const url = process.env.REACT_APP_STATE_API_URL;
        // Log the request URL to ensure it's correct
        console.log("Requesting from URL:", url);

        const response = await fetch(url);

        // Check if the response is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log("Received data:", data);

          const stateNames = data.states.map((state) => state.state_name);
          setStates(stateNames);
          setFilteredStates(stateNames);
        } else {
          console.error('Expected JSON but got:', contentType);
          const textResponse = await response.text(); // Log the response content
          console.log('Response content:', textResponse);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectItem = (item) => {
    setInputValue(item);
    setIsDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setInputValue(query);
    const filtered = states.filter((state) =>
      state.toLowerCase().includes(query)
    );
    setFilteredStates(filtered);

    // Show the dropdown when there's input
    setIsDropdownOpen(query.length > 0);
  };

  // Close dropdown when clicking outside of the input or dropdown
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
    <>
      <div className="register-form-control">
        <label className="register-label">State</label>
        <div className="dropdown-container">
          <div className="search-box-container">
            <input
              type="search"
              name="state"
              className="register-input drodown-input"
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

        <p className="error"></p>
      </div>
    </>
  );
}

export default CountryInput;
