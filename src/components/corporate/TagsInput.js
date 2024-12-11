import React, { useState, useEffect, useRef } from 'react';

function TagsInput({ onTagSelect, error, clearError, name }) {
  // List of static tags with IDs
  const tagOptions = [
    { id: 1, name: 'Primary' },
    { id: 2, name: 'Corporate Office' },
    { id: 3, name: 'HO' },
    { id: 4, name: 'Others' }
  ];

  // State to track dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown container
  const [inputValue, setInputValue] = useState(''); // Input field value
  const [tagIdValue, setTagIdValue] = useState(''); // For tag ID (hidden)
  const [filteredTags, setFilteredTags] = useState(tagOptions); // Filtered tags

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close dropdown if clicked outside
    }
  };

  // Add event listener to handle clicks outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle input change and filter options based on input
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter tags based on the input value
    if (value === '') {
      setFilteredTags(tagOptions); // Show all options if input is empty
    } else {
      const filtered = tagOptions.filter(tag =>
        tag.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredTags(filtered);
    }

    // Open the dropdown when typing starts
    setIsDropdownOpen(true);
  };

  // Handle tag selection
  const handleTagSelect = (tagId, tagName) => {
    setInputValue(tagName); // Set tag name in visible input
    setTagIdValue(tagId); // Set tag ID in hidden input
    console.log("Selected tag ID:", tagId, "Selected tag name:", tagName); // Log the selected tag ID and name for debugging
    if (onTagSelect) {
      onTagSelect(tagId, tagName); // Pass selected tag ID and name to parent
    }
    if (clearError) {
      clearError(); // Clear error when tag is selected
    }
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <>
      <div className="register-form-control">
        <label className='register-label'>Tags</label>
        <div className="dropdown-container" ref={dropdownRef}>
          <div className="search-box-container">
            <input
              type='text'
              name={name} 
              className="register-input drodown-input"
              placeholder='Search'
              value={inputValue}
              onChange={handleInputChange} // Track input changes
            />
            <input
              type='hidden'
              name={name} 
              value={tagIdValue}
            />
            <i className="material-icons search-icon">search</i>
            <i
              className="material-icons dropdown-icon" onClick={toggleDropdown}>
              arrow_drop_down
            </i>
          </div>
          {/* Conditionally display the error message if passed */}
          {error && <p className="error selectbox-error">{error}</p>}
          {/* Conditionally render the dropdown options */}
          {isDropdownOpen && (
            <div className="dropdown-option-box">
              <ul className="dropdown-list">
                {filteredTags.length > 0 ? (
                  filteredTags.map(tag => (
                    <li
                      key={tag.id}
                      className='dropdown-list-item'
                      onClick={() => handleTagSelect(tag.id, tag.name)}
                    >
                      {tag.name}
                    </li>
                  ))
                ) : (
                  <li className='dropdown-list-item no-options'>No tags found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TagsInput;
