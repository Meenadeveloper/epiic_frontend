import React, { useState, useEffect } from 'react';

function TurnOverOrganization({ formData, formErrors, handleChange }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [inputValue, setInputValue] = useState(formData.turnover || '');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOptionId, setSelectedOptionId] = useState(formData.turnoverId || '');
  const [showCloseIconOnly, setShowCloseIconOnly] = useState(false); // Handle "Other" option

  // Predefined options including the "Other" option
  const options = [
    { id: '1', label: 'Up to 10LPA TO 10,000LPA' },
    { id: '2', label: 'Up to 20LPA TO 20,000LPA' },
    { id: '3', label: 'Up to 30LPA TO 30,000LPA' },
    { id: '4', label: 'Up to 40LPA TO 40,000LPA' },
    { id: '5', label: 'Other' }
  ];

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    if (dropdownVisible) {
      clearInput(); // Close dropdown and clear input if already open
    } else {
      setDropdownVisible(true);
      setFilteredOptions(options); // Show all options when opened
    }
  };

  // Handle input change and filtering options
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value); // Update input value
    // Log input value to console
    console.log("Input Value Changed:", value);
    // Pass the updated value to the parent component
    handleChange('turnover', value);

    // Filter the options based on the input value
    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered); // Update filtered options
  };

  // Handle option click (selecting an option)
  const handleOptionClick = (option) => {
    if (option.label === 'Other') {
     // When "Other" is selected, the input is cleared for custom entry
    setInputValue(''); // Allow user to enter a custom value for "Other"
    setShowCloseIconOnly(true); // Show only close icon for "Other"
    setSelectedOptionId(''); // Clear the hidden field for custom input
    setDropdownVisible(false); // Hide dropdown
    // Log the selected "Other" option
    console.log("Selected Option - Other:", option);
    
    // Pass the "Other" label to the parent (this will be overwritten when user enters custom value)
    handleChange('turnover', ''); // Initially set to empty, will be updated when user types
    handleChange('turnoverId', ''); // No ID for custom "Other" value
    } else {
      setInputValue(option.label); // Set input value to selected option
      setSelectedOptionId(option.id); // Set selected option's ID
      setDropdownVisible(false); // Close dropdown
      setShowCloseIconOnly(false); // Reset to normal icon behavior
 // Log selected option
 console.log("Selected Option:", option.label);
      // Pass selected option's label and ID to parent
      handleChange('turnover', option.label);
      handleChange('turnoverId', option.id);
    }
  };

  // Clear input value and reset states
  const clearInput = () => {
    setInputValue(''); // Clear input
    setDropdownVisible(false); // Close dropdown
    setFilteredOptions([]); // Clear filtered options
    setSelectedOptionId(''); // Clear selected option ID
    setShowCloseIconOnly(false); // Reset icon

    // Pass empty value to parent for both turnoverId and turnover
    handleChange('turnover', '');
    handleChange('turnoverId', '');
     // Log cleared input
     console.log("Input Cleared");
  };

  // Sync input with the formData whenever it changes in the parent
  useEffect(() => {
    setInputValue(formData.turnover || '');
    setSelectedOptionId(formData.turnoverId || '');
  }, [formData]);

  return (
    <>
      <div className="register-form-control">
        <label className="register-label">Turnover of the Organisation</label>
        <div className="dropdown-container">
          <div className="search-box-container">
            <input
              type="text"
              name="turnover"
              value={inputValue}
              onChange={handleInputChange}
              className="register-input dropdown-input"
              placeholder="Enter turnover"
            />
            {/* Hidden input to store the selected option ID */}
            <input type="hidden" name="turnoverId" value={selectedOptionId} />

            {/* Icon logic */}
            {showCloseIconOnly ? (
              <i className="material-icons dropdown-icon" onClick={clearInput}>
                close
              </i>
            ) : (
              <>
                {/* Toggle between search and dropdown icons */}
                {inputValue ? '' : (
                  <i className="material-icons search-icon">search</i>
                )}
                {inputValue ? (
                  <i className="material-icons dropdown-icon" onClick={clearInput}>
                    close
                  </i>
                ) : (
                  <i className="material-icons dropdown-icon" onClick={toggleDropdown}>
                    arrow_drop_down
                  </i>
                )}
              </>
            )}
          </div>

          {/* Dropdown options */}
          {dropdownVisible && (
            <div className="dropdown-option-box">
              <ul className="dropdown-container">
                {(filteredOptions.length > 0 ? filteredOptions : options).map((option) => (
                  <li key={option.id} onClick={() => handleOptionClick(option)}>
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Display error message if turnover has an error */}
        {formErrors.turnover && <p className="error">{formErrors.turnover}</p>}
      </div>
    </>
  );
}

export default TurnOverOrganization;
