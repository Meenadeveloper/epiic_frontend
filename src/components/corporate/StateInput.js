import React, { useState, useEffect, useRef } from 'react';

function StateInput({ 
  onStateSelect,
  error,
  name,
  selectedStateName,
  selectedStateId
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [states, setStates] = useState([]); // List of all states fetched from API
  const [filteredStates, setFilteredStates] = useState([]); // Filtered list based on search input
  const [inputValue, setInputValue] = useState(''); // Input field value
  const [stateIdValue, setStateIdValue] = useState(''); // Hidden input for state ID
  const dropdownRef = useRef(null);

  // Set the input value and state ID when selected state is passed (for edit mode)
useEffect(() => {
  if (selectedStateName && selectedStateId) {
    setInputValue(selectedStateName);
    setStateIdValue(selectedStateId);
    
    // Log the selected state name and ID
    console.log("Selected State Name:", selectedStateName);
    console.log("Selected State ID:", selectedStateId);
  }
}, [selectedStateName, selectedStateId]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
    if (!isDropdownOpen) {
      setFilteredStates(states); // Show all states when dropdown is opened
    }
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Fetch states from the API
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_STATE_API_URL);
        const data = await response.json();
        if (data && data.states) {
          setStates(data.states); // Set the fetched states
          setFilteredStates(data.states); // Initially, show all states
        } else {
          console.error('Invalid data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    fetchStates();
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
      setFilteredStates(states); // Show all states if input is empty
    } else {
      const filtered = states.filter((state) =>
        state.state_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStates(filtered.length ? filtered : [{ state_name: 'No states found' }]);
    }
  };

  // Handle state selection
  const handleStateSelect = (stateId, stateName) => {
    setInputValue(stateName); // Set state name in visible input
    setStateIdValue(stateId);  // Set state ID in hidden input
    onStateSelect(stateId, stateName); // Pass selected state to parent
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="register-form-control">
      <label className="register-label">State</label>
      <div className="dropdown-container trasparent-dropdown-box" ref={dropdownRef}>
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
          {/* Hidden input field to store state ID */}
          <input
            type="hidden"
            name="state"
            value={stateIdValue}  // Hidden input to hold the state ID
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
              {filteredStates.length > 0 ? (
                filteredStates.map((state) => (
                  state.state_name === 'No states found' ? (
                    <li key="no-states-found" className="dropdown-list">
                      No states found
                    </li>
                  ) : (
                    <li
                      key={state.id}
                      className="dropdown-list"
                      onClick={() => handleStateSelect(state.id, state.state_name)} // Pass state_id and state_name
                    >
                      {state.state_name}
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
  );
}

export default StateInput;
